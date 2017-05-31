//权限过滤
exports.turnBack = function(req, res, next) {
    if (req.xhr) {
        next()
    } else {
        res.redirect('/');
    }
}