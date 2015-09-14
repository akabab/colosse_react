var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));

// var config = require('./config.js');

var routes = {
    'index': require('./routes/index.route.js'),
};

var server = express();
var port = argv.port || process.env.PORT || 3000;

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
// server.use(favicon(__dirname + '/public/images/favicon.png'));
server.use(lessMiddleware(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, 'public')));

// routes
server.use('/', routes.index);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
    server.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = http.createServer(server).listen(port, function () {
    console.log("Server listening on port: %s", port);
});

module.exports = server;
