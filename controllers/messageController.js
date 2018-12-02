var Message = require('../models/message');

exports.createMessage = function(username, content) {
    var message = new Message({
        username: username,
        content: content
    });

    message.save();
}

exports.getMessages = function(cb) {
    message.find({}, function(err, messages) {
        cb(messages);
    })
}