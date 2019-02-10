var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');
var transactionController = require('../controllers/transactionController');

router.get('/coins/hash', function(req, res) {
    res.send('The hash is 232323');
});

router.post('/coins/hash', function(req, res) {
    res.render('index');
});

router.get('/coins/blockchain', function(req, res) {
    Transaction.find({}).exec(function(err, transactions) {
        User.findOne({username : req.session.user.username}, function(err, user) {
            res.send(transactions);
        });
    });
});

module.exports = router;