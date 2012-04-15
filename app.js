var socket = io.connect();
var mousedown = false;

socket.on('change', function(data) {
    var li = $('#' + data.cell);
   li.css('background-color', "hsla(" + data.color + ", 100%, 50%, 1)"); 
});

$(document).ready(function() {
    
    for(var i = 0; i < 10; i++) {
        var d = $('<div>');
        for(var j = 0; j < 10; j++) {
            var l = $('<li>');
            l.attr('data-step', 0);
            (function() {
                var cell = '' + (10 * i + j);
                l.attr('id', cell);
            })();
            d.append(l);
        }
        $('#container').append(d);
    }
    
    $('li').on('mousedown', function() {
        changeColor($(this));
        mousedown = true;
    });
    
    $('body').on('mouseup', function() {
       mousedown = false; 
    });
    
    $('li').on('mouseenter', function() {
       if (mousedown) {
           changeColor($(this));
       }
    });
});

function changeColor(li) {
    var c = randColor();
    var oldStep = parseInt(li.attr('data-step'));
    var newStep = (oldStep +1) % 6;
    li.attr('data-step', newStep);
    li.css('background-color', "hsla(" + (60 * newStep) + ", 100%, 50%, 1)");
    socket.emit('color', {cell: li.attr('id'), color: newStep * 60});
}

function randColor() {
    return Math.floor(Math.random()*360);
}

