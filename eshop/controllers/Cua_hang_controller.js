var goods = require('../models/Cua_hang');
var data = require('../models/San_pham');
var async = require('async');

function findListItem()
{
    data.find()
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            return list_items;
        });

};

function renderCuaHang(user, list_items)
{
    if (req.isAuthenticated()) {
        console.log("Show Cua_hang page");

        res.render('Cua_hang', {title: 'Áo Khoác', user: user, list_items: list_items});
    }
    else{

        res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: list_items});
    }
};

exports.index =  function (req, res) {

//     data.find()
//         .exec(function (err, list_items) {
//             if (err) {
//                 console.log("falseeee");
//                 return next(err);
//             }
//             console.log("Successful, so render");
//     if (req.isAuthenticated()) {
//         console.log("Show Cua_hang page");
//
//         res.render('Cua_hang', {title: 'Áo Khoác', user: user, list_items: list_items});
//     }
//     else{
//
//         res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: list_items});
//     }}
//
// )};

    async.parallel({
        list: function(callback) {
            data.find()
                .exec(callback);
        },

        list_type: function(callback) {
            data.distinct("type")
                .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.list_type==null) { // No results.
            var err = new Error('list not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        if (req.isAuthenticated()) {
            res.render('Cua_hang', {title: 'Genre Detail', user: req.user, list_items: results.list, list_type: results.list_type});
        }
        else {
            res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: results.list, list_type: results.list_type});
        }
    });


}
//const data =


exports.ShowList = function (req, res, next) {
    data.find()
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            //return list_items;
            res.render('Cua_hang', {title: 'Áo Khoác', list_items: list_items});
        });
};

exports.type = function (req, res, next) {
    data.find({type: req.params.type})
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            console.log(list_items);
            res.render('Loai_SP', {title: 'Áo Khoác', list_items: list_items});
        });
};

exports.info = async (req, res, next) => {
    // const data = {

    //     name: 'iPhone XS Max 64 GB',

    //     tensp: 'iPhone XS Max 64 GB',

    //     brand: 'Apple',
    //     price: '28,790,000',
    //     color: ['Bạc', 'Vàng', 'Xám'],
    //     shortInfo: ['Hệ điều hành: iOS 12', 'RAM: 4 GB', 'ROM: 64 GB', 'Chip xử lý: A12 Bionic 64-bit 7nm'],
    //     info: {
    //         screen: '6.5 inches',
    //         ram: '4 GB',
    //         rom: '64 GB',
    //         frontCamera: '7 MP, f / 2.2, 32mm',
    //         backCamera: '12 MP',
    //         os: 'iOS 12',
    //         sim: '1',
    //         pin: '3174 mAh'
    //     }
    // };

    // res.render('San_pham', {title: 'Sản phẩm', data});
    //const data = await product.detail('5cd7df888d899652d46769c0');


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
                res.render('San_pham', {title: 'Áo Khoác', item: item[0]})
            }
            ;


        });
};
