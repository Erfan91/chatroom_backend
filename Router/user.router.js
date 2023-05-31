const router = require("express").Router()
const UserController = require('../controllers/User.controller')

router.post("/signup", UserController.userPost)
router.post("/login", UserController.userLogin)
router.get("/", UserController.userGet)
router.get("/:username", UserController.userProfile);
router.put("/", UserController.userUpdate)
router.put("/about", UserController.userAbout);
router.delete("/", UserController.userDelete)

module.exports = router