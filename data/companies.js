// Mock companies data for RumorStreet
export const COMPANIES = [
    {
        id: 'amazon',
        name: 'Amazon',
        ticker: 'AMZN',
        sector: 'E-commerce & Cloud',
        currentPrice: 145.30,
        change24h: 2.4,
        marketCap: '$1.5T',
        position: { x: 20, y: 25 },
        color: '#FF9900',
    },
    {
        id: 'google',
        name: 'Google',
        ticker: 'GOOGL',
        sector: 'Technology',
        currentPrice: 138.75,
        change24h: -0.8,
        marketCap: '$1.7T',
        position: { x: 50, y: 20 },
        color: '#4285F4',
    },
    {
        id: 'apple',
        name: 'Apple',
        ticker: 'AAPL',
        sector: 'Technology',
        currentPrice: 182.50,
        change24h: 1.2,
        marketCap: '$2.8T',
        position: { x: 80, y: 28 },
        color: '#555555',
    },
    {
        id: 'tesla',
        name: 'Tesla',
        ticker: 'TSLA',
        sector: 'Automotive & Energy',
        currentPrice: 248.90,
        change24h: -3.5,
        marketCap: '$790B',
        position: { x: 25, y: 55 },
        color: '#CC0000',
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        ticker: 'MSFT',
        sector: 'Technology',
        currentPrice: 378.20,
        change24h: 0.9,
        marketCap: '$2.8T',
        position: { x: 60, y: 58 },
        color: '#00A4EF',
    },
    {
        id: 'meta',
        name: 'Meta',
        ticker: 'META',
        sector: 'Social Media',
        currentPrice: 328.60,
        change24h: -1.3,
        marketCap: '$830B',
        position: { x: 90, y: 62 },
        color: '#0668E1',
    },
    {
        id: 'nvidia',
        name: 'NVIDIA',
        ticker: 'NVDA',
        sector: 'Semiconductors',
        currentPrice: 495.25,
        change24h: 4.7,
        marketCap: '$1.2T',
        position: { x: 35, y: 82 },
        color: '#76B900',
    },
    {
        id: 'flipkart',
        name: 'Flipkart',
        ticker: 'FLPK',
        sector: 'E-commerce',
        currentPrice: 92.40,
        change24h: 2.1,
        marketCap: '$37B',
        position: { x: 73, y: 87 },
        color: '#F3C400',
    },
];

// Helper function to search companies by name, ticker, or sector
export const searchCompanies = (query) => {
    if (!query) return COMPANIES;
    const lowerQuery = query.toLowerCase();
    return COMPANIES.filter(c =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.ticker.toLowerCase().includes(lowerQuery) ||
        c.sector.toLowerCase().includes(lowerQuery)
    );
};

export const getCompanyById = (id) => {
    return COMPANIES.find(c => c.id === id);
};
