var db = require('../db');
var Post = db.model('Post', {
    name: {type: String, required: true},
    tresc: {type: String, required: true},
    data: {type: Date, required: true, default: Date.now()}
});
module.exports = Post;

