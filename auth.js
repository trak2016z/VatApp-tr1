/* 
 
 * Warstwa pośrednicząca 
 */

var jwt = require('jwt-simple');
var config = require('./config');

module.exports = function (req, res, next) {
    if (req.headers['x-auth']) {
       req.auth = jwt.decode(req.headers['x-auth'], config.secret);
    }
    next();
};

/*
 * warstwa ta dołączy obiekt auth (naglowek x-auth) do każdego żadnaia -> server.js
 */