import { action, configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { vertexAI } from '@genkit-ai/vertexai';

import { toolFlow } from "./chat/flows/my-tool";
import { askBaseFlow } from "./chat/flows/ask-base-question";

configureGenkit({
    plugins: [
        vertexAI({ location: 'us-central1' }),
    ],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});


startFlowsServer({
    flows: [askBaseFlow, toolFlow],
    port: 3000,
});
