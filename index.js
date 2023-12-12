const Joi=require('joi');
const express=require('express');
const app=express();

app.use(express.json()); //peice of middleware for json parser

const courses=[
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
];

app.get('/',(req,res) => {
    res.send('Hello World');

});

app.get('/api/courses',(req,res) =>{
    res.send(courses);

});

// /api/courses/id of the course
//params returns json object
//params.id or any argument returns it ; now query if we write with question mark use req.query

app.get('/api/courses/:id', (req,res) => {
    //res.send(req.params.id);
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return  res.status(404).send('The course was not found');
    res.send(course); //returning 404 not found here

});

app.post('/api/courses',(req,res) => {
    //All this manual check of validation is done in validation function down so no need of all these now
    //const schema={
      //  name:Joi.string().min(3).required()

    //};

   // const result = Joi.validate(req.body,schema);
    //console.log(result);

    //if(!req.body.name || req.body.name.length<3){
        //400 bad request
       // res.status(400).send('Name is required and should be minimum of 3 chars');
        //return;

   // }

  // if(result.error){
    //400 bad request
   // res.status(400).send(result.error.details[0].message);
   // return;
  // }
  const { error }=validateCourse(req.body); //equal to result.error obj destructuring so can call error instead of result.error
    if(error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const course={
        id: courses.length+1,
        name:req.body.name

    };
    courses.push(course);
    res.send(course);


});

app.put('/api/courses/:id',(req,res) => {
    //Look up the course if not existing return 404
    //Otherwise validate if invalid 404
    //Then update Return the updated course
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('The course was not found');

   // const schema={
       // name:Joi.string().min(3).required()

   // };

    //const result = Joi.validate(req.body,schema); result.error now is changed to error because we are doing all the validation in a function now
    //const result=validateCourse(req.body);
    const { error }=validateCourse(req.body); //equal to result.error obj destructuring so can call error instead of result.error
    if(error){
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    //Update course
    course.name=req.body.name;
    res.send(course);





});


app.delete('/api/courses/:id',(req,res) => {
    //look up the course if doesnt exist 404 otherwise delete and return the course
    const course = courses.find(c => c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('The course was not found');
    const index=courses.indexOf(course); //DELETE
    courses.splice(index,1); //go to the index and delete 1 object

    res.send(course);

});


function validateCourse(course){
    const schema={
        name:Joi.string().min(3).required()

    };

    return Joi.validate(course,schema);

}



//PORT
const port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));
console.log(process.env.PORT);
