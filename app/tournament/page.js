'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Swords } from 'lucide-react';
import styles from './Tournament.module.css';

export default function TournamentPage() {
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
                    <Trophy size={64} className={styles.icon} />
                    <h1 className={styles.title}>Tournament Mode</h1>

                    <div className={styles.modes}>
                        <div className={styles.modeCard}>
                            <Swords size={40} />
                            <h3>1v1 Battle</h3>
                            <p>Challenge another player</p>
                            <button disabled>Coming Soon</button>
                        </div>
                        <div className={styles.modeCard}>
                            <Trophy size={40} />
                            <h3>Weekly Tournament</h3>
                            <p>Compete with all players</p>
                            <button disabled>Coming Soon</button>
                        </div>
                    </div>

                    <div className={styles.placeholder}>
                        <p>🚧 Tournament Features Under Development</p>
                        <p>Multiplayer competitive modes coming soon!</p>
                    </div>

                    <button className={styles.backButton} onClick={() => router.push('/home')}>
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
