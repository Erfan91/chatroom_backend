require("dotenv").config({path:"./config/.env"});
require("./config/db.config");
const express = require("express");
const app = express()
const port = 3001 || process.env.PORT;
const cors = require('cors');

const userRouter = require('./Router/user.router');
const session = require('express-session');
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/user", userRouter);
app.use("/images", express.static("images"))

app.listen(port, ()=>{
    console.log("server started at ",port)
})