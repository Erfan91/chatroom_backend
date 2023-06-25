const UserModel = require('../models/UserModel')
const MessageModel = require('../models/MessageModel');
const UserMessageModel = require("../models/UserMesssageModel");

module.exports.msgPost = (req, res, next) => {
    const body = req.body
    UserMessageModel.find({
        $and: [
            { $or: [{ sender: body.sender, receiver: body.receiver }, { sender: body.receiver, receiver: body.sender }] }
        ]
    })
     .exec()
     .then(result1 => {
         if(result1.length) {
            UserModel.find({ usersMsg: { $in: result1[0]._id }, _id: body.sender })
                .exec()
                    .then(response => {
                        if (response.length) {
                            console.log("first result",Boolean(response))
                            MessageModel.insertMany({
                                sender: body.sender,
                                receiver: body.receiver,
                                content: body.content
                            }).then(result => {
                                //    console.log(result)
                                res.json(result)
                                
                            })
                        }
                        if(!response.length){
                            console.log("second result",Boolean(response), result1[0]._id)
                            UserModel.updateOne({_id: body.sender}, {$push: {usersMsg: result1[0]._id}})
                            .then(resp=>{
                                MessageModel.insertMany({
                                    sender: body.sender,
                                    receiver: body.receiver,
                                    content: body.content
                                }).then(result => {
                                    //    console.log(result)
                                    res.json(result)
                                    UserModel.find({usersMsg: {$in: result1[0]._id},_id: body.receiver})
                                    .exec()
                                    .then(rslt=>{
                                        if(rslt.length){
                                            console.log("user exists")
                                        }
                                        if(!rslt.length){
                                            UserModel.updateOne({_id: body.receiver},{$push: {usersMsg: result1[0]._id}})
                                            .then(result=>{
                                                console.log("result updated")
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    })
            }
            if(!result1.length){
                UserMessageModel.insertMany({
                    sender: body.sender,
                    receiver: body.receiver
                })
                .then(result2=>{
                    UserModel.updateOne({_id: body.sender},{$push: {usersMsg: result2[0]._id}})
                    .then(result=>{
                        MessageModel.insertMany({
                            sender: body.sender,
                            receiver: body.receiver,
                            content: body.content
                        }).then(result => {
                            //    console.log(result)
                            res.json(result)
                            UserModel.updateOne({_id: body.receiver},{$push: {usersMsg: result2[0]._id}})
                            .then(response=>{
                                console.log("last response")
                            })
                        })
                    })
                })
            }
        })
}

module.exports.msgGet = (req, res, next) => {
    MessageModel.find()
        .exec()
        .then(result => {
            // console.log(result)
            res.json(result)
        })

}

module.exports.getMsg = (req, res, next) => {
    const id = req.params.id
    const ids = req.params.ids
    MessageModel.find({
        $and: [
            { $or: [{ sender: id, receiver: ids }, { sender: ids, receiver: id }] },
        ]
    })
        .sort({ createdAt: -1 })
        .populate('sender')
        .populate('receiver')
        .exec()
        .then(result => {
            // console.log(result, "messages RResult")
            res.json(result)
        })
}



module.exports.msgUpdate = (req, res, next) => {
    const body = req.body
    MessageModel.updateOne({ _id: body.id }, { content: "7898NI00P" })
        .then(result => {
            // console.log(result)
            res.json(result)
        })
}

module.exports.msgSeenUpdate = (req, res, next) => {
    const body = req.body;
    const userId = body.id;
    const ids = body.ids;
    MessageModel.updateMany({ sender: userId, receiver: ids }, { seen: true })
        .then(result => {
            console.log(result);
        })
}

module.exports.msgDelete = (req, res, next) => {
    const body = req.body
    MessageModel.deleteOne({ _id: body.id })
        .then(result => {
            // console.log(result)
            res.json({ message: "user deleted !" })
        })
}