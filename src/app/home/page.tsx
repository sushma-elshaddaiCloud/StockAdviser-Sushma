
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Lightbulb, Users, TrendingUp, Bot, BarChart3 } from "lucide-react";
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/home" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-accent" />
              <span className="ml-3 text-2xl font-bold text-foreground">TradeWise</span>
            </Link>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/home#services" className="text-muted-foreground hover:text-accent transition-colors">
                Services
              </Link>
              <Link href="/home#about" className="text-muted-foreground hover:text-accent transition-colors">
                About Us
              </Link>
              <Link href="/stock-analysis" className="text-muted-foreground hover:text-accent transition-colors">
                Stock Analysis
              </Link>
              <Link href="/chatbot">
                <Button variant="ghost" className="text-accent hover:text-accent-foreground hover:bg-accent">
                  AI Chatbot
                  <Bot className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </nav>
            <div className="md:hidden">
              {/* Mobile Menu Button (optional) */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-accent/10 via-background to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Get What's Next <span className="text-accent">in Trading.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            TradeWise leverages cutting-edge AI to deliver unparalleled insights and tools, transforming your investment journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/stock-analysis">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
                Start Analyzing Stocks
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/chatbot">
              <Button size="lg" variant="outline" className="text-accent border-accent hover:bg-accent/10 shadow-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
                Talk to AI Advisor
                <Bot className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our AI-Powered Services</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a suite of intelligent solutions designed to enhance your trading strategies and maximize returns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BarChart3 className="h-10 w-10 text-accent mb-4" />, title: "AI-Driven Stock Analysis", description: "Deep dive into stock performance with advanced AI algorithms, identifying trends, risks, and opportunities." },
              { icon: <Bot className="h-10 w-10 text-accent mb-4" />, title: "Personalized Chatbot Advisor", description: "Receive tailored stock recommendations and market insights through our interactive AI chatbot." },
              { icon: <Lightbulb className="h-10 w-10 text-accent mb-4" />, title: "Real-Time Market Insights", description: "Stay ahead with up-to-the-minute market data, news, and AI-curated actionable insights." },
              { icon: <TrendingUp className="h-10 w-10 text-accent mb-4" />, title: "Portfolio Optimization", description: "Optimize your investment portfolio for better risk-adjusted returns using AI-driven suggestions." },
              { icon: <Users className="h-10 w-10 text-accent mb-4" />, title: "Sentiment Analysis", description: "Understand market sentiment towards specific stocks by analyzing news, social media, and financial reports." },
              { icon: <Briefcase className="h-10 w-10 text-accent mb-4" />, title: "Custom Strategy Builder", description: "Develop and backtest your trading strategies with our AI-assisted tools for enhanced decision-making." },
            ].map((service, index) => (
              <div key={index} className="p-8 rounded-xl shadow-lg bg-card hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start">
                {service.icon}
                <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/tradewiseabout/800/600"
                alt="About TradeWise Team"
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-105 transition-transform duration-500"
                data-ai-hint="office team"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
                About TradeWise: <span className="text-accent">Pioneering AI in Finance</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                TradeWise is at the forefront of financial technology, dedicated to empowering investors with cutting-edge AI solutions. Our mission is to democratize access to sophisticated trading tools and insights, previously available only to large institutions.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded by a team of AI experts, financial analysts, and software engineers, we are passionate about leveraging artificial intelligence to help you navigate the complexities of the stock market and achieve your financial objectives with greater confidence.
              </p>
              <Link href="/chatbot">
                <Button size="lg" variant="link" className="text-accent px-0 text-lg">
                  Learn More from our AI Advisor <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 bg-accent/90 text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Elevate Your Trading Game?</h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of investors who are making smarter decisions with TradeWise.
            Sign up today and experience the future of trading.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/stock-analysis">
              <Button size="lg" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 shadow-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
                Explore Analysis Tools
              </Button>
            </Link>
             <Link href="/chatbot">
              <Button size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 shadow-lg transition-transform transform hover:scale-105 w-full sm:w-auto">
                Engage with AI Chatbot
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-secondary border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">TradeWise</h3>
              <p className="text-sm text-muted-foreground">AI-Powered Stock Trading Solutions. Get What's Next.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/home#services" className="text-muted-foreground hover:text-accent">Services</Link></li>
                <li><Link href="/home#about" className="text-muted-foreground hover:text-accent">About Us</Link></li>
                <li><Link href="/stock-analysis" className="text-muted-foreground hover:text-accent">Stock Analysis</Link></li>
                <li><Link href="/chatbot" className="text-muted-foreground hover:text-accent">AI Chatbot</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Contact Us</h3>
              <p className="text-sm text-muted-foreground">support@tradewise.example.com</p>
              {/* Add social media icons if needed */}
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TradeWise. All rights reserved. Not financial advice. Trading involves risk.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);


export default HomePage;

// Helper for grid pattern background
const GridPattern = () => (
  <svg
    className="absolute inset-0 h-full w-full stroke-gray-900/10 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="hero-pattern"
        width="80"
        height="80"
        x="50%"
        y="-1"
        patternUnits="userSpaceOnUse"
      >
        <path d="M.5 200V.5H200" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-pattern)" />
  </svg>
);
