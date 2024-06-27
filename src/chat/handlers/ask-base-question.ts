import { generate } from '@genkit-ai/ai';
import { geminiPro, } from '@genkit-ai/vertexai';

import { getChatHistory, saveChatHistory } from '../../services/chat-session-service';

import { IAskBaseQuestion } from "../../interfaces";
import { getCoinPriceTool } from "../tools/get-coin-price";


export const askBaseQuestionHandler = async (request: IAskBaseQuestion): Promise<string> => {
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
    const latestHistory = response.toHistory()
    await saveChatHistory(request.sessionId, latestHistory)

    // console.log(response.text());

    // Return the generated text
    return response.text();
}
