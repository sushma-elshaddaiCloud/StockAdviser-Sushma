'use server';
/**
 * @fileOverview An AI agent that provides stock recommendations based on user input and fetched stock data.
 *
 * - provideStockRecommendations - A function that handles the stock recommendation process.
 * - ProvideStockRecommendationsInput - The input type for the provideStockRecommendations function.
 * - ProvideStockRecommendationsOutput - The return type for the provideStockRecommendations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getStockData, StockData} from '@/services/stock-data';

const ProvideStockRecommendationsInputSchema = z.object({
  stockDataUrl: z
    .string()
    .describe('The URL to fetch stock data from.'),
  investmentAmount: z.number().describe('The amount of money to invest.'),
  riskTolerance: z
    .string()
    .describe(
      'The users risk tolerance, can be low, medium, or high. This will affect the recommendation.'
    ),
  tradingGoals: z
    .string()
    .describe(
      'The users trading goals, such as growth, income, or capital preservation. This will affect the recommendation.'
    ),
});
export type ProvideStockRecommendationsInput = z.infer<
  typeof ProvideStockRecommendationsInputSchema
>;

const ProvideStockRecommendationsOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'The stock recommendation, including whether to buy or sell, and the reasoning behind the recommendation.'
    ),
});
export type ProvideStockRecommendationsOutput = z.infer<
  typeof ProvideStockRecommendationsOutputSchema
>;

export async function provideStockRecommendations(
  input: ProvideStockRecommendationsInput
): Promise<ProvideStockRecommendationsOutput> {
  return provideStockRecommendationsFlow(input);
}

const provideStockRecommendationsPrompt = ai.definePrompt({
  name: 'provideStockRecommendationsPrompt',
  input: {
    schema: z.object({
      stockData: z.object({
        ticker: z.string(),
        currentPrice: z.number(),
        lastUpdated: z.string(),
        notes: z.string().optional(),
      }),
      investmentAmount: z.number(),
      riskTolerance: z.string(),
      tradingGoals: z.string(),
    }),
  },
  output: {
    schema: z.object({
      recommendation: z.string().describe(
        'The stock recommendation, including whether to buy or sell, and the reasoning behind the recommendation.'
      ),
    }),
  },
  prompt: `You are a stock market expert providing investment advice based on the user's input and current stock data.  Consider the user's risk tolerance and trading goals when making your recommendation.  If the user has low risk tolerance, recommend safer investments.  If the user has high risk tolerance, recommend more aggressive investments.

Stock Data:
Ticker: {{{stockData.ticker}}}
Current Price: {{{stockData.currentPrice}}}
Last Updated: {{{stockData.lastUpdated}}}
Notes: {{{stockData.notes}}}

Investment Amount: {{{investmentAmount}}}
Risk Tolerance: {{{riskTolerance}}}
Trading Goals: {{{tradingGoals}}}

Recommendation:`,
});

const provideStockRecommendationsFlow = ai.defineFlow<
  typeof ProvideStockRecommendationsInputSchema,
  typeof ProvideStockRecommendationsOutputSchema
>(
  {
    name: 'provideStockRecommendationsFlow',
    inputSchema: ProvideStockRecommendationsInputSchema,
    outputSchema: ProvideStockRecommendationsOutputSchema,
  },
  async input => {
    const stockData = await getStockData(input.stockDataUrl);
    const {output} = await provideStockRecommendationsPrompt({
      ...input,
      stockData,
    });
    return output!;
  }
);
