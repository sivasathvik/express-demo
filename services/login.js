
const { createError } = require("joi/lib/types/lazy");
const db=require("../models");
const { Op } = require("sequelize");
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const encryptPassword= async(password,salt) => {
    var hash = bcrypt.hashSync(password, salt);
    return hash;
    //Putting this hash in db

}

const comparePasswords= async(password,passwordFromDB) => {
    if(password===passwordFromDB){
        return true;
    } else {
        return false;
    }

}
module.exports= async function(email,password){
    console.log('Inside login service');
    console.log(`excecute login for user ${email} and pass ${password} `);
    try{
        let dbUser=await db.users.findAll({
            where : {
                email:{
                    [Op.eq]:email
                }
            }
        });
        dbUser=dbUser[0].dataValues
        console.log(`User from db is ${JSON.stringify(dbUser)}`);
        const passwordFromUI=await encryptPassword(password,dbUser.salt);
        const result=await comparePasswords(passwordFromUI,dbUser.password);
        if(result){
            const token = jwt.sign({ userId: dbUser.email }, 'your-secret-key', {
                expiresIn: '1h',
                });

            //console.log(`generated token ${token}`);
            return {token:token};
        } else{
            console.log('UserId password didnt match');
            return "User id password didnt match"
        }
        //return {'result':'token'};
    } catch(error) {
        console.error(error);
        throw createError(500,'Something went wrong');

    }

}