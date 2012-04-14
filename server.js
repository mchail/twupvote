/*var http = require('http');
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('One big room. Full of <code-slingin\'> bitches.\n');
}).listen(process.env.PORT);*/


var app = require('express').createServer();

app.register('.html', require('jade'));

app.configure(function() {
	app.set('views', __dirname + '/views');
  app.set("view options", {layout: false});
});

app.get('/', function(req, res){
  res.render("index.jade");
});

app.listen(process.env.PORT || 80);