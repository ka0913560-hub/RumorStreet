'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Send } from 'lucide-react';
import styles from './LearnAI.module.css';

export default function LearnAIPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
        }
    }, [user, authLoading, router]);

    if (authLoading || !user) {
        return <div className={styles.loading}><div className="neon-text">Loading...</div></div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <button className={styles.backButton} onClick={() => router.push('/home')}>← Home</button>
                <h2 className={styles.sidebarTitle}>AI Tutor</h2>
                <div className={styles.features}>
                    <div className={styles.feature}>📊 Stock Analysis</div>
                    <div className={styles.feature}>📄 Annual Reports</div>
                    <div className={styles.feature}>📈 Market Insights</div>
                </div>
            </div>

            <div className={styles.chat}>
                <div className={styles.header}>
                    <MessageSquare size={28} />
                    <h1>Learn with AI</h1>
                </div>

                <div className={styles.systemMessage}>
                    <p>👋 Hi! I'm your AI financial tutor. I can help you:</p>
                    <ul>
                        <li>Analyze stocks and companies</li>
                        <li>Understand annual reports</li>
                        <li>Learn financial concepts</li>
                        <li>Upload PDFs for analysis</li>
                    </ul>
                    <p className={styles.note}>✨ Start chatting to learn more!</p>
                </div>

                <div className={styles.placeholderChat}>
                    <div className={styles.placeholderMessage}>
                        <p>🚧 AI Integration Coming Soon!</p>
                        <p>This feature will connect to OpenAI/Gemini API for real-time tutoring.</p>
                    </div>
                </div>

                <div className={styles.inputBar}>
                    <input type="text" placeholder="Ask me anything about investing..." className={styles.input} disabled />
                    <button className={styles.sendButton} disabled>
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
