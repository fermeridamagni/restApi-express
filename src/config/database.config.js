const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to: ' + process.env.DB_HOST + ' : ' + err.message);
  } else {
    console.log('Connected to: ' + process.env.DB_HOST + ' -> ' + process.env.DB_NAME);
  };
});

module.exports = connection;