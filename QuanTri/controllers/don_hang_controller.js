const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var data = require('../models/don_hang');
var store = require('../models/danh_sach_cua_hang');
var product = require('../models/danh_sach_san_pham');
var receiver = require('../models/danh_sach_nguoi_nhan');
var shipping = require('../models/dang_giao');
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
    if (req.isAuthenticated()) {
        data.find()
            .exec(async function (err, list_items) {
                if (err) {
                    console.log("don't find");
                    return next(err);
                }
                //Successful, so render
                console.log("Successful list_items");
                console.log(list_items);

                //don_hang.id_store = cua_hangs.id => return nameStores : cua_hangs.name
                let theNameStore = new Array();

                var n = list_items.length;
                var i = 0;
                while (i < n) {
                    await store.findById(list_items[i].id_store, function (err, nameStore) {
                        theNameStore.push(nameStore);
                    });
                    i++;
                }

                //don_hang.id_receiver = nguoi_nhans.id => return nameReceiver : nguoi_nhans.name_receiver
               let theNameReceiver = new Array();
                var j = 0;
                while (j < n) {
                    console.log(list_items[j].id_receiver);

                    await receiver.findById(list_items[j].id_receiver, function (err, nameReceiver) {
                            console.log("name receiver" + nameReceiver.name_receiver + "");
                        theNameReceiver.push(nameReceiver);
                    });
                    console.log(j);
                    j++;
                }

                //don_hang.id_receiver = nguoi_nhans.id => return nameReceiver : nguoi_nhans.name_receiver
                 let theNameProduct = new Array();
                 var k = 0;
                 while (k < n) {
                     console.log("list products: " + list_items[k].id_product + "");
                //
                     await product.findById(list_items[k].id_product, function (err, nameProduct) {
                         console.log("name product" + nameProduct.name + "");
                         theNameProduct.push(nameProduct);
                     });
                     console.log(k);
                     k++;
                 }

                res.render('don_hang', {title: '', list_items: list_items, nameStores: theNameStore, nameReceivers: theNameReceiver, nameProducts: theNameProduct,  user: req.user});
            })
    }
    else {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('dang_nhap', {
            errorText: ''
        });
    }

};

exports.shipping =function(req, res) {
    if (req.isAuthenticated()) {
        shipping.find()
            .exec(async function (err, list_items1) {
                if (err) {
                    console.log("don't find");
                    return next(err);
                }
                //Successful, so render
                console.log("Successful list_items1");
                console.log(list_items1);

                //don_hang.id_store = cua_hangs.id => return nameStores : cua_hangs.name
                let theNameStore = new Array();

                var n = list_items1.length;
                var i = 0;
                while (i < n) {
                    await store.findById(list_items1[i].id_store, function (err, nameStore) {
                        theNameStore.push(nameStore);
                    });
                    i++;
                }

                //don_hang.id_receiver = nguoi_nhans.id => return nameReceiver : nguoi_nhans.name_receiver
                let theNameReceiver = new Array();
                var j = 0;
                while (j < n) {
                    console.log(list_items1[j].id_receiver);

                    await receiver.findById(list_items1[j].id_receiver, function (err, nameReceiver) {
                        console.log("name receiver" + nameReceiver.name_receiver + "");
                        theNameReceiver.push(nameReceiver);
                    });
                    console.log(j);
                    j++;
                }

                //don_hang.id_receiver = nguoi_nhans.id => return nameReceiver : nguoi_nhans.name_receiver
                let theNameProduct = new Array();
                var k = 0;
                while (k < n) {
                    console.log("list products: " + list_items[k].id_product + "");
                    //
                    await product.findById(list_items[k].id_product, function (err, nameProduct) {
                        console.log("name product" + nameProduct.name + "");
                        theNameProduct.push(nameProduct);
                    });
                    console.log(k);
                    k++;
                }

                res.render('dang_giao', {title: '', list_items: list_items, nameStores: theNameStore, nameReceivers: theNameReceiver, nameProducts: theNameProduct,  user: req.user});
            })
    }
    else {
        console.log(req.user);
        console.log(req.isAuthenticated());
        res.render('dang_nhap', {
            errorText: ''
        });
    }

};