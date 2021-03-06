var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var AccountSchema = new Schema(
    {
        name: {type: String, required: 'Vui lòng không để trống', max: 100},
        password: {type: String},
        email:{type: String, unique: true},
        date:{type: String},
        phone:{type: String},
        resetPasswordToken: {type: String, default:''},
        resetPasswordExpires: {type: Date, default: Date.now},
        listProducts:{type: Array},
        totalCost:{type: Number, default: '0'},

    }
);


// AccountSchema
//     .virtual('url')
//     .get(function () {
//         return '/Sua_thong_tin/' + this._id;
//     });
AccountSchema.plugin(passportLocalMongoose);
//Export model
module.exports = mongoose.model('tai_khoans', AccountSchema);