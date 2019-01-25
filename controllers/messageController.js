const CleverbotAPI = require('cleverbot-api');
var config = require('../config.js');
const cleverbot = new CleverbotAPI(config.CB_API_KEY);
var Message = require('../models/message');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    if ( req.session &&
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
    //TODO: Create a new function to handle repeated message saving code
    if (req.body.message.startsWith('@WingBot')) {
        cleverbot.getReply({
            input: req.body.message.replace('@WingBot','')
        }, (err, response) => {
            var message = new Message({
                firstname: 'WingBot',
                sender: '@WingBot',
                content: response.output
            });
    
            message.save();

            global.io.emit("message", message);
        });
    }

    res.send("Done.");
});

router.get('/', function(req, res) {
    if(!req.session.user) {
        res.redirect('/');
    } else {
        Message.find({}).exec(function(err, messages) {
            res.send(messages);
        });
    }
});

exports.deleteAll = function() {
    Message.find({}, function(err, messages) {
        messages.forEach(function(message) {
            message.remove();
        });
    });
}

module.exports = router;