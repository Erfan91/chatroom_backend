const router = require("express").Router()
const UserController = require('../controllers/User.controller')

router.post("/signup", UserController.userPost)
router.post("/login", UserController.userLogin)
router.post('/upload-image', UserController.imgUpload);
router.get("/", UserController.userGet)
router.get("/:username", UserController.userProfile);
router.get("/msg/:id", UserController.userGetMsg);
router.put("/", UserController.userUpdate)
router.put("/about", UserController.userAbout);
router.put('/user_image', UserController.userImage);
router.delete("/", UserController.userDelete)

module.exports = router