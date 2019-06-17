
// const ObjectId = require('mongodb').ObjectId;
// const dbs = require('../dbs/index.js');
// var mongo = require('mongodb').MongoClient;
// var objectId = require('mongodb').ObjectID;
// var assert = require('assert');



var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SanphamShecma = new Schema(
    {
        //_id:{type: Schema.Types.ObjectId, required: true, max: 100},
        id_store: {type: String, required: true, max: 100},
        name: {type: String, required: true, max: 100},
        price: {type: String, required: true, max: 100},
        price_sale: {type: String, required: true, max: 100},
        number: {type: Number, required: true, max: 100},
        type: {type: String, required: true, max: 100},
            brand: {type: String, required: true, max: 100},
            gender: {type: String, required: true, max: 100},
        img: {type: String, required: true},
        info: {type: String, required: true, max: 1000},
        sale: {type: Number, required: true, max: 100},
        TimesWatched: {type: Number, required: true, max: 100},
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
        return '/productInfo/' + this._id;
    });

SanphamShecma
    .virtual('urlCart')
    .get(function () {
        return '/Gio_hang/' + this._id;
    });

SanphamShecma
    .virtual('removeInCartUrl')
    .get(function () {
        return '/Gio_hang/removeInCart/' + this._id;
    });

SanphamShecma
    .virtual('commentUrl')
    .get(function () {
        return '/productInfo/' + this._id + "/comment";
    });
//Export model
module.exports = mongoose.model('san_phams', SanphamShecma);

