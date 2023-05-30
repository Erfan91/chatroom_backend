const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String, 
    username: String, 
    image: String,
    about: String
},
{
    timestamps: true
})

const UserModel = new mongoose.model("User", UserSchema);
module.exports = UserModel