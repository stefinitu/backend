const express=require("express");
const archiveController = require("./../controller/archive.controller");
const router=express.Router();

router.get("/",archiveController.findAll);
router.post("/",archiveController.create);
router.get("/create",archiveController.createOne);

module.exports=router;