'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Briefcase, User, FileText, BookOpen, TrendingUp, PieChart } from 'lucide-react';
import styles from './Knowledge.module.css';

export default function KnowledgePage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
        }
    }, [user, authLoading, router]);

    const knowledgeTopics = [
        { id: 1, title: 'Understanding Stock Markets', icon: <TrendingUp size={32} />, color: '#00ffff' },
        { id: 2, title: 'Financial Ratios & Metrics', icon: <PieChart size={32} />, color: '#0099ff' },
        { id: 3, title: 'Risk Management', icon: <BookOpen size={32} />, color: '#ff00ff' },
        { id: 4, title: 'Annual Reports Analysis', icon: <FileText size={32} />, color: '#00ff88' },
    ];

    if (authLoading || !user) {
        return (
            <div className={styles.loading}>
                <div className="neon-text">Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Vertical Sidebar */}
            <div className={styles.sidebar}>
                <button
                    className={styles.sidebarButton}
                    onClick={() => router.push('/home')}
                    title="Back to Home"
                >
                    <ArrowLeft size={24} />
                </button>

                <button
                    className={styles.sidebarButton}
                    onClick={() => router.push('/portfolio')}
                    title="Portfolio"
                >
                    <Briefcase size={24} />
                </button>

                <button
                    className={styles.sidebarButton}
                    onClick={() => router.push('/account')}
                    title="Account"
                >
                    <User size={24} />
                </button>

                <button
                    className={`${styles.sidebarButton} ${styles.active}`}
                    onClick={() => router.push('/notes')}
                    title="My Notes"
                >
                    <FileText size={24} />
                </button>
            </div>

            {/* Main Content */}
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        <BookOpen size={40} />
                        Build Financial IQ
                    </h1>
                    <p className={styles.subtitle}>
                        Enhance your understanding of markets, investing, and financial decision-making
                    </p>
                </div>

                <div className={styles.topicsGrid}>
                    {knowledgeTopics.map((topic) => (
                        <div
                            key={topic.id}
                            className={styles.topicCard}
                            style={{ '--topic-color': topic.color }}
                        >
                            <div className={styles.topicIcon}>{topic.icon}</div>
                            <h3 className={styles.topicTitle}>{topic.title}</h3>
                            <p className={styles.topicDesc}>Interactive lessons and resources</p>
                            <button className={styles.topicButton}>
                                Explore →
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.placeholderMessage}>
                    <p>📚 Full knowledge base content coming soon! Use the AI Learn feature for personalized tutoring.</p>
                </div>
            </div>
        </div>
    );
}
