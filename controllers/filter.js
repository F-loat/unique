var OAuth = require('wechat-oauth');
var wx = require('./key/wx.json');
var client = new OAuth(wx.appid, wx.appsecret);

exports.login = function (req, res, next) {
  if (req.session.userId) {
    next()
  } else {
    res.json({ "state": 0, "turnUrl" : client.getAuthorizeURL(req.headers.referer, 'wxoauth', 'snsapi_userinfo') })
  }
}
exports.admin = function (req, res, next) {
  if (req.session.type > 8) {
    next();
  } else {
    res.json({ "state": 0, err: '管理员可用！！' });
  }
}
