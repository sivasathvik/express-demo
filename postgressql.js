//import { Sequelize } from "sequelize";
const { Sequelize } = require("sequelize");



export const connection=async()=>{
    const sequelize = new Sequelize('sql', 'postgres', '#Sathvik21', {
        host: 'localhost',
        dialect: 'postgres'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};