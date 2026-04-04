'use client';

import { motion } from 'framer-motion';
import styles from './MissionSection.module.css';
import { homeContent } from '@/data/homeContent';

export default function MissionSection() {
    const { mission } = homeContent;

    return (
        <section id="mission" className={styles.section} data-navbar-tone="dark">
            <div className={styles.container}>
                <motion.div
                    className={styles.contentCard}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                >
                    <span className={styles.eyebrow}>{mission.eyebrow}</span>
                    <h2 className={styles.heading}>{mission.heading}</h2>
                    {mission.descriptions.map((description, index) => (
                        <p key={index} className={styles.description}>
                            {description}
                        </p>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
