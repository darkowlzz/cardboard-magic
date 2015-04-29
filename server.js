var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/app/'));

app.get('/', function (req, res) {
  res.render('/index.html');
});

io.sockets.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('move event', function (data) {
    io.emit('move event', data);
  });
});

exports = module.exports = server;

exports.use = function () {
  app.use.apply(app, arguments);
};
