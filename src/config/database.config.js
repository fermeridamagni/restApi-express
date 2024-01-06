const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS|| 'root123',
  database: process.env.DB_NAME || 'restapiexpress',
  port: process.env.DB_PORT || 3306
});

module.exports = connection;