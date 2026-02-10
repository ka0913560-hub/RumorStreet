'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithGoogle, loginWithEmail, signupWithEmail } from '@/lib/firebase';
import styles from './Auth.module.css';
import { Mail, Lock, User } from 'lucide-react';

export default function AuthPage() {
    const router = useRouter();
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [captchaCompleted, setCaptchaCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isFormValid = () => {
        if (!email || !password) return false;
        if (isSignup && !displayName) return false;
        if (!captchaCompleted) return false;
        return true;
    };

    const handleGoogleLogin = async () => {
        if (!captchaCompleted) {
            setError('Please complete the captcha first');
            return;
        }

        setLoading(true);
        setError('');
        const result = await loginWithGoogle();

        if (result.success) {
            router.push('/home');
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let result;
        if (isSignup) {
            result = await signupWithEmail(email, password, displayName);
        } else {
            result = await loginWithEmail(email, password);
        }

        if (result.success) {
            router.push('/home');
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    const handleCaptchaChange = (e) => {
        const value = e.target.value.toLowerCase();
        if (value === 'stocks') {
            setCaptchaCompleted(true);
            setError('');
        } else {
            setCaptchaCompleted(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background}></div>
            <div className={styles.overlay}></div>

            <div className={styles.authPanel}>
                <div className={styles.logo}>
                    <span className={styles.logoRumor}>Rumor</span>
                    <span className={styles.logoStreet}>Street</span>
                </div>

                <h2 className={styles.title}>
                    {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>

                <button
                    className={styles.googleButton}
                    onClick={handleGoogleLogin}
                    disabled={loading || !captchaCompleted}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <div className={styles.divider}>
                    <span>OR</span>
                </div>

                <form onSubmit={handleEmailAuth} className={styles.form}>
                    {isSignup && (
                        <div className={styles.inputGroup}>
                            <User className={styles.inputIcon} size={20} />
                            <input
                                type="text"
                                placeholder="Display Name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <Mail className={styles.inputIcon} size={20} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <Lock className={styles.inputIcon} size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.captcha}>
                        <input
                            type="text"
                            placeholder="Type 'stocks' to verify you're human"
                            onChange={handleCaptchaChange}
                            className={styles.captchaInput}
                        />
                        {captchaCompleted && (
                            <span className={styles.captchaCheck}>✓</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={!isFormValid() || loading}
                    >
                        {loading ? 'Please wait...' : (isSignup ? 'Sign Up' : 'Login')}
                    </button>
                </form>

                <div className={styles.toggleMode}>
                    <span>
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    </span>
                    <button
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError('');
                        }}
                        className={styles.toggleButton}
                    >
                        {isSignup ? 'Login' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
}
