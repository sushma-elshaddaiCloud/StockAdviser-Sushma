
"use client";

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeStockData, AnalyzeStockDataOutput } from "@/ai/flows/analyze-stock-data";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

const StockAnalysisPage = () => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeStockDataOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = useCallback(async () => {
    if (!url1 || !url2) {
      toast({
        title: 'Error',
        description: 'Please provide both URLs for analysis.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeStockData({ url1, url2 });
      setAnalysisResult(result);
      toast({
        title: 'Analysis Complete',
        description: 'Stock data analyzed successfully!',
      });
    } catch (err: any) {
      console.error('Error analyzing stock data:', err);
      const errorMessage = err.message || 'Failed to analyze stock data. Please try again.';
      setError(errorMessage);
      toast({
        title: 'Analysis Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [url1, url2, toast]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            AI Stock Data Analyzer
          </CardTitle>
          <p className="text-muted-foreground">
            Enter two stock data URLs to get an AI-powered analysis and recommendation.
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="url1" className="block text-sm font-medium text-muted-foreground">
                Stock Data URL 1
              </label>
              <Input
                id="url1"
                type="url"
                placeholder="e.g., https://example.com/stock1-data.json"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
                className="text-base"
                aria-label="Stock Data URL 1"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="url2" className="block text-sm font-medium text-muted-foreground">
                Stock Data URL 2
              </label>
              <Input
                id="url2"
                type="url"
                placeholder="e.g., https://example.com/stock2-data.json"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
                className="text-base"
                aria-label="Stock Data URL 2"
              />
            </div>
          </div>

          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-lg rounded-md shadow-md transition-transform transform hover:scale-105"
            onClick={handleAnalyze}
            disabled={isLoading || !url1 || !url2}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Stocks'}
          </Button>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {analysisResult && !error && (
            <div className="mt-8 p-6 bg-secondary rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                Analysis Recommendation
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap text-center text-lg">
                {analysisResult.recommendation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StockAnalysisPage;
