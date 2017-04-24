var express = require('express');

var router = express.Router();


const deepstream = require('deepstream.io-client-js')
const client = deepstream('localhost:6020');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});


router.post('/auth', function(req, res) {
    console.log("entered index route");
    console.log(req.body);

    client.login({
        username: req.body.username,
        password: req.body.password
    }, function(success, data) {
        if(success)
        {
            res.status(200).send()
        }
        else
          res.status(400).send()
    })
});

module.exports = router;
