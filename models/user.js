var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    nickname: String,
    headimgurl: String,
    password: String,
    phone: {
        type: String
    },
    openid: {
        type: String,
        unique: true
    },
    email: String,
    dateOfBirth: Date,
    shopcar: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shopcar'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    regDate: Date,
    identify: Number,
    identifyDate: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: Number,
        default: 0
    }
})

var User = mongoose.model('User', userSchema);

module.exports = User;
