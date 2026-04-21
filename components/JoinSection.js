'use client';

import { motion } from '@/lib/framer-motion';
import { homeContent } from '@/data/homeContent';
import styles from './JoinSection.module.css';

export default function JoinSection() {
    const { recruitment } = homeContent;
    const isClosed = recruitment.status === 'Closed';

    return (
        <section id="join" className={`${styles.section} ${isClosed ? styles.closed : ''}`} data-navbar-tone="dark">
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className={styles.eyebrow}>{recruitment.eyebrow}</span>
                    <h2 className={styles.heading}>{recruitment.heading}</h2>

                    <div className={styles.statusBox}>
                        <div className={styles.statusBadge}>
                            <span className={styles.dot} />
                            {isClosed ? recruitment.closedBadgeLabel : recruitment.openBadgeLabel}
                        </div>
                        <p className={styles.message}>
                            {isClosed ? recruitment.closedMessage : recruitment.openMessage}
                        </p>
                        <p className={styles.subtext}>{recruitment.subtext}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
