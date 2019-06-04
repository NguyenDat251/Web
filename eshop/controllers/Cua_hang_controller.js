var goods = require('../models/Cua_hang');


exports.index = function (req, res) {

    if (req.isAuthenticated()) {
        res.render('Cua_hang', {user: req.user});
    } else {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('Dang_nhap', {
            errorText: ''
        });
    }
};

