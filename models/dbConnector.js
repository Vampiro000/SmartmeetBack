const { MongoClient } = require('mongodb');


const url = 'mongodb://zeno:Rapetor660%21@139.59.187.228:27017/?authSource=smartmeet&authMechanism=SCRAM-SHA-256&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const client = new MongoClient(url);

// Database Name
const dbName = 'smartmeet';


// Use connect method to connect to the server
const db = {};
db.collection = (collectionName) => {
    return new Promise(async function (resolve) {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected successfully to server', db);
        resolve(db.collection(collectionName))
    })
}






module.exports = db;

