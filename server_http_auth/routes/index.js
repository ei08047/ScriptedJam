var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});


/*
router.get('/login', function(req, res) {
    const deepstream = require('deepstream.io-client-js')
    const client = deepstream('localhost:6020'); //Change port to 6020 for browsers
    console.log("(APP)entered index route");
    client.login({
        username: 'chris',
        password: 'password' // NEEDS TO BE REAL
    }, function(success, data) {
        success == true
        data == { themeColor: 'pink' }
        if(success)
          res.json(data);
        else
          res.status(400).send()
    })
});
*/


module.exports = router;
