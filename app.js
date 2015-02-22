/* app.js for bottled server
 * author: Hyun Sik Kim
 * borrows from JS Tan's project "Alive"
 */

/* REQUIRE NPM-MANAGED MODULES */
var express         = require('express'),
    debug           = require('debug')('app.js'),
    mongoose        = require('mongoose'),
    path            = require('path'),
    bodyParser      = require('body-parser');

/* CREATE EXPRESS APP */
var app             = express();

/* CONNECT TO DB */
mongoose.connect('mongodb://localhost:27017/bottled');

/* CONFIGURE APP */
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* SET UP ROUTES FOR API */

// TODO routes/api(app)

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/* ERROR HANDLERS */

// 'development' by default
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
