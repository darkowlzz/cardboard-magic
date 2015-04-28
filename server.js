var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/app/'));

app.get('/', function (req, res) {
  res.render('/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('other event', function (data) {
    console.log(data);
  });
});

exports = module.exports = server;

exports.use = function () {
  app.use.apply(app, arguments);
};
