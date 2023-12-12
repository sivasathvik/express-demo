const valid=require('../validators/register-validator')

module.exports= function(username,password){
    console.log('Inside register service');
    if(valid(username,password)){
        //Insert user pass to DB
        return "Registration sucessful";

    } else{
        return "Input data is not valid";
    }
    
   // console.log('Regestration ends');

}