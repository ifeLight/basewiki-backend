import { MessageData } from "@genkit-ai/ai/model";
import { ChatSession } from "../models/chat-session";


export const getChatHistory = async (sessionId: string): Promise<MessageData[]> => {
    // get chat history from DB
    const chatSession = await ChatSession.findOne({ sessionId });
    if (!chatSession) return [];
    return chatSession.history;
}

export const saveChatHistory = async (sessionId: string, history: MessageData[]) => {
    // Append new history to existing history
    await ChatSession.updateOne({ sessionId }, { $set: { history } }, { upsert: true });
}
