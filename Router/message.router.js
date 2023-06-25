const router = require("express").Router();
const MessageController = require('../controllers/Message.controller');
router.post('/', MessageController.msgPost);
router.get("/", MessageController.msgGet);
// router.get("/:id", MessageController.msgGetById);
router.get("/:id/:ids", MessageController.getMsg);
router.put("/", MessageController.msgUpdate);
router.put("/seen", MessageController.msgSeenUpdate);
router.delete("/", MessageController.msgDelete);

module.exports = router
