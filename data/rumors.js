// Mock rumor and news data
export const RUMORS = [
    {
        id: 1,
        companyId: 'tesla',
        type: 'rumor',
        content: 'Insider sources suggest Tesla is developing a revolutionary battery technology that could double EV range.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        sentiment: 'positive',
        reliability: 65,
    },
    {
        id: 2,
        companyId: 'amazon',
        type: 'news',
        content: 'Amazon announces Q3 2023 earnings beat expectations with 15% growth in cloud services.',
        timestamp: new Date('2023-07-15').toISOString(),
        sentiment: 'positive',
        reliability: 95,
    },
    {
        id: 3,
        companyId: 'google',
        type: 'rumor',
        content: 'Unconfirmed reports of Google planning to launch a new AI-powered search engine.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        sentiment: 'neutral',
        reliability: 45,
    },
    {
        id: 4,
        companyId: 'apple',
        type: 'news',
        content: 'Apple Vision Pro pre-orders exceeded expectations in June 2023, selling out within hours.',
        timestamp: new Date('2023-06-20').toISOString(),
        sentiment: 'positive',
        reliability: 90,
    },
    {
        id: 5,
        companyId: 'meta',
        type: 'rumor',
        content: 'Meta rumored to be cutting costs by 20% in metaverse division.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        sentiment: 'negative',
        reliability: 55,
    },
    {
        id: 6,
        companyId: 'nvidia',
        type: 'news',
        content: 'NVIDIA stock splits 10-for-1 in June 2023 following AI boom demand.',
        timestamp: new Date('2023-06-09').toISOString(),
        sentiment: 'positive',
        reliability: 100,
    },
    {
        id: 7,
        companyId: 'microsoft',
        type: 'news',
        content: 'Microsoft completes $69B acquisition of Activision Blizzard in October 2023.',
        timestamp: new Date('2023-10-13').toISOString(),
        sentiment: 'positive',
        reliability: 100,
    },
    {
        id: 8,
        companyId: 'flipkart',
        type: 'rumor',
        content: 'Flipkart may be considering an IPO in early 2024 according to market whispers.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        sentiment: 'positive',
        reliability: 60,
    },
    {
        id: 9,
        companyId: 'tesla',
        type: 'news',
        content: 'Tesla Cybertruck deliveries begin in November 2023 after years of delays.',
        timestamp: new Date('2023-11-30').toISOString(),
        sentiment: 'positive',
        reliability: 95,
    },
    {
        id: 10,
        companyId: 'amazon',
        type: 'rumor',
        content: 'Anonymous tip suggests Amazon Prime membership price increase coming soon.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        sentiment: 'negative',
        reliability: 50,
    },
];

export const getRumorsByCompany = (companyId) => {
    if (!companyId) return RUMORS;
    return RUMORS.filter(r => r.companyId === companyId);
};

export const searchRumors = (query) => {
    if (!query) return RUMORS;
    const lowerQuery = query.toLowerCase();
    return RUMORS.filter(r =>
        r.content.toLowerCase().includes(lowerQuery)
    );
};

export const getReliabilityColor = (reliability) => {
    if (reliability >= 80) return '#00ff88'; // Green - High reliability
    if (reliability >= 60) return '#fbbf24'; // Yellow - Medium reliability
    return '#f87171'; // Red - Low reliability
};

export const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return '#00ff88';
    if (sentiment === 'negative') return '#f87171';
    return '#a0aec0'; // Neutral
};
