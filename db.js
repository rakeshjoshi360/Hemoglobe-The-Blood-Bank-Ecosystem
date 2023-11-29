const mysql = require("mysql");
const pool = mysql.createPool({
  host: "your host",
  user: "your database username",
  password: "your database password",
  database: "your database name",
});

pool.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }
  console.log("Connected to MySQL");
  connection.release();
});

module.exports = pool;
