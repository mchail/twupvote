var socket = io.connect("http://localhost");
socket.on('news', function(data) {
    console.log(data);
});

$(document).ready(function() {
	$('#test').click(function() {
		console.log('i actually clicked something');
		socket.emit('clicked', {my: 'data'});
	});

});

