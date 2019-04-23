const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({

    username: String,
    password: String,
    productsLiked: Array,
    role: {
        type: String,
        enum:["User","Admin"],
        default: "User",
    }
})

const User = mongoose.model('User', userSchema)

module.exports   = User;
