const { Pool } = require('pg');
requre ('dotenv').config()

const myURI = '';
// const myURI = 'postgres://wombasxo:sXoK3dPD_SB3OLBzNXyAI84C174oPIz_@kashin.db.elephantsql.com/wombasxo';

const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI
});

module.exports = { pool };
// module.export = {
//   query: 
// }
