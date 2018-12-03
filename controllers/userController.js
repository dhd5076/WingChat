var User = require('../models/user');

exports.login = function(req, res) {
    User.findOne({username : req.body.username}, function(err, user) {
        if(user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if(err) {
                    console.log(err);
                }
                if(isMatch) {
                    req.session.user = user;
                    req.session.save();
                    exports.getUsers(function(users) {
                        res.redirect('/');
                    });
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

exports.viewChat = function(req, res) {
    if(req.session.user) {
        exports.getUsers(function(users) {
            res.render('chat', {fellas: users, username: req.session.user.username});
        });
    } else {
        res.render('index');
    }
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
            if(!req.body.username.includes(' ')) {
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
            } else {
                res.render('register', {errmsg : 'Illegal character in username'})
            }
        });
    }
}

exports.getUsers = function(cb) {
    User.find({}, function(err, users) {
        cb(users);
    });
}

exports.deleteAllUsers = function(req, res) {
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            user.remove();
        });
    });
}