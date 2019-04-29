const express    = require('express');
const router     = express.Router();
const User = require('../models/User');


const bcrypt     = require('bcryptjs');
const passport = require('passport');
const validator = require("email-validator");
const passwordValidator = require('password-validator');

router.post('/signup', (req, res, next) =>{

        const schema = new passwordValidator();
         // Add properties to it
        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(30)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
        .has().not().spaces()                           // Should not have spaces

    const username = req.body.username;
    const password = req.body.password;


    // becomes annoying while testing, make sure you put it on after
    // if(password.length < 8){
    //     res.status(400).json({ message: 'Please make your password at least 6 characters long for security purposes.' });
    //     return;
    // }


    User.findOne({ username }, (err, foundUser) =>{

        if(err){
            console.log('at the beginning')
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
            console.log('Username taken')
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }

        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const aNewUser = new User({
            username:username,
            password: hashPass
        });

     if (!validator.validate(username)){
        res.status(403).json({message: 'Enter a valid email'});
    } else if(!schema.validate(password)){
        res.status(403).json({message:"Password needs: Uppercase, Lowercases, digits, minimum 8 letters"})
    } else {
        aNewUser.save(err =>{
                if (err) {
                    console.log('couldnt save');
                    res.status(400).json({ message: 'Saving user to database went wrong.' });
                    return;
                }
                req.login(aNewUser, (err) => {
    
                    console.log('tryna login')
    
                    if (err) {
                        console.log('couldnt login')
                        res.status(500).json({ message: 'Login after signup went bad.' });
                        return;
                    }
    
                    res.json(aNewUser);
                });
            });
    }
    });
});



router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.json({ message: 'Something went wrong authenticating user' });
            return;
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            console.log('------------ failure', failureDetails);
            res.json({message:"Incorrect found"});
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.json(theUser);
        });
    })(req, res, next);
});




router.post('/logout', (req, res, next) =>{
    req.logout();
    res.json({ message: 'Log out success!'});
})


router.get('/loggedin', (req, res, next) =>{
    console.log('in logged in', req.body, req.params)
        console.log(req.user)

    if (req.isAuthenticated()) {
        res.json(req.user)
    }
})

// delete account option below

// router.post('/users/delete/:id', (req, res, next) =>{
//     User.findByIdAndRemove(req.params.id)
//     .then((deletedRestaurant)=>{
//         if (deletedRestaurant === null){
//             res.json({ message: 'Sorry this restaurant could not be found'})
//             return;
//         }
//         res.json([
//             { message: 'User removed!'},
//             deletedRestaurant
//         ])
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// })

module.exports = router;
