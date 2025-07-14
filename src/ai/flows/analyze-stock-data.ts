'use server';
/**
 * @fileOverview An AI agent that analyzes stock data from given URLs and provides buy/sell recommendations.
 *
 * - analyzeStockData - A function that handles the stock data analysis process.
 * - AnalyzeStockDataInput - The input type for the analyzeStockData function.
 * - AnalyzeStockDataOutput - The return type for the analyzeStockData function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getStockData, StockData} from '@/services/stock-data';

const AnalyzeStockDataInputSchema = z.object({
  url1: z.string().describe('The URL to fetch stock data from.'),
  url2: z.string().describe('The URL to fetch stock data from.'),
});
export type AnalyzeStockDataInput = z.infer<typeof AnalyzeStockDataInputSchema>;

const AnalyzeStockDataOutputSchema = z.object({
  recommendation: z.string().describe('The buy/sell recommendation for the stock.'),
});
export type AnalyzeStockDataOutput = z.infer<typeof AnalyzeStockDataOutputSchema>;

export async function analyzeStockData(input: AnalyzeStockDataInput): Promise<AnalyzeStockDataOutput> {
  return analyzeStockDataFlow(input);
}

const analyzeStockDataPrompt = ai.definePrompt({
  name: 'analyzeStockDataPrompt',
  input: {
    schema: z.object({
      stockData1: z.string().describe('The stock data from the first URL.'),
      stockData2: z.string().describe('The stock data from the second URL.'),
    }),
  },
  output: {
    schema: z.object({
      recommendation: z.string().describe('The buy/sell recommendation for the stock based on the analyzed data.'),
    }),
  },
  prompt: `You are a professional stock market analyst with expertise in fundamental and technical analysis. Analyze the following stock data and provide detailed buy/sell recommendations.

Stock Data 1: {{{stockData1}}}
Stock Data 2: {{{stockData2}}}

Please provide a comprehensive analysis including:
1. Individual stock analysis for each stock
2. Comparative analysis between the two stocks
3. Specific buy/sell/hold recommendations with reasoning
4. Risk assessment and potential catalysts
5. Price targets if applicable
6. Portfolio allocation suggestions

Be specific about entry points, stop losses, and time horizons. Consider market conditions, sector trends, and company fundamentals in your analysis.`,
});

const analyzeStockDataFlow = ai.defineFlow<
  typeof AnalyzeStockDataInputSchema,
  typeof AnalyzeStockDataOutputSchema
>(
  {
    name: 'analyzeStockDataFlow',
    inputSchema: AnalyzeStockDataInputSchema,
    outputSchema: AnalyzeStockDataOutputSchema,
  },
  async input => {
    // Fetch stock data from the URLs
    const stockData1: StockData = await getStockData(input.url1);
    const stockData2: StockData = await getStockData(input.url2);

    const {output} = await analyzeStockDataPrompt({
      stockData1: JSON.stringify(stockData1),
      stockData2: JSON.stringify(stockData2),
    });
    return output!;
  }
);
