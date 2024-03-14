const express=require("express");
const archiveController = require("./../controller/archive.controller");
const router=express.Router();

router.get("/",archiveController.findAll);
router.post("/",archiveController.create);
router.get("/create",archiveController.createOne);
router.delete("/:id", archiveController.delete);
router.put("/:obj", archiveController.update)

module.exports=router;