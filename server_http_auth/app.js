var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var crypto = require('crypto');
var name = 'braitsch';



const DeepstreamServer = require('deepstream.io');
const MongoDBStorageConnector = require( 'deepstream.io-storage-mongodb' );
const C = DeepstreamServer.constants;
var jwt = require('jsonwebtoken');

var fs = require('fs');
var users =[];

function readContent(callback) {
    fs.readFile("users.json", function (err, content) {
        if (err) return callback(err)
        callback(null, content)
    })
}

readContent(function (err, content) {
    users = JSON.parse(content);
    //console.log(users);
});

function getCookie( src, name ) {
    var value = "; " + src;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function getUser(uName){
    for(var i in users)
    {
        if(users[i].username === uName){
                return users[i];
        }
    }
    return null;
}

const server = new DeepstreamServer({
    libDir: '../lib',
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
          }
});

server.set( 'storage', new MongoDBStorageConnector( {
    connectionString:  'mongodb://ze:maradona10@ds061454.mlab.com:61454/scriptedjamdb',
    splitChar: '/'
}));


server.start();



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

    var user = getUser(req.body.username);
    var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    if(user != null){
        if(user.password === hash)
        {
            var token = jwt.sign(user, 'abrakadabra');
            console.log("token::"+token); // ,
            res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
            res.json({'access_token':token});
            return;
        }
    }
    res.status(403).send('Invalid Credentials');
});

app.post('/check-token', function(req, res) {

    var token = getCookie(req.body.connectionData.headers.cookie, 'access_token');
    jwt.verify(token, 'abrakadabra', function(err, decoded) {
        if (err) {
            res.status(403).send('Failed to authenticate token.' );
        } else {
            res.status(200).json({
                clientData: { username: decoded.username }
            });
        } // username: decoded.username
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

app.post('/handle-register',cors(corsOptionsDelegate) , function(req,res){

    console.log("handle-register");
    var hash = crypto.createHash('md5').update(req.body.password).digest('hex');
    var user = getUser(req.body.username);
    if(user === null){
        users.push({username:req.body.username,password:hash});
        var json = JSON.stringify(users);
        fs.writeFileSync('users.json', json, 'utf8');

        console.log(user);

        var token = jwt.sign({username:req.body.username,password:hash}, 'abrakadabra');
        console.log("token::"+token); // ,
        res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        res.json({'access_token':token});

    }
    //res.status(403).send('USER EXISTS');

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
