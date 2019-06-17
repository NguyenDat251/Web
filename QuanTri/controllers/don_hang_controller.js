const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var data = require('../models/don_hang');
var store = require('../models/danh_sach_cua_hang');
var list_product = require('../models/danh_sach_san_pham');
var receiver = require('../models/danh_sach_nguoi_nhan');
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
                    //console.log(i);
                    i++;
                }

                //don_hang.id_receiver = nguoi_nhans.id => return nameReceiver : nguoi_nhans.name_receiver
               let theNameReceiver = new Array();
               var m = list_items.length;
               console.log(m);
                var j = 0;
                while (j < m) {
                    console.log(list_items[j].id_receiver);

                    await receiver.findById(list_items[j].id_receiver, function (err, nameReceiver) {
                            console.log("name receiver" + nameReceiver.name_receiver + "");
                        theNameReceiver.push(nameReceiver);
                    });
                    console.log(j);
                    j++;
                }

                let listProducts = new Array();
                var num = list_items.length;
                console.log(num);
                var l = 0;
                while (l < num) {
                    console.log("list_product: " + list_items[l].list_prduct + "");
                    //var k =0;
                    // console.log(list_items[l].list_prduct.length);
                    // await receiver.findById(list_items[l].id_receiver, function (err, nameReceiver) {
                    //     console.log("name receiver" + nameReceiver.name_receiver + "");
                    //     theNameReceiver.push(nameReceiver);
                    // });
                    console.log(l);
                    l++;
                }
                // receiver.find()
                //     .exec(function (err, lists) {
                //         if (err) {
                //             console.log("don't find");
                //             return next(err);
                //         }
                //         //Successful, so render
                //         console.log("Successful, lists");
                //         console.log(lists);
                //         //res.render('danh_sach_tai_khoan', {title: '', list_items: list_items});
                //         //res.render('danh_sach_tai_khoan', {title: '', list_items: list_items, user: req.user});
                //     });

                res.render('don_hang', {title: '', list_items: list_items, nameStores: theNameStore, nameReceivers: theNameReceiver, user: req.user});
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
