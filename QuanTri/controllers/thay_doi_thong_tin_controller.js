
var data = require('../models/danh_sach_cua_hang');

exports.ChangeInfo = async (req, res, next) => {
    data.find({_id:req.params.id})
        .exec(function (err, item) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            else {
                if (item==null) { // No results.
                    var err = new Error('Item not found');
                    err.status = 404;
                    return next(err);
                }
                console.log("Successful, so render");
                console.log(item);
                res.render('thay_doi_thong_tin_cua_hang', {title: 'Áo Khoác', item: item[0]})
            }
            ;


        });
};
