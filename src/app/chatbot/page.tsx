"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {analyzeStockData} from "@/ai/flows/analyze-stock-data";
import {useToast} from "@/hooks/use-toast";

const Chatbot = () => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const {toast} = useToast();

  const handleAnalyze = async () => {
    if (!url1 || !url2) {
      toast({
        title: 'Error',
        description: 'Please provide both URLs.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await analyzeStockData({url1, url2});
      setRecommendation(result.recommendation);
      toast({
        title: 'Success',
        description: 'Stock analysis completed!',
      });
    } catch (error: any) {
      console.error('Error analyzing stock data:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to analyze stock data.',
        variant: 'destructive',
      });
      setRecommendation('Error occurred, please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-foreground">AI Stock Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Columns */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Stock Data URL 1</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter URL for stock data"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
                className="mb-4"
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Stock Data URL 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter URL for stock data"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
                className="mb-4"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analyze Button */}
      <Button
        className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent mt-4"
        onClick={handleAnalyze}
      >
        Analyze Stocks
      </Button>

      {/* Recommendation Display */}
      {recommendation && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Recommendation</h2>
          <p className="text-muted-foreground">{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
