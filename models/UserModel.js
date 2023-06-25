const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String, 
    username: String, 
    image: String,
    about: String,
    usersMsg: [{
        type: mongoose.Types.ObjectId,
        ref: "UserMessage",
    }]
    
},
{
    timestamps: true
})

const UserModel = new mongoose.model("User", UserSchema);
module.exports = UserModel