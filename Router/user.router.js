const router = require("express").Router()
const UserController = require('../controllers/User.controller')

router.post("/signup", UserController.userPost)
router.post("/login", UserController.userLogin)
router.get("/", UserController.userGet)
router.put("/", UserController.userUpdate)
router.delete("/", UserController.userDelete)

module.exports = router