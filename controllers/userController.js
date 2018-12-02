var User = require('../models/user');

exports.login = function(req, res) {
    User.findOne({username : req.body.username}, function(err, user) {
        if(user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(err) {
                    console.log(err);
                }
                if(isMatch) {
                    res.render('chat');
                    req.session.user = user;
                    req.session.save();
                } else {
                    res.render('index', {errmsg: 'Username or password were incorrect'})
                }
            });
        } else {
            res.render('index', {errmsg: 'Username or password were incorrect'});
        }
    });
}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}

exports.createUser = function(req, res) {
    if( req.body.firstname &&
        req.body.lastname &&
        req.body.username &&
        req.body.password ) {

        User.find({username : req.body.username}, function(err, users) {
            if(users.length == 0) {
                var user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: req.body.password
                });
                user.save(function(err) {
                    res.redirect('/');
                });
            } else {
                res.render('register', {errmsg : 'Username already exists'})
            }
        });
    }
}

exports.removeUser = function(req, res) {

}

exports.loginUser = function(req, res) {

}