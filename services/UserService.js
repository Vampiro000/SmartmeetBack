var db = require("../config/dbConnector");
var userCollection = db.collection("users");

// console.log("UserCollection", userCollection)

async function createUser(email, password, phone) {
    const newUser = {
        userId: await userCollection.then(async (request) => { //User Id Computed Manually
            return (await request.find().count()) + 1;
        }),
        email,
        password,
        phone,
    };
    userCollection.then((request) => {
        request.insertOne(newUser);
        console.log("New user Created");
    });
}

async function userExist(email, password, phone) {
    const user = await userCollection.then(async (request) => {
        return request.find({ email: email }).toArray();
    });
    console.log("Utilisteur REchercer", user);
    if (user.length) return true;
    else return false;
}

async function getUserId(email, password, phone) {
    const user = await userCollection.then(async (request) => {
        return request.find({ email: email }).toArray();
    });
    return user[0].userId;
}

async function getUserById(userId) {
    const user = await userCollection.then(async (request) => {
        console.log("Query One User", { userId: userId })
        return request.find({ userId: userId }).toArray();
    });
    return user;
}

async function getAllUsers() {
    const allUsers = await userCollection.then((request) => {
        return request.find({}).toArray();
    });
    console.log("AllUsers", allUsers);
}

module.exports = {
    createUser,
    getAllUsers,
    userExist,
    getUserId,
    getUserById
};
