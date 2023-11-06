const mongoose = require('mongoose');

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connection established with database.");
    } catch (error) {
        console.log(error.message);
    }
}
