var jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "123_One_Two_Three_Un_Deux_Trois_OUHED_JOJE_TLETA"
const expiresIn = '1h'; // Milliseconds

// Retrieve User only from Id so his information are not readable from hacker
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            user: userData,
        }, JWT_SIGN_SECRET, {
            expiresIn
        })
    },

    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(` `)[1]

        if (!token) {
            return res.status(401).send("Missing Access Token")
        }

        jwt.verify(token, JWT_SIGN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401)
            req.user = user;
            next();
        })
    }
}