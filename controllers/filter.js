var OAuth = require('wechat-oauth');
var wx = require('./key/wx.json');
var client = new OAuth(wx.appid, wx.appsecret);

exports.login = function (req, res, next) {
  if (req.session.userId) {
    next()
  } else {
    res.json({"turnUrl" : client.getAuthorizeURL(req.headers.referer, 'wxoauth', 'snsapi_userinfo'), "state" : 0})
  }
}
exports.admin = function (req, res, next) {
  if (req.session.type==9) {
    next();
  } else {
    res.json({ "state": 0 });
  }
}
