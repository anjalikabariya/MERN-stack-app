const mongoose = require('mongoose');

const connnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected ${conn.connection.host}`.cyan.underline);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }

}

module.exports = connnectDB;