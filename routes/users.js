const User = require('../models/user');
const passport = require('passport');
var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  console.log("here", req.body);
  User.register(new User({username: req.body.email, email: req.body.email, password: req.body.password}),
  req.body.password, (err, user) => {
      if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
      } else {
        res.json({success: true, status: 'Registration Successful!'});
          // if (req.body.firstname) {
          //     user.firstname = req.body.firstname;
          // }
          // if (req.body.lastname) {
          //     user.lastname = req.body.lastname;
          // }
          // user.save(err => {
          //     if (err) {
          //         res.statusCode = 500;
          //         res.setHeader('Content-Type', 'application/json');
          //         res.json({err: err});
          //         return;
          //     }
          //     passport.authenticate('local')(req, res, () => {
          //         res.statusCode = 200;
          //         res.setHeader('Content-Type', 'application/json');
          //         res.json({success: true, status: 'Registration Successful!'});
          //     });
          //});
      }
  });
});
router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
