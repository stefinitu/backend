const express=require("express");
const multer=require('multer')
const upload=multer({dest:'uploads/', limits:{fieldSize:25*1024*1024}});
const archiveController = require("./../controller/archive.controller");
const router=express.Router();

router.get("/",archiveController.findAll);
router.post("/upload",upload.any(), archiveController.create);
router.delete("/:id", archiveController.delete);
router.put("/:obj", archiveController.update)
//router.post("/upload",upload.any(),archiveController.uploadFile);

module.exports=router;