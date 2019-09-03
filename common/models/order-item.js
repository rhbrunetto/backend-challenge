'use strict';

module.exports = function(Orderitem) {

    Orderitem.on('dataSourceAttached', function (obj) {
        var _find = Orderitem.find;
        Orderitem.find = function (filter, object, cb) {
            if (filter === undefined) filter = {};

            filter['include'] = ['product'];
            _find.call(this, filter, function (err, result) {
                if (err) cb(err)
                return cb(null, result)
            });
        }
        
    });

    Orderitem.createCustom = (data) => {
        return new Promise((resolve, reject) => {
            if (data.product != undefined) {
                var Product = Orderitem.app.models.Product
                Product.findOne({ where: { sku: data.product.sku } })
                    .then((product) => {
                        if (product == null)
                            throw Error('Product not found')
                        data.productId = product.id;
                        return data;
                    })
                    .then((data) => resolve(Orderitem.create(data)))
                    .catch((err) => reject(err));
            } else {
                resolve(Orderitem.create(data));
            }
        });
    }

    Orderitem.observe('before save', function (ctx, next) {
        if (ctx.isNewInstance !== undefined) {
            if (ctx.instance.amount < 0) {
                return next(new Error('Amount must be positive'));
            }
            if (ctx.instance.price_unit < 0) {
                return next(new Error('Price Unit must be positive'));
            }
            if (ctx.instance.total < 0) {
                return next(new Error('Total must be positive'));
            }
        }
        next();

    });  

};
