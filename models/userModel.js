//User schema
module.exports=(sequelize,DataTypes) => {
const User=sequelize.define("user", {
    name: {
        type:DataTypes.STRING,
        unique:false,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        isEmail:true,
        allowNull:true
    },
    password: {
        type:DataTypes.STRING,
        allowNull: true
    },
}, {timestamps: true}, );
return User;
};
