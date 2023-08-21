const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('register');
  };
});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  };
});

router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard');
  } else {
    res.redirect('/login');
  };
});

module.exports = router;