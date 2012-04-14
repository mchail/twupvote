var http = require('http');

var config = {
    user: "twupvote",
    password: "twupvote_me",
    track: ["#nodedenver"]},
sys = require('sys');

var server = http.createServer(function(req, res) { // create the server
                               res.writeHead(200, {'Content-Type': 'text/html'});
                               res.end('<h1>Codesnippit Twitter Tracker Server is <span style="color: #bada55">operational</span></h1>');
                           });


server.listen(process.env.PORT || 80);


var socket = require('socket.io').listen(server),
twitter = new (require("twitter-node").TwitterNode)(config);

twitter
    .addListener('error', function(error){ // Always check for errors or they popup client side
                     console.log(error.message);
                 })
    .addListener('tweet', function(tweet){ // A new tweet that matches the criteria has been located
                     socket.broadcast(JSON.stringify(tweet));
                 })
    .addListener('limit', function(limit){ // New limit has been sent from the API
                     sys.puts('LIMIT: ' + sys.inspect(limit));
                 })
    .addListener('delete', function(del){ // A delete event occured
                     sys.puts('DELETE: ' + sys.inspect(del));
                 })
    .addListener('end', function(resp){ // API disconnect
                     sys.puts('wave goodbye...' + resp.statusCode);
                 })
    .stream();

