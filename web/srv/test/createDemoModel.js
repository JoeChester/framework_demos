let schema = require('../models');
let Todo = schema.models.Todo;

let todo = {title:"test1", done: false};

Todo.create(todo, (err, todo) =>{
    if(err){
        console.error(err);
    }
    console.log(todo)
})