'use client';

import { useState, useEffect, useRef } from 'react';
import { RUMORS, getRumorsByCompany, searchRumors, getReliabilityColor, getSentimentColor } from '@/data/rumors';
import { COMPANIES } from '@/data/companies';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './RumorFeed.module.css';

export default function RumorFeed({ searchQuery }) {
    const [rumors, setRumors] = useState(RUMORS);
    const [filterCompany, setFilterCompany] = useState('');
    const feedRef = useRef(null);

    useEffect(() => {
        // Filter rumors based on search query or selected company
        let filtered = RUMORS;

        if (searchQuery) {
            // Search by company name first
            const matchingCompany = COMPANIES.find(c =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (matchingCompany) {
                filtered = getRumorsByCompany(matchingCompany.id);
            } else {
                filtered = searchRumors(searchQuery);
            }
        } else if (filterCompany) {
            filtered = getRumorsByCompany(filterCompany);
        }

        setRumors(filtered);
    }, [searchQuery, filterCompany]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const getSentimentIcon = (sentiment) => {
        if (sentiment === 'positive') return <TrendingUp size={16} />;
        if (sentiment === 'negative') return <TrendingDown size={16} />;
        return <Minus size={16} />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Rumor Feed</h2>

                <div className={styles.filterContainer}>
                    <select
                        className={styles.filterSelect}
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                    >
                        <option value="">All Companies</option>
                        {COMPANIES.map(company => (
                            <option key={company.id} value={company.id}>
                                {company.name} ({company.ticker})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.feed} ref={feedRef}>
                {rumors.length === 0 ? (
                    <div className={styles.empty}>
                        <p>No rumors found</p>
                    </div>
                ) : (
                    rumors.map(rumor => {
                        const company = COMPANIES.find(c => c.id === rumor.companyId);
                        return (
                            <div key={rumor.id} className={`${styles.rumorCard} ${styles[rumor.type]}`}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.companyBadge} style={{ borderColor: company?.color }}>
                                        <span className={styles.ticker}>{company?.ticker}</span>
                                        <span className={styles.companyName}>{company?.name}</span>
                                    </div>

                                    <span className={styles.timestamp}>
                                        {formatTimestamp(rumor.timestamp)}
                                    </span>
                                </div>

                                <div className={styles.content}>
                                    <p>{rumor.content}</p>
                                </div>

                                <div className={styles.cardFooter}>
                                    <div
                                        className={styles.sentiment}
                                        style={{ color: getSentimentColor(rumor.sentiment) }}
                                    >
                                        {getSentimentIcon(rumor.sentiment)}
                                        <span>{rumor.sentiment}</span>
                                    </div>

                                    <div className={styles.reliability}>
                                        <div className={styles.reliabilityBar}>
                                            <div
                                                className={styles.reliabilityFill}
                                                style={{
                                                    width: `${rumor.reliability}%`,
                                                    backgroundColor: getReliabilityColor(rumor.reliability)
                                                }}
                                            />
                                        </div>
                                        <span style={{ color: getReliabilityColor(rumor.reliability) }}>
                                            {rumor.reliability}% reliable
                                        </span>
                                    </div>

                                    <span className={styles.typeBadge}>
                                        {rumor.type === 'news' ? '📰 News' : '💭 Rumor'}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
