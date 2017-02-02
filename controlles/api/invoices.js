var Invoice = require('../../models/invoice');
var router = require('express').Router();

router.get('/all/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        Invoice.find()
                .sort('-add_date')
                .exec(function (err, invoices) {
                    if (err) {
                        return next(err);
                    }
                    res.json(invoices);
                });
    }
});

router.get('/GetOne/:id', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        Invoice.findOne({_id: req.params['id']}, function (err, invo) {
            if (err) {
                return next(err);
            }
            res.json(invo);
        });
    }
});

router.post('/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        var invoice = new Invoice({
            invoice_number: req.body.invoice_number,
            issue_date: req.body.issue_date,
            sell_date: req.body.sell_date,
//            add_date: req.body.add_date,
            company_sell: req.body.company_sell,
            company_buy: req.body.company_buy,
            invoice_items: req.body.invoice_items,
            pay_by: req.body.pay_by,
            days_to_pay: req.body.days_to_pay,
            pay_date: req.body.pay_date,
            all_to_pay: req.body.all_to_pay,
            pay_in_words: req.body.pay_in_words,
            paid: req.body.paid,
            left_to_pay: req.body.left_to_pay
        });
        invoice.add_by = req.auth.name;
        invoice.save(function (err, invo) {
            if (err) {
                return next(err);
            }
            res.status(201).json(invo);
            console.log(invo.add_by + " Dodał Objekt Invoice:" + invo.invoice_number + " " + invo.add_date);
        });
    }
});

module.exports = router;