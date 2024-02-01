require('dotenv').config();

let { DB_URL } = process.env;

// const knex = require("knex")({
//   client: "pg",
//   connection: DB_URL
// });

// module.exports = knex;

// CONEXÃO LOCAL

const knex = require("knex")({
  client: "pg",
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'phionavalha_db',
    // ssl: { rejectUnauthorized: false }
  },
});

module.exports = knex;
