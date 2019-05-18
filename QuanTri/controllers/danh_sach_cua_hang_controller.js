
var data = require('../models/danh_sach_cua_hang');

exports.show_list = function(req, res, next) {
    data.find()
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            console.log(list_items);
            res.render('danh_sach_cua_hang', {title: 'Áo Khoác', list_items: list_items});
        });
};