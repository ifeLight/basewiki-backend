import { MessageData } from "@genkit-ai/ai/model";
import { ChatSession } from "../models/chat-session";
import { ChatHistoryRole } from "../enums";


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

export const getFilteredChatHistory = async (sessionId: string): Promise<MessageData[]> => {
    const chatHistory = await getChatHistory(sessionId);
    if (!chatHistory) return [];
    if (chatHistory.length === 0) return [];
    return chatHistory.map((history) => {
        if (history.role === ChatHistoryRole.USER) {
            if (history.content[0]?.text)
                history.content[0].text = history.content[0].text.split('Question: ')[1] || history.content[0].text;
        }
        for (let i = 0; i < history.content.length; i++) {
            if (history.content[i].toolRequest) {
                delete history.content[i].toolRequest;
            }
        }
        return history;
    });
}
