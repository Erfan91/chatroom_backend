const UserModel = require('../models/UserModel')
const MessageModel = require('../models/MessageModel');

module.exports.msgPost = (req,res,next)=>{
    const body =req.body
   MessageModel.create(body)
   .then(result=>{
    console.log(result)
    res.json(result)
   })
}

module.exports.msgGet = (req,res,next)=>{
    MessageModel.find()
    .exec()
    .then(result=>{
        console.log(result)
        res.json(result)
    })

}

module.exports.msgUpdate = (req,res,next) =>{
    const body = req.body
    MessageModel.updateOne({_id: body.id}, {content:"7898NI00P"})
    .then(result=>{
        console.log(result)
        res.json(result)
    })
}

module.exports.msgDelete = (req,res,next)=>{
    const body = req.body
    MessageModel.deleteOne({_id:body.id})
    .then(result=>{
        console.log(result)
        res.json({message: "user deleted !"})
    })
}