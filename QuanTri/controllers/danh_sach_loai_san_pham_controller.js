const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var data = require('../models/danh_sach_loai_san_pham');

exports.index = function(req, res, next) {
    data.find()
        .exec(function (err, list_items) {
            if (err) {
                console.log("falseeee");
                return next(err);
            }
            //Successful, so render
            console.log("Successful, so render");
            console.log(list_items);
            res.render('danh_sach_loai_san_pham', {title: '', list_items: list_items, user: req.user});
        });
};

exports.show_info = async (req, res, next) => {
    data.find({_id:req.params.id})
        .exec(function (err, item) {
            if (err) {
                console.log("falseeee");
                return next(err);


            }
            //Successful, so render
            else {
                if (item==null) { // No results.
                    var err = new Error('Item not found');
                    err.status = 404;
                    return next(err);
                }
                console.log("Successful, so render");
                console.log(item);
                res.render('thay_doi_thong_tin_loai_san_pham', {title: 'Áo Khoác', item: item[0],  user: req.user})
            }
            ;


        });
};


// Handle book update on POST.
exports.update_post = [
    // Validate fields.
    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),


    // Sanitize fields.
    sanitizeBody('title').escape(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var type = new data(
            { name: req.body.name,

                _id:req.params.id //This is required, or a new ID will be assigned!
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({

                },
                function(err, results) {
                    if (err) { return next(err); }


                    for (let i = 0; i < results.name.length; i++) {
                        if (type.name.indexOf(results.genres[i]._id) > -1) {
                            results.name[i].checked='true';
                        }
                    }
                    res.render('/thay_doi_thong_tin_loai_san_pham', { title: 'Update Book', item : results.name, errors: errors.array(),  user: req.user });
                });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            data.findByIdAndUpdate(req.params.id, type, {}, function (err,item) {
                if (err) { return next(err); }
                // Successful - redirect to book detail page.
                res.redirect('/danh_sach_loai_san_pham');
            });
        }
    }
];

exports.delete_post = function(req, res, next) {

    // async.parallel({
    //
    // }, function(err, results) {
    //     if (err) {
    //         console.log("connect false");
    //         return next(err); }
    //     // Success
    //
    //     else {
    //         // Author has no books. Delete object and redirect to the list of authors.
    data.findByIdAndRemove(req.params.id, function deleteAuthor(err) {
        if (err) {
            console.log("Delete false");
            return next(err); }
        // Success - go to author list
        res.redirect('/danh_sach_loai_san_pham')
    });


};



exports.add =  [

    // Validate that the name field is not empty.
    body('name', 'name required').isLength({ min: 1 }).trim(),
    // Sanitize (escape) the name field.
    sanitizeBody('name').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var type = new data(
            { name: req.body.name }
        );


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            console.log("error");
            res.render('/them_loai_san_pham', { title: 'Create Genre', genre: type, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            data.findOne({ 'name': req.body.name })
                .exec( function(err, found_genre) {
                    if (err) {
                        console.log("error exec");
                        return next(err); }

                    if (found_genre) {
                        // Genre exists, redirect to its detail page.
                        res.redirect(found_genre.url);
                    }
                    else {

                        type.save(function (err) {
                            if (err) {
                                console.log("error save");
                                return next(err); }
                            // Genre saved. Redirect to genre detail page.
                            console.log("success");
                            res.redirect('/danh_sach_loai_san_pham');
                        });

                    }

                });
        }
    }
];