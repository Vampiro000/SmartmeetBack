
var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var router = express.Router();
var UserService = require('../services/UserService');
// Home page route.
router.post('/register', jsonParser, async function (req, res) {
    const user = req.body
    if (user.email && user.password && user.phone) {
        await UserService.createUser(user.email, user.password, user.phone)
        res.send("User Created ! Please Verify your mail")
    }
    else res.status(401).send("Missing Mendatory Informations")
});

router.get('/all', async function (req, res) {
    await UserService.getAllUsers()
    res.status(200).send("liost of  users")

});


router.get('/login', function (req, res) {
    UserService.createUser()
    res.send('User');


})

module.exports = router;