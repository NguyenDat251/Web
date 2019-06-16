var dataProduct = require('../models/San_pham');
var dataUser = require('../models/tai_khoan');

function delay() {
    return new Promise(resolve => setTimeout(resolve, 1));
}

async function pushList(i_listResult, item) {
    // notice that we can await a function
    // that returns a promise

    //i_listResult.push(item);

    return new Promise(await function(resolve) {
        i_listResult.push(item);
    });
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    var result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: 'resolved'
}

async function findItems(i_listItems, i_listResult){
    //console.log(i_listItems.length);
    // for(let i of i_listItems) {
    // await i_listItems.map(async i_item => {
    //     //     await dataProduct.findById(i_item, await async function (err, item) {
    //     //         if (err) {
    //     //             console.log("lỗi lần ");
    //     //             return next(err);
    //     //         } else {
    //     //             console.log("item: " + item.name);
    //     //
    //     //             // await new Promise((resolve, reject) => {
    //     //             //     (i_listResult, item) => {
    //     //             //         i_listResult.push(item);;
    //     //             //         resolve()
    //     //             //     }, 0);
    //     //             // });
    //     //
    //     //            await pushList(i_listResult, item);
    //     //         }
    //     //     })
    //     //
    //     //     ;
    //     //
    //     // });

    // await i_listItems.map(async i_item => {
    //     await dataProduct.findById(i_item, await async function (err, item) {
    //         if (err) {
    //             console.log("lỗi lần ");
    //             return next(err);
    //         } else {
    //             await pushList(i_listResult, item);
    //         }
    //     });
    // });await async function

    for(let i_item of i_listItems) {

        await dataProduct.findById(i_item, await async function   (err, item) {
                    if (err) {
                        console.log("lỗi lần ");
                        return next(err);
                    } else {
                        console.log(i_item);
                        await pushList(i_listResult, item);
                    }
                });

    };

};




exports.index = async function(req, res) {
    if (req.isAuthenticated()) {
    let list_items = new Array();
    console.log("req.user.listProducts.length: " + req.user.listProducts.length);

        await findItems(req.user.listProducts, list_items);

        await asyncCall();

        res.render('Gio_hang', {title: 'Cửa hàng', user: req.user, list_items: list_items});
    }
    else {
        res.redirect('Dang_nhap');
    }
};

exports.addProduct = async function(req, res) {
    if (req.isAuthenticated()) {

        var newListProducts = req.user.listProducts;
        console.log(req.params.id);
        var stringID = req.params.id;
        newListProducts.push(stringID);

        var newUser = new dataUser(
            {


                name: req.user.name,
                password : req.user.password,
                email : req.user.email,
                date: req.user.date,
                phone: req.user.phone,
                listProducts:newListProducts,
                totalCost: req.user.totalCost,
                _id:req.user._id //This is required, or a new ID will be assigned!
            });


            // Data from form is valid. Update the record.
        dataUser.findByIdAndUpdate(req.user._id, newUser, {}, function (err,item) {
                if (err) { return next(err); }
                // Successful - redirect to book detail page.
                console.log("success add product");
                res.redirect('../../');
            });
        }


    else {
        res.redirect('../Dang_nhap');
    }
};

async function createNewList(list, newList, stringID){
    for(let i_item of list) {
        if(i_item == stringID)
            continue;
        newList.push(i_item);
    }
    console.log("new list: ");
    console.log(newList);
    return newList;
}

exports.removeProduct = async function(req, res, next) {
    if (req.isAuthenticated()) {
        let newListProducts = new Array();
        console.log("id remove: " + req.params.id);
        var stringID = req.params.id;

        newListProducts = await createNewList(req.user.listProducts, newListProducts, stringID);
        console.log(newListProducts);

        var newUser = new dataUser(
            {


                name: req.user.name,
                password : req.user.password,
                email : req.user.email,
                date: req.user.date,
                phone: req.user.phone,
                listProducts:newListProducts,
                totalCost: req.user.totalCost,
                _id:req.user._id //This is required, or a new ID will be assigned!
            });


        // Data from form is valid. Update the record.
        await dataUser.findByIdAndUpdate(req.user._id, newUser, {}, async function (err,item) {
            if (err) { return next(err); }
            // Successful - redirect to book detail page.
            console.log("success remove product");
            let userTemp = req.user;
            await req.logout();
             await req.logIn(userTemp,{}, function (err) {
                if (err) {
                    console.log("err sign up: " + err);
                    return next(err);
                }

            }

            );
            console.log("success sing up");
            console.log("user.listProducts.length: " + req.user.listProducts.length);
            res.redirect('../../Gio_hang');
            //console.log(req.user.listProducts);
           // res.redirect('../Gio_hang');
         });

        //res.redirect('../../');
    }

    else {
        res.redirect('../../login');
    };
}

// function fineItems(i_listItems, i_listResult){
//     for(var i = 0; i < i_listItems.length; i++){
//         //console.log(req.user.listProducts[i]);
//         dataProduct.findById(i_listItems[i], function (err, item) {
//             if(err){
//                 console.log("lỗi lần ");
//                 return next(err);
//             }
//             else {
//                 console.log("item: " + i + item.name);
//                 i_listResult.push(item);
//             }
//         })
//
//         ;
//
//     };
// }

