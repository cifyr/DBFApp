'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Sponsors.module.css';
import { homeContent } from '@/data/homeContent';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Sponsors() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    const { sponsors } = homeContent;

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        gsap.fromTo(
            content,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="sponsors" className={styles.section} data-navbar-tone="dark">
            <div ref={contentRef} className={styles.container}>
                <span className={styles.eyebrow}>{sponsors.eyebrow}</span>
                <h2 className={styles.heading}>{sponsors.heading}</h2>
                <div className={styles.contentWrapper}>
                    <p className={styles.description}>{sponsors.description}</p>
                    <ul className={styles.benefitsList}>
                        {sponsors.benefits.map((benefit, index) => (
                            <li key={index} className={styles.benefitItem}>
                                <span className={styles.checkmark}>✓</span> {benefit}
                            </li>
                        ))}
                    </ul>
                    <a href={`mailto:${sponsors.contact.email}`} className={styles.ctaButton}>
                        {sponsors.contact.text}
                    </a>
                </div>
            </div>
        </section>
    );
}
