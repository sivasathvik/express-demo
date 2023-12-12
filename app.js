const express= require('express');
const bodyParser=require("body-parser");
var cors=require('cors');
const register=require('./services/register')
const app=express();
const port=3001;

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



app.get('/trainings',(req,res) => {
    res.send('Training on nodejs');
});

app.get('/register',(req,res) => {
    res.send('calling 3001');
});


app.post('/register',cors(corsOptions), (req,res) => {
    console.log("Registration starts");
    console.log(req.body);
    const result=register(req.body.user,req.body.pass);
    return res.json({result:result});
});

app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});
