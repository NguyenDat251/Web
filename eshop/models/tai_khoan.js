var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccountSchema = new Schema(
    {
        name: {type: String, required: 'Vui lòng không để trống', max: 100},
        password: {type: String},
        email:{type: String},
        date:{type: String},
        phone:{type: String},
            listProducts:{type: Array},
    }
);



//Export model
module.exports = mongoose.model('tai_khoans', AccountSchema);