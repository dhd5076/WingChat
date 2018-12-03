var Message = require('../models/message');

exports.createMessage = function(req, res) {
    if( req.session &&
        req.session.user &&
        req.body.message) {

        var message = new Message({
            firstname: req.session.user.firstname,
            sender: req.session.user.username,
            content: req.body.message
        });

        message.save();

        global.io.emit("message", message);
    }
    res.send("Done.");
}

exports.getMessages = function(req, res) {
    Message.find({}).exec(function(err, messages) {
        res.send(messages);
    });
}

exports.deleteAll = function() {
    Message.find({}, function(err, messages) {
        messages.forEach(function(message) {
            message.remove();
        });
    });
}