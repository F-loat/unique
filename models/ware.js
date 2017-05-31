var mongoose = require('mongoose');

var wareSchema = new mongoose.Schema({
    type: Number,
    img: String,
    nameEn: String,
    name: String,
    description: [String],
    price: Number
})

var Ware = mongoose.model('Ware', wareSchema);

module.exports = Ware;
