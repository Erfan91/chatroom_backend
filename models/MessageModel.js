const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    content: String,
    
},
{
    timestamps: true
})

const MessageModel = ('Message', MessageSchema);
module.exports = MessageModel;