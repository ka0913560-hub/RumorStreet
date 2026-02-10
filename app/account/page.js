'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAudio } from '@/contexts/AudioContext';
import { logout } from '@/lib/firebase';
import { Briefcase, Trophy, User, Volume2, VolumeX, LogOut } from 'lucide-react';
import styles from './Account.module.css';

export default function AccountPage() {
    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const { volume, changeVolume, isMuted, toggleMute } = useAudio();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
        }
    }, [user, authLoading, router]);

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            router.push('/auth');
        }
    };

    if (authLoading || !user || !userProfile) {
        return (
            <div className={styles.loading}>
                <div className="neon-text">Loading Account...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Top Navbar */}
            <div className={styles.navbar}>
                <button
                    className={styles.navButton}
                    onClick={() => router.push('/portfolio')}
                    title="Portfolio"
                >
                    <Briefcase size={20} />
                    <span>Portfolio</span>
                </button>

                <h1 className={styles.gameName}>RumorStreet</h1>

                <button
                    className={styles.navButton}
                    onClick={() => router.push('/leaderboard')}
                    title="Leaderboard"
                >
                    <Trophy size={20} />
                    <span>Leaderboard</span>
                </button>
            </div>

            {/* Profile Section */}
            <div className={styles.profileSection}>
                <div className={styles.avatar}>
                    <User size={48} />
                </div>
                <h2 className={styles.displayName}>{userProfile.displayName || 'Player'}</h2>
                <p className={styles.email}>{userProfile.email}</p>
            </div>

            {/* Account Details */}
            <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Account Information</h3>
                <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Display Name</span>
                        <span className={styles.value}>{userProfile.displayName || 'Not set'}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{userProfile.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Wallet Balance</span>
                        <span className={styles.value}>${userProfile.walletBalance?.toLocaleString() || '0'}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Member Since</span>
                        <span className={styles.value}>
                            {new Date(userProfile.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Settings Section */}
            <div className={styles.settingsSection}>
                <h3 className={styles.sectionTitle}>Game Settings</h3>

                {/* Music Volume */}
                <div className={styles.settingItem}>
                    <div className={styles.settingHeader}>
                        <label className={styles.settingLabel}>Music Volume</label>
                        <span className={styles.settingValue}>{Math.round(volume * 100)}%</span>
                    </div>
                    <div className={styles.volumeControl}>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => changeVolume(parseFloat(e.target.value))}
                            className={styles.volumeSlider}
                        />
                    </div>
                </div>

                {/* Sound Toggle */}
                <div className={styles.settingItem}>
                    <div className={styles.settingHeader}>
                        <label className={styles.settingLabel}>Background Music</label>
                    </div>
                    <button
                        className={`${styles.toggleButton} ${isMuted ? styles.muted : styles.playing}`}
                        onClick={toggleMute}
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        <span>{isMuted ? 'Muted' : 'Playing'}</span>
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actionsSection}>
                <button className={styles.backButton} onClick={() => router.push('/home')}>
                    ← Back to Home
                </button>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
}
