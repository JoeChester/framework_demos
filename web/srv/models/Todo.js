module.exports = function(schema){
    let Todo = schema.define('Todo', {
        title: {type: schema.String},
        done: {type: schema.Boolean}
    }, {});

    return Todo;
};