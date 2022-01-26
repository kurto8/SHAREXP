import express from "express";
import usersController from "../controllers/users.js";
const router = express.Router();

router.post("/login",
usersController.getAllUsers,
  usersController.login,
  (req, res) => {
    console.log('logging from end of middleware chain in router: ', res.locals)
    res.status(200).json({
      userId: res.locals.userId,
      cookie: 'cookie'
    });
});

router.post("/signup",
  usersController.getAllUsers,
  usersController.signup,
  (req, res) => {
    console.log('logging from end of middleware chain in router: ', res.locals)
    res.status(200).json({
      userId: res.locals.userId,
      cookie: 'cookie'
    });
});

export default router;