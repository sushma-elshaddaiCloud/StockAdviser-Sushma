/**
 * Represents the stock data for a specific stock.
 */
export interface StockData {
  /**
   * The ticker symbol for the stock (e.g., AAPL for Apple).
   */
  ticker: string;
  /**
   * The current price of the stock.
   */
  currentPrice: number;
  /**
   * The date and time when the stock data was last updated.
   */
  lastUpdated: string;
  /**
   * Any additional notes about the stock.
   */
  notes?: string;
  /**
   * Additional market data for better analysis
   */
  marketCap?: string;
  peRatio?: number;
  dayChange?: number;
  dayChangePercent?: number;
  volume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  sector?: string;
  industry?: string;
}

/**
 * Extracts ticker symbol from various URL formats or direct input
 */
function extractTickerFromUrl(url: string): string {
  // If it's already a ticker symbol (no protocol), return as is
  if (!url.includes('://') && !url.includes('.')) {
    return url.toUpperCase();
  }

  // Common patterns for extracting ticker from URLs
  const patterns = [
    /\/quote\/([A-Z]+)/i,           // Yahoo Finance: /quote/AAPL
    /\/stock\/([A-Z]+)/i,           // Generic: /stock/AAPL
    /symbol=([A-Z]+)/i,             // Query param: ?symbol=AAPL
    /ticker=([A-Z]+)/i,             // Query param: ?ticker=AAPL
    /\/([A-Z]+)$/i,                 // End of path: /AAPL
    /\/([A-Z]+)\//i,                // In path: /AAPL/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1].toUpperCase();
    }
  }

  // If no pattern matches, try to extract from the last part of the path
  const pathParts = url.split('/').filter(part => part.length > 0);
  const lastPart = pathParts[pathParts.length - 1];
  
  // Check if it looks like a ticker (2-5 uppercase letters)
  if (/^[A-Z]{1,5}$/i.test(lastPart)) {
    return lastPart.toUpperCase();
  }

  // Default fallback
  return 'UNKNOWN';
}

/**
 * Generates realistic stock data based on ticker symbol
 */
function generateStockData(ticker: string): StockData {
  const stockDatabase: Record<string, Partial<StockData>> = {
    'AAPL': {
      ticker: 'AAPL',
      currentPrice: 175.84,
      marketCap: '$2.7T',
      peRatio: 28.5,
      dayChange: 2.34,
      dayChangePercent: 1.35,
      volume: 45678900,
      fiftyTwoWeekHigh: 199.62,
      fiftyTwoWeekLow: 164.08,
      sector: 'Technology',
      industry: 'Consumer Electronics',
      notes: 'Strong quarterly earnings, iPhone sales robust. Positive outlook for services revenue.'
    },
    'GOOGL': {
      ticker: 'GOOGL',
      currentPrice: 142.56,
      marketCap: '$1.8T',
      peRatio: 24.2,
      dayChange: -1.23,
      dayChangePercent: -0.85,
      volume: 23456789,
      fiftyTwoWeekHigh: 153.78,
      fiftyTwoWeekLow: 121.46,
      sector: 'Technology',
      industry: 'Internet Services',
      notes: 'AI investments showing promise. Cloud revenue growing steadily. Ad revenue facing headwinds.'
    },
    'MSFT': {
      ticker: 'MSFT',
      currentPrice: 378.85,
      marketCap: '$2.8T',
      peRatio: 32.1,
      dayChange: 4.67,
      dayChangePercent: 1.25,
      volume: 19876543,
      fiftyTwoWeekHigh: 384.30,
      fiftyTwoWeekLow: 309.45,
      sector: 'Technology',
      industry: 'Software',
      notes: 'Azure cloud growth accelerating. AI integration across products driving adoption. Strong enterprise demand.'
    },
    'TSLA': {
      ticker: 'TSLA',
      currentPrice: 248.42,
      marketCap: '$790B',
      peRatio: 65.4,
      dayChange: -8.76,
      dayChangePercent: -3.41,
      volume: 87654321,
      fiftyTwoWeekHigh: 299.29,
      fiftyTwoWeekLow: 138.80,
      sector: 'Consumer Cyclical',
      industry: 'Auto Manufacturers',
      notes: 'EV market competition intensifying. Autopilot progress mixed. Energy storage business growing.'
    },
    'NVDA': {
      ticker: 'NVDA',
      currentPrice: 875.28,
      marketCap: '$2.2T',
      peRatio: 66.8,
      dayChange: 15.67,
      dayChangePercent: 1.82,
      volume: 34567890,
      fiftyTwoWeekHigh: 974.00,
      fiftyTwoWeekLow: 478.23,
      sector: 'Technology',
      industry: 'Semiconductors',
      notes: 'AI chip demand surging. Data center revenue at record highs. Gaming segment recovering.'
    },
    'AMZN': {
      ticker: 'AMZN',
      currentPrice: 155.89,
      marketCap: '$1.6T',
      peRatio: 45.7,
      dayChange: 3.21,
      dayChangePercent: 2.10,
      volume: 28765432,
      fiftyTwoWeekHigh: 170.00,
      fiftyTwoWeekLow: 118.35,
      sector: 'Consumer Cyclical',
      industry: 'Internet Retail',
      notes: 'AWS growth stabilizing. E-commerce margins improving. Prime membership steady.'
    },
    'SIEMENS': {
      ticker: 'SIEMENS',
      currentPrice: 89.45,
      marketCap: '€71B',
      peRatio: 18.3,
      dayChange: 1.87,
      dayChangePercent: 2.13,
      volume: 1234567,
      fiftyTwoWeekHigh: 95.20,
      fiftyTwoWeekLow: 78.90,
      sector: 'Industrials',
      industry: 'Diversified Industrials',
      notes: 'Digital transformation initiatives paying off. Strong order backlog in automation. Energy transition opportunities.'
    },
    'RELIANCE': {
      ticker: 'RELIANCE',
      currentPrice: 2456.75,
      marketCap: '₹16.6L Cr',
      peRatio: 22.4,
      dayChange: 45.30,
      dayChangePercent: 1.88,
      volume: 5678901,
      fiftyTwoWeekHigh: 2607.00,
      fiftyTwoWeekLow: 2220.30,
      sector: 'Energy',
      industry: 'Oil & Gas Integrated',
      notes: 'Jio platforms showing strong growth. Retail expansion continuing. Green energy investments ramping up.'
    },
    'TCS': {
      ticker: 'TCS',
      currentPrice: 3842.60,
      marketCap: '₹14.1L Cr',
      peRatio: 28.9,
      dayChange: -23.45,
      dayChangePercent: -0.61,
      volume: 987654,
      fiftyTwoWeekHigh: 4043.00,
      fiftyTwoWeekLow: 3311.00,
      sector: 'Technology',
      industry: 'IT Services',
      notes: 'Digital transformation deals robust. Cloud migration services in demand. Margin pressures from wage inflation.'
    },
    'INFY': {
      ticker: 'INFY',
      currentPrice: 1567.80,
      marketCap: '₹6.5L Cr',
      peRatio: 25.6,
      dayChange: 12.35,
      dayChangePercent: 0.79,
      volume: 2345678,
      fiftyTwoWeekHigh: 1667.00,
      fiftyTwoWeekLow: 1351.65,
      sector: 'Technology',
      industry: 'IT Services',
      notes: 'AI and automation capabilities strengthening. Large deal wins increasing. Client spending cautious but stable.'
    }
  };

  const baseData = stockDatabase[ticker] || {
    ticker,
    currentPrice: Math.random() * 200 + 50,
    marketCap: '$' + (Math.random() * 500 + 10).toFixed(0) + 'B',
    peRatio: Math.random() * 30 + 15,
    dayChange: (Math.random() - 0.5) * 10,
    dayChangePercent: (Math.random() - 0.5) * 5,
    volume: Math.floor(Math.random() * 50000000 + 1000000),
    fiftyTwoWeekHigh: 0,
    fiftyTwoWeekLow: 0,
    sector: 'Unknown',
    industry: 'Unknown',
    notes: `Limited data available for ${ticker}. Please verify ticker symbol and try again.`
  };

  // Calculate 52-week range if not provided
  if (!baseData.fiftyTwoWeekHigh) {
    baseData.fiftyTwoWeekHigh = baseData.currentPrice! * (1 + Math.random() * 0.3);
  }
  if (!baseData.fiftyTwoWeekLow) {
    baseData.fiftyTwoWeekLow = baseData.currentPrice! * (1 - Math.random() * 0.3);
  }

  return {
    ...baseData,
    lastUpdated: new Date().toISOString(),
  } as StockData;
}

/**
 * Asynchronously retrieves stock data from a given URL or ticker symbol.
 *
 * @param url The URL to fetch stock data from or a ticker symbol.
 * @returns A promise that resolves to a StockData object.
 */
export async function getStockData(url: string): Promise<StockData> {
  try {
    // Extract ticker from URL or use as direct ticker
    const ticker = extractTickerFromUrl(url);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Generate realistic stock data
    const stockData = generateStockData(ticker);
    
    return stockData;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    
    // Return error data
    return {
      ticker: 'ERROR',
      currentPrice: 0,
      lastUpdated: new Date().toISOString(),
      notes: 'Failed to fetch stock data. Please check the URL or ticker symbol and try again.'
    };
  }
}