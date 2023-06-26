const router = require('express').Router()
const UserMsgController = require("../controllers/UserMessage.controller");

router.put("/",UserMsgController.userMsg);

module.exports = router