var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var router = express.Router();
var QRcodeService = require("../services/QRcodeService");
var jwtAuth = require("../config/jwtAuthentication");

router.post("/generate", jsonParser, jwtAuth.authenticateToken, async function (req, res) {
    const data = req.body;
    const user = req.user.user
    if (user.userId && data.qty) {
        await QRcodeService.generateQRcodes(user.userId, data.qty);
        res.send(data.qty + " QRCodes Generated");
    } else res.status(401).send("GENERATEQRCODES : Missing Mendatory Informations");
});

router.get("/getQRcodeByUser", jsonParser, jwtAuth.authenticateToken, async function (req, res) {
    const user = req.user.user
    if (user.userId) {
        console.log(user)
        const QRcodes = await QRcodeService.getQRcodeByUser(user.userId);
        res.send(QRcodes);
    } else res.status(401).send("GET QRCODES BY USER : Missing Mendatory Informations");
});


module.exports = router;