const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    database: {
        mongo: {
            url: process.env.MONGO_TEST_URI || process.env.MONGO_URI || "mongodb://localhost:27017/fund10x",
        }
    },
}