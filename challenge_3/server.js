const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000
const Purchase = require('./db/mongodb.js');
const app = express();
const mongoose = require('mongoose');

// setup mongoose connection
mongoose.connect('mongodb://localhost:27017/checkout', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


// serves static files in public dir
app.use('/', express.static(path.join(__dirname, 'public')));
// need to use this middleware for form data to be available in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// insert new record
app.post('/api/create', function(req, res) {
  // create a new record from checkout model
  var instance = new Purchase(req.body);
  instance.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      // send id to update in clientside
      res.status(200).send({message: "Purchase created in DB", id: data._id});
    }
  });
})

// insert data to db (put)
app.post('/api/insert', function(req, res) {
  // get id
  var id = req.body.obj_id;
  // delete from data obj
  delete req.body.obj_id;
  // data to update
  var data = req.body
  // find record by id and update data
  Purchase.findByIdAndUpdate(id, data, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({message: "Updated record"});
    }
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});