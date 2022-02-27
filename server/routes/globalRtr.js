import express from "express";
import globalController from "../controllers/globalCntrl.js";
const router = express.Router();

router.get("/all",
  globalController.getAllEntries,
  (req, res) => {
    console.log('logging from end of middleware chain in router: ', res.locals)
    res.status(200).json({
      posts: res.locals.posts
    });
});

export default router;