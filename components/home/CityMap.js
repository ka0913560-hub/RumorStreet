'use client';

import { useState, useEffect } from 'react';
import { COMPANIES, searchCompanies } from '@/data/companies';
import styles from './CityMap.module.css';

export default function CityMap({ searchQuery, onCompanySelect }) {
    const [hoveredCompany, setHoveredCompany] = useState(null);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [showPopup, setShowPopup] = useState(null);
    const [filteredCompanies, setFilteredCompanies] = useState(COMPANIES);

    useEffect(() => {
        const filtered = searchCompanies(searchQuery);
        setFilteredCompanies(filtered);

        // Auto-show popup for searched company
        if (searchQuery && filtered.length === 1) {
            setShowPopup(filtered[0].id);
        } else if (!searchQuery) {
            setShowPopup(null);
        }
    }, [searchQuery]);

    const handleMouseEnter = (company) => {
        const timeout = setTimeout(() => {
            setShowPopup(company.id);
        }, 2000); // 2 second delay
        setHoverTimeout(timeout);
        setHoveredCompany(company.id);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setHoveredCompany(null);
        // Don't close popup immediately if it was opened
    };

    const handleCompanyClick = (company) => {
        if (onCompanySelect) {
            onCompanySelect(company);
        }
    };

    return (
        <div className={styles.container}>
            <svg className={styles.map} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Grid background */}
                <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,255,255,0.1)" strokeWidth="0.2" />
                    </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Company buildings */}
                {filteredCompanies.map(company => (
                    <g key={company.id}>
                        {/* Building */}
                        <rect
                            x={company.position.x - 3}
                            y={company.position.y - 4}
                            width="6"
                            height="6"
                            fill={company.color}
                            opacity={hoveredCompany === company.id ? "0.9" : "0.7"}
                            stroke={company.color}
                            strokeWidth="0.3"
                            className={styles.building}
                            onMouseEnter={() => handleMouseEnter(company)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleCompanyClick(company)}
                            style={{
                                filter: hoveredCompany === company.id ?
                                    `drop-shadow(0 0 3px ${company.color})` : 'none'
                            }}
                        />

                        {/* Company label */}
                        <text
                            x={company.position.x}
                            y={company.position.y + 5}
                            textAnchor="middle"
                            fill={company.color}
                            fontSize="2.5"
                            fontWeight="bold"
                            className={styles.label}
                        >
                            {company.ticker}
                        </text>

                        {/* Popup */}
                        {showPopup === company.id && (
                            <g className={styles.popup}>
                                <rect
                                    x={company.position.x - 10}
                                    y={company.position.y - 14}
                                    width="20"
                                    height="8"
                                    fill="rgba(17, 24, 39, 0.95)"
                                    stroke={company.color}
                                    strokeWidth="0.3"
                                    rx="1"
                                />
                                <text
                                    x={company.position.x}
                                    y={company.position.y - 11}
                                    textAnchor="middle"
                                    fill={company.color}
                                    fontSize="1.8"
                                    fontWeight="bold"
                                >
                                    {company.name}
                                </text>
                                <text
                                    x={company.position.x}
                                    y={company.position.y - 8.5}
                                    textAnchor="middle"
                                    fill="#ffffff"
                                    fontSize="1.3"
                                >
                                    ${company.currentPrice.toFixed(2)}
                                </text>
                                <text
                                    x={company.position.x}
                                    y={company.position.y - 6.5}
                                    textAnchor="middle"
                                    fill={company.change24h >= 0 ? '#00ff88' : '#f87171'}
                                    fontSize="1.2"
                                >
                                    {company.change24h >= 0 ? '+' : ''}{company.change24h.toFixed(2)}%
                                </text>
                            </g>
                        )}
                    </g>
                ))}

                {/* Decorative elements */}
                <circle cx="10" cy="10" r="0.5" fill="#00ffff" opacity="0.5">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="90" cy="90" r="0.5" fill="#ff00ff" opacity="0.5">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
            </svg>

            {filteredCompanies.length === 0 && (
                <div className={styles.noResults}>
                    <p>No companies found</p>
                </div>
            )}
        </div>
    );
}
