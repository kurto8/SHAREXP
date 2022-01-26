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
      res.locals.companies = data.rows;
      return next();
    })
    .catch((err) => next(err));
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
  `INSERT INTO posts (company_id, title, interview_questions, user_id, salary_range, red_flags, make_anonymous, pros, cons, notes, location_id, position_id, level_id, time_posted)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
  RETURNING id
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
    res.locals.positionId, 
    res.locals.levelId,
  ];
  // what do we do with tags?? req.body.tags || null,

  db.query(sql, params)
  .then((data) => {
    res.locals.postId = data.rows[0].id;
    return next();
    })
    .catch((err) => next(err));
};

// gets all entries from a specific company
companyController.getAllEntries = (req, res, next) => {
  const sql = `SELECT * FROM posts WHERE company_id=$1`;
  const params = [ req.params.companyId ];
  db.query(sql, params)
    .then((data) => {
      res.locals.posts = data.rows.map(row => {
        row.interviewQuestions = row.interview_questions;
        row.salaryRange = row.salary_range;
        row.redFlags = row.red_flags;
        row.makeAnonymous = row.make_anonymous;
        row.timePosted = new Date(row.time_posted);
        row.userId = row.user_id;
        row.comapnyId = row.company_id;
        row.locationId = row.location_id;
        row.levelId = row.level_id;
        row.positionId = row.position_id;
        delete row.level_id;
        delete row.location_id;
        delete row.company_id;
        delete row.user_id;
        delete row.make_anonymous;
        delete row.salary_range;
        delete row.red_flags;
        delete row.interview_questions;
        delete row.position_id;
        delete row.time_posted;
        return row;
      })
      return next();
    })
    .catch(err => next(err));
}

export default companyController;

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->
 "id": 4,
            "title": "Another Day",
            "interview_questions": "Which tech CEO would win in a cage match?",
            "notes": "I was very sleepy",
            "pros": "clean desks",
            "cons": "no snacks",
            "salary_range": "$80-90k",
            "red_flags": "Dirty carpet",
            "make_anonymous": "true",
            "time_posted": "2022-01-26T13:28:06.678Z",
            "user_id": 4,
            "company_id": 21,
            "position_id": 2,
            "location_id": 7,
            "level_id": 1

*/ 
