/* 
    Wykonał: inż Robert Międlarz
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://mo14589_dbVat:e6qo7kmQaLQooNInpOKr@mongo0.mydevil.net/mo14589_dbVat', function () {
    console.log('Nawiazano polaczenie z MongoDB');
});
module.exports = mongoose;

