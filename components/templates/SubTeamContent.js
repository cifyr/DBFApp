'use client';

import { motion } from '@/lib/framer-motion';
import { formatPersonAcademicInfo } from '@/data/people';
import ProgressiveHeadshot from '@/components/ProgressiveHeadshot';
import TeamCarousel from './TeamCarousel';
import styles from './Templates.module.css';

export default function SubTeamContent({ about, carousel, leaders }) {
    return (
        <div className={styles.contentContainer} data-navbar-tone="dark">
            {/* About Section */}
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
                    <div className={styles.textStack}>
                        {about.content.map((paragraph, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </div>
                <div className={styles.columnRight}>
                    {about.images && about.images.map((img, i) => (
                        <motion.div
                            key={i}
                            className={styles.aboutImageWrapper}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                        >
                            <img src={img} alt="About image" className={styles.aboutImage} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <TeamCarousel carousel={carousel} />

            {/* Leaders Section */}
            <section className={styles.leadersSection}>
                <motion.h3
                    className={styles.subHeading}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {leaders && leaders.length === 1 ? 'Current Subteam Lead' : 'Current Subteam Leads'}
                </motion.h3>

                <div className={styles.leadersGrid}>
                    {leaders && leaders.map((leader, i) => (
                        <motion.div
                            key={i}
                            className={styles.leaderCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.leaderImageWrapper}>
                                <ProgressiveHeadshot
                                    src={leader.image || `https://ui-avatars.com/api/?name=${leader.name}&background=random`}
                                    alt={leader.name}
                                    className={styles.leaderImage}
                                    fallbackName={leader.name}
                                />
                            </div>
                            <h4 className={styles.leaderName}>{leader.name}</h4>
                            <p className={styles.leaderBio}>{formatPersonAcademicInfo(leader)}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
