var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	nickname: String,
	password: String,
	phoneNumber: String,
	email: String,
	dateOfBirth: Date,
	regDate: {
		type: Date,
		default: Date.now()
	}
})

userSchema.statics = {
	fetch: function (cb) {
		return this
			.find({})
			.sort('regDate')
			exec(cb)
	},
	findById: function (id, cb) {
		return this
			.findOne({uid: uid})
			exec(cb)
	}
}

var User = mongoose.model('User', userSchema);

module.exports = User;