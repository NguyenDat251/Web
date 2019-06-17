const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var data = require('../models/don_hang');
var store = require('../models/danh_sach_cua_hang');
var list_product = require('../models/danh_sach_san_pham');
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
// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve('resolved');
//         }, 2000);
//     });
// }
exports.index =  function(req, res) {
    if (req.isAuthenticated()) {
        data.find()
            .exec( async function (err, list_items) {
                if (err) {
                    console.log("don't find");
                    return next(err);
                }
                //Successful, so render
                console.log("Successful list_items");
                console.log(list_items);

            let theNameStore = new Array();
            let theNameReceiver = new Array();
               // var result = await resolveAfter2Seconds();
            var n = list_items.length;
            //console.log(n);
            var i =0;
            while (i < n){
               // console.log(list_items[i].id_store);
                await store.findById(list_items[i].id_store, function (err, nameStore ) {
                    //console.log("name store" + nameStore.name + "");
                    theNameStore.push(nameStore);

                });
                console.log(i);
                i++;
            }
                var j =0;
                while (j < n){
                    console.log(list_items[j].id_receiver);
                    await store.findById(list_items[j].id_receiver, function (err, nameReceiver ) {
                        console.log("name store" + nameReceiver.name + "");
                        theNameReceiver.push(nameReceiver);

                    });
                    console.log(i);
                    i++;
                }

                //res.render('danh_sach_tai_khoan', {title: '', list_items: list_items});
                res.render('don_hang', {title: '', list_items: list_items, nameStores : theNameStore, nameReceivers: theNameReceiver, user: req.user});
            });

    } else {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('dang_nhap', {
            errorText: ''
        });
    }
};
