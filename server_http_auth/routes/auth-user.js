/**
 * Created by ei08047 on 21/04/2017.
 */
var express = require('express');

var router = express.Router();


router.post('/auth-user', function(req, res) {
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

module.exports = router;
