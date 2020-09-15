const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// serves up index file in client
app.use(express.static('client'));
app.use(express.urlencoded({
  extended: true
}))

app.post('/upload_json', function (req, res) {
  console.log(req.data);
  console.log(JSON.parse(req.body['json-text']));
  res.status(200).send();
  // process JSON data to csv
  // insert result into response html
  // render new page with form and csv report files
})


// listens on localhost
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

