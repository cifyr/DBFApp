'use client';

import { motion } from 'framer-motion';
import styles from './Templates.module.css';

export default function TeamLegacy({ legacy }) {
    if (!legacy || legacy.length === 0) return null;

    return (
        <section className={styles.legacySection}>
            <div className={styles.legacyContainer}>
                <motion.h2
                    className={styles.legacyHeading}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Legacy & Leadership
                </motion.h2>
                <p className={styles.legacySubtext}>Honoring those who paved the way.</p>

                <div className={styles.legacyGrid}>
                    {legacy.map((leader, i) => (
                        <motion.div
                            key={i}
                            className={styles.legacyCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.legacyImageFrame}>
                                <img src={leader.image} alt={leader.name} className={styles.legacyImage} />
                            </div>
                            <div className={styles.legacyInfo}>
                                <span className={styles.legacyYear}>{leader.year}</span>
                                <h4 className={styles.legacyName}>{leader.name}</h4>
                                <p className={styles.legacyRole}>{leader.role}</p>
                                <blockquote className={styles.legacyQuote}>"{leader.quote}"</blockquote>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
