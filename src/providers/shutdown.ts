import { shutdown } from "./mongo-db";

export const registerOnShutdown = () => {
    const shutdownEvents = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    shutdownEvents.forEach((event) => {
        console.log(`Registering shutdown event: ${event}`)
        process.on(event, async () => {
            await shutdown()
            process.exit(0)
        })
    });
}