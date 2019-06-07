// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');
// var cho_duyet_data = require('../models/danh_sach_cho_duyet');
// var user = "temp";
//
// const bcrypt = require('bcrypt');
// let saltRounds = 10
// function doTheHash(pass) {
//     bcrypt.hash(pass, saltRounds, (err, hash)=>{
//         if(!err){
//             return hash;
//         }else{
//             console.log('Error', err);
//         }
//     })
// }
//
// function doTheCompare(passInput, passReal) {
//     bcrypt.compare(passInput, passReal, (err, res)=>{
//         if(!err){
//             return res;
//         }else{
//             console.log('Error', err);
//         }
//     })
// }
//
//
// exports.index = function (req, res) {
//     if (req.isAuthenticated()) {
//         cho_duyet_data.find()
//             .exec(function (err, list_items) {
//                 if (err) {
//                     console.log("falseeee");
//                     return next(err);
//                 }
//                 //Successful, so render
//                 console.log("Successful, so render");
//                 console.log(list_items);
//                 //res.render('danh_sach_tai_khoan', {title: '', list_items: list_items});
//                 res.render('danh_sach_cho_duyet', {title: '', list_items: list_items, user: req.user});
//             });
//
//     } else {
//         console.log(req.user);
//         console.log(req.isAuthenticated());
//         res.render('dang_nhap', {
//             errorText: ''
//         });
//     }
// };
console.log("Controller ne !!!");

exports.index = function (req, res, next) {
    console.log("Index ne  !");

    // if (req.isAuthenticated()) {
    //     data.find()
    //         .exec(function (err, list_items) {
    //             if (err) {
    //                 console.log("falseeee");
    //                 return next(err);
    //             }
    //             //Successful, so render
    //             console.log("Successful, so render");
    //             console.log(list_items);
    //
    //             res.render('danh_sach_cua_hang', {title: '', list_items: list_items, user: req.user});
    //         });
    //
    // } else {
    //     console.log(req.user);
    //     console.log(req.isAuthenticated());
    //     res.render('dang_nhap', {
    //         errorText: ''
    //     });
    // }
};
//module.exports = router;