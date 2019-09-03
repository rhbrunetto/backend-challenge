'use strict';

module.exports = function(Order) {

    Order.on('dataSourceAttached', function (obj) {
        var _find = Order.find;
        Order.find = function (filter, object, cb) {
            if (filter === undefined) filter = {};

            filter['include'] = ['buyer', 'items'];
            _find.call(this, filter, function (err, result) {
                if (err) cb(err)
                return cb(null, result)
            });
        }
 
        });

    Order.observe('before save', function(ctx, next) {
        if (ctx.isNewInstance !== undefined){
            if (ctx.instance.total < 0){
                return next(new Error('Total must be positive'));
            }
        }
        next();
    });  
};
