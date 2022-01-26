import db from "../models/dataModel.js";
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const companyController = {};

// middlerware for get requests to companies endpoint
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
      res.locals.name = response[0] ? response[0].name :req.body.name;
      return next();
    })
    .catch((err) => next(err))
}

// middlerware for post requests to companies endpoint
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

export default companyController;
