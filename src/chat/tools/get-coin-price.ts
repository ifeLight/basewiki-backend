import { action } from '@genkit-ai/core';
import * as z from 'zod';


const getCoinPrice = async (input: { symbol: string }): Promise<string> => {
    return Number(0.01).toString()
}

export const getCoinPriceTool = action(
    {
        name: 'priceOfCoinBySymbol',
        description: 'Useful when you know the symbol of a coin and you want tot get the price of that coin in a string format.',
        inputSchema: z.object({ symbol: z.string() }),
        outputSchema: z.string()
    },
    getCoinPrice
)