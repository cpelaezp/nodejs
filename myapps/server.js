var express = require('express');
var callbacks = [];

function appendMessage(message){
  var resp = {messages: [message]};
  while (callbacks.length > 0) {
    callbacks.shift()(resp);
  }
}

var app = module.exports = express.createServer();
app.use(express.bodyParser());

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.post('/send', function(req, res){
  var message = {
    nickname: req.param('nickname', 'Anonymous'),
    text: req.param('text', '')
  };
  appendMessage(message);
  res.json({status: 'ok'});
});

app.get('/recv', function(req, res){
  callbacks.push(function(message){
    res.json(message);
  });
});

app.listen(process.env.PORT);