var Item = require('../../models/item');
var router = require('express').Router();

router.get('/all/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        Item.find()
                .sort('-mj')
                .exec(function (err, items) {
                    if (err) {
                        return next(err);
                    }
                    res.json(items);
                });
    }
});

router.post('/delete/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        console.log("dupa: "+req.body.itemId);
        Item.remove({"_id": req.body.itemId}, function (result) {
            console.log(result);
            res.send({"msg": result});
        });
    }
});

router.post('/', function (req, res, next) {
    if (!req.headers['x-auth']) {
        res.sendStatus(401);
    } else {
        req.body = req.body.body;
        var item = new Item({
            name: req.body.name,
            mj: req.body.mj,
            count: req.body.count,
            priceOneN: req.body.priceOneN,
            priceFullN: req.body.priceFullN,
            taxRate: req.body.taxRate,
            taxFullRate: req.body.taxFullRate,
            endPrice: req.body.endPrice
        });
        item.add_by = req.auth.name;
        item.save(function (err, item) {
            if (err) {
                return next(err);
            }
            res.status(201).json(item);
            console.log(item.add_by + " Dodał Objekt Item:" + item.name + " " + item.add_date);
        });
    }
});

module.exports = router;