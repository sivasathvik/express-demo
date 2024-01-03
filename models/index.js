const { Sequelize, DataTypes} = require('sequelize');
//const sequelize = new Sequelize(`postgres://postgres:#Sathvik21@localhost:5432/sql`,{ dialect: "postgres" }); // Example for postgres database connection
const sequelize=new Sequelize('sql','postgres','#Sathvik21', {
    host: 'localhost',
    dialect:'postgres'
});


sequelize.authenticate().then(() => {
    console.log(`Database connected!!!`);
  }).catch((error) => {
    console.log(`Error connecting to Db`);
    console.log(`Error is ${error}`);
  })

  const db = {}
   db.Sequelize = Sequelize;
   db.sequelize = sequelize;

   db.users=require('./userModel') (sequelize, DataTypes);
   db.users.sync({ alter:true});

module.exports = db;
 
 
 