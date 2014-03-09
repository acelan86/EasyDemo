
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view option', {layout: false});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use('/download/demo', function (req, res, next) {
    if (/\.html\s*$/.test(req.path)) {
        res.setHeader('Content-Type', 'application/octet-stream');
        var index = req.path.lastIndexOf('/');
        index = index < 0 ? 0 : (index + 1);
        res.setHeader('Content-Disposition', 'attachment; filename="' + req.path.substr(index) + '"');
    }
    next();
}).use('/download/demo', express.static(path.join(__dirname, 'public/demo')));

app.use('/public/demo', function (req, res, next) {
    //fix http response header content-type: text/html;charset:UTF-8 
    console.log(req.path);
    if (/\.html\s*$/.test(req.path)) {
        res.setHeader('Content-Type', 'text/html');
    }
    next();
}).use('/public/demo', express.static(path.join(__dirname, 'public/demo')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.post('/api/fetchURL', api.fetchURL);
app.post('/api/save', api.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
