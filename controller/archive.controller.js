const dbContext=require("../models");
const fromServer = require("./../server");
var fs = require("fs");

var Archive=dbContext.db.Models[0];
//  exports.connect= (req,res) => 
//  {
//     dbContext.db.sequelize
//     .authenticate()
//     .then(()=>{
//         console.log("Authenticated");
//         dbContext.db.sequelize.sync();
//     })
//     .catch((err)=> {
//         fromServer.aws=function(){
//             return true;
//         }
//     })

//     Archive=dbContext.db.Models[0]; 

//  }

 exports.create= (req,res) => 
 {
    dbContext.db.sequelize
    .authenticate()
    .then(()=>{
        console.log("Authenticated");
        dbContext.db.sequelize.sync();
    })
    .catch((err)=> {
        fromServer.aws=function(){
            return true;
        }
    })

    Archive=dbContext.db.Models[0]; 
    var AWS=require("aws-sdk");
    //UPLOADING FILE TO AWS S3
    // AWS.config.update({region: 'ap-northeast-2', apiVersion:"latest", accessKeyId:"*", accessSecretKey:"*"});
    // s3 = new AWS.S3();

    // s3.listObjects({Bucket:"ruverse"}, function (err, data) {
    //     if (err) {
    //       console.log("Error", err);
    //     } else {
    //       console.log("Success", data.Buckets);
    //     }
    //   });

//UPLOAD

// // call S3 to retrieve upload file to specified bucket
// var uploadParams = { Bucket: "NAME_OF_BUCKET", Key: "", Body: "" };
// var file = process.argv[3];

// // Configure the file stream and obtain the upload parameters
// var fileStream = fs.createReadStream(file);
// fileStream.on("error", function (err) {
//   console.log("File Error", err);
// });
// uploadParams.Body = fileStream;
// var path = require("path");
// uploadParams.Key = path.basename(file);

// // call S3 to retrieve upload file to specified bucket
// s3.upload(uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   }
//   if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });

//     //////////////////////////////////////////////////////////////////////////


    Archive.create({id:req.body.id, room_no:req.body.room_no, name:req.body.name, domain:req.body.domain, object_id:req.body.object_id})
    .then((data) =>{
        res.status(200).send(data)})
        .catch((err)=>res.status(400).send(err));
    }

    exports.createOne= (req,res) => 
    {
       dbContext.db.sequelize
       .authenticate()
       .then(()=>{
           console.log("Authenticated");
           dbContext.db.sequelize.sync();
       })
       .catch((err)=> {
           fromServer.aws=function(){
               return true;
           }
       })
   
       Archive=dbContext.db.Models[0]; 
       Archive.create({id:"123", room_no:123, name:"room name", domain:"keyboard", object_id:"234file"})
       .then((data) =>{
        console.log(data)
           res.status(200).send(data)})
           .catch((err)=>res.status(400).send(err));
       }
    
    exports.findAll= (req,res) => 
    {
       dbContext.db.sequelize
       .authenticate()
       .then(()=>{
           console.log("Authenticated");
           dbContext.db.sequelize.sync();
       })
       .catch((err)=> {
           fromServer.aws=function(){
               return true;
           }
       })
   
       Archive=dbContext.db.Models[0]; 
       Archive.findAll().then((data)=>{
        res.send(data);
       }).catch((err)=>{
        res.status(500).send(err)
       })
       }


       exports.delete=(req,res) =>{
        dbContext.db.sequelize
        .authenticate()
        .then(()=>{
            console.log("Authenticated");
            dbContext.db.sequelize.sync();
        })
        .catch((err)=>{
            fromServer.aws=function(){
                return true
            }
        })
       }