'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './SocialCTA.module.css';
import { homeContent } from '@/data/homeContent';
import TransitionLink from './TransitionLink';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Instagram SVG icon
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2A3.2 3.2 0 0 0 12 8.8Zm5.2-2.15a1.2 1.2 0 1 1 0 2.4a1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
);

// LinkedIn SVG icon
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const IconMap = {
    instagram: InstagramIcon,
    linkedin: LinkedInIcon
};

export default function SocialCTA() {
    const sectionRef = useRef(null);
    const planeRef = useRef(null);
    const bannerRef = useRef(null);
    const ropeRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const plane = planeRef.current;
        const banner = bannerRef.current;
        const rope = ropeRef.current;

        if (!section || !plane || !banner) return;

        // Create timeline for plane flying in from LEFT (pushing/pulling banner style)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'center 50%',
                scrub: 0.7,
            },
        });

        // Plane Entry (X-axis movement on Wrapper)
        tl.fromTo(
            plane,
            { x: '-100vw' },
            { x: '0vw', duration: 1, ease: 'power2.out' }
        );

        // Banner follows/accompanies
        tl.fromTo(
            banner,
            { x: '-120vw', scaleX: 0.8, opacity: 0 },
            { x: '0vw', scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' },
            0.1
        );

        // Rope stretches
        if (rope) {
            tl.fromTo(
                rope,
                { x: '-110vw', scaleX: 0.5, opacity: 0 },
                { x: '0vw', scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' },
                0.05
            );
        }

        // Floating idle animation (Y-axis/Rotation on INNER Image)
        // Starts immediately and runs forever, independent of scroll entry
        const planeImg = plane.querySelector('img');
        if (planeImg) {
            gsap.to(planeImg, {
                y: -15,
                rotation: 2,
                duration: 2.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 0, // No delay - float while entering
            });
        }

        // Banner sway
        gsap.to(banner, {
            rotation: 1,
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0,
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section id="join" ref={sectionRef} className={styles.section} data-navbar-tone="dark">
            {/* Sky background */}
            <div className={styles.sky}>
                <div className={styles.cloud} style={{ '--delay': '0s', '--top': '15%', '--size': '1' }} />
                <div className={styles.cloud} style={{ '--delay': '3s', '--top': '65%', '--size': '0.7' }} />
                <div className={styles.cloud} style={{ '--delay': '6s', '--top': '40%', '--size': '0.5' }} />
            </div>

            {/* Assembly: [Plane] - [Rope] - [Banner] [Tail] */}
            <div className={styles.planeAssembly}>

                <div ref={bannerRef} className={styles.banner}>
                    <div className={styles.bannerContent}>
                        <h2 className={styles.bannerText}>{homeContent.socialCTA.bannerText}</h2>
                        <div className={styles.bannerLinks}>
                            {homeContent.socialCTA.links.map((link, idx) => {
                                const Icon = IconMap[link.iconType] || null;
                                const linkContent = (
                                    <>
                                        {Icon && <Icon />}
                                        <span>{link.label}</span>
                                    </>
                                );

                                return (
                                    <span key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                                        {link.openInNewTab ? (
                                            <a
                                                href={link.url}
                                                className={styles.bannerLink}
                                                aria-label={link.ariaLabel}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {linkContent}
                                            </a>
                                        ) : (
                                            <TransitionLink href={link.url} className={styles.bannerLink} aria-label={link.ariaLabel}>
                                                {linkContent}
                                            </TransitionLink>
                                        )}
                                        {idx < homeContent.socialCTA.links.length - 1 && (
                                            <span className={styles.bannerDivider}>•</span>
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    {/* Tail on the Right */}
                    <div className={styles.bannerTail}>
                        <svg viewBox="0 0 60 120" className={styles.tailSvg}>
                            <path d="M0,0 L0,120 Q30,110 60,120 L60,0 Q30,10 0,0" fill="var(--color-gold)" />
                        </svg>
                    </div>
                </div>

                <div ref={ropeRef} className={styles.rope} />

                <div ref={planeRef} className={styles.planeWrapper}>
                    <Image
                        src="/plane.svg"
                        alt="DBF Plane"
                        width={320}
                        height={320}
                        className={styles.planeImage}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
