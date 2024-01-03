module.exports= function(name,email,password){
    //console.log('Inside register service');
    if(password=="" || password==null || password==undefined || name==="" || name===null || name===undefined || email==="" || email===null || email===undefined) {
        return false;
    } else if (password.length < 5){
        return false;
    } else{
        return true;
    }
   // console.log('Regestration ends');

}