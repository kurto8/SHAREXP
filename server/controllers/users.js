import db from "../models/dataModel.js";

const usersController = {};

// retrieve all users and store in res.locals to use in next middleware
usersController.getAllUsers = (req, res, next) => {
  console.log('getting all users');
    const sql = `SELECT * FROM "users";
    `;
    db.query(sql)
        .then((data) => {
            console.log('DATA', data);
            console.log('data.rows', data.rows)
            res.locals.users = data.rows;
            return next();
        })
        .catch((err) => {
            return next(err)
        });
};

// check if users contains matching information
//   if yes, return cookie
//   if no, return failure message
usersController.login = (req, res, next) => {
  const sql = `
  `
  const params = [];
  return next();
};

// add new row to users
//   if row exists, return failure message
//   if not, return cookie
usersController.signup = (req, res, next) => {
  const sql = `
  `
  const params = [req.body.username, req.body.password, res.locals.locationId];
  return next();
};

export default usersController;

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->
  username: samAccount
  password: passpasspass
  inviteKey: 'LACOHORT'

*/ 
