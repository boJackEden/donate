var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/donate.html'));
});

var project = {
  remaining: 167,
  amountContributed: 501,
  target: 668,
  daysLeft: 3,
  contributors: 42
};

app.put('/project', function(req, res) {

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
