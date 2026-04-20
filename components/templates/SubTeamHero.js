'use client';

import { motion } from '@/lib/framer-motion';
import styles from './Templates.module.css';

export default function SubTeamHero({ title, description }) {
    return (
        <section className={styles.heroSection} data-navbar-tone="light">
            {/* Technical Grid Background */}
            <div className={styles.techBackground}>
                <div className={styles.gridPattern} />
                <div className={styles.dotPattern} />
                <div className={styles.radialGradient} />
            </div>

            <div className={styles.heroContent}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={styles.techCircle}
                />

                <motion.h1
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {title}
                </motion.h1>
                <div className={styles.techDivider} />
                <motion.p
                    className={styles.heroDescription}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    {description}
                </motion.p>
            </div>
        </section>
    );
}
