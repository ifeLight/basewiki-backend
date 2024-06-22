import { action } from '@genkit-ai/core';
import * as z from 'zod';

export const myTool = action(
    {
        name: 'myJoke',
        description: 'useful when you need a joke to tell.',
        inputSchema: z.object({ subject: z.string() }),
        outputSchema: z.string(),
    },
    async (input) => 'haha Just kidding no joke! got you'
);
