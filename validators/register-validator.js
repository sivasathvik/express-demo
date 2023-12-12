module.exports= function(username,password){
    //console.log('Inside register service');
    if(password=="" || password==null || password==undefined) {
        return false;
    } else if (password.length < 5){
        return false;
    } else{
        return true;
    }
   // console.log('Regestration ends');

}