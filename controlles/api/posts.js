/* 
 */
var Post = require('../../models/posts');
var router = require('express').Router();

router.get('/', function (req, res, next) {
    Post.find()
            .sort('-data')
            .exec(function (err, posts) {
                if (err) {
                    return next(err);
                }
                res.json(posts);
            });
});

router.post('/', function (req, res, next) {
    var post = new Post({
        tresc: req.body.tresc
    });
    post.name = req.auth.name;
    post.save(function (err, post) {
        if (err) {
            return next(err);
        }
        res.status(201).json(post);
        console.log('przesłano do serwera:', post.name, req.body.tresc);
        //console.log('przesłano do serwera: name:',req.body.name,'tresc:', req.body.tresc); 
    });
});

module.exports = router;