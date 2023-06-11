const UserModel = require('../models/UserModel')
const MessageModel = require('../models/MessageModel');

module.exports.msgPost = (req,res,next)=>{
    const body = req.body
    UserModel.find({usersMsg: { $in: body.receiver}, _id: body.sender})
    .exec()
    .then(result=>{
        console.log(Boolean(result), "if true")
        if(result.length){
            MessageModel.insertMany({
             sender: body.sender,
             receiver: body.receiver,
             content: body.content 
            }).then(result=>{
             console.log(result)
             res.json(result)
            })
        }
        if(!result.length){
            UserModel.updateOne({_id: body.sender},{ $push: {usersMsg:body.receiver}})
            .then(result=>{
                console.log(result, "Message Result")
                MessageModel.insertMany({
                    sender: body.sender,
                    receiver: body.receiver,
                    content: body.content 
                   }).then(result=>{
                    console.log(result)
                    res.json(result)
                    UserModel.find({usersMsg:{$in: body.sender}, _id: body.receiver})
                    .exec()
                    .then(result=>{
                        if(result.length){
                            console.log(result,'user exits')
                        }
                        if(!result.length){
                            UserModel.updateOne({_id: body.receiver}, {$push: {usersMsg: body.sender}})
                            .then(result=>{
                                console.log(result, "user updated")
                            })
                        }
                    })
                   })
            })

        }
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

module.exports.getMsg = (req,res,next)=>{
    const id = req.params.id
    const ids = req.params.ids
    MessageModel.find({sender: id, receiver: ids}&&{receiver: id, sender:ids})
    .exec()
    .then(result=>{
        console.log(result, "messages RResult")
        res.json(result)
    })
}

// module.exports.msgGetById = (req,res,next)=>{
//     const id = req.params.id
//     MessageModel.find({sender: id}||{receiver: id})
//     .exec()
//     .populate("sender")
//     .populate("receiver")
//     .then(result=>{
//         console.log(result)
//         res.json(result)
//     })
// }

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