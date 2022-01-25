import db from "../models/dataModel.js";

const companyController = {};

// middlerware for get requests to companies endpoint
companyController.getCompanies = (req, res, next) => {
  const sql = `SELECT * FROM "companies";
  `;
  db.query(sql)
    .then((data) => {
      console.log(data.rows);
      res.locals.companies = data.rows;
      return next();
    })
    .catch((err) => next(err));
};

// middlerware for post requests to companies endpoint
companyController.addCompany = (req, res, next) => {
  return next();
};

export default companyController;
