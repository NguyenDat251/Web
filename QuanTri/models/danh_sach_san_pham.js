var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductShecma = new Schema(
    {

        name: {type: String, required: true, max: 100},
        price: {type: String, required: true, max: 100},
        price_sale: {type: String, required: true, max: 100},
        number: {type: String, required: true, max: 100},
        type: {type: String, required: true, max: 100},
        img: {type: String, required: true, max: 100},
        info: {type: String, required: true, max: 100},
        sale: {type: String, required: true, max: 100},
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
ProductShecma
    .virtual('url')
    .get(function () {
        return '/thay_doi_thong_tin_san_pham/' + this._id;
    });

ProductShecma
    .virtual('delete_url')
    .get(function () {
        return '/xoa_san_pham/' + this._id;
    });

//Export model
module.exports = mongoose.model('san_phams', ProductShecma);