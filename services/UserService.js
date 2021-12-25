var db = require('../models/dbConnector');
var userCollection = db.collection("users");

console.log("DB", db)
// console.log("UserCollection", userCollection)

async function createUser(email, password, phone) {
    const newUser = {
        email, password, phone
    }
    userCollection.then((request) => {
        request.insertOne(newUser)
        console.log("New user Created")
    })
};

async function getAllUsers() {
    const allUsers = await userCollection.then((request) => {
        return request.find({}).toArray()
    })
    console.log("AllUsers", allUsers)
}




module.exports = {
    createUser: createUser,
    getAllUsers
}