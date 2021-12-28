var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var router = express.Router();
var UserService = require("../services/UserService");
var jwtAuth = require("../config/jwtAuthentication");
// Home page route.
router.post("/register", jsonParser, async function (req, res) {
    const user = req.body;
    if (user.email && user.password && user.phone) {
        await UserService.createUser(user.email, user.password, user.phone);
        res.send("User Created ! Please Verify your mail");
    } else res.status(401).send("REGISTER : Missing Mendatory Informations");
});

router.post("/login", jsonParser, async function (req, res) {
    const user = req.body;
    if (user.email && user.password && user.phone) {
        const userExist = await UserService.userExist(
            user.email,
            user.password,
            user.phone
        );
        if (userExist) {
            const userId = await UserService.getUserId(user.email, user.password, user.phone)
            const userData = { userId }
            const accessToken = jwtAuth.generateTokenForUser(userData)
            res.send(accessToken);
        }
    } else res.status(401).send("LOGIN : Missing Mendatory Informations");
});

router.get("/all", async function (req, res) {
    await UserService.getAllUsers();
    res.status(200).send("liost of  users");
});

router.post("/getUserInfo", jwtAuth.authenticateToken, async function (req, res) {
    console.log("TOken user", req.user)
    const userData = req.user
    const userInfo = await UserService.getUserById(userData.user.userId)
    res.send(userInfo)
});
module.exports = router;
