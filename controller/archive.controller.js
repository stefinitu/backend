const dbContext=require("../models");
const fromServer = require("./../server");
const crypto=require("crypto");
var fs = require("fs");

var Archive=dbContext.db.Models[0];

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
    AWS.config.update({region: 'ap-northeast-2'});
    s3 = new AWS.S3({apiVersion:"latest", accessKeyId:"AKIAXQKSTMV4RGXTZ6MM", accessSecretKey:"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"});


//UPLOAD

 var file = "test.txt";

 const uploadFile=(file,bucketName) => {
    const fileContent = fs.readFileSync(file);
    const params = {
        Bucket: bucketName,
        Key: file,
        Body: "test",
    }


// Configure the file stream and obtain the upload parameters LATER
// var fileStream = fs.createReadStream(file);
// fileStream.on("error", function (err) {
//   console.log("File Error", err);
// });
// uploadParams.Body = fileStream;

// var path = require("path");
// uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  }
  if (data) {
    console.log("Upload Success", data.Location);
  }
});
 }

 uploadFile('test.txt','ruverse')


//     //////////////////////////////////////////////////////////////////////////


    Archive.create({id:req.body.id, room_no:req.body.room_no, name:req.body.name, domain:req.body.domain, object_id:req.body.object_id})
    .then((data) =>{
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

       Archive=dbContext.db.Models[0]; 
       var AWS=require("aws-sdk");
//S3
       AWS.config.update({region: 'ap-northeast-2'});
       s3 = new AWS.S3({apiVersion:"latest", accessKeyId:process.env.AWS_ACC_KEY, accessSecretKey:process.env.AWS_SECRET_KEY});
   
       s3.listObjects({Bucket:'ruverse'}, function (err, data) {
           if (err) {
             console.log("Error", err);
           } else {
             console.log("Success", data);
           }
         });
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
        Archive=dbContext.db.Models[0];
        Archive.destroy({
            where: {id:req.params.id}
        })
        res.status(204).json({
            msg:"Archive deleted"
        })
        .catch((err)=>{
            res.status(400).send({
                error:"Error while deleting"
            })
        })
       }

       exports.update=(req,res) =>{
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
        Archive=dbContext.db.Models[0];
        Archive.update(req.body,{
            where:{id:req.body.id}
        })
        .then((num)=>{
            if(num==1){
                res.status(200).send({
                    message:"Updated"
                })
            }
            else{
                res.status(400).send({
                    message:"Cannot update"
                })
            }
        })
       }