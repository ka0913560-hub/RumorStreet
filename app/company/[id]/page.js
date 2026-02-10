'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { COMPANIES, getCompanyById } from '@/data/companies';
import { getRumorsByCompany } from '@/data/rumors';
import RumorFeed from '@/components/home/RumorFeed';
import CompanyMetrics from '@/components/company/CompanyMetrics';
import InvestmentPanel from '@/components/company/InvestmentPanel';
import { ArrowLeft, Briefcase, User, Wallet } from 'lucide-react';
import styles from './Company.module.css';

export default function CompanyPage({ params }) {
    const router = useRouter();
    const { user, userProfile, loading: authLoading } = useAuth();
    const [company, setCompany] = useState(null);

    // Unwrap params Promise for Next.js 15+
    const unwrappedParams = use(params);
    const companyId = unwrappedParams?.id;

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
            return;
        }

        if (companyId) {
            const foundCompany = getCompanyById(companyId);
            setCompany(foundCompany);
        }
    }, [companyId, user, authLoading, router]);

    if (authLoading || !user || !company) {
        return (
            <div className={styles.loading}>
                <div className="neon-text">Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Left Panel - Rumor Feed (stays visible) */}
            <div className={styles.leftPanel}>
                <RumorFeed searchQuery={company.name} />
            </div>

            {/* Right Panel - Company Details */}
            <div className={styles.rightPanel}>
                {/* Custom Navbar */}
                <div className={styles.navbar}>
                    <button
                        className={styles.backButton}
                        onClick={() => router.push('/home')}
                        title="Back to Home"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className={styles.companyInfo}>
                        <h1 className={styles.companyName}>{company.name}</h1>
                        <span className={styles.ticker}>({company.ticker})</span>
                    </div>

                    <div className={styles.navRight}>
                        <div className={styles.walletDisplay}>
                            <Wallet size={18} />
                            <span>${userProfile?.walletBalance?.toLocaleString() || '100,000'}</span>
                        </div>

                        <button
                            className={styles.iconButton}
                            onClick={() => router.push('/portfolio')}
                            title="Portfolio"
                        >
                            <Briefcase size={20} />
                        </button>

                        <button
                            className={styles.iconButton}
                            onClick={() => router.push('/account')}
                            title="Account"
                        >
                            <User size={20} />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className={styles.content}>
                    <CompanyMetrics company={company} />
                    <InvestmentPanel company={company} userProfile={userProfile} />
                </div>
            </div>
        </div>
    );
}
