var data = require('../models/tai_khoan');
//var San_pham_controller = require('../controllers/San_pham_controller');
const bcrypt = require('bcrypt');

function validPassword(pass1, pass2)
{
    return bcrypt.compareSync(pass1, pass2);
}

exports.show_list = function(req, res) {
    res.send('NOT IMPLEMENTED: most favorite goods list');
};

exports.check_log_in = function(req, res, next) {
    var name = "";

    data.find()
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            console.log(list_items);
            //res.render('danh_sach_tai_khoan', {title: '', list_items: list_items});
        }),

    data.find({"name":req.body.name})
        .exec(function (err, item) {
            if (err) {
                console.log("false");
                err.status = 404;
                return next(err);
            }
            //Successful, so render
            else {
                if(item.length == 0)
                {
                    console.log("false 2");
                    res.render('Dang_nhap', { title: 'Sai thông tin đăng nhập' });
                }
                else {
                    console.log("Successful");
                    if (validPassword(req.body.password, item[0].password)){
                        console.log(req.body.password);
                        console.log(item[0].password);
                        res.render('Dang_nhap', {title: 'Sai thông tin đăng nhập'});
                    } else {
                        console.log("Successful, so render");
                        console.log(item);
                        user = item[0].name;
                        res.redirect('../')
                    }
                }
            }
        });
};

