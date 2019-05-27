var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccountSchema = new Schema(
    {
        name: {type: String, required: 'Vui lòng không để trống', max: 100},
        password: {type: String},
        email:{type: String},
    }
);

AccountSchema
    .virtual('url')
    .get(function () {
        return '/thay_doi_thong_tin_tai_khoan/' + this._id;
    });

AccountSchema
    .virtual('delete_url')
    .get(function () {
        return '/xoa_tai_khoan/' + this._id;
    });

AccountSchema
    .virtual('add_url')
    .get(function () {
        return '/them_tai_khoan/';
    });

//Export model
module.exports = mongoose.model('tai_khoans', AccountSchema);