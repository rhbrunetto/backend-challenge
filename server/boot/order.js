'use strict';

var express = require('express');
var bodyParser = require('body-parser');


module.exports = function (app) {
    var router = express.Router();

    router.post('/v1/orders', bodyParser.text({ type: '*/*' }), function (req, res) {

        function validate(data){
            if (data.buyer != undefined)
                data.buyerId = data.buyer.id
            if (data.items != undefined) {
                Order.create(data)
                .then((order) => data.items.map((e) => {
                    e.orderId = order.id
                    return OrderItem.createCustom(e);
                }))
                .then((promises) => Promise.all(promises))
                .then((_) => res.send(data))
                .catch((err) => {
                    res.status(400).send(
                        { message: err.message }
                    );
                })
            } else {
                Order.create(data).then((order) => res.send(order))
            }
        }

        let data = JSON.parse(req.body)
        let Order = app.models.Order;
        var OrderItem = app.models.OrderItem;
        data.map((d) => validate(d));
    });

    router.put('/v1/orders/:id', bodyParser.text({ type: '*/*' }), function (req, res) {

        let Order = app.models.Order
        let data = JSON.parse(req.body)
        if (data.order_id == null)
            return res.status(422).send(
                {message : 'Missing parameter order_id'})
        if (data.status == null)
            return res.status(422).send(
                {message : 'Missing parameter status'})

        Order.findById(req.params.id)
        .then((order) => {
            if (order === null)
                throw Error('Order not found');
            order.status = data.status
            return order.save()
        })
        .then((order) => res.send(order))
        .catch((err) => res.status(404).send({ message: err.message}))
    });

    app.use(router);
}