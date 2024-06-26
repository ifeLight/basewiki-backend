// import 'reflect-metadata';
import config from 'config';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { action, configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { vertexAI } from '@genkit-ai/vertexai';

import { registerOnShutdown } from './providers/shutdown';

import { toolFlow } from "./chat/flows/my-tool";
import { askBaseFlow } from "./chat/flows/ask-base-question";
import { getSessionHistoryFlow } from './chat/flows/get-sessions-history';

dotenv.config();
registerOnShutdown();

// Vertex AI Auth
const GCP_CREDENTIALS: string = config.get('gcp.credentials');
let googleAuth: any = {
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
};

if (fs.existsSync(path.join(__dirname, '../.keys/gcp-credentials.json'))) {
    googleAuth['keyFilename'] = path.join(__dirname, '../.keys/gcp-credentials.json');
} else if (fs.existsSync(path.join(__dirname, '../.ci-keys/gcp-credentials.json'))) {
    // This is for CI/CD
    googleAuth['keyFilename'] = path.join(__dirname, '../.ci-keys/gcp-credentials.json');

} else if (GCP_CREDENTIALS) {
    googleAuth['credentials'] = JSON.parse(GCP_CREDENTIALS);
} else {
    throw new Error('No GCP credentials found');
}


configureGenkit({
    plugins: [
        vertexAI({
            location: config.get('ai.vertexAI.location'),
            projectId: config.get('ai.vertexAI.projectId'),
            googleAuth: googleAuth,
        }),
    ],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});


startFlowsServer({
    flows: [askBaseFlow, toolFlow, getSessionHistoryFlow],
    port: config.get('port'),
    cors: {
        origin: '*',
    }
});
