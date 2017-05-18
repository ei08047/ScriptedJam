var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const DeepstreamServer = require('deepstream.io')
const C = DeepstreamServer.constants


const server = new DeepstreamServer({
    host: 'localhost',
    port: 6020,
    auth :
        {
          type: 'http',
          options:{
            endpointUrl:'http://localhost:3002/auth-user',
            permittedStatusCodes: [ 200 ],
            requestTimeout: 2000
            }
          },
});

server.start();




var index = require('./routes/index');
var users = require('./routes/users');





var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/auth-user', function(req, res) {
    console.log("entered auth-user route");
    if (req.body.authData.username === "chris") {
        res.json({
            username: 'chris',
            clientData: { themeColor: 'pink' },
            serverData: { role: 'admin' }
        })
    } else {
        res.status(403).send('Invalid Credentials')
    }
})


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
