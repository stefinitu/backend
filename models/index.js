const {Sequelize} = require('sequelize');

 const db= {};
 console.log("Here in index, connecting to the db");

// db.sequelize = new Sequelize("postgres://username:pass@url:5432/postgres",{
// logging:false,
// maxConcurrentQueries:700,
// dialect:"postgres",
// protocol:"postgres",
// dialectOptions:{
//     ssl:{
//         rejectUnauthorized:false
//     },
//     connectTimeout:1000
// }
//  });


 db.sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/postgres",{
  });
 db.Models=require("./model")(db.sequelize, Sequelize);
 module.exports={db};