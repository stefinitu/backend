const express=require("express");
const multer=require('multer')
const upload=multer();
const archiveController = require("./../controller/archive.controller");
const router=express.Router();

router.get("/",archiveController.findAll);
router.post("/upload",upload.any(), archiveController.create);
router.delete("/:id", archiveController.delete);
router.put("/:obj", archiveController.update)
//router.post("/upload",upload.any(),archiveController.uploadFile);

module.exports=router;