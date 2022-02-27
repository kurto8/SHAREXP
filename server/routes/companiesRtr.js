import express from "express";
import companiesController from "../controllers/companiesCntrl.js";
import globalController from "../controllers/globalCntrl.js";
const router = express.Router();

// handles get requests to companies
router.get("/", companiesController.getCompanies,
(req, res) => {
  res.status(200).json({
    companies: res.locals.companies,
  });
});

// handles post requests to companies - adding a new company
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

// handles post requests to a specific company - adding a company review
router.post("/:companyId",
  globalController.getLocationId, // save location id to res.locals
  globalController.getPositionId, // save postion id to res.locals
  globalController.getLevelId, // save level id to res.locals
  companiesController.createEntry,
  (req, res) => {
    res.status(200).json({
      postId: res.locals.postId
    });
});

// handles get requests to a specific company - returns all entries for that company
router.get("/:companyId",
  companiesController.getAllEntries,
  (req, res) => {
    console.log('logging from end of middleware chain in router: ', res.locals)
    res.status(200).json({
      posts: res.locals.posts
    });
});

export default router;
