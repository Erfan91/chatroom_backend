const UserMessageModel = require("../models/UserMesssageModel");

module.exports.userMsg = (req,res,next)=>{
    const body = req.body;
    UserMessageModel.updateOne({_id: body.id},{seen: true})
    .then(result=>{
        console.log(result)
        res.json({message: "seen updated"})
    })
}