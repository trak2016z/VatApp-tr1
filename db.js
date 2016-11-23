/* 
    Wykonał: inż Robert Międlarz
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db_RMDoc', function () { //B7s2RyQKXjEihb4WOxC8  //dbVApp
    console.log('Nawiazano polaczenie z MongoDB');
});
module.exports = mongoose;

