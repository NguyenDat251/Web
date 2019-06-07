// var mongoose = require('mongoose');
//
// var Schema = mongoose.Schema;
//
// var AccountSchema = new Schema(
//     {
//         name: {type: String, required: 'Vui lòng không để trống', max: 100},
//         password: {type: String},
//         email:{type: String},
//     }
// );
//
//
// AccountSchema
//     .virtual('delete_url')
//     .get(function () {
//         return '/danh_sach_cho_duyet/xoa_tai_khoan/' + this._id;
//     });
//
// AccountSchema
//     .virtual('add_url')
//     .get(function () {
//         return '/danh_sach_tai_khoan/them_tai_khoan/';
//     });
//
// //Export model
// module.exports = mongoose.model('cho_duyets', AccountSchema);