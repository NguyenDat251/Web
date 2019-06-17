
// const ObjectId = require('mongodb').ObjectId;
// const dbs = require('../dbs/index.js');
// var mongo = require('mongodb').MongoClient;
// var objectId = require('mongodb').ObjectID;
// var assert = require('assert');



var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BinhLuanSchema = new Schema(
    {
        id_product: {type: String},
        name: {type: String, required: true, max: 100},
        comment: {type: String}
    }
);



//Export model
module.exports = mongoose.model('binh_luans', BinhLuanSchema);

