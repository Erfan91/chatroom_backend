const mongoose = require('mongoose');

const UserMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    seen: Boolean
},
{
    timestamps: true
})

const UserMessageModel = new mongoose.model('UserMessage', UserMessageSchema);
module.exports = UserMessageModel;