const dotenv = require("dotenv");
dotenv.config();

const appPort = process.env.PORT || 3500;

module.exports = {
    name: process.env.APP_NAME || "Itekku",
    port: appPort,
    appUrl: process.env.APP_URL || `http://localhost:${appPort}`,
    environment: process.env.NODE_ENV || "development",
    auth: {
        jwt: {
            expires: process.env.JWT_EXPIRES || '1d',
            secret: process.env.JWT_SECRET || 'secret_key_secrets',
        },
        otp: {
            expires: process.env.OTP_EXPIRES || '60', // In minutes
            length: process.env.OTP_LENGTH || 6,
            maxTrials: process.env.OTP_MAX_TRIALS || 3,
        }
    },
    database: {
        mongo: {
            url: process.env.MONGO_URL || "mongodb://localhost:27017/fund10x",
        }
    },
}