const valid=require('../validators/register-validator')
const db=require("../models");
var createError = require('http-errors')
var bcrypt = require('bcryptjs');


const encryptPassword= async(password,salt) => {
    var hash = bcrypt.hashSync(password, salt);
    return hash;
    //Putting this hash in db

}
const comparePassword= async(password,salt,hashFromDB) => {
    //this is when user login second time with the credentials we are comparing hash from db with entred paswword (hash)
    var hash=bcrypt.hashSync(password,salt);
    if (hash===hashFromDB){
        console.log('Passwors match');
    }

}

module.exports= async function(name,email,password){
    console.log('Inside register service');
    if(valid(name,email,password)){
        var plainPassword=password;//assume it is coming during login unencrypted
        var salt = bcrypt.genSaltSync(10);
        password=await encryptPassword(password,salt)
        //Insert user pass to DB
        const user={name:name,email:email,password:password,salt:salt} //columns in db with object refrences passed
        comparePassword(plainPassword,salt,password);//Assume the password passed here as 3rd argument is taken from db but actually it is the same password and it will return true anyway this is for an example
        await db.users.create(user);
        return "Registration sucessful";

    } else{
        //return "Input data is not valid";
        throw createError(400,'Invalid input provided');

    }
    
   // console.log('Regestration ends');

}