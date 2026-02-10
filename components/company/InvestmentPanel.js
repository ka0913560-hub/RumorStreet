'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserProfile } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle, MinusCircle, TrendingUp } from 'lucide-react';
import styles from './InvestmentPanel.module.css';

export default function InvestmentPanel({ company, userProfile }) {
    const router = useRouter();
    const { user, setUserProfile } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('buy'); // 'buy' or 'sell'
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!company || !userProfile) return null;

    const totalCost = (quantity * company.currentPrice).toFixed(2);
    const canAfford = parseFloat(totalCost) <= (userProfile.walletBalance || 0);

    const handleTransaction = async () => {
        if (!user) return;

        setLoading(true);
        setMessage('');

        try {
            // Calculate new balances
            const newWalletBalance = activeTab === 'buy'
                ? userProfile.walletBalance - parseFloat(totalCost)
                : userProfile.walletBalance + parseFloat(totalCost);

            // Update user profile
            const updatedProfile = {
                ...userProfile,
                walletBalance: newWalletBalance,
                lastTransaction: {
                    type: activeTab,
                    company: company.name,
                    ticker: company.ticker,
                    quantity: quantity,
                    price: company.currentPrice,
                    total: parseFloat(totalCost),
                    timestamp: new Date().toISOString(),
                },
            };

            const result = await updateUserProfile(user.uid, updatedProfile);

            if (result.success) {
                setUserProfile(updatedProfile);
                setMessage(`✅ Successfully ${activeTab === 'buy' ? 'purchased' : 'sold'} ${quantity} shares!`);
                setQuantity(1);

                // Redirect to portfolio after 2 seconds
                setTimeout(() => {
                    router.push('/portfolio');
                }, 2000);
            } else {
                setMessage(`❌ Error: ${result.error}`);
            }
        } catch (error) {
            setMessage(`❌ Transaction failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Investment Panel</h2>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'buy' ? styles.active : ''}`}
                        onClick={() => setActiveTab('buy')}
                    >
                        <PlusCircle size={18} />
                        Buy
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'sell' ? styles.active : ''}`}
                        onClick={() => setActiveTab('sell')}
                    >
                        <MinusCircle size={18} />
                        Sell
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.inputSection}>
                    <label className={styles.label}>
                        Quantity (Shares)
                    </label>
                    <div className={styles.quantityControl}>
                        <button
                            className={styles.quantityButton}
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className={styles.quantityInput}
                        />
                        <button
                            className={styles.quantityButton}
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                        <span>Price per share:</span>
                        <span className={styles.summaryValue}>${company.currentPrice.toFixed(2)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Quantity:</span>
                        <span className={styles.summaryValue}>{quantity}</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total {activeTab === 'buy' ? 'Cost' : 'Revenue'}:</span>
                        <span className={styles.totalValue}>${totalCost}</span>
                    </div>
                </div>

                {activeTab === 'buy' && !canAfford && (
                    <div className={styles.warning}>
                        ⚠️ Insufficient funds. You need ${(parseFloat(totalCost) - userProfile.walletBalance).toFixed(2)} more.
                    </div>
                )}

                {message && (
                    <div className={message.includes('✅') ? styles.success : styles.error}>
                        {message}
                    </div>
                )}

                <button
                    className={`${styles.actionButton} ${activeTab === 'sell' ? styles.sellButton : ''}`}
                    onClick={handleTransaction}
                    disabled={loading || (activeTab === 'buy' && !canAfford)}
                >
                    {loading ? 'Processing...' : (
                        <>
                            <TrendingUp size={20} />
                            {activeTab === 'buy' ? `Buy ${quantity} Shares` : `Sell ${quantity} Shares`}
                        </>
                    )}
                </button>

                <div className={styles.info}>
                    <p>💡 This is a simulation. All transactions are virtual and for educational purposes only.</p>
                </div>
            </div>
        </div>
    );
}
