'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAudio } from '@/contexts/AudioContext';
import styles from './Welcome.module.css';

export default function WelcomePage() {
    const router = useRouter();
    const { play } = useAudio();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in on mount
        setIsVisible(true);

        // Handle click anywhere
        const handleClick = () => {
            play(); // Start music on interaction
            router.push('/auth');
        };

        // Handle any key press
        const handleKeyPress = () => {
            play(); // Start music on interaction
            router.push('/auth');
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [router, play]);

    return (
        <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.background}></div>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>
                    <span className={styles.rumor}>Rumor</span>
                    <span className={styles.street}>Street</span>
                </h1>

                <p className={styles.tagline}>
                    Navigate the market through whispers and headlines
                </p>

                <div className={styles.prompt}>
                    <span className={styles.promptText}>Click anywhere or press any key to begin</span>
                    <span className={styles.cursor}>_</span>
                </div>
            </div>

            {/* Animated particles */}
            <div className={styles.particles}>
                {[...Array(30)].map((_, i) => (
                    <div key={i} className={styles.particle} style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 10}s`
                    }}></div>
                ))}
            </div>
        </div>
    );
}
