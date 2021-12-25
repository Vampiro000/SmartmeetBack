console.log("Starting ...")
var uuid = require('node-uuid');
var express = require('express')
var session = require('express-session');
var user = require('./controllers/UserController');


const { resolve } = require('core-js/library/es6/promise');
const cors = require('cors');
var app = express()
try {
    app.use("/user", user)

} catch (e) { console.log(e) }


app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))


app.get("/hello", (req, res) => {
    res.status(200).json("Hello")
});


app.get("/generate", (req, res) => {
    res.status(200).json("Hello")
});
app.listen(3000)