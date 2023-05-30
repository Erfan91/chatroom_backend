const UserModel = require('../models/UserModel');

module.exports.userPost = (req,res,next)=>{
    const body = req.body
    UserModel.findOne({username: body.username})
    .exec()
    .then(result=>{
       
        if(result){
            // exits true = front account creetion denied cause user name exists
            console.log(result, "username exists")
            res.json({exists: true})
            return
        }
        if(!result){
            UserModel.findOne({email: body.email})
            .exec()
            .then(response=>{
                console.log(response)
                if(response){
                    //  exists false = front account creation denied cause email exits. the true and false are used to inform front that creation is impossible.
                    res.json({exists: false})
                    console.log(response, "email exists");
                }
                if(!response){
                    UserModel.create(body)
                    .then(result=>{
                        console.log(result, "account created")
                        res.json(result)
                    })
                }
            })
        }
    })
}

module.exports.userLogin = (req,res,next)=>{
    const body = req.body
    UserModel.findOne({email: body.email})
    .exec()
    .then(result=>{
        if(result){
        //    res.json({email: true})
           UserModel.findOne({username: body.username})
           .exec()
           .then(response=>{
            console.log(Boolean(response), "BOOLean response")
            response ? res.json({exists: true}): res.json({exists: false})
            
           })
        }
        if(!result){
            res.status(400).json({email:false})
        }
        
    })
}

module.exports.userGet = (req,res,next)=>{
    UserModel.find()
    .exec()
    .then(result=>{
        console.log(result)
        res.json(result)
    })
}

module.exports.userUpdate = (req,res,next)=>{
    const body = req.body
    UserModel.updateOne({name: "erfan"}, {name: body.name})
    .then(result=>{
        cconsole.log(result)
        res.json({message: "updated successfuly"})
    })
}

module.exports.userDelete = (req,res,next)=>{
    const body = req.body
    UserModel.deleteOne({name:body.name})
    .then(result=>{
        console.log(result)
        res.json({message: "user deleted successfuly"})
    })
}