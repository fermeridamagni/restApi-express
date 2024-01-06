const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

const sessionStoreMySQL = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root123",
  database: process.env.DB_NAME || "restapiexpress",
  createDatabaseTable: true,
  endConnectionOnClose: false,
  clearExpired: true,
  checkExpirationInterval: 54000000,
  expiration: 54000000,
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
});

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  session({
    key: "cookie_user",
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 54000000,
    },
    store: sessionStoreMySQL,
  })
);

// Global Settings
app.use((req, res, next) => {
  user = req.session.user;

  next();
});

// Settings
dotenv.config();

// Engine Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

// Routes Settings
app.use("/", require("../routes/index.routes"));
app.use("/", require("../routes/authentication.routes"));

module.exports = app;
