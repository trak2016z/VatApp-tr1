var db = require('../db');
var Schema = db.Schema;

var itemSchema = new Schema({
    name: {type: String, required: true},
    mj: {type: String, required: true},
    count: {type: String, required: true},
    priceOneN: {type: String, required: true},
    priceFullN: {type: String, required: true},
    taxRate: {type: String, required: true},
    taxFullRate: {type: String, required: true},
    endPrice: {type: String, required: true},
    add_by: {type: String, required: true},
    add_date: {type: Date, required: true, default: Date.now()}

});
var Item = db.model('Item', itemSchema);

module.exports = Item;