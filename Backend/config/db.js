const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose
            .connect(process.env.DB_STRING)
            .then(() => console.log('MongoDB Connection Successfull'));
    } catch (error) {
        console.log(`MognoDB Error: , ${error.message}`);
        process.exit(1);
    }
};