const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport');

//Is Athenticated Middleware
function isAuth(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
  
      next();
    } else {
      res.status(401).json({ message: "No te has logueado" });
    }
  }

  
router.post('/', (req, res) => {
    console.log('user signup');
    // console.log('req.session', req.session);
    const { username, password } = req.body
    // ADD VALIDATION
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                })
            }
            else {
                const newUser = new User({
                    username: username,
                    password: password
                })
                newUser.save((err, savedUser) => {
                    if (err) return res.json(err)
                    res.json(savedUser)
                    req.session.username = req.body.username;
                    console.log('req.session', req.session);
                })
            }
        })
})

router.post(
  '/login',
  function (req, res, next) {
    //   console.log('logging in');
      next()
  },
  passport.authenticate('local'),
  (req, res,next) => {
    //   console.log('logged in', req.user);
      var userInfo = {
          id: req.user._id,
          username: req.user.username
      };
      res.send(userInfo)
      res.status(200).json(req.user)
  }
)

router.get('/private', (req, res, next) => {
console.log('===== user!!======')
console.log(req.session.username);
res.send(req.session)
res.status(200).json(req.session)


})

router.post('/logout', (req, res) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})

module.exports = router;
