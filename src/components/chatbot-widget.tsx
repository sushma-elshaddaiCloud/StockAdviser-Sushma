"use client";

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { provideStockRecommendations } from "@/ai/flows/provide-stock-recommendations";
import { useToast } from "@/hooks/use-toast";
import { Bot, X, MessageCircle } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotWidget = () => {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = { 
      id: Date.now().toString(), 
      text: userInput, 
      sender: 'user' 
    };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Extract investment parameters from user input
      const investmentAmount = parseFloat(userInput.match(/invest \$?(\d+)/i)?.[1] || '1000');
      const riskTolerance = userInput.match(/risk tolerance (low|medium|high)/i)?.[1] || 'medium';
      const tradingGoals = userInput.match(/goal (growth|income|capital preservation)/i)?.[1] || 'growth';

      // Use a default stock for quick recommendations
      const result = await provideStockRecommendations({
        stockDataUrl: 'AAPL', // Default to Apple for quick demo
        investmentAmount: investmentAmount,
        riskTolerance: riskTolerance,
        tradingGoals: tradingGoals + ` User query: ${userInput}`,
      });

      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: result.recommendation,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error getting stock recommendation:', error);
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: 'Sorry, I encountered an error. Please try again or visit the full chatbot page for more detailed analysis.',
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  if (!isSignedIn) {
    return null; // Don't show widget if not signed in
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-2xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bot className="h-5 w-5 mr-2 text-accent" />
              AI Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-3 space-y-3">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 max-h-48">
              {messages.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-4">
                  Ask me about stock investments!<br />
                  Try: "Should I invest $5000 in tech stocks with medium risk?"
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-xs ${
                      msg.sender === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-3 py-2 rounded-lg text-xs bg-muted text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Textarea
                placeholder="Ask about investments..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 resize-none text-xs"
                rows={2}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !userInput.trim()}
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatbotWidget;