'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getLeaderboard } from '@/lib/firebase';
import { Trophy, Medal, Award, User, TrendingUp } from 'lucide-react';
import styles from './Leaderboard.module.css';

export default function LeaderboardPage() {
    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
            return;
        }

        const fetchLeaderboard = async () => {
            const result = await getLeaderboard(100);
            if (result.success) {
                setLeaderboard(result.data);
            }
            setLoading(false);
        };

        if (user) {
            fetchLeaderboard();
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) {
        return (
            <div className={styles.loading}>
                <div className="neon-text">Loading Leaderboard...</div>
            </div>
        );
    }

    const getRankIcon = (rank) => {
        if (rank === 1) return <Trophy size={24} className={styles.goldIcon} />;
        if (rank === 2) return <Medal size={24} className={styles.silverIcon} />;
        if (rank === 3) return <Award size={24} className={styles.bronzeIcon} />;
        return <span className={styles.rankNumber}>#{rank}</span>;
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <button className={styles.backButton} onClick={() => router.push('/home')}>
                        ← Back
                    </button>
                    <h1 className={styles.title}>
                        <Trophy size={32} />
                        Leaderboard
                    </h1>
                    <button className={styles.accountButton} onClick={() => router.push('/account')}>
                        <User size={20} />
                        Account
                    </button>
                </div>

                <div className={styles.infoPanel}>
                    <div className={styles.infoCard}>
                        <TrendingUp size={24} />
                        <p>All players receive equal periodic virtual funds determined by game admins based on market conditions.</p>
                    </div>
                    <div className={styles.infoCard}>
                        <Award size={24} />
                        <p>Earn rewards through Play with AI challenges and Tournament victories!</p>
                    </div>
                    <div className={styles.resetInfo}>
                        <span>Rankings reset every 3 weeks</span>
                    </div>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className={styles.tableContainer}>
                {leaderboard.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Trophy size={64} className={styles.emptyIcon} />
                        <p className={styles.emptyText}>No rankings yet</p>
                        <p className={styles.emptySubtext}>Be the first to make it to the leaderboard!</p>
                    </div>
                ) : (
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <div className={styles.cell}>Rank</div>
                            <div className={styles.cell}>Player</div>
                            <div className={styles.cell}>Portfolio Value</div>
                            <div className={styles.cell}>Wallet Balance</div>
                        </div>

                        {leaderboard.map((player, index) => {
                            const rank = index + 1;
                            const isCurrentUser = player.uid === user?.uid;

                            return (
                                <div
                                    key={player.id}
                                    className={`${styles.tableRow} ${isCurrentUser ? styles.currentUser : ''} ${rank <= 3 ? styles.topThree : ''}`}
                                >
                                    <div className={styles.cell}>
                                        {getRankIcon(rank)}
                                    </div>
                                    <div className={styles.cell}>
                                        <div className={styles.playerInfo}>
                                            <User size={20} />
                                            <span className={styles.playerName}>
                                                {player.displayName || 'Player'}
                                                {isCurrentUser && <span className={styles.youBadge}>(You)</span>}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.value}>
                                            ${player.portfolioValue?.toLocaleString() || '0'}
                                        </span>
                                    </div>
                                    <div className={styles.cell}>
                                        <span className={styles.value}>
                                            ${player.walletBalance?.toLocaleString() || '0'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
