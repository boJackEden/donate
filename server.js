var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var smtpConfig = {
    service: 'Gmail',
    auth: {
      user: 'bojackeden@gmail.com',
      pass: 'secret'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/donate.html'));
});

var project = {
  amountContributed: 200,
  target: 668,
  remaining: 468,
  daysLeft: 3,
  contributors: 42
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
  project.remaining = 468;
  project.amountContributed = 200;
  project.contributors = 42;
  res.send(project);
  res.end();
}

function sendEmail(req, res, next) {
  var email = req.body.email;
  var mailOptions = {
      from: '"Eden Mazzola" <bojackeden@gmail.com>',
      to: email,
      subject: 'Just a reminder to Donate...',
      text: 'This is just a reminder for you to donate when it\'s conveinent. Click on the link to go back and donate \n https://stormy-caverns-60091.herokuapp.com/',
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}

app.put('/contribute', adjustRemaining, sendBackAmounts);
app.put('/email', sendEmail);
app.get('/reset', reset);
app.get('/init', init);

var port = Number(process.env.PORT || 3000);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
