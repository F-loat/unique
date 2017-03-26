var mongoose = require('mongoose');

var wareSchema = new mongoose.Schema({
  type: Number,
  img: String,
  imgs: [String],
  nameEn: String,
  name: String,
  depiction: String,
  price: [{
    val: Number,
    spec: Number
  }],
  uploadDate: {
    type: Date,
    default: Date.now()
  },
  stock: {
    type: Number,
    default: 0
  }
})

var Ware = mongoose.model('Ware', wareSchema);

module.exports = Ware;
