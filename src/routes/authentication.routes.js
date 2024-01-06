const { Router } = require("express");
const { body, validationResult } = require("express-validator");

const connection = require("../config/database.config");

const router = Router();

// Register
router.post(
  "/register",
  [
    body("first_name").exists().isLength({ min: 1 }),
    body("last_name").exists().isLength({ min: 1 }),
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    const { first_name, last_name, email, password } = req.body;

    const data = {
      first_name,
      last_name,
      email,
      password,
    };

    if (!errors.isEmpty()) {
      res.redirect("/register");
    } else {
      if (req.session.user) {
        req.redirect("/dashboard");
      } else {
        try {
          await connection.query("INSERT INTO users SET ?", [data]);

          req.session.user = {
            first_name,
            last_name,
            email,
            password,
          };

          res.redirect("/dashboard");
        } catch (err) {
          console.log(err);

          res.json({ err });
        }
      }
    }
  }
);

// LogIn
router.post(
  "/login",
  [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      res.redirect("/login");
    } else {
      if (req.session.user) {
        res.redirect("/dashboard");
      } else {
        try {
          const [rows] = await connection.query(
            "SELECT * FROM users WHERE email = ? and password = ?",
            [email, password]
          );

          if (rows.length === 0) {
            res.redirect("/login");
          } else {
            const user = rows[0];

            req.session.user = {
              name: user.full_name,
              email: user.email,
              password: user.password,
            };

            res.redirect("/dashboard");
          }
        } catch (err) {
          console.log(err);

          res.json({ err });
        }
      }
    }
  }
);

// logOut
router.get("/logOut", (req, res) => {
  if (req.session.user) {
    req.session.destroy((error) => {
      if (error) {
        console.error(error);
      } else {
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
