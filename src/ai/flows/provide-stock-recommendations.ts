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
        ticker: z.string().optional(),
        currentPrice: z.number().optional(),
        marketCap: z.string().optional(),
        peRatio: z.number().optional(),
        dayChange: z.number().optional(),
        dayChangePercent: z.number().optional(),
        volume: z.number().optional(),
        fiftyTwoWeekHigh: z.number().optional(),
        fiftyTwoWeekLow: z.number().optional(),
        sector: z.string().optional(),
        industry: z.string().optional(),
        lastUpdated: z.string().optional(),
        notes: z.string().optional(),
      }).optional(),
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
  prompt: `You are a professional financial advisor and stock market analyst providing personalized investment advice. Analyze the provided stock data and user preferences to deliver actionable recommendations.

Stock Data:
Ticker: {{{stockData.ticker}}}
Market Cap: {{{stockData.marketCap}}}
P/E Ratio: {{{stockData.peRatio}}}
Day Change: ${{{stockData.dayChange}}} ({{{stockData.dayChangePercent}}}%)
Volume: {{{stockData.volume}}}
52-Week High: ${{{stockData.fiftyTwoWeekHigh}}}
52-Week Low: ${{{stockData.fiftyTwoWeekLow}}}
Sector: {{{stockData.sector}}}
Risk Tolerance: {{{riskTolerance}}}
Trading Goals: {{{tradingGoals}}}

Please provide a comprehensive investment recommendation that includes:

1. **Stock Analysis**: Evaluate the company's current valuation, financial health, and market position
2. **Buy/Sell/Hold Recommendation**: Clear action with specific reasoning
3. **Risk Assessment**: How this investment aligns with the user's risk tolerance
4. **Position Sizing**: Suggested allocation based on the investment amount
5. **Entry Strategy**: Optimal entry points and timing considerations
6. **Exit Strategy**: Price targets, stop losses, and time horizon
7. **Alternative Considerations**: Other stocks or sectors to consider
8. **Market Context**: How current market conditions affect this recommendation

Tailor your advice specifically to:
- Investment Amount: ${{{investmentAmount}}}
- Risk Tolerance: {{{riskTolerance}}}
- Trading Goals: {{{tradingGoals}}}

Be specific, actionable, and include concrete numbers where appropriate. Consider both fundamental and technical factors in your analysis.`,
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

