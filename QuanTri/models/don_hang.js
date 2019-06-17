var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartItemSchema = new Schema(
    {
        id_store : {type: String, required: true, max: 100},
        list_prduct: {type: Array},
        number: {type: Number},
        total_price: {type: String},
        id_receiver: {type: String},
    }
);

//Export model
module.exports = mongoose.model('dat_hangs', CartItemSchema);