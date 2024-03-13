const http=require('http');

aws=function(){
    return false;
}
exports.aws=aws;

const express=require('express');
const session=require('express-session');

const db=require('./models/index');
const archiveRouter = require("./routes/archive.routes");
const archiveController=require("./controller/archive.controller");

const fs=require('fs');
const path=require('path');
const bodyParser = require('body-parser');

var AWS = require('aws-sdk');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(session({
    secret:"rubis"
}));

db.db.sequelize
.authenticate()
.then(()=>{
    console.log("Authenticated");
    db.db.sequelize.sync();
})

app.use("/", archiveRouter);

http.createServer(app).listen(8081,function(req,res){
    console.log("Server started on port 8081")
});

//+S3 connector

