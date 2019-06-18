const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var data = require('../models/da_giao');
var list = null;
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

exports.index =  function(req, res) {
    console.log("top 10 sản phẩm");
    if (req.isAuthenticated()) {
        data.find()
            .exec(async function (err, list_items) {
                if (err) {
                    console.log("don't find");
                    return next(err);
                }
                var listForSort = list_items;
                console.log(listForSort);
                console.log("begin sorting");
                for(var i = 0; i < listForSort.length; i++)
                {
                    for(var j = listForSort.length - 1 - i; j >= 0; j--)
                    {
                        if(listForSort[j].total_price > listForSort[i].total_price){
                            var temp = listForSort[j].total_price;
                            listForSort[j].total_price = listForSort[i].total_price;
                            listForSort[i].total_price = temp;
                        }
                    }
                }


                //Successful, so render
                console.log("Successful top_10_san_pham");
              //  console.log(list_items);

                res.render('top_10_san_pham', {title: '', list_item: listForSort,  user: req.user});
            });
    }
    else {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('dang_nhap', {
            errorText: ''
        });
    }

};