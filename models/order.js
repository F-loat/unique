var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    order_no: String,
    onwer: String,
    state: {
        type: Number,
        default: 0
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    wares: [{
        info: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ware'
        },
        img: String,
        weight: Number,
        dish: String
    }],
    receive: Date,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    coupon: String,
    msg: String,
    fee: Number,
    payway: Number
})

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
