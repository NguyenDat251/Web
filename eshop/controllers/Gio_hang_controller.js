var dataProduct = require('../models/San_pham');
var dataUser = require('../models/tai_khoan')

async function fineItems(i_listItems, i_listResult){
    for(let i = 0; i < i_listItems.length; i++){
        //console.log(req.user.listProducts[i]);
        await dataProduct.findById(i_listItems[i], function (err, item) {
            if(err){
                console.log("lỗi lần ");
                return next(err);
            }
            else {
                console.log("item: " + i + item.name);
                i_listResult.push(item);
            }
        })

        ;

    };
}

exports.index = async function(req, res) {
    if (req.isAuthenticated()) {
    var list_items = new Array();
    console.log("req.user.listProducts.length: " + req.user.listProducts.length);

        await fineItems(req.user.listProducts, list_items);


        console.log(list_items);
        res.render('Gio_hang', {title: 'Cửa hàng', user: req.user, list_items: list_items});
    }
    else {
        res.redirect('login');
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
        res.redirect('../login');
    }
};

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

