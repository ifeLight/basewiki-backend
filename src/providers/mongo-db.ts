import config from 'config'
import mongoose from 'mongoose'

import logger from '../utils/logger.js';

let MONGO_URI: string = config.get('database.mongodb.uri') as string

(async () => {
    logger.info('Mongo connect initiation running...')
    try {
        logger.info(`Mongo Database: Connecting to Mongo Database...`)
        await mongoose.connect(MONGO_URI)
        logger.info(`Mongo Database: Mongo Database Connected`)
    } catch (error) {
        logger.error(`Mongo Database: Connection error, Exiting...`)
        logger.error(error)
        process.exit(1)
    }
})()


/**
 * Mongoose Connection Events
 */
mongoose.connection.on('connected', function () {
    logger.info(`Mongo Database: Database Connected`)
    // Set to let wait for connection knows database is connected
})

mongoose.connection.on('disconnected', function () {
    logger.error(`Mongo Database: Database Disconnected, Exiting...`)
    // Set to let wait for connection knows database is disconnected
    process.exit(0)
})

mongoose.connection.on('error', (error) => {
    logger.error(`Mongo Database: An connection error occurred (${error.message})`)
    process.exit(1)
})

/**
 * Close Mongoose Conection When app shuts down
 */
export const shutdown = async () => {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
        logger.error(`Mongo Database: Closing Mongo Database....`)
        try {
            mongoose.connection.close()
            logger.info(`Mongo Database: Mongo Database Closed`)
        } catch (error) {
            logger.info(`Mongo Database: Error closing Mongo Database`)
        }
    }
}

export default mongoose