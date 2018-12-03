var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongoose = require('mongoose');
var userController = require('./controllers/userController');
var messageController = require('./controllers/messageController');
var session = require('express-session')
var bodyParser = require('body-parser')

app.use(session({
    secret: 'wingwingwing',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'pug')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', userController.viewChat);

app.post('/', userController.login);

app.post('/message', messageController.createMessage);

app.get('/message', messageController.getMessages);

app.get('/logout', userController.logout);

app.get('/register', function(req, res) {
    res.render('register.pug');
});

app.post('/register', userController.createUser);

mongoose.connect('mongodb://localhost/wingchat');

io.on('connection', function(socket){
    socket.on('disconnect', function(){
    });
});

messageController.deleteAll();

global.io = io;

http.listen(3000, function() {
   console.log('listening on *:3000'); 
});