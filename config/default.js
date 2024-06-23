const dotenv = require("dotenv");
dotenv.config();

const appPort = process.env.PORT || 3500;

module.exports = {
    name: process.env.APP_NAME || "BaseWiki",
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
        mongodb: {
            uri: process.env.MONGODB_URI || "mongodb://localhost:27017/basewiki",
        }
    },
    ai: {
        vertexAI: {
            projectId: process.env.VERTEX_AI_PROJECT_ID || 'basewiki',
            location: process.env.VERTEX_AI_LOCATION || 'us-central1',
        }
    },
    gcp: {
        credentials: process.env.GCP_CREDENTIALS || '', // This should be the content of the JSON file
    }
}