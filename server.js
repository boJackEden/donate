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
  remaining: 668,
  amountContributed: 0,
  target: 668,
  daysLeft: 3,
  contributors: 0
};

function adjustRemaining (req, res, next) {
  var newAmount = parseFloat(req.body.amountContributed);
  project.remaining = project.remaining - newAmount;
  project.amountContributed = project.amountContributed + newAmount;
  project.contributors = project.contributors + 1;
  next();
}

function sendBackAmounts (req, res, next) {
  res.send(project);
  res.end();
}

function init (req, res) {
  res.send(project);
  res.end();
}

function reset (req, res) {
  project.remaining = 668;
  project.amountContributed = 0;
  project.contributors = 0;
  res.send(project);
  res.end();
}
app.put('/contribute', adjustRemaining, sendBackAmounts);
app.get('/reset', reset);
app.get('/init', init);

var port = Number(process.env.PORT || 3000);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
