import { MessageData } from "@genkit-ai/ai/model";
import { generate } from '@genkit-ai/ai';
import { action, configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { geminiPro, gemini15Flash } from '@genkit-ai/vertexai';
import * as z from 'zod';
import { vertexAI } from '@genkit-ai/vertexai';

interface IAskBaseQuestion {
    sessionId: string
    question: string
}

configureGenkit({
    plugins: [
        vertexAI({ location: 'us-central1' }),
    ],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});



const getChatHistory = async (sessionId: string): Promise<MessageData[]> => {
    // get chat history from DB
    return []
}

const saveChatHistory = async (sessionId: string, history: MessageData[]) => {
    // save chat history to DB
}

const getCoinPrice = async (input: { symbol: string }): Promise<string> => {
    return Number(0.01).toString()
}

const getCoinPriceTool = action(
    {
        name: 'priceOfCoinBySymbol',
        description: 'Useful when you know the symbol of a coin and you want tot get the price of that coin in a string format.',
        inputSchema: z.object({ symbol: z.string() }),
        outputSchema: z.string()
    },
    getCoinPrice
)

const askBaseQuestion = async (request: IAskBaseQuestion): Promise<string> => {
    const history = await getChatHistory(request.sessionId)
    const response = await generate({
        prompt: `You are acting as a helpful AI assistant that can answer questions related to the Base blockchain network. Do not answer questions related to other blockchain networks.
    
    Question: ${request.question}`,
        model: geminiPro,
        config: {
            temperature: 0.5,
        },
        tools: [getCoinPriceTool],
        // returnToolRequests: true,
        history
    });

    // Save latest history
    await saveChatHistory(request.sessionId, response.toHistory())

    // console.log(response.text());

    // Return the generated text
    return response.text();
}

const askBaseFlow = defineFlow(
    {
        name: 'Ask Base Flow',
        inputSchema: z.object({
            sessionId: z.string(),
            question: z.string()
        }),
        outputSchema: z.string()
    },
    //@ts-ignore
    askBaseQuestion
)


//====================test tool =========================
const myTool = action(
    {
        name: 'myJoke',
        description: 'useful when you need a joke to tell.',
        inputSchema: z.object({ subject: z.string() }),
        outputSchema: z.string(),
    },
    async (input) => 'haha Just kidding no joke! got you'
);

const toolFlow = defineFlow(
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

startFlowsServer();
