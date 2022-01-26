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

// takes a cohort "invite_key" on request body and adds cohortId to res.locals
globalController.getCohortId = (req, res, next) => {
  const sql = `SELECT id FROM cohorts WHERE invite_key=$1
    `;
  const params = [req.body.inviteKey];
  db.query(sql, params)
    .then((data) => {
      if (!data.rows[0]) {
        const sql2 = `
              INSERT INTO cohorts (invite_key) VALUES ($1) RETURNING id`;
        db.query(sql2, params)
          .then((data) => {
            res.locals.cohortId = data.rows[0].id;
            return next();
          })
          .catch((err) => next(err));
      } else {
        res.locals.cohortId = data.rows[0].id;
        return next();
      }
    })
    .catch((err) => next(err));
};

globalController.getAllEntries = (req, res, next) => {
  const sql = `
  SELECT l.name AS level_name, lo.name AS location_name, pt.name AS position_name, u.username AS author,
         c.name as company_name, c.id as company_id, c.logo, p.title, p.time_posted
  FROM posts p 
    LEFT JOIN levels l
      ON l.id = p.level_id
    LEFT JOIN positions pt
      ON pt.id = p.position_id
    LEFT JOIN locations lo
      ON lo.id = p.location_id
    LEFT JOIN users u
      ON u.id = p.user_id
    LEFT JOIN companies c
      ON c.id = p.company_id
  `
  db.query(sql)
    .then((data) => {
      res.locals.posts = data.rows.map(row => {           // renaming data
        row.timePosted = new Date(row.time_posted);
        row.username = row.user_name;
        row.comapnyId = row.company_id;
        row.locationName = row.location_name;
        row.levelName = row.level_name;
        row.positionName = row.position_name;
        row.companyName = row.company_name;
        row.companyId = row.company_id;
        row.companyLogo = row.logo;
        delete row.company_name;
        delete row.company_id;
        delete row.logo;
        delete row.level_id;
        delete row.level_name;
        delete row.location_id;
        delete row.location_name;
        delete row.company_id;
        delete row.user_id;
        delete row.position_id;
        delete row.position_name;
        delete row.time_posted;
        return row;
      })
      return next();
    })
    .catch(err => next(err));
}
export default globalController;

/* <-- ~~**~~**~~**~~** SCRATCHPAD **~~**~~**~~**~~**~~ -->


*/ 
