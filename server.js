var fs = require('fs');
var app = require('express').createServer();

var sockets = [];
var datas = [];

app.listen(process.env.PORT || 80);
var io = require('socket.io').listen(app);

app.get('/', function(req, res) {
  res.sendfile(__dirname + "/index.html");
});

app.get('/js', function(req, res) {
	res.sendfile(__dirname + "/app.js");
});

io.sockets.on('connection', function(socket) {
	sockets.push(socket);
	socket.emit('news', {hello: 'world'});
	
	socket.on('clicked', function(data) {
		datas.push(data);
		console.log(data);
	});
});

setInterval(function() {
	for (var i = 0; i < sockets.length; i++) {
		var socket = sockets[i];
		socket.emit('news', datas);
	};
}, 5000);