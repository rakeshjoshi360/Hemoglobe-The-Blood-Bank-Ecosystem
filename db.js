const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "bbb95531",
  password: "Cab#22se",
  database: "bbb95531",
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
