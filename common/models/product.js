'use strict';

module.exports = function(Product) {

    Product.validatesUniquenessOf('sku');
    Product.validatesUniquenessOf('name');

    Product.observe('before save', function (ctx, next) {
        if (ctx.isNewInstance !== undefined) {
            if (ctx.instance.price < 0) {
                return next(new Error('Price must be positive'));
            }
        }
        next();

    });  

};
