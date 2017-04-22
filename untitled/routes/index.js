var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});



router.post('/auth', function(req, res) {
    const deepstream = require('deepstream.io-client-js')
    const client = deepstream('localhost:6020');
    console.log("entered index route");
    console.log(req.body);

    client.login({
        username: req.body.username,
        password: req.body.password
    }, function(success, data) {
        success == true
        data == { themeColor: 'pink' }
        if(success)
          res.json(data);
        else
          res.status(400).send()
    })
});

module.exports = router;
