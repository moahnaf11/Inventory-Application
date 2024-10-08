const { Pool } = require("pg");
require("dotenv").config();

// All of the following properties should be read from environment variables

module.exports = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432 // The default port
});


