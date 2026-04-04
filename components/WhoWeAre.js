'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhoWeAre.module.css';
import { homeContent } from '@/data/homeContent';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeAre() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        const image = imageRef.current;

        if (!section || !text || !image) return;

        // Text fade in from left
        gsap.fromTo(
            text,
            { opacity: 0, x: -60 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Image slide in from right
        gsap.fromTo(
            image,
            { opacity: 0, x: 80, rotation: 3 },
            {
                opacity: 1,
                x: 0,
                rotation: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Refresh triggers once hero loading might have finished
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section id="about" ref={sectionRef} className={styles.section} data-navbar-tone="dark">
            <div className={styles.container}>
                <div ref={textRef} className={styles.content}>
                    <span className={styles.eyebrow}>{homeContent.about.eyebrow}</span>
                    <h2 className={styles.heading}>{homeContent.about.heading}</h2>
                    {homeContent.about.descriptions.map((desc, idx) => (
                        <p key={idx} className={styles.description}>
                            {desc}
                        </p>
                    ))}
                    <div className={styles.stats}>
                        {homeContent.about.stats.map((stat, idx) => (
                            <div key={idx} className={styles.stat}>
                                <span className={styles.statNumber}>{stat.number}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div ref={imageRef} className={styles.imageWrapper}>
                    <img
                        src={homeContent.about.image.url}
                        alt={homeContent.about.image.alt}
                        className={styles.image}
                    />
                    <div className={styles.imageCaption}>
                        <span className={styles.captionText}>{homeContent.about.image.caption}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
