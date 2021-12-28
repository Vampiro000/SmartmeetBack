var db = require("../config/dbConnector");
var QRcodeCollection = db.collection("qrcodes");


async function generateQRcodes(userId, quantity) {
    for (let i = 0; i < quantity; i++) {
        const newQRCode = {
            qr_code_id: await QRcodeCollection.then(async (request) => {
                return (await request.find().count() || 0) + 1;
            }),
            userId,
            url: "",
            contactsInfo: [],

        };
        await QRcodeCollection.then(async (request) => {
            await request.insertOne(newQRCode);
            console.log("QRcode ID " + newQRCode.id + " createsd!");
        })
    }
}


async function getQRcodeByUser(userId) {
    const QRcodes = await QRcodeCollection.then(async (request) => {
        return request.find({ userId: userId }).toArray();
    });
    return QRcodes;
}




module.exports = {
    generateQRcodes,
    getQRcodeByUser
};


