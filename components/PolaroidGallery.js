'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PolaroidGallery.module.css';
import { homeContent } from '@/data/homeContent';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Past aircraft data - moved to data/homeContent.js
const aircraft = homeContent.pastAircraft.aircraft;

export default function PolaroidGallery() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const heading = headingRef.current;

        if (!section || !track) return;

        // Calculate how far to move horizontally
        // Horizontal movement - PINNED & CENTERED FLOW
        // Start: Track starts centered on screen (or entering from right)
        // End: Track ends centered on screen (or exiting to left)
        const getScrollConfig = () => {
            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;

            // X Movement: Start at center (50vw) -> End at center (-trackWidth + 50vw)
            // This ensures the content "flows through the center"
            const startX = viewportWidth * 0.5;
            const endX = -trackWidth + (viewportWidth * 0.5);

            return { x: endX, startX };
        };

        const config = getScrollConfig();

        // Initial setup
        gsap.set(track, { x: config.startX });

        // 1. Logic for horizontal movement (Continuous: Entry -> Pin -> Exit)
        // We want the track to be at `config.startX` exactly when the section hits `top top`.
        // To achieve this seamless motion from "top bottom" (entry), we backtrack the position.

        const animationDuration = 3500; // Animation lasts longer than the pin for persistent motion
        const viewportHeight = window.innerHeight;

        // Calculate the rate of movement (pixels moved per pixel scrolled)
        // Rate = Total Horizontal Distance / Allocated Scroll Duration
        const totalMovement = config.startX - config.x;
        const movementRate = totalMovement / animationDuration;

        // Calculate where we should start so we arrive at startX after scrolling 1 viewport height
        const initialX = config.startX + (movementRate * viewportHeight);

        // Define the TOTAL scroll distance (Entry + Pin + Exit)
        const totalScrollDistance = animationDuration + viewportHeight;

        // Note: The previous tween definition is removed/overwritten here by the new logic approach
        const animationTween = gsap.fromTo(track,
            { x: initialX },
            {
                x: config.x,
                ease: 'none',
            }
        );

        // 2. Animation Trigger - Starts EARLY (at top bottom)
        ScrollTrigger.create({
            trigger: section,
            start: 'top bottom', // Start animating as soon as it enters viewport
            end: `+=${totalScrollDistance}`,
            animation: animationTween,
            scrub: 1,
            invalidateOnRefresh: true,
        });

        // 3. Pin Trigger - Remains unchanged (starts at top top)
        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=3000', // Pin matches animation duration to ensure last plane is seen
            pin: true,
            invalidateOnRefresh: true,
        });

        // Heading fade in
        if (heading) {
            gsap.fromTo(
                heading,
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Individual polaroid animations - stagger entry AND floating movement
        const polaroids = track.querySelectorAll('[data-polaroid]');
        polaroids.forEach((polaroid, i) => {
            // Initial Entry
            gsap.fromTo(
                polaroid,
                { opacity: 0, y: 60, rotation: 0 },
                {
                    opacity: 1,
                    y: 0,
                    rotation: aircraft[i]?.rotation || 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                    onComplete: () => {
                        // Floating 'Life' Animation after entry
                        gsap.to(polaroid, {
                            y: 'random(-10, 10)',
                            rotation: `random(${(aircraft[i]?.rotation || 0) - 2}, ${(aircraft[i]?.rotation || 0) + 2})`,
                            duration: 'random(2, 4)',
                            ease: 'sine.inOut',
                            yoyo: true,
                            repeat: -1,
                        });
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section id="aircraft" ref={sectionRef} className={styles.section} data-navbar-tone="dark">
            <div ref={headingRef} className={styles.headingWrapper}>
                <span className={styles.eyebrow}>{homeContent.pastAircraft.eyebrow}</span>
                <h2 className={styles.heading}>{homeContent.pastAircraft.heading}</h2>
            </div>

            <div ref={trackRef} className={styles.track}>
                {aircraft.map((plane, index) => (
                    <div
                        key={plane.year}
                        data-polaroid
                        className={styles.polaroid}
                        style={{ '--rotation': `${plane.rotation}deg` }}
                    >
                        <div className={styles.imageFrame}>
                            <img
                                src={plane.imageUrl}
                                alt={`${plane.name} aircraft`}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.caption}>
                            <span className={styles.planeName}>{plane.name}</span>
                            <span className={styles.planeYear}>{plane.year}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
