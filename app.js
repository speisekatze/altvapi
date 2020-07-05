var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');
const { SHA3 } = require('sha3');

var index = require('./routes/index');
var users = require('./routes/users');
var characters = require('./routes/characters');

const fs = require('fs');

var rawdata = fs.readFileSync('config/clients.json');
var clients = JSON.parse(rawdata)['clients'];

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('clients', clients);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Database connection
app.use(function(req, res, next){
var client = req.headers.client;
  var clients = req.app.get('clients');
	salt = '';
  for (var i=0; i<clients.length;i++) {
  c = clients[i];
    if (c.id == client) {
      salt = c.secret;
    }
  }
  
  var s = salt;
  var h = req.headers.secret;
  var m = req.headers.client + req.headers.host + req.path + JSON.stringify(req.body);
  const hash = new SHA3(512);
  hash.update(m + s);
  if (h == hash.digest('hex')) {
    console.log('ok');
  } else {
    res.send(JSON.stringify({"status": 403, "error": 'unauthorized', "response": null}));
    return;
  }
  var rawdata = fs.readFileSync('config/mysql.json');
  var config = JSON.parse(rawdata);
	global.connection = mysql.createConnection({
	  	host     : config.host,
	  	user     : config.user,
	  	password : config.password,
  		database : config.database
	});
	connection.connect();
	next();
});



app.use('/', index);
app.use('/api/v1/accounts', users);
app.use('/api/v1/chars', characters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var server = http.createServer(app);
server.listen(4001);
