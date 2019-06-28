const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const port = 8484;
const app = express();

app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var mockdata = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

const newitem = {
    todoItemId: 3,
    name: 'a new item',
    priority: 3,
    completed: true
}


// add your code here
app.get('/', function(req,res){
    res.send({status: 'ok'}).status(200);
})

app.get('/api/TodoItems', function(req,res){
    res.send(mockdata).status(200);
})

app.get('/api/TodoItems/:number', function(req,res){
    var number = req.params.number;
    var newObj = mockdata.filter(get => get.todoItemId == number)
    var item = newObj[0];
    res.send(item).status(200);
})

app.post('/api/TodoItems', function(req,res){
    var request = req.body; //assigns the body of the request to a var named request
    var num = request.todoItemId; //identifies the todoItemId number and assigns it to 'num'
    console.log(request);
    for(var i=0; i<mockdata.length; i++){
        if(mockdata[i].todoItemId == num){
        mockdata[i] = request;  
        } else {
            mockdata.push(request);
        }} 
        res.status(201).send(request);
        });   //returns posted item as a json object with 201 status code

app.delete('/api/TodoItems/:number', function(req,res){
    var deleteme = req.params.number; //identifies what needs to be deleted
    for(var i=0; i<mockdata.length; i++){ //for loop to iterate through the array mockdata
        if(mockdata[i].todoItemId == deleteme) //if the proerty todoItemId is the same as the number in the Delete request
          var removed = mockdata.splice(i, 1); //removes the appropriate array item
          console.log(removed);
          var new1 = removed[0]; //attempts to change array item to an object
          console.log(new1); //troubleshooting console log
           //responds with what item was removed from the array and a 200 status code

    } 
    res.send(new1).status(200);
});

module.exports = app;
