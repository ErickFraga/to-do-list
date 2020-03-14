var express = require('express');
var router = express.Router();
var model = require('./../model/tasks')();


/* GET home page. */
router.get('/', function(req, res, next) {
  model.find(null, function(err, tasks){
    if (err) {
      throw err;
    }
    res.render('index', {title: 'To Do List', tasks: tasks});
  });
});

router.post('/add', (req, res, next) => {
  var body = req.body;
  body.status = false;
  model.create(body, (err, tasks) => {
    if(err) {
      throw err; 
    } 
     res.redirect('/');
  });
});

router.get('/turn/:id', (req, res, next) => {
  var id = req.params.id;

  model.findById(id, (err, task) => {
    if (err) {
      throw err;
    }
    task.status = !task.status;
    task.save(() => {
     
      res.redirect('back');

    })
  })
});

router.get('/remove/:id', (req, res, next) => {
  var id = req.params.id;

  model.deleteOne({"_id" : id}, (err, task) =>{
    if (err){
      throw err;
    }
     res.redirect('/');
  })
});

router.get('/task/:id', (req, res, next) => {
  var id = req.params.id;
  
  model.find({"_id" : id}, (err, task) => {
    if (err) {
      throw err;
    }
    var a = new Object();

    res.render('task', {task:task[0], titulo: a});
  });
  
});

module.exports = router;
