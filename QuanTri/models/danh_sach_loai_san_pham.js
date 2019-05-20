var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TypeShecma = new Schema(
    {

        name: {type: String, required: true, max: 100},

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
TypeShecma
    .virtual('url')
    .get(function () {
        return '/thay_doi_thong_tin_loai_san_pham/' + this._id;
    });

TypeShecma
    .virtual('delete_url')
    .get(function () {
        return '/xoa_loai_san_pham/' + this._id;
    });

//Export model
module.exports = mongoose.model('loai_sps', TypeShecma);