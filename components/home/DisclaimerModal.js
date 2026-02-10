'use client';

import { useEffect } from 'react';
import styles from './DisclaimerModal.module.css';

export default function DisclaimerModal({ onClose }) {
    useEffect(() => {
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Important Disclosure</h2>

                <div className={styles.content}>
                    <p>
                        This simulation is inspired by real-world market behavior. It incorporates
                        <strong> fictional rumors</strong> alongside <strong>historical news from 2-3 years ago</strong> to
                        help users understand how market narratives influence stock movements and develop
                        informed decision-making skills.
                    </p>

                    <p>
                        All investments made within RumorStreet are <strong>virtual and for educational purposes only</strong>.
                        No real money is involved. This platform is designed to improve your financial literacy
                        and analytical abilities in a risk-free environment.
                    </p>

                    <div className={styles.highlight}>
                        <span className={styles.icon}>⚠️</span>
                        <p>
                            The information presented here should not be considered as financial advice.
                            Always conduct thorough research and consult with certified financial advisors
                            before making real-world investment decisions.
                        </p>
                    </div>
                </div>

                <button className={styles.acceptButton} onClick={onClose}>
                    I Understand & Accept
                </button>
            </div>
        </div>
    );
}
