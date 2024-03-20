const dbContext=require("../models");
const fromServer = require("./../server");
const multer=require('multer')
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

    console.log(req.body.reduxData)

    var AWS=require("aws-sdk");
    //UPLOADING FILE TO AWS S3
    AWS.config.update({region: 'ap-northeast-2'});
    s3 = new AWS.S3({apiVersion:"latest", accessKeyId:process.env.AWS_ACC_KEY, accessSecretKey:process.env.AWS_SECRET_KEY});


//UPLOAD

let genId = '';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
let counter = 0;
while (counter < 20) {
  genId += characters.charAt(Math.floor(Math.random() * charactersLength));
  counter += 1;
}

 var file = "test"+genId+".txt";

 const uploadFile=(file,bucketName) => {
    const fileContent = req.body.reduxData;
    const params = {
        Bucket: bucketName,
        Key: file,
        Body: fileContent,
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

 uploadFile("test"+genId+".txt",'ruverse')

 ////VIDEO

//  let storage = multer.diskStorage({
//     destination:(req, file, cb) =>{
//         cb(null, path.resolve('./uploads'))
//     }
//     // filename:(req,file,cb)=>{
//     //     cb(null, "test"+genId+".mp4")
//     // },
//     // fileFilter:(req,file,cb) =>{
//     //     const ext =path.extname("test"+genId+".mp4");
//     //     if(ext!==".mp4"){
//     //         return cb(res.status(400).end("only mp4!"), false)
//     //     }
//     //     cb(null,true)
//     // }
//  })

//  const uploadV=multer({storage:storage, limits:{fieldSize:25*1024*1024}}).single("file");
//  uploadV(req,res,(err)=>{
//     if(err){
//         return res.json({success:false, err});
//     }
//     return res.json({
//         success:true
//     })
//  })

 const uploadFile2=(file,bucketName) => {
    console.log(req.files)
    const fileContent = fs.createReadStream(JSON.stringify(req.files[0].path).replace('"','').replace('"',''),'utf8');
    const params = {
        Bucket: bucketName,
        Key: file,
        Body: fileContent,
    }

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

 uploadFile2("test"+genId+".mp4",'ruverse')


//     //////////////////////////////////////////////////////////////////////////

    constDataJSON = JSON.parse(req.body.reduxData)
    Archive.create({id:genId, room_no:constDataJSON.channelName, name:constDataJSON.uid, domain:"video", object_id:"file"+genId+".txt"})
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

       exports.uploadFile=(req,res) => {
        // dbContext.db.sequelize
        // .authenticate()
        // .then(()=>{
        //     console.log("Authenticated");
        //     dbContext.db.sequelize.sync();
        // })
        // .catch((err)=>{
        //     fromServer.aws=function(){
        //         return true
        //     }
        // })
        // Archive=dbContext.db.Models[0];

        console.log(req.body.reduxData)
        res.status(200).send({
            message:"Checked the request"
        })
       }