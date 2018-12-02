var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/chat', function(req, res) {
    res.render('chat');
});

app.get('/register', function(req, res) {
    res.render('register.pug');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});

http.listen(3000, function() {
   console.log('listening on *:3000'); 
});