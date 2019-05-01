const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../config/passport')

router.post('/', (req, res) => {
    console.log('user signup');
    req.session.username = req.body.username;
    console.log('req.session', req.session);
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
            })
        }
    })
})

router.post(
  '/login',
  function (req, res, next) {
      console.log('logging in');
      next()
  },
  passport.authenticate('local'),
  (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
          id: req.user._id,
          username: req.user.username
      };
      res.send(userInfo);
  }
)

router.get('/', (req, res, next) => {
//   console.log('===== user!!======')
  
  if (req.user) {
      res.json({ user: req.user })
      console.log(user)
  } else {
      res.json({ user: null })
      console.log("No user")
  }
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
