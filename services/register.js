const valid=require('../validators/register-validator')
const db=require("../models");
var createError = require('http-errors')

module.exports= async function(name,email,password){
    console.log('Inside register service');
    if(valid(name,email,password)){
        //Insert user pass to DB
        const user={name:name,email:email,password:password}
        await db.users.create(user);
        return "Registration sucessful";

    } else{
        //return "Input data is not valid";
        throw createError(400,'Invalid input provided');

    }
    
   // console.log('Regestration ends');

}