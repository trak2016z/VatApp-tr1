/* 
    Wykonał: inż Robert Międlarz
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://dbVApp:B7s2RyQKXjEihb4WOxC8@91.185.191.213:27017/mo14589_dbVApp', function () {
    console.log('Nawiazano polaczenie z MongoDB');
});
module.exports = mongoose;

