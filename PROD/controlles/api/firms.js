
var Firm = require('../../models/firm');
var router = require('express').Router();


router.post('/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        req.body = req.body.body;
        var firm = new Firm({
            company_name: req.body.company_name,
            company_log: req.body.company_log,
            company_nip: req.body.company_nip,
            company_tel_num: req.body.company_tel_num,
            company_adress: req.body.company_adress
        });
        firm.add_by = req.auth.name;
        firm.save(function (err, firm) {
            if (err) {
                return next(err);
            }
            res.status(201).json(firm);
            console.log(firm.add_by + " Dodał Objekt Firm:" + firm.company_name + " " + firm.add_date);
        });
    }
});

router.get('/GetOne/:id', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        Firm.findOne({_id: req.params['id']}, function (err, firm) {
            if (err) {
                return next(err);
            }
            res.json(firm);
        });
    }
});

router.get('/StepTwo/:dId/:bId/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        var result = new Object();
        Firm.findOne({_id: req.params['dId']}, function (err, dealer) {
            if (err) {
                return next(err);
            }
            result.dealer = dealer;
            Firm.findOne({_id: req.params['bId']}, function (err, buyer) {
                if (err) {
                    return next(err);
                }
                result.buyer = buyer;
                res.json(result);
            });
        });

    }
});

router.get('/all/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        Firm.find()
                .sort('-company_name')
                .exec(function (err, firm) {
                    if (err) {
                        return next(err);
                    }
                    res.json(firm);
                });
    }
});

module.exports = router;