import { Schema } from "mongoose";
import mongoose from "../providers/mongo-db";
import { MessageData } from "@genkit-ai/ai/model";

export interface IChatSession {
    _id: string;
    sessionId: string;
    history: MessageData[];
    createdAt: Date;
    updatedAt: Date;
}

const ChatSessionSchema = new mongoose.Schema<IChatSession>({
    sessionId: {
        type: String,
        required: true
    },
    history: {
        type: Schema.Types.Mixed,
        default: []
    }
}, { timestamps: true });

export const ChatSession = mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);