var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = new Schema(
    {
        name: {type: String, required: 'Vui lòng không để trống', max: 100},
        password: {type: String},
        email:{type: String},
        date:{type: Date, default: Date.now},
        isVerified: { type: Boolean, default: false },
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
adminSchema
    .virtual('url')
    .get(function () {
        return '/thay_doi_thong_tin_admin/';
    });
// AccountSchema

//     .virtual('delete_url')
//     .get(function () {
//         return '/xoa_tai_khoan/' + this._id;
//     });


adminSchema
    .virtual('add_url_admin')

adminSchema
    .virtual('add_url')

    .get(function () {
        return '/them_tai_khoan_admin/';
    });

adminSchema
    .virtual('detail_url')
    .get(function () {
        return '/thong_tin_admin/' + this._id;
    })
//Export model
module.exports = mongoose.model('admins', adminSchema);