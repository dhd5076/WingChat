var MessageType = {
    STANDARD: 0,
    SELF: 1,
    WING: 2,
    STATUS: 3
  };

var socket = io.connect();

$( document ).ready(function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $.getJSON( "/message", function(data) {
        data.forEach(function(message) {
            if(message.content[0] == '~') {
                addMessage(MessageType.WING, message.firstname, message.content, false);
            } else {
                addMessage(MessageType.STANDARD, message.firstname, message.content, false);
            }
        });
      });
});

socket.on('message', function(message) {
    if(message.content[0] == '~') {
        addMessage(MessageType.WING, message.firstname, message.content, true);
    } else {
        addMessage(MessageType.STANDARD, message.firstname, message.content, true);
    }
})

function sendMessage() {
    message = $('#message').val();
    $('#message').val('')
    if(message.length > 0) {
        var request = $.ajax({
            type: "POST",
            url: "/message",
            data: {message: message},
            datatype: "text"
        });
    }
}

function addMessage(type, sender, content, animate) {
    switch(type) {
        //Standard Message
        case MessageType.STANDARD:        	
            $( "#chat-window" ).append("<li class=\"list-group-item borderless\"><div class=\"row\"><div class=\"col-0\"><span class=\"font-weight-bold\">" + sender + "</span></div><div class=\"col-8\"><p class=\"alert-secondary p-2 rounded\">" + content + "</p></div></div><li>");
            break;
        //Self Message
        case MessageType.SELF:
            $( "#chat-window" ).append("<li class=\"list-group-item borderless\"><div class=\"row\"><div class=\"col-0\"><span class=\"font-weight-bold\">" + sender + "</span></div><div class=\"col-8\"><p class=\"alert-primary p-2 rounded\">" + content + "</p></div></div></li>");
            break;
        //Wing Message
        case MessageType.WING:
            $("#chat-window").append("<li class=\"list-group-item borderless\"><div class=\"row\"><div class=\"col-0\"><span class=\"font-weight-bold\">" + sender + "</span></div><div class=\"col-8\"><img src=\"images/" + content.substring(1, content.length) + "-wing.png\"></div></div></li>");
            break;
        //Status Message
        case MessageType.STATUS:
        $( "#chat-window" ).append("<li class=\"list-group-item borderless\"><p class=\"text-center text-secondary\">" + content + "</p></li>");
            break;
    }
    if(animate) {
        var objDiv = $("#chat-window");
        var h = objDiv.get(0).scrollHeight;
        objDiv.animate({scrollTop: h}, 200);
    } else {
        var objDiv = $("#chat-window");
        var h = objDiv.get(0).scrollHeight;
        objDiv.animate({scrollTop: h}, 0);
    }
}

function sendWingMessage(wingtype) {
    $.ajax({
        type: "POST",
        url: "/message",
        data: {message: "~" + wingtype}
    });
}