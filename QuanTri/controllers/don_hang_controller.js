const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var goods = require('../models/don_hang');

var user = "temp";

const bcrypt = require('bcrypt');
let saltRounds = 10
function doTheHash(pass) {
    bcrypt.hash(pass, saltRounds, (err, hash)=>{
        if(!err){
            return hash;
        }else{
            console.log('Error', err);
        }
    })
}

function doTheCompare(passInput, passReal) {
    bcrypt.compare(passInput, passReal, (err, res)=>{
        if(!err){
            return res;
        }else{
            console.log('Error', err);
        }
    })
}

exports.index = function(req, res) {
    console.log('don_hang.index');
    res.render('don_hang', {title: '', user: req.user});
};