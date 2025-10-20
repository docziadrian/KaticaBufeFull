const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql");

let pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_PATH,
});

module.exports = pool;
