const UserModel = require('../models/UserModel');
const multer = require('multer');
const path = require('path');
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
           UserModel.findOne({username: body.username})
           .exec()
           .then(response=>{
            console.log(Boolean(response), "BOOLean response")
            response ? res.json({exists: true, _id: response._id}): res.json({exists: false})
            
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

module.exports.userGetMsg = (req,res,next)=>{
    const id = req.params.id
    UserModel.findById(id)
    .populate("usersMsg").sort({createdAt: -1})
    .exec()
    .then(result=>{
        res.json(result)
    })
}

module.exports.userProfile = (req,res,next)=>{
    const username = req.params.username;
    UserModel.findOne({username})
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

module.exports.userAbout = (req,res,next)=>{
    const body = req.body;
    UserModel.updateOne({username: body.username}, {about: body.about})
    .then(result=>{
        console.log(result)
        res.json({message: "userAbout updated successfuly"})
    })
}

module.exports.userImage = (req,res,next)=>{
    const body = req.body
    UserModel.updateOne({username:body.username}, {image: body.url})
    .then(result=>{
        console.log(result)
        res.json({message: "user image registred"})
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

let imageName = "";
const storage = multer.diskStorage({
    destination: path.join("./images"),
    filename:function (req,file,cb){
        imageName = Date.now() + path.extname(file.originalname);
        cb(null,imageName)
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:3000000},
}).single('myImage')

module.exports.imgUpload = (req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log(req.body)
            return res.status(201)
            .json({url:"http://localhost:3001/images/" + imageName})
        }
    })
}