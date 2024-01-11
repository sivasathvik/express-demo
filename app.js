const express= require('express');
const bodyParser=require("body-parser");
const sequelize = require("sequelize");
var cors=require('cors');
const register=require('./services/register')
const login=require('./services/login')
const db = require("./models");
const app=express();
const port=3001;
app.use(express.json());

app.use(cors())
var corsOptions={
    origin:'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    } )

);
app.use(express.urlencoded({ extended: true }));



app.get('/trainings',(req,res) => {
    res.send('Training on nodejs');
});

app.get('/register',(req,res) => {
    res.send('calling 3001');
});


app.post('/register',cors(corsOptions), async (req,res) => {
    console.log("Registration starts");
    console.log(req.body);
    try{
        const result=await register(req.body.name,req.body.email,req.body.password);
        return res.json({result:result});

    } catch(error) {
        console.log(`error is  ${JSON.stringify(error)}`);
       return res.status(error.status).send(error.message);

    }
});

app.post("/login", cors(corsOptions), async(req,res) => {
    console.log("Inside login");
    try{
       const result= await login(req.body.email,req.body.password);
       return res.json(result);
    } catch(error) {
        console.error(`error is ${JSON.stringify(error)}`);
        return res.status(error.status).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});
