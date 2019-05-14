// const ObjectId = require('mongodb').ObjectId;
// const { dbs } = require('../dbs/index');
//
// const detail = async (id) => {
//     const results = await dbs.production.collection('SanPham').find({_id: ObjectId(id)})
//         .toArray();
//     return results[0];
// };
//
// exports.detail = detail;
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SanphamShecma = new Schema(
    {
        idcuahang: {type: String, required: true, max: 100},
        tensp: {type: String, required: true, max: 100},
        gia: {type: String, required: true, max: 100},
        soluong: {type: Double},
        maloaisp: {type: String, required: true, max: 100},
        hinhanh: {type: String, required: true, max: 100},
        mota: {type: String, required: true, max: 1000},
        khuyenmai: {type: Double},
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
SanphamShecma
    .virtual('url')
    .get(function () {
        return '/San_pham/' + this._id;
    });

//Export model
module.exports = mongoose.model('San_pham', SanphamShecma);