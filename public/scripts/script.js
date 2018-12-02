var MessageType = {
    STANDARD: 0,
    SELF: 1,
    WING: 2,
    STATUS: 3
  };

$( document ).ready(function() {
    console.log( "ready!" );
    addMessage(0, "dasdasdasd")
});

function addMessage(type, content) {
    switch(type) {
        //Standard Message
        case MessageType.STANDARD:        	
            $( "#chat-window" ).append("<li class=\"list-group-item borderless\"><div class=\"row\"><div class=\"col-0\"><span class=\"font-weight-bold\">Dylan</span></div><div class=\"col-8\"><p class=\"alert-secondary p-2 rounded\">" + content + "</p></div></div><li>");
            break;
        //Self Message
        case MessageType.SELF:
            $( "#chat-window" ).append("<li class=\"list-group-item borderless\"><div class=\"row\"><div class=\"col-0\"><span class=\"font-weight-bold\">John </span></div><div class=\"col-8\"><p class=\"alert-primary p-2 rounded\">" + content + "</p></div></div></li>");
            break;
        //Wing Message
        case MessageType.WING:
            break;
        //Status Message
        case MessageType.STATUS:
        $( "#chat-window" ).append("<li class=\"list-group-item borderless\"><p class=\"text-center text-secondary\">" + content + "</p></li>");
            break;
    }
    $('#chat-window').scrollTop($(document).height());
}

function sendMessage() {
    message = $('#message').val();
    $('#message').val('')
    if(message.length > 0) {
        addMessage(MessageType.STATUS, message);
    }
}