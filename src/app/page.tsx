import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">TradeWise</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-foreground hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="text-foreground hover:text-accent">
                  Chatbot
                </Link>
              </li>
              <li>
                <Link href="/stock-analysis" className="text-foreground hover:text-accent">
                  Stock Analysis
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Unlock the Power of AI in Stock Trading
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            TradeWise provides AI-powered solutions to help you make informed investment decisions and
            optimize your trading strategies.
          </p>
          <Link href="/stock-analysis">
            <Button className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              Explore Our Solutions
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-6 rounded-lg shadow-md bg-card">
              <h3 className="text-xl font-semibold mb-4 text-foreground">AI-Driven Stock Analysis</h3>
              <p className="text-muted-foreground">
                Analyze stocks with advanced AI algorithms to identify potential opportunities and risks.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-6 rounded-lg shadow-md bg-card">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Personalized Recommendations</h3>
              <p className="text-muted-foreground">
                Get tailored stock recommendations based on your investment profile and financial goals.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-6 rounded-lg shadow-md bg-card">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Real-Time Market Insights</h3>
              <p className="text-muted-foreground">
                Stay ahead of the curve with real-time market data and actionable insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div>
              <img
                src="https://picsum.photos/600/400" // Replace with a relevant image
                alt="About TradeWise"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">About TradeWise</h2>
              <p className="text-muted-foreground">
                TradeWise is dedicated to empowering investors with cutting-edge AI solutions. Our mission
                is to democratize access to sophisticated trading tools and help you achieve your financial
                objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-6">
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
