module.exports = function (app) {

    var Customer = app.models.Customer
    var Product = app.models.Product
    var Order = app.models.Order
    var OrderItem = app.models.OrderItem
    
    var customers = require('../../data/customer.json')
    var products = require('../../data/product.json')
    var orders = require('../../data/order.json')
    var orderItems = require('../../data/order-item.json')

    Customer.create(customers, function (err, customer) {
        console.log(customer)
    })

    Product.create(products, function (err, product) {})

    Order.create(orders, function (err, order) {})

    OrderItem.create(orderItems, function (err, orderItem) {})
    
}

// "socketPath": "/var/run/mysqld/mysqld.sock"