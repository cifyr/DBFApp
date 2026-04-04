'use client';

import { motion } from 'framer-motion';
import { formatPersonAcademicInfo } from '@/data/people';
import TeamCarousel from './TeamCarousel';
import styles from './Templates.module.css';

export default function AdminContent({ about, carousel, adminLeaders }) {
    return (
        <div className={styles.contentContainer} data-navbar-tone="dark">
            {/* About Section with Admin Leaders */}
            <section className={styles.aboutSection}>
                <div className={styles.columnLeft}>
                    <motion.h2
                        className={styles.sectionHeading}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {about.heading}
                    </motion.h2>
                </div>
            </section>

            <TeamCarousel carousel={carousel} />

            {/* Admin Leaders with Paragraphs */}
            <section className={styles.adminLeadersSection}>
                {adminLeaders && adminLeaders.map((leader, index) => (
                    <motion.div
                        key={index}
                        className={`${styles.adminLeaderRow} ${index % 2 === 0 ? styles.photoLeft : styles.photoRight}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={styles.adminLeaderProfile}>
                            <div className={styles.adminImageWrapper}>
                                <img
                                    src={leader.image || `https://ui-avatars.com/api/?name=${leader.name}&background=random`}
                                    alt={leader.name}
                                    className={styles.adminImage}
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=1C332A&color=fff&size=200`;
                                    }}
                                />
                            </div>
                            <h4 className={styles.adminName}>{leader.name}</h4>
                            <p className={styles.adminBio}>{formatPersonAcademicInfo(leader)}</p>
                            <p className={styles.adminSection}>{leader.section}</p>
                        </div>

                        <div className={styles.adminContent}>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.2 }}
                            >
                                {about.content[index]}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Images Section */}
            {about.images && about.images.length > 0 && (
                <section className={styles.adminImagesSection}>
                    <div className={styles.adminImagesGrid}>
                        {about.images.map((img, i) => (
                            <motion.div
                                key={i}
                                className={styles.aboutImageWrapper}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                            >
                                <img src={img} alt="Admin team" className={styles.aboutImage} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
