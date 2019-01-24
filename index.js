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
var indexRouter = require('./routes')
app.use(session({
    secret: 'wingwingwing',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'pug')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)

mongoose.connect('mongodb://localhost/wingchat', {useNewUrlParser: true});

io.on('connection', function(socket){
    socket.on('disconnect', function(){
    });
});

global.io = io;

http.listen(8080, function() {
   console.log('listening on *:8080'); 
});
