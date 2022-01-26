import db from "../models/dataModel.js";
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const companyController = {};

// gets all companies
companyController.getCompanies = (req, res, next) => {
  const sql = `SELECT * FROM "companies";
  `;
  db.query(sql)
    .then((data) => {
      console.log(data.rows);
      res.locals.companies = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err)
    });
};

// adds logo and formatted company name to res.locals
companyController.addLogo = (req, res, next) => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.CLEARBIT_KEY}`
    }
  }
  const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${req.body.name}`
  fetch(url, options)
    .then(response => response.json())
    .then((response) => {
      res.locals.logo = response[0] ? response[0].logo : null;
      res.locals.name = response[0] ? response[0].name : req.body.name;
      return next();
    })
    .catch((err) => next(err))
};

// creates a new company
companyController.addCompany = (req, res, next) => {
  const sql = 
  `INSERT INTO "companies" (name, logo)
  VALUES ($1, $2)
  RETURNING id;
  `
  const params = [ res.locals.name, res.locals.logo ];
  db.query(sql, params)
    .then((data) => {
      console.log(data.rows);
      res.locals.id = data.rows;
      return next();
    })
    .catch((err) => next(err));
};

// creates a new entry
companyController.createEntry = (req, res, next) => {
  const sql =
  `INSERT INTO posts COLUMNS (company_id, title, interview_questions, user_id, salary_range, red_flags, make_anonymous, pros, cons, notes, location_id, position_id, level_id)
  `
  const params = [
    req.params.companyId, 
    req.body.title,
    req.body.interviewQuestions || null,
    req.body.userID,
    req.body.salaryRange || null,
    req.body.redFlags || null,
    req.body.makeAnonymous || false,
    req.body.pros || null,
    req.body.cons || null,
    req.body.notes || null,
    res.locals.locationId,
    res.locals.position, 
    res.locals.level,
  ];

  // what do we do with tags?? req.body.tags || null,
  
  // db.query(sql, params)
  // .then((data) => {
  //   res.locals.postId = data.rows;
  //   return next();
  //   })
  //   .catch((err) => next(err));
  return next();
};

export default companyController;

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->


*/ 
