
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BotMessageSquare, LineChart } from "lucide-react";

export default function FrontPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-end">
        <Link href="/home">
          <Button variant="outline" className="text-sm">
            View Full Homepage <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </header>
      <main className="text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to TradeWise
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered companion for intelligent stock trading and investment decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
          <Link href="/stock-analysis" className="w-full">
            <Button
              variant="default"
              className="w-full h-auto py-6 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-card border border-border hover:bg-muted group"
            >
              <div className="flex flex-col items-center space-y-3">
                <LineChart className="h-12 w-12 text-accent group-hover:text-accent-foreground transition-colors" />
                <span className="font-semibold text-card-foreground group-hover:text-foreground transition-colors">Stock Analysis</span>
                <p className="text-sm text-muted-foreground text-center">
                  Analyze stock data and get AI-driven insights.
                </p>
              </div>
            </Button>
          </Link>
          <Link href="/chatbot" className="w-full">
            <Button
              variant="default"
              className="w-full h-auto py-6 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-card border border-border hover:bg-muted group"
            >
              <div className="flex flex-col items-center space-y-3">
                <BotMessageSquare className="h-12 w-12 text-accent group-hover:text-accent-foreground transition-colors" />
                <span className="font-semibold text-card-foreground group-hover:text-foreground transition-colors">AI Chatbot</span>
                <p className="text-sm text-muted-foreground text-center">
                  Chat with our AI advisor for personalized recommendations.
                </p>
              </div>
            </Button>
          </Link>
        </div>
      </main>
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} TradeWise. All rights reserved.
      </footer>
    </div>
  );
}
