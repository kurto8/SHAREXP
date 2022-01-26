import express from "express";
import companiesController from "../controllers/companies.js";
const router = express.Router();

router.get("/", companiesController.getCompanies, (req, res) => {
  res.status(200).json({
    companies: res.locals.companies,
  });
});

router.post("/", 
  companiesController.addLogo,
  companiesController.addCompany, 
  (req, res) => {
  res.status(200).json({
    id: res.locals.companyId,
    name: res.locals.name,
    logo: res.locals.logo
  });
});

export default router;
