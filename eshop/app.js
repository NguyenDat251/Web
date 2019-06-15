var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var data = require('./models/tai_khoan');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var flash = require("connect-flash");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');
var Cua_hang_Router = require('./routes/Cua_hang');
var Gio_hang_Router = require('./routes/Gio_hang');
//var San_pham_Router = require('./routes/San_pham');
//var Cua_hang_Controller = require('./controllers/Cua_hang_controller');

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// //Set up mongoose connection
// var mongoose = require('mongoose');
// var mongoDB = 'mongodb+srv://dat:dat251@cluster0-jslyd.mongodb.net/WebDB?retryWrites=true';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://dat:dat251@cluster0-jslyd.mongodb.net/WebDB?retryWrites=true';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Express Session
app.use(session({
  secret: 'anything',
  saveUninitialized: false,
  resave: false
}));

// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('local', new LocalStrategy({
        passReqToCallback: true
    },
    async function (req, username, password, done) {
        console.log("begin search!");
        await data.find({"name":username})
            .exec(function (err, item) {

                if (err) {
                    console.log("find false!");
                    return done(null, false);
                }
                else {
                    if(item.length == 0)
                    {
                        console.log("name false!");
                        req.authError = "Sai tên đăng nhập";
                        return done(null, false);
                    }
                    else {
                        try {
                            bcrypt.compare(req.body.password, item[0].password, (err, res) => {
                                if (!err) {
                                    if (res) {
                                        const user = item[0];
                                        return done(null, user);

                                    } else {
                                        console.log("password false!");
                                        req.authError = "Sai mật khẩu";
                                        return done(null, false);
                                    }

                                } else {
                                    console.log('Error: ' + err);
                                }
                            })
                        }
                        catch (e) {
                            console.log('Error tryCatch: ' + e);
                        }
                    }
                }
            });
    }));

// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });



// ROUTE SECTION ###########
app.use('/', indexRouter);
app.use('/Cua_hang', Cua_hang_Router);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/Gio_hang', Gio_hang_Router);
//app.use('/productInfo', San_pham_Router);

app.post('/Dang_nhap',
    passport.authenticate('local', {
        failWithError: true
    }),
    function (req, res) {
        console.log("Da dang nhap")
        res.redirect('/Cua_hang');
    },
    function (err, req, res, next) {

        if (req.authError) {
            console.log("login false!");
            res.render('Dang_nhap', {
                errorText: req.authError
            });
        }
    }
);

// app.get('/logout', function(req, res)
// {
//   req.logout();
//   res.redirect('Cua_hang');
// })


//catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("lỗiiiiiiiiiiiiii");
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.user = req.user || null;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
