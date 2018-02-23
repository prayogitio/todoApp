var mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://test:test@ds247078.mlab.com:47078/todos');
//create a schema (blue print of the object)
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var bodyParser = require('body-parser');

//var myObj = [{item: 'mongodb'}, {item: 'react js'}, {item: 'mocha'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    Todo.find({}, function(err, myObj) {
      if (err) throw err;
      res.render('todo', { todos: myObj });
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    var newTodo = Todo(req.body).save(function(err, myObj) {
      if (err) throw err;
      res.json(myObj);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    Todo.find({item: req.params.item.replace(/\-/,' ')}).remove(function(err, myObj) {
      if (err) throw err;
      res.json(myObj);
    });
    /*myObj = myObj.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(myObj);*/
  });
};
