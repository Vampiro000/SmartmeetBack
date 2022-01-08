console.log("Starting ...")
var uuid = require('node-uuid');
var express = require('express')
var session = require('express-session');
var user = require('./controllers/UserController');
var QRcode = require('./controllers/QRcodeController')


const { resolve } = require('core-js/library/es6/promise');
const cors = require('cors');

var app = express()
app.use(cors({
    origin: '*',
    credentials: true
}))
try {
    app.use("/user", user)
    app.use("/QRcode", QRcode)

} catch (e) { console.log(e) }


app.get("/hello", (req, res) => {
    console.log("Hello Uri Called")
    res.status(200).json("Hello")
});


app.get("/generate", (req, res) => {
    res.status(200).json("Hello")
});
app.listen(3000)