var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    phone: {
        type: String,
        index: true,
        unique: true
    },
    email: String,
    dateOfBirth: Date,
    regDate: Date,
    identify: Number,
    identifyDate: {
        type: Date,
        default: Date.now()
    }
})

var User = mongoose.model('User', userSchema);

module.exports = User;
