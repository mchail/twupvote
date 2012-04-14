/*var http = require('http');
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('One big room. Full of <code-slingin\'> bitches.\n');
}).listen(process.env.PORT);*/


var app = require('express').createServer();
var TwitterNode = require('twitter-node').TwitterNode
    , sys = require('util');

var twit = new TwitterNode({
    user: 'twupvote',
    password: 'twupvote_me',
    track: ['#nodedenver']
});

twit.addListener('tweet', function(tweet) {
    console.log(tweet.text + " -- " + tweet.user.screen_name);
}).stream();

app.register('.html', require('jade'));

app.configure(function() {
	app.set('views', __dirname + '/views');
  app.set("view options", {layout: false});
});

app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.render("index.jade");
});

app.listen(process.env.PORT || 80);