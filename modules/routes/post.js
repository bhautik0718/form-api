'use strict';

let express = require("express"),
helpers = require("../helpers/uploadfile"),
    router = express.Router(),
    controller = require("../controllers/post");
// const upload = require("../middleware/file")
router.get("/get", controller.getAllPost);
router.get("/get_post/:post_id", controller.getPost);
router.post("/add" ,helpers.upload.any(),controller.addPost);
router.post("/update/:post_id" ,helpers.upload.any(),  controller.updatePost);
router.delete("/delete/:post_id",  controller.deletePost);


module.exports = router;