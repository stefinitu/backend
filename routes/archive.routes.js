const express=require("express");
const archiveController = require("./../controller/archive.controller");
const router=express.Router();

router.get("/",archiveController.findAll);
router.post("/",archiveController.create);
router.delete("/:id", archiveController.delete);
router.put("/:obj", archiveController.update)
router.post("/upload",archiveController.uploadFile);

module.exports=router;