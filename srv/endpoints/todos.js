let express = require('express');
let schema = require('../models');
let router = express.Router({mergeParams: true});

let Todo = schema.models.Todo;

router.get('/', function(req, res){
    let todos = Todo.all((err, todos) =>{
        if(err){
            console.error(err);
        }
        return res.json(todos);
    })
})

router.post('/', function(req, res){
    let todo = new Todo(req.body);
    todo.save((err, todo) => {
        if(err){
            return res.json(err);
        }
        return res.json(todo);
    });
})

router.delete('/:todoId', function(req, res){
    Todo.destroyById(req.params.todoId, (err) =>{
        if(err){
            return res.json(err);
        }
        return res.sendStatus(200);
    })
});

router.put('/todoId', function(req,res){
    Todo.update({ id: req.param.todoId},{ done: req.body.done }, (err, todo) =>{
        if(err){
            return res.json(err);
        }
        return res.json(todo);
    })
})

module.exports = router;