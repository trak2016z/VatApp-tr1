var db = require('../db');
var Schema = db.Schema;

var firmSchema = new Schema({
    company_name: {type: String, required: true},
    company_log: {type: String},
    company_nip: {type: String},
    company_tel_num: {type: String},
    company_adress: {type: String, required: true},
    add_by: {type: String, required: true},
    add_date: {type: Date, required: true, default: Date.now()}

});
var Firm = db.model('Firm', firmSchema);

module.exports = Firm;