import { defineFlow } from '@genkit-ai/flow';
import { geminiPro, gemini15Flash } from '@genkit-ai/vertexai';
import * as z from 'zod';

import { askBaseQuestionHandler } from '../handlers/ask-base-question';


export const askBaseFlow = defineFlow(
    {
        name: 'AskBaseFlow',
        inputSchema: z.object({
            sessionId: z.string(),
            question: z.string()
        }),
        outputSchema: z.string()
    },
    //@ts-ignore
    askBaseQuestionHandler
)