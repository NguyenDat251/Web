var dataAccount = require('../models/tai_khoan');


exports.update_post = function(req, res) {
    var newUser = new dataAccount({
        name: req.user.name,
        password: req.user.password,
        email:req.body.email,
        date:req.body.date,
        phone:req.body.phone,
        resetPasswordToken: req.user.resetPasswordToken,
        resetPasswordExpires: req.user.resetPasswordExpires,

        listProducts:req.user.listProducts,
        totalCost:req.user.totalCost,
        _id:req.user._id //This is required, or a new ID will be assigned!
    });

    dataAccount.findByIdAndUpdate(req.user._id, newUser, {}, function (err,item) {
        if (err) {

            res.redirect('/');}
        else{
            res.redirect('/');
        }
    });
    };


