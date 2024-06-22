import { generate } from '@genkit-ai/ai';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { geminiPro, gemini15Flash } from '@genkit-ai/vertexai';
import * as z from 'zod';
import { myTool } from "../tools/my-tool";


export const toolFlow = defineFlow(
    {
        name: 'Test tool',
        inputSchema: z.string(),
        outputSchema: z.string()
    },
    async (question: string) => {
        const llmResponse = await generate({
            model: geminiPro,
            prompt: `Tell me a joke about ${question}`,
            tools: [myTool],
            config: {
                temperature: 0.5,
            },
        });
        return llmResponse.text()
    }
)