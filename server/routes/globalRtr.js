import express from "express";
import globalController from "../controllers/globalCntrl.js";
const router = express.Router();

router.get("/all",
  globalController.getAllEntries,
  (req, res) => {
    console.log('logging from end of global middleware chain in router: ', res.locals)
    if (!req.cookies.loggedIn) return res.status(401).send();
    res.status(200).json({
      posts: res.locals.posts
    });
});

export default router;