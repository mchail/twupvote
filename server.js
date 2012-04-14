/*var http = require('http');
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('One big room. Full of <code-slingin\'> bitches.\n');
}).listen(process.env.PORT);*/


var app = require('express').createServer();

app.configure(function() {
	app.set('views', __dirname + '/views');
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/test', function(req, res){
  res.render("index", {});
});

app.listen(process.env.PORT || 80);