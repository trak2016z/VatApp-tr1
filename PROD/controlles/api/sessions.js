
var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');

var date = new Date().toLocaleDateString("pl-PL");
var time = new Date().toLocaleTimeString();

router.post('/', function (req, res, next) {
    User.findOne({name: req.body.name})
            .select('pass').select('name')
            .exec(function (err, user) {
                if (err) {
                    console.log(next(err));
                    return next(err);
                }
                if (!user) {
                    console.log("Niezautoryzowano");
                    return res.sendStatus(401);
                }
                bcrypt.compare(req.body.pass, user.pass, function (err, valid) {
                    if (err) {
                        console.log("błąd przy autoryzacji " + req.body.name + "błąd:" + next(err));
                        return next(err);
                    }
                    if (!valid) {
                        console.log("Niezautoryzowano:" + req.body.name);
                        return res.sendStatus(401);
                    }
                    console.log(date + "/" + time + " Zautoryzowano: " + user.name);
                    var token = jwt.encode({name: user.name}, config.secret);
                    res.send(token);
                });
            });
});

module.exports = router;