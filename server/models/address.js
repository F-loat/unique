var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    onwer: String,
    phone: String,
    receiver: String,
    site: String,
    state: Number
})

var Address = mongoose.model('Address', addressSchema);

module.exports = Address;
