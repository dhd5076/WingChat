const CleverbotAPI = require('cleverbot-api');
var config = require('../config.js');
var User = require('../models/user');
var Transaction = require('../models/transaction');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

router.get('/', function(req, res){
    if(!req.session.user) {
        res.redirect('/');
    } else {
        Transaction.find({}).exec(function(err, transactions) {
            User.findOne({username : req.session.user.username}, function(err, user) {
                res.render('coins', {transactions: transactions, user: user});
            });
        });
    }
});

router.post('/send', function(req, res){
    if(!req.session.user) {
        res.redirect('/');
    } else {
        User.findOne({username : req.body.fella}, function(err, user) {
            if(user) {
                User.findOne({username : req.session.user.username}, function(err, user2) {
                    if(!user.wings) {
                        user.wings = 100;
                        user.save();
                    }

                    if(!user2.wings) {
                        user2.wings = 100;
                        user2.save();
                    }
                    if(parseInt(user2.wings) > parseInt(req.body.amount)){
                        if(req.body.amount > 0) {
                            user2.wings -= parseInt(req.body.amount);
                            user.wings += parseInt(req.body.amount);
                            user2.save();
                            user.save();

                            hashable = Date.now().toString()
                                    + req.session.user.username 
                                    + user.username 
                                    + req.body.amount + 'wingwingwing'

                            var transaction = new Transaction({
                                sender: req.session.user.username,
                                receiver: user.username,
                                date: Date.now(),
                                amount: parseInt(req.body.amount),
                                hash: crypto.createHash('md5').update(hashable).digest('hex')
                            });

                            transaction.save();
                            res.send('Transaction successful!')

                        } else {
                            res.send('Amount must be greater than 0 wings')
                        }
                    }else {
                        res.send('Insufficient Wing Funds');
                    }
                });
            } else {
                res.send('Fella ' + req.body.fella + ' Doesn\'t Exist!')
            }
        });
    }
});

module.exports = router;