

var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../public/Controller/staticjs'));
router.use(express.static(__dirname + '/../public/View/'));

router.get('*', function (req, res, next) { // '*' pushstate dla wszystich żądań 

    var options = {
        root: './',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = 'public/View/pages/start.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
});

module.exports = router;