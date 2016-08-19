var mongoose = require('mongoose');

var shopcarSchema = new mongoose.Schema({
    onwer: String,
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ware'
    },
    sum: {
        type: Number,
        default: 1
    },
    weight: Number,
    dish: String,
    img: String,
    state: {
        type: Number,
        default: 0
    }
})

var Shopcar = mongoose.model('Shopcar', shopcarSchema,'shopcar');

module.exports = Shopcar;
