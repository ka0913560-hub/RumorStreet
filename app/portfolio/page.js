'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { User, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';
import styles from './Portfolio.module.css';

export default function PortfolioPage() {
    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
            return;
        }

        // Load transaction history from user profile
        if (userProfile && userProfile.lastTransaction) {
            // In a real app, this would fetch all transactions from Firestore
            // For now, we'll use the last transaction as a demo
            setTransactions([userProfile.lastTransaction]);
        }
    }, [user, userProfile, authLoading, router]);

    if (authLoading || !user || !userProfile) {
        return (
            <div className={styles.loading}>
                <div className="neon-text">Loading Portfolio...</div>
            </div>
        );
    }

    const totalInvestment = transactions.reduce((sum, t) => {
        return t.type === 'buy' ? sum + t.total : sum - t.total;
    }, 0);

    return (
        <div className={styles.container}>
            {/* Top Navbar */}
            <div className={styles.navbar}>
                <h1 className={styles.title}>My Portfolio</h1>
                <button
                    className={styles.accountButton}
                    onClick={() => router.push('/account')}
                    title="Account Settings"
                >
                    <User size={20} />
                    <span>Account</span>
                </button>
            </div>

            {/* Portfolio Summary Cards */}
            <div className={styles.summarySection}>
                <div className={styles.summaryCard}>
                    <div className={styles.cardIcon}>
                        <DollarSign size={28} />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.cardLabel}>Wallet Balance</span>
                        <span className={styles.cardValue}>
                            ${userProfile.walletBalance?.toLocaleString() || '0'}
                        </span>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.cardIcon}>
                        <TrendingUp size={28} />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.cardLabel}>Total Invested</span>
                        <span className={styles.cardValue}>
                            ${totalInvestment.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.cardIcon}>
                        <Clock size={28} />
                    </div>
                    <div className={styles.cardContent}>
                        <span className={styles.cardLabel}>Total Transactions</span>
                        <span className={styles.cardValue}>{transactions.length}</span>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className={styles.historySection}>
                <h2 className={styles.historyTitle}>Transaction History</h2>

                {transactions.length === 0 ? (
                    <div className={styles.emptyState}>
                        <TrendingUp size={48} className={styles.emptyIcon} />
                        <p className={styles.emptyText}>No transactions yet</p>
                        <p className={styles.emptySubtext}>
                            Start investing by exploring companies on the home page!
                        </p>
                        <button
                            className={styles.homeButton}
                            onClick={() => router.push('/home')}
                        >
                            Go to Home
                        </button>
                    </div>
                ) : (
                    <div className={styles.transactionList}>
                        {transactions.map((transaction, index) => {
                            const isBuy = transaction.type === 'buy';
                            const transactionDate = new Date(transaction.timestamp);

                            return (
                                <div key={index} className={styles.transactionCard}>
                                    <div className={styles.transactionHeader}>
                                        <div className={styles.transactionCompany}>
                                            <span className={styles.companyName}>{transaction.company}</span>
                                            <span className={styles.ticker}>({transaction.ticker})</span>
                                        </div>
                                        <div className={`${styles.transactionType} ${isBuy ? styles.buy : styles.sell}`}>
                                            {isBuy ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                            <span>{isBuy ? 'BUY' : 'SELL'}</span>
                                        </div>
                                    </div>

                                    <div className={styles.transactionDetails}>
                                        <div className={styles.detailRow}>
                                            <span className={styles.detailLabel}>Quantity:</span>
                                            <span className={styles.detailValue}>{transaction.quantity} shares</span>
                                        </div>
                                        <div className={styles.detailRow}>
                                            <span className={styles.detailLabel}>Price per share:</span>
                                            <span className={styles.detailValue}>${transaction.price.toFixed(2)}</span>
                                        </div>
                                        <div className={styles.detailRow}>
                                            <span className={styles.detailLabel}>Total:</span>
                                            <span className={`${styles.detailValue} ${styles.total}`}>
                                                ${transaction.total.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className={styles.detailRow}>
                                            <span className={styles.detailLabel}>Date:</span>
                                            <span className={styles.detailValue}>
                                                {transactionDate.toLocaleDateString()} {transactionDate.toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Back to Home */}
            <button
                className={styles.backButton}
                onClick={() => router.push('/home')}
            >
                ← Back to Home
            </button>
        </div>
    );
}
