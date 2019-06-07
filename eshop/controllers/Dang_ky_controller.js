const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var data = require('../models/tai_khoan');


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

exports.sign_in = [

    // Validate that the name field is not empty.
    body('name', 'name required').isLength({ min: 1 }).trim(),
    body('password', 'name required').isLength({ min: 1 }).trim(),
    //console.log("check"),
    // Sanitize (escape) the name field.
    sanitizeBody('name').escape(),
    sanitizeBody('password').escape(),
    //console.log("escape"),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var account = new data(
            {
                name: req.body.name,
                password: doTheHash(req.body.password),
                email: req.body.email,
                date: req.body.date,
                phone: req.body.phone,
            }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            console.log("error");
            res.render('dang_ky', { title: 'Không được bỏ trống'});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            data.findOne({ 'name': req.body.name })
                .exec( function(err, found_account) {
                    if (err) {
                        console.log("error exec");
                        return next(err); }

                    if (found_account) {
                        // Genre exists, redirect to its detail page.
                        res.render('Dang_ky', { title: 'Tên đã tồn tại'});
                    }
                    else if(req.body.password != req.body.passwordReEnter)
                        res.render('Dang_ky', { title: 'Mật khẩu nhập lại không trùng'});
                    else {

                        account.save(function (err) {
                            if (err) {
                                console.log("error save");
                                return next(err); }
                            // Genre saved. Redirect to genre detail page.
                            console.log("success");
                            // try {
                                req.logIn(account, function (err) {
                                    if (err) {
                                        console.log("err sign up: " + err);
                                        return next(err);
                                    }
                                    console.log("success sing up");
                                    res.redirect('/Cua_hang');
                                });

                            // }catch(er) {console.log(er);}
                        });

                    }

                });
        }
    }
];

