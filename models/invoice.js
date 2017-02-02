var db = require('../db');
var Schema = db.Schema;

var invoiceSchema = new Schema({
    invoice_number: {type: String, required: false},
    issue_date: {type: Date, required: false},
    sell_date: {type: Date, required: false},
    add_by: {type: String, required: false},
    add_date: {type: Date, required: false, default: Date.now()},
    company_sell: {type: Schema.Types.ObjectId, required: false}, //id
    company_buy: {type: Schema.Types.ObjectId, required: false}, //id
    invoice_items: {type: Array, required: false},
    pay_by: {type: String, required: false},
    days_to_pay: {type: String, required: false},
    pay_date: {type: Date, required: false} ,
    all_to_pay: {type: String, required: false},
    pay_in_words: {type: String, required: false},
    paid: {type: String, required: false},
    left_to_pay: {type: String, required: false}
        
});

var Invoice = db.model('Invoice',invoiceSchema);
module.exports = Invoice;