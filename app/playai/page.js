'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Gamepad2 } from 'lucide-react';
import styles from './PlayAI.module.css';

export default function PlayAIPage() {
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
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <Gamepad2 size={64} className={styles.icon} />
                    <h1 className={styles.title}>Play with AI</h1>

                    <div className={styles.rules}>
                        <h2>Game Rules:</h2>
                        <ul>
                            <li>🎯 Compete against AI player</li>
                            <li>💰 Make better investment decisions</li>
                            <li>📊 Analyze market trends</li>
                            <li>🏆 Earn rewards based on performance</li>
                        </ul>
                    </div>

                    <div className={styles.placeholder}>
                        <p>🚧 AI Game Mode Under Development</p>
                        <p>This feature will pit you against an AI opponent in real-time market simulations!</p>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.startButton} disabled>
                            Start Game
                        </button>
                        <button className={styles.backButton} onClick={() => router.push('/home')}>
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
