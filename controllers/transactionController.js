const CleverbotAPI = require('cleverbot-api');
var config = require('../config.js');
const cleverbot = new CleverbotAPI(config.CB_API_KEY);
var Message = require('../models/message');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('coins');
});

module.exports = router;