const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose"); 
const bcrypt = require('bcryptjs');

const userSchema = new Schema( {
    username: String,
    password: String,
    role: {
        type: String,
        enum:["User","Admin"],
        default: "User",
    }
})

//New try
// userSchema.pre('save', async function (next) {

//   let user = this
//   const password = user.password;

//   const hashedPassword = await hashPassword(user);
//   user.password = hashedPassword

//   next()

// })

// async function hashPassword (user) {

//   const password = user.password
//   const saltRounds = 10;

//   const hashedPassword = await new Promise((resolve, reject) => {
//     bcrypt.hash(password, saltRounds, function(err, hash) {
//       if (err) reject(err)
//       resolve(hash)
//     });
//   })

//   return hashedPassword
// };
//ends here

userSchema.methods = {
    checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
    hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
    }
  }
  
userSchema.pre('save', function (next) {
    if (!this.password) {
      console.log('models/user.js =======NO PASSWORD PROVIDED=======')
      next()
    } else {
      console.log('models/user.js hashPassword in pre save');
      this.password = this.hashPassword(this.password)
      next()
    }
})

userSchema.plugin(passportLocalMongoose); 
const User = mongoose.model('User', userSchema)

module.exports = User;
