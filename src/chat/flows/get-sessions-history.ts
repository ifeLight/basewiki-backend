import { defineFlow } from '@genkit-ai/flow';
import * as z from 'zod';
import { getFilteredChatHistory } from '../../services/chat-session-service';



export const getSessionHistoryFlow = defineFlow(
    {
        name: 'GetSessionHistory',
        inputSchema: z.string(),
        outputSchema: z.array(
            z.object({
                role: z.string(),
                content: z.array(
                    z.object({
                        text: z.string(),
                        toolRequest: z.array(z.object({
                            toolName: z.string(),
                            toolResponse: z.string()
                        }))
                    })
                )
            })
        )
    },
    //@ts-ignore
    async (sessionId: string) => {
        const history = await getFilteredChatHistory(sessionId)
        return history
    }
)