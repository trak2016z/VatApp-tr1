var db = require('../db');
var user = db.Schema({
    name: {type: String, required: true},
    pass: {type: String, select: false}
  //  add_date: {type: Date, required: true, default: Date.now()}       
        
});



module.exports = db.model('User', user);