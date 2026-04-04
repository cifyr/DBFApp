'use client';

import styles from './Footer.module.css';
import { homeContent } from '@/data/homeContent';
import TransitionLink from './TransitionLink';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer} data-navbar-tone="light">
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3 className={styles.logo}>{homeContent.footer.brandName}</h3>
                    <p className={styles.tagline}>{homeContent.footer.tagline}</p>
                </div>

                <div className={styles.nav}>
                    {homeContent.footer.sections.map((section, idx) => (
                        <div key={idx} className={styles.navSection}>
                            <h4 className={styles.sectionTitle}>{section.title}</h4>
                            <div className={styles.sectionLinks}>
                                {section.links.map((link, lIdx) => (
                                    <TransitionLink key={lIdx} href={link.url} className={styles.navLink}>
                                        {link.label}
                                    </TransitionLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.contact}>
                    <h4 className={styles.sectionTitle}>Contact</h4>
                    <p className={styles.contactText}>
                        Questions? Reach out to us at{' '}
                        <a
                            href={homeContent.footer.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactLink}
                        >
                            {homeContent.footer.instagramHandle}
                        </a>
                        {' '}or{' '}
                        <a href={`mailto:${homeContent.footer.email}`} className={styles.contactLink}>
                            {homeContent.footer.email}
                        </a>
                    </p>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} {homeContent.brand.pageTitle}. All rights reserved.
                    </p>
                    <p className={styles.aiaa}>
                        A proud participant in the{' '}
                        <a
                            href={homeContent.footer.aiaaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.aiaaLink}
                        >
                            AIAA Design-Build-Fly Competition
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
