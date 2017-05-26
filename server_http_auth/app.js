

var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const DeepstreamServer = require('deepstream.io');
const C = DeepstreamServer.constants;
var jwt = require('jsonwebtoken');


const server = new DeepstreamServer({
    host: 'localhost',
    port: 6020,
    auth :
        {
          type: 'http',
          options:{
            endpointUrl:'http://localhost:3002/check-token',
            permittedStatusCodes: [ 200 ],
            requestTimeout: 2000
            }
          },
});
server.start();

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', index);
//app.use('/users', users);

var whitelist = ['http://localhost:3000', 'http://localhost:3000/#/login'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        console.log("header::"+req.header('Origin'));
        corsOptions = { origin: true ,credentials:true} // reflect (enable) the requested origin in the CORS response
    }else{
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.options("/*", function(req, res, next){
    console.log("GOT IT");
    res.header('Access-Control-Allow-Origin', '*');
    res.header.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header.set('origin', 'http://localhost:3002');
    res.send(200);
});

app.post('/handle-login', cors(corsOptionsDelegate) , function(req, res) {
    console.log("(SERVER)entered auth-user route");
    //TODO: get users from file
    var users = {
        wolfram: {
            username: 'wolfram',
            password: 'password'
        },
        chris: {
            username: 'chris',
            password: 'password'
        }
    };
    var user = users[req.body.username];
    console.log("username::"+req.body.username);
    if (req.body.username === "chris") {
        /*
        res.json({
            username: 'chris',
            clientData: { themeColor: 'pink' },
            serverData: { role: 'admin' }
        })*/
        var token = jwt.sign(user, 'abrakadabra');
        console.log("token::"+token); // ,
        res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        //res.json({'hello':'world'});
        res.json({'access_token':token});
        //res.cookie('access_token', token,{httpOnly: false}).status(301);//.redirect('http://localhost:3000/#/rooms')

    } else {
        res.status(403).send('Invalid Credentials')
    }
});

app.post('/check-token', function(req, res) {

    var token = getCookie(req.body.connectionData.headers.cookie, 'access_token');
    jwt.verify(token, 'abrakadabra', function(err, decoded) {
        if (err) {
            res.status(403).send('Failed to authenticate token.' );
        } else {
            // if everything is good, save to request for use in other routes
            res.status(200).json({
                username: decoded.username
            });
        }
    });

    /*
    if (req.body.authData.username === "chris") {
        res.json({
            username: 'chris',
            clientData: { themeColor: 'pink' },
            serverData: { role: 'admin' }
        })
    } else {
        res.status(403).send('Invalid Credentials')
    }
    */
})

app.post('/handle-register', function(req,res){
    // TODO:
    //generate hash with deepstream
    // save user and password to file
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
