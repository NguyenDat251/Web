var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SanphamShecma = new Schema(
    {
        _id:{type: Schema.Types.ObjectId, required: true, max: 100},

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
SanphamShecma
    .virtual('url')
    .get(function () {
        return '/productInfo/' + this._id;
    });

//Export model
module.exports = mongoose.model('cua_hangs', SanphamShecma);