/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');

router.get('/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        var auth = jwt.decode(req.headers['x-auth'], config.secret);
        User.findOne({name: auth.name}, function (err, user) {
            if (err) {
                return next(err);
            }
            res.json(user);
        });
    }
});

router.get('/all', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        User.find()
                .sort('-name')
                .exec(function (err, users) {
                    if (err) {
                        return next(err);
                    }
                    res.json(users);
                });
    }
});

router.post('/', function (req, res, next) { // nowy
    var user = new User({name: req.body.name});
    bcrypt.hash(req.body.pass, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.pass = hash;
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.sendStatus(201);
        });
    });
});

router.post('/delete', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        User.remove({"name": req.body.name}, function (result) {
            res.send({"msg": result});
        });

    }
});

module.exports = router;