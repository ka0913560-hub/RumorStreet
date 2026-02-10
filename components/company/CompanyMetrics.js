'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './CompanyMetrics.module.css';

export default function CompanyMetrics({ company }) {
    if (!company) return null;

    const isPositive = company.change24h >= 0;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Market Overview</h2>
                <span className={styles.sector}>{company.sector}</span>
            </div>

            <div className={styles.priceSection}>
                <div className={styles.currentPrice}>
                    <span className={styles.priceLabel}>Current Price</span>
                    <span className={styles.price}>${company.currentPrice.toFixed(2)}</span>
                </div>

                <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
                    {isPositive ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                    <span className={styles.changeValue}>
                        {isPositive ? '+' : ''}{company.change24h.toFixed(2)}%
                    </span>
                    <span className={styles.changeLabel}>24h</span>
                </div>
            </div>

            <div className={styles.metricsGrid}>
                <div className={styles.metric}>
                    <span className={styles.metricLabel}>Market Cap</span>
                    <span className={styles.metricValue}>${company.marketCap}</span>
                </div>

                <div className={styles.metric}>
                    <span className={styles.metricLabel}>Volume (24h)</span>
                    <span className={styles.metricValue}>$2.4B</span>
                </div>

                <div className={styles.metric}>
                    <span className={styles.metricLabel}>P/E Ratio</span>
                    <span className={styles.metricValue}>28.5</span>
                </div>

                <div className={styles.metric}>
                    <span className={styles.metricLabel}>52 Week High</span>
                    <span className={styles.metricValue}>${(company.currentPrice * 1.2).toFixed(2)}</span>
                </div>

                <div className={styles.metric}>
                    <span className={styles.metricLabel}>52 Week Low</span>
                    <span className={styles.metricValue}>${(company.currentPrice * 0.75).toFixed(2)}</span>
                </div>

                <div className={styles.metric}>
                    <span className={styles.metricLabel}>Avg Volume</span>
                    <span className={styles.metricValue}>45.2M</span>
                </div>
            </div>

            {/* Simple Price Chart Placeholder */}
            <div className={styles.chartSection}>
                <h3 className={styles.chartTitle}>Price History (7 Days)</h3>
                <div className={styles.chart}>
                    <svg viewBox="0 0 400 100" className={styles.chartSvg}>
                        <polyline
                            points="0,80 50,60 100,65 150,45 200,50 250,30 300,35 350,20 400,25"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00ffff" />
                                <stop offset="100%" stopColor="#0099ff" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
}
