const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000
const db = require('./db/mongodb.js');
const app = express();


// serves static files in public dir
app.use('/', express.static(path.join(__dirname, 'public')));
// need to use this middleware for form data to be available in req.body
app.use(bodyParser.json());


// insert new record
app.post('/api/create', function(req, res) {
  // create a new record from checkout model
  var instance = new db(req.body);
  instance.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send({data: "DB record created"})
    }
  });
})

// insert data to db (put)
app.post('/api/insert', function(req, res) {
  // find record by id and update data

})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});