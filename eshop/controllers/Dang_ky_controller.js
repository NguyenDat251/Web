const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var data = require('../models/tai_khoan');
const bcrypt = require('bcrypt');
var crypto = require("crypto");
var async = require("async");
var nodemailer = require("nodemailer");
var data = require('../models/tai_khoan');

function generateHash(pass)
{
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}



exports.sign_up = [
    // Validate that the name field is not empty.
    body('name', 'name required').isLength({ min: 1 }).trim(),
    body('password', 'password required').isLength({ min: 1 }).trim(),
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
                password: generateHash(req.body.password),
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
                                    console.log("success sign up");
                                    res.redirect('/Cua_hang');
                                });

                            // }catch(er) {console.log(er);}
                        });
                    }
                });
        }
    }
];

exports.forget_password=function (req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            data.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    return res.redirect('/Dang_nhap');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    type:'login',
                    user: 'tancaominh98@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'tancaominh98@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'Bạn nhận được tin nhắn này vì bạn (hoặc ai đó) đã yêu cầu thay đổi mật khẩu.\n\n' +
                    'Hãy truy cập vào đường dẫn bên dưới để thay đổi mật khẩu:\n\n' +
                    'http://' + req.headers.host + '/Doi_mat_khau_moi/' + token + '\n\n' +
                    'Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua tin nhắn này và mật khẩu bạn sẽ không thay đổi.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/Dang_nhap');
    })
};

exports.reset_password=function (req, res) {
    async.waterfall([
        function() {
            console.log(req.body);
            data.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    console.log('dk-c.143');
                    return res.redirect('back');
                }
                if(req.body.newPass1 === req.body.newPass2) {
                    user.setPassword(req.body.newPass1, function() {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.password = generateHash(req.body.newPass1);
                        console.log(user.name);
                            user.save(function (err) {
                            if (err) {
                                console.log("error save");
                                return next(err); }
                            // Genre saved. Redirect to genre detail page.
                            console.log("success");
                            // try {
                            req.logIn(user, function (err) {
                                if (err) {
                                    console.log("err sign up: " + err);
                                    return next(err);
                                }
                                console.log("success sign up");
                                res.redirect('/Cua_hang');
                            });
                        });
                    })
                } else {
                    console.log('dk-c.171');
                    return res.redirect('back');
                }
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'tancaominh98@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'tancaominh98@gmail.com',
                subject: 'Mật khẩu của bạn đã được thay đổi!',
                text: 'Xin chào,\n\n' +
                    'Đây là thông báo rằng mật khẩu của tài khoản ' + user.name + ' đã được thay đổi.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                done(err);
            });
        }
    ], function() {
        res.redirect('/Cua_hang');
    })
};