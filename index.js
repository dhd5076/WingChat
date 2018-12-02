var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongoose = require('mongoose');
var userController = require('./controllers/userController');
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

app.get('/', function(req, res) {
    console.log(req.session.user);
    if(req.session.user) {
        res.render('chat')
    } else {
        res.render('index');
    }
});

app.post('/', userController.login);



app.get('/register', function(req, res) {
    res.render('register.pug');
});

app.post('/register', userController.createUser);

mongoose.connect('mongodb://localhost/wingchat');


/*
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});
*/

http.listen(3000, function() {
   console.log('listening on *:3000'); 
});