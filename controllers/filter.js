exports.login = function(req, res, next) {
    if (req.session.phone) {
        next();
    } else {
        res.json({ "state": 0 });
    }
}
exports.admin = function(req, res, next) {
    if (req.session.type==9) {
        next();
    } else {
        res.json({ "state": 0 });
    }
}
