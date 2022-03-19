import db from '../models/dataModel.js';
import fetch from 'node-fetch';

const usersController = {};

// retrieve all users and store in res.locals to use in next middleware
usersController.checkIfUsernameExists = (req, res, next) => {
  console.log('getting all usernames');
  const sql = `SELECT username FROM "users" WHERE username=$1;`;
  const params = [req.body.username]
  db.query(sql, params)
    .then((data) => {
      console.log(data.rows)
      res.locals.userNameExists = data.rows[0] ? true : false;
      // res.locals.userNameExists = data.rows.some(
      //   (el) => el.username === req.body.username
      // );
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// check if users contains matching information
//   if yes, return cookie
//   if no, return failure message
usersController.login = (req, res, next) => {
  if (res.locals.userNameExists) {
    console.log("username exists, loggin' in");
    const sql = `SELECT id from "users" WHERE username=$1 AND password=$2;`;
    const params = [req.body.username, req.body.password];
    db.query(sql, params)
      .then((data) => {
        console.log('data:', data.rows);
        res.locals.userId = data.rows[0].id;
        console.log('res.locals: ', res.locals.userId);
        return next();
      })
      .catch((err) => next(err));
  } else {
    res.locals.userId = 'ERR: Username or Password is incorrect';
    return next();
  }
};

// add new row to users
//   if row exists, return failure message
//   if not, return cookie
usersController.signup = (req, res, next) => {
  if (!res.locals.userNameExists) {
    const sql = `INSERT INTO "users" (username, password, cohort_id, avatar)
  VALUES ($1, $2, $3, $4)
  RETURNING id, avatar
  `;
    const avatarUrl = `https://avatars.dicebear.com/api/big-smile/${req.body.username}.svg`;
    const params = [
      req.body.username,
      req.body.password,
      // res.locals.cohortId,
      avatarUrl,
    ];
    db.query(sql, params)
      .then((data) => {
        res.locals.userId = data.rows[0].id;
        res.locals.avatar = data.rows[0].avatar;
        return next();
      })
      .catch((err) => next(err));
  } else {
    res.locals.userId = 'ERR: username already exists';
    return next();
  }
};

export default usersController;

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->
  username: samAccount
  password: passpasspass
  inviteKey: 'LACOHORT'

*/
