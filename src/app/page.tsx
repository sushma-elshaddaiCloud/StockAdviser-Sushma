
import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold text-foreground">TradeWise</h1>
        </div>
      </header>

      {/* Body */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Welcome to TradeWise</h2>
          <p className="text-muted-foreground">
            Get AI-powered stock trading solutions to make informed decisions. Analyze stocks and get
            recommendations to optimize your investments.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Feature 1 */}
          <div className="p-4 rounded-lg shadow-md bg-card">
            <h3 className="text-xl font-semibold mb-2 text-foreground">AI Stock Analysis</h3>
            <p className="text-muted-foreground">
              Analyze stock data from various sources using our AI-powered tools.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-4 rounded-lg shadow-md bg-card">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Personalized Recommendations</h3>
            <p className="text-muted-foreground">
              Receive personalized stock recommendations based on your risk tolerance and investment goals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-4 rounded-lg shadow-md bg-card">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Real-Time Data</h3>
            <p className="text-muted-foreground">Access real-time stock data for accurate and timely decision-making.</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Link href="/stock-analysis">
          <Button className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent">
            Get Started
          </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} TradeWise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
