const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const connection = require('../config/database.config');

const router = Router();

// Register
router.post('/register', [
  body('first_name').exists(),
  body('last_name').exists(),
  body('email').exists().isEmail(),
  body('password').exists()
], async (req, res) => {
  const errors = validationResult(req);

  const { first_name, last_name, email, password } = req.body;

  const data = {
    first_name,
    last_name,
    email,
    password
  }

  if (!errors.isEmpty()) {
    res.redirect('/register');
  } else {
    await connection.query('INSERT INTO users SET ?', data, (err, result) => {
      if (err) {
        res.json({ err });
      } else {
        console.log(result);
        res.redirect('/dashboard');
      };
    });
  };
});

// Login
router.post('/login', [
  body('email').exists().isEmail(),
  body('password').exists().isLength({ min: 10 })
], async (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    res.redirect('/login');
  } else {
    await connection.query('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (err, result) => {
      if (err) {
        res.json({ err });
        return;
      } else {
        if (result.length === 0) {
          res.redirect('/login');
        } else {
          const user = result[0];

          if (user.email === email && user.password === password) {
            req.session.user = {
              name: user.full_name,
              email: user.email,
              password: user.password
            };
          } else {
            res.redirect('/login');
          };
        };
      };
    });
  };
});

module.exports = router;