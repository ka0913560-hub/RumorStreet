'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Home.module.css';
import RumorFeed from '@/components/home/RumorFeed';
import CityMap from '@/components/home/CityMap';
import DisclaimerModal from '@/components/home/DisclaimerModal';
import { Search, User, Briefcase, Youtube, Maximize } from 'lucide-react';

export default function HomePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
            return;
        }

        // Check if first visit (show disclaimer modal)
        const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
        if (!hasSeenDisclaimer && user) {
            setShowDisclaimer(true);
        }
    }, [user, authLoading, router]);

    const handleDisclaimerClose = () => {
        setShowDisclaimer(false);
        localStorage.setItem('hasSeenDisclaimer', 'true');
    };

    const handleCompanySelect = (companyId) => {
        router.push(`/company/${companyId}`);
    };

    if (authLoading) {
        return (
            <div className={styles.loading}>
                <div className="neon-text">Loading...</div>
            </div>
        );
    }

    return (
        <>
            {showDisclaimer && <DisclaimerModal onClose={handleDisclaimerClose} />}

            <div className={styles.container}>
                <div className={styles.splitView}>
                    {/* Rumor Feed */}
                    <div className={styles.feedContainer}>
                        <RumorFeed searchQuery={searchQuery} />
                    </div>

                    {/* Navbar */}
                    <div className={styles.navbar}>
                        <div className={styles.searchBar}>
                            <Search size={20} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search companies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        <div className={styles.navIcons}>
                            <button
                                className={styles.iconButton}
                                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                                title="Tutorial"
                            >
                                <Youtube size={24} />
                            </button>
                            <button
                                className={styles.iconButton}
                                onClick={() => router.push('/portfolio')}
                                title="Portfolio"
                            >
                                <Briefcase size={24} />
                            </button>
                            <button
                                className={styles.iconButton}
                                onClick={() => router.push('/account')}
                                title="Account"
                            >
                                <User size={24} />
                            </button>
                        </div>
                    </div>

                    {/* City Map */}
                    <div className={styles.mapContainer}>
                        <CityMap
                            searchQuery={searchQuery}
                            onCompanySelect={handleCompanySelect}
                        />

                        <button
                            className={styles.fullscreenButton}
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            title="Toggle Fullscreen"
                        >
                            <Maximize size={20} />
                        </button>
                    </div>

                    {/* Footer Buttons */}
                    <div className={styles.footer}>
                        <button
                            className={styles.footerButton}
                            onClick={() => router.push('/playai')}
                        >
                            🎮 Play with AI
                        </button>
                        <button
                            className={styles.footerButton}
                            onClick={() => router.push('/learnai')}
                        >
                            🧠 Learn with AI
                        </button>
                        <button
                            className={styles.footerButton}
                            onClick={() => router.push('/knowledge')}
                        >
                            📚 Build Financial IQ
                        </button>
                        <button
                            className={styles.footerButton}
                            onClick={() => router.push('/tournament')}
                        >
                            🏆 Vs Players
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
