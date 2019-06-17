var goods = require('../models/Cua_hang');
var data = require('../models/San_pham');
var dataComment = require('../models/Binh_luan');
var async = require('async');
var list = null;
var list_type = null;
var list_brand = null;
var numPage = 0;
var numPageCmt = 0;

var tempRes = null;
var tempReq = null;

function findListItem()
{
    data.find()
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            return list_items;
        });

};




exports.index =  function (req, res) {

//     data.find()
//         .exec(function (err, list_items) {
//             if (err) {
//                 console.log("falseeee");
//                 return next(err);
//             }
//             console.log("Successful, so render");
//     if (req.isAuthenticated()) {
//         console.log("Show Cua_hang page");
//
//         res.render('Cua_hang', {title: 'Áo Khoác', user: user, list_items: list_items});
//     }
//     else{
//
//         res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: list_items});
//     }}
//
// )};

    async.parallel({
        list: function(callback) {
            data.find()
                .exec(callback);
        },

        list_type: function(callback) {
            data.distinct("type")
                .exec(callback);
        },

        list_brand: function(callback) {
            data.distinct("brand")
                .exec(callback);
        },

    }, function(err, results) {
        if (err) { res.direct('/'); }
        if (results.list_type==null) { // No results.
            var err = new Error('list not found');
            err.status = 404;
            res.direct('/');
        }
        // Successful, so render
        list = results.list;
        list_type = results.list_type;
        list_brand = results.list_brand;
        tempRes = res;
        tempReq = req;
        numPage = 0;
        renderPage(req, res, results.list);
        // if (req.isAuthenticated()) {
        //     res.render('Cua_hang', {title: 'Genre Detail', user: req.user, list_items: results.list, list_type: results.list_type, list_brand: results.list_brand, num_page: numPage});
        // }
        // else {
        //     res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: results.list, list_type: results.list_type, list_brand: results.list_brand, num_page: numPage});
        // }
    });


}
//const data =


exports.ShowList = function (req, res, next) {
    data.find()
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            //return list_items;
            res.render('Cua_hang', {title: 'Áo Khoác', list_items: list_items});
        });
};

exports.type = function (req, res, next) {
    data.find({type: req.params.type})
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            console.log(list_items);
            res.render('Loai_SP', {title: 'Áo Khoác', list_items: list_items});
        });
};

exports.info = async (req, res, next) => {
    console.log("begin info");
    async.parallel({
            item: function(callback) {
                data.find({_id: req.params.id})
                    .exec(callback);
            },

            listComments: function(callback) {
                dataComment.find({id_product: req.params.id})
                    .exec(callback);
            },


        }, function (err, results) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            else {
                if (results.item==null) { // No results.
                    var err = new Error('Item not found');
                    err.status = 404;
                    res.redirect('../');
                }
                console.log("Successful, so render info");
                //results.item[0].TimesWatched = results.item[0].TimesWatched + 1;

                var newOne = new data({
                    id_store: results.item[0].id_store,
                    name: results.item[0].name,
                    price: results.item[0].price,
                    price_sale: results.item[0].price_sale,
                    number: results.item[0].number,
                    type: results.item[0].type,
                    brand: results.item[0].brand,
                    gender: results.item[0].gender,
                    img: results.item[0].img,
                    info: results.item[0].info,
                    sale: results.item[0].sale,
                    TimesWatched: results.item[0].TimesWatched + 1,
                    _id:req.params.id //This is required, or a new ID will be assigned!
                });
                console.log("time: " + results.item[0].TimesWatched);
                data.findByIdAndUpdate(req.params.id, newOne, {}, function (err,item) {
                    if (err) {
                        console.log("false time");
                        return next(err);}
                });

                res.render('San_pham', {
                    title: 'Áo Khoác',
                    item: results.item[0],
                    user:req.user,
                    list_items: list,
                    list_comments: results.listComments,
                    numPageCmt: numPageCmt
                })
            }
            ;


        });
};

exports.search= function (req, res, next) {
    //var e = document.getElementById("selectType");

    var strType = req.body.selectedType;
    var strBrand = req.body.selectedBrand;
    var strGender = req.body.selectedGender;

    console.log("selectedType: " + req.body.selectedType);
    console.log("searchBar: " + req.body.searchBar);
    data.find({"name": {'$regex': req.body.searchBar}})
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            if (list_items==null) { // No results.
                var err = new Error('list not found');
                err.status = 404;
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            //console.log(list_items);
            var listTrueItem = new Array();

            //     listTrueItem = list_items;
            // else{
            for(var i = 0; i < list_items.length; i++)
            {
                //console.log(list_items[i].type);
                if((list_items[i].type == strType || strType=="Tất cả") && (list_items[i].brand == strBrand || strBrand=="Tất cả") && (list_items[i].gender == strGender || strGender=="Tất cả")) {
                    console.log("true");
                    listTrueItem.push(list_items[i]);
                }
            }
            renderPage(req, res, listTrueItem);
            // if (req.isAuthenticated()) {
            //     res.render('Cua_hang', {title: 'Genre Detail', user: req.user, list_items: listTrueItem, list_type: list_type, list_brand: list_brand, num_page: numPage});
            // }
            // else {
            //     res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: listTrueItem, list_type: list_type, list_brand: list_brand, num_page: numPage});
            // }
        });


    // async.parallel({
    //     list: function(callback) {
    //         data.find()
    //             .exec(callback);
    //     },
    //
    //     list_type: function(callback) {
    //         data.distinct("type")
    //             .exec(callback);
    //     },
    //
    // }, function(err, results) {
    //     if (err) { return next(err); }
    //     if (results.list_type==null) { // No results.
    //         var err = new Error('list not found');
    //         err.status = 404;
    //         return next(err);
    //     }
    //     // Successful, so render
    //     list_type = results.list_type;
    //     if (req.isAuthenticated()) {
    //         res.render('Cua_hang', {title: 'Genre Detail', user: req.user, list_items: results.list, list_type: results.list_type});
    //     }
    //     else {
    //         res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: results.list, list_type: results.list_type});
    //     }
    // });
}

exports.moveNextPage = function(req, res, next){
    numPage = req.query.id;
    //res.redirect('/');
    //renderPage(req, res, list);
    if (req.isAuthenticated()) {
        res.render('Cua_hang', {title: 'Genre Detail', user: req.user, list_items: list, list_type: list_type, list_brand: list_brand, numPage: numPage});
    }
    else {
        res.render('Cua_hang', {title: 'Áo Khoác', user: null, list_items: list, list_type: list_type, list_brand: list_brand, numPage: numPage});
    }
}

exports.moveCommentPage = function(req, res, next){
    numPageCmt = req.query.id;
    //res.redirect('/');
    //renderPage(req, res, list);
    console.log("move cmt page");
         res.redirect('/productInfo/' + req.params.id);

}


exports.SortUp = function() {
    var listForSort = list;
    console.log("begin sorting");
    for(var i = 0; i < listForSort.length; i++)
    {
        for(var j = listForSort.length - 1 - i; j >= 0; j--)
        {
            if(listForSort[j].price_sale > listForSort[i].price_sale){
                var temp = listForSort[j].price_sale;
                listForSort[j].price_sale = listForSort[i].price_sale;
                listForSort[i].price_sale = temp;
            }
        }
    }

    renderPage(tempReq, tempRes, listForSort);
}

exports.comment =  function (req, res) {
    var nameUser = null;
    if(req.isAuthenticated()){
        nameUser = req.user.name;
    }
    else{
        nameUser = req.body.name;
    }

    var newComment = new dataComment({
        id_product: req.params.id,
        name: nameUser,
        comment: req.body.comment,

    });

    console.log("req.params.id: " + req.params.id);

    newComment.save(function (err) {
        if (err) {
            console.log("error save");
            res.redirect('them_san_pham');}
        // Genre saved. Redirect to genre detail page.
        console.log("success");
        res.redirect('/ProductInfo/' + req.params.id);
    })

}

function renderPage(req, res, i_list){
    if (req.isAuthenticated()) {
        res.render('Cua_hang', {title: 'Cửa hàng', user: req.user, list_items: i_list, list_type: list_type, list_brand: list_brand, numPage: numPage});
    }
    else {
        res.render('Cua_hang', {title: 'Cửa hàng', user: null, list_items: i_list, list_type: list_type, list_brand: list_brand, numPage: numPage});
    }
}


