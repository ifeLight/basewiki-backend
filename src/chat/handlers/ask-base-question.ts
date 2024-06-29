import { generate } from '@genkit-ai/ai';
import { geminiPro, } from '@genkit-ai/vertexai';

import { getChatHistory, saveChatHistory } from '../../services/chat-session-service';

import { IAskBaseQuestion } from "../../interfaces";
import { getCoinPriceTool } from "../tools/get-coin-price";


export const askBaseQuestionHandler = async (request: IAskBaseQuestion): Promise<string> => {
    let history = await getChatHistory(request.sessionId)
    // if session greater than 5, remove the earliest history
    if (history.length > 6) {
        history = history.slice(-6)
    }
    const response = await generate({
        prompt: `You are acting as a helpful AI assistant that can answer questions related to the Base blockchain network. Do not answer questions related to other blockchain networks.
        All answers should be in a friendly and helpful tone and related to the Base blockchain network. And also avoid competitive blockchain ecosystem.
        
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
    const latestHistory = response.toHistory()
    await saveChatHistory(request.sessionId, latestHistory)

    // console.log(response.text());

    // Return the generated text
    return response.text();
}
