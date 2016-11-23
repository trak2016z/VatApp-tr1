/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');
var _ = require('lodash');

var User = require(__dirname + '/models/user');

var bcrypt = require('bcrypt');

var app = express();
app.use(bodyParser.json());

var secretkey = '!superSecret';

app.post('/session', function (req, res, next) {
    User.findOne({name: req.body.name})
            .select('pass')
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                ;
                if (!user) {
                    return res.sendStatus(401);
                }
                bcrypt.compare(req.body.pass, user.pass, function (err, valid) {
                    if (err) {
                        return next(err);
                    }
                    ;
                    if (!valid) {
                        return res.sendStatus(401);
                    }
                    var token = jwt.encode({name: user.name}, secretkey);
                    res.json(token);
                });
            });
});

app.get('/user', function (req, res) {
    var token = req.headers['x-auth'];
    var auth = jwt.decode(token, secretkey);
    User.findOne({name: auth.name}, function (err, user) {
        res.json(user);
    });
});

app.post('/user', function (req, res, next) {
    var user = new User({name: req.body.name});
    bcrypt.hash(req.body.pass, 10, function (err, hash) {
        user.pass = hash;
        user.save(function (err) {
            if (err) {
                throw next(err);
            }
            res.sendStatus(201);
        });
    });
});

app.listen(3000);