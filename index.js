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

app.post('/', userController.login);

app.get('/chat', userController.viewChat);

app.post('/message', messageController.createMessage);

app.get('/message', messageController.getMessages);

app.get('/logout', userController.logout);

app.get('/register', function(req, res) {
    res.render('register.pug');
});

app.get('/stats', function(req, res) {
    res.render('stats.pug');
});

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/register', userController.createUser);

mongoose.connect('mongodb://localhost/wingchat', {useNewUrlParser: true});

io.on('connection', function(socket){
    socket.on('disconnect', function(){
    });
});

global.io = io;

http.listen(8080, function() {
   console.log('listening on *:8080'); 
});
