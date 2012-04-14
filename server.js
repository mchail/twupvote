var http = require('http');
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('One big room. Full of <code-slingin\'> bitches.\n');
}).listen(process.env.PORT);
