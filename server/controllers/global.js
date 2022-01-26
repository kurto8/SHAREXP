import db from "../models/dataModel.js";

const globalController = {};

// takes a loction name on request body and adds locationID to res.locals
globalController.getLocationId = (req, res, next) => {
  const sql = `SELECT id FROM locations WHERE name=$1
    `;
  const params = [req.body.location];
  db.query(sql, params)
    .then((data) => {
      if (!data.rows[0]) {
        const sql2 = `
              INSERT INTO locations (name) VALUES ($1) RETURNING id`;
        db.query(sql2, params)
          .then((data) => {
            res.locals.locationId = data.rows[0].id;
            return next();
          })
          .catch((err) => next(err));
      } else {
        res.locals.locationId = data.rows[0].id;
        return next();
      }
    })
    .catch((err) => next(err));
};

// takes a position name on request body and adds positionID to res.locals
globalController.getPositionId = (req, res, next) => {
    const sql = `SELECT id FROM positions WHERE name=$1
      `;
    const params = [req.body.position];
    db.query(sql, params)
      .then((data) => {
        if (!data.rows[0]) {
          const sql2 = `
                INSERT INTO positions (name) VALUES ($1) RETURNING id`;
          db.query(sql2, params)
            .then((data) => {
              res.locals.positionId = data.rows[0].id;
              return next();
            })
            .catch((err) => next(err));
        } else {
          res.locals.positionId = data.rows[0].id;
          return next();
        }
      })
      .catch((err) => next(err));
};

// takes a level "name" on request body and adds levelID to res.locals
globalController.getLevelId = (req, res, next) => {
    const sql = `SELECT id FROM levels WHERE name=$1
      `;
    const params = [req.body.level];
    db.query(sql, params)
      .then((data) => {
        if (!data.rows[0]) {
          const sql2 = `
                INSERT INTO levels (name) VALUES ($1) RETURNING id`;
          db.query(sql2, params)
            .then((data) => {
              res.locals.levelId = data.rows[0].id;
              return next();
            })
            .catch((err) => next(err));
        } else {
          res.locals.levelId = data.rows[0].id;
          return next();
        }
      })
      .catch((err) => next(err));
};

export default globalController;

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->


*/ 
