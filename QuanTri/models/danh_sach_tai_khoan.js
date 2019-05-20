var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccountShecma = new Schema(
    {

        name: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},

    }
);

// Virtual for author's full name
// SanphamShecma
//     .virtual('name')
//     .get(function () {
//         return this.family_name + ', ' + this.first_name;
//     });
//
// // Virtual for author's lifespan
// SanphamShecma
//     .virtual('lifespan')
//     .get(function () {
//         return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
//     });
//
// Virtual for author's URL
AccountShecma
    .virtual('url')
    .get(function () {
        return '/thay_doi_thong_tin_tai_khoan/' + this._id;
    });

AccountShecma
    .virtual('delete_url')
    .get(function () {
        return '/xoa_tai_khoan/' + this._id;
    });

//Export model
module.exports = mongoose.model('tai_khoans', AccountShecma);