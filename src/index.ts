// import 'reflect-metadata';
import config from 'config';
import path from 'path';
import dotenv from 'dotenv';
import { action, configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { vertexAI } from '@genkit-ai/vertexai';

import { toolFlow } from "./chat/flows/my-tool";
import { askBaseFlow } from "./chat/flows/ask-base-question";

dotenv.config();

configureGenkit({
    plugins: [
        vertexAI({
            location: config.get('ai.vertexAI.location'),
            projectId: config.get('ai.vertexAI.projectId'),
            googleAuth: {
                keyFilename: path.join(__dirname, '../.keys/google-credentials.json'),
                scopes: ['https://www.googleapis.com/auth/cloud-platform'],
            }
        }),
    ],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});


startFlowsServer({
    flows: [askBaseFlow, toolFlow],
    port: config.get('port'),
    cors: {
        origin: '*',
    }
});
