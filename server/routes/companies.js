import express from "express";
import companiesController from "../controllers/companies.js";
const router = express.Router();

router.get("/", companiesController.getCompanies, (req, res) => {
  res.status(200).json({
    companies: res.locals.companies,
  });
});

router.post("/", companiesController.addCompany, (req, res) => {
  res.status(200).json({
    companyId: res.locals.companyID,
  });
});

export default router;
