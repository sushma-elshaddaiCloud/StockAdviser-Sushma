
"use client";

import React, {useState, useCallback} from 'react';
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {analyzeStockData} from "@/ai/flows/analyze-stock-data";
import {useToast} from "@/hooks/use-toast";
import {provideStockRecommendations} from "@/ai/flows/provide-stock-recommendations";
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotPage = () => {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [analysisRecommendation, setAnalysisRecommendation] = useState<string | null>(null);
  const {toast} = useToast();

  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder for actual stock data fetching logic
  const [currentStockDataUrl, setCurrentStockDataUrl] = useState('');


  const handleAnalyze = useCallback(async () => {
    if (!url1 || !url2) {
      toast({
        title: 'Error',
        description: 'Please provide both URLs.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await analyzeStockData({url1, url2});
      setAnalysisRecommendation(result.recommendation);
      setCurrentStockDataUrl(url1); // Or some logic to determine which URL's data to use for chatbot
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
      setAnalysisRecommendation('Error occurred, please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url1, url2, toast]);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = { id: Date.now().toString(), text: userInput, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    // Simulate chatbot interaction and stock recommendation
    // In a real app, this would involve calling the `provideStockRecommendations` flow
    try {
      // Assuming the user's message contains relevant info or we use previously analyzed data
      // For simplicity, we'll use a placeholder for investmentAmount, riskTolerance, and tradingGoals
      // These would typically be extracted from the conversation or a form.
      if (!currentStockDataUrl) {
        toast({
            title: 'Info',
            description: 'Please analyze stock URLs first to provide context for recommendations.',
        });
        const botMessage: Message = {
            id: Date.now().toString() + '-bot',
            text: "Please analyze some stock URLs first using the fields above so I can provide recommendations.",
            sender: 'bot',
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      }

      // Extracting parameters from user input - this is a simplified example
      // A more robust solution would use NLP or structured input.
      const investmentAmount = parseFloat(userInput.match(/invest \$?(\d+)/i)?.[1] || '1000');
      const riskTolerance = userInput.match(/risk tolerance (low|medium|high)/i)?.[1] || 'medium';
      const tradingGoals = userInput.match(/goal (growth|income|capital preservation)/i)?.[1] || 'growth';


      const result = await provideStockRecommendations({
        stockDataUrl: currentStockDataUrl, // Use the URL from the analysis step
        investmentAmount: investmentAmount,
        riskTolerance: riskTolerance,
        tradingGoals: tradingGoals + (userInput ? ` User query: ${userInput}`:''),
      });

      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: result.recommendation,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
       toast({
        title: 'Success',
        description: 'Stock recommendation generated!',
      });

    } catch (error: any) {
      console.error('Error getting stock recommendation:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate stock recommendation.',
        variant: 'destructive',
      });
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, toast, currentStockDataUrl]);


  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">AI Stock Advisor</h1>

      <Card className="mb-8 shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-foreground">Stock Data Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="url1" className="block text-sm font-medium text-muted-foreground mb-1">Stock Data URL 1</label>
              <Input
                id="url1"
                placeholder="Enter ticker or URL (e.g., AAPL, GOOGL, or https://finance.yahoo.com/quote/AAPL)"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
                className="mb-2"
              />
            </div>
            <div>
              <label htmlFor="url2" className="block text-sm font-medium text-muted-foreground mb-1">Stock Data URL 2</label>
              <Input
                id="url2"
                placeholder="Enter ticker or URL (e.g., MSFT, TSLA, or https://finance.yahoo.com/quote/MSFT)"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
                className="mb-2"
              />
            </div>
          </div>
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-lg rounded-md shadow-md transition-transform transform hover:scale-105"
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Stocks'}
          </Button>
          {analysisRecommendation && (
            <div className="mt-6 p-4 bg-secondary rounded-md shadow">
              <h3 className="text-lg font-semibold text-foreground mb-1">Analysis Recommendation:</h3>
              <p className="text-muted-foreground">{analysisRecommendation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chatbot Interface */}
      <Card className="flex-grow flex flex-col shadow-xl rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-foreground">Chat with AI Advisor</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-6 space-y-4 bg-muted/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow ${
                  msg.sender === 'user'
                    ? 'bg-accent text-accent-foreground rounded-br-none'
                    : 'bg-card text-card-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
           {isLoading && messages.length > 0 && messages[messages.length-1].sender === 'user' && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow bg-card text-card-foreground rounded-bl-none">
                <p className="text-sm italic">AI is thinking...</p>
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t border-border bg-background">
          <div className="flex items-center space-x-3">
            <Textarea
              placeholder="Ask for stock advice based on the analysis (e.g., 'Should I invest $5000 with low risk?')"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-grow resize-none rounded-lg shadow-sm"
              rows={2}
              disabled={isLoading || !analysisRecommendation}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !userInput.trim() || !analysisRecommendation}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg shadow-md px-6 py-2.5"
            >
              Send
            </Button>
          </div>
            {!analysisRecommendation && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                    Please analyze stock URLs above before interacting with the chatbot.
                </p>
            )}
        </div>
      </Card>
    </div>
  );
};

export default ChatbotPage;
