'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { presidents, formatPersonAcademicInfo } from '@/data/people';
import styles from './MeetThePresidents.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function MeetThePresidents() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const cards = cardsRef.current;

        if (!section || cards.length === 0) return;

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                    delay: index * 0.1
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section className={styles.section} id="presidents" ref={sectionRef} data-navbar-tone="dark">
            <div className={styles.container}>
                <h2 className={styles.heading}>Meet the Presidents</h2>

                <div className={styles.presidentsGrid}>
                    {presidents.map((president, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className={styles.presidentCard}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={president.image}
                                    alt={president.name}
                                    className={styles.headshot}
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(president.name)}&background=1C332A&color=fff&size=200`;
                                    }}
                                />
                            </div>
                            <h3 className={styles.name}>{president.name}</h3>
                            <p className={styles.bio}>{formatPersonAcademicInfo(president)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
