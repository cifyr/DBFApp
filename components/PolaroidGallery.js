'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
    const closeButtonRef = useRef(null);
    const previouslyFocusedElementRef = useRef(null);
    const [activePlaneIndex, setActivePlaneIndex] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const activePlane = activePlaneIndex === null ? null : aircraft[activePlaneIndex];
    const activeGallery = activePlane?.gallery ?? [];
    const currentSlide = activeGallery[activeSlide] ?? activeGallery[0] ?? null;
    const hasMultipleSlides = activeGallery.length > 1;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const heading = headingRef.current;

        if (!section || !track) return;

        const ctx = gsap.context(() => {
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
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        if (!activePlane || typeof window === 'undefined') return undefined;

        previouslyFocusedElementRef.current = document.activeElement;
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setActivePlaneIndex(null);
                return;
            }

            if (!hasMultipleSlides) return;

            if (event.key === 'ArrowRight') {
                setActiveSlide((prev) => (prev + 1) % activeGallery.length);
            }

            if (event.key === 'ArrowLeft') {
                setActiveSlide((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
            }
        };

        window.dispatchEvent(new CustomEvent('dbf-scroll-lock', {
            detail: { locked: true },
        }));
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.dispatchEvent(new CustomEvent('dbf-scroll-lock', {
                detail: { locked: false },
            }));

            if (previouslyFocusedElementRef.current?.focus) {
                previouslyFocusedElementRef.current.focus();
            }
        };
    }, [activeGallery.length, activePlane, hasMultipleSlides]);

    const openPlaneModal = (index) => {
        setActivePlaneIndex(index);
        setActiveSlide(0);
    };

    const closePlaneModal = () => {
        setActivePlaneIndex(null);
    };

    const showPreviousSlide = () => {
        setActiveSlide((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
    };

    const showNextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % activeGallery.length);
    };

    const modal = activePlane && currentSlide && isMounted
        ? createPortal(
            <div
                className={styles.modalOverlay}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        closePlaneModal();
                    }
                }}
            >
                <div
                    className={styles.modalShell}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`plane-modal-title-${activePlane.year}`}
                    data-lenis-prevent
                >
                    <div className={styles.modalHeader}>
                        <div className={styles.modalHeaderCopy}>
                            <span className={styles.modalEyebrow}>Past Aircraft Archive</span>
                            <h3
                                id={`plane-modal-title-${activePlane.year}`}
                                className={styles.modalTitle}
                            >
                                {activePlane.name}
                            </h3>
                            <div className={styles.modalMeta}>
                                <span>{activePlane.year}</span>
                                <span>{activePlane.placement}</span>
                            </div>
                        </div>
                        <button
                            ref={closeButtonRef}
                            type="button"
                            className={styles.closeButton}
                            onClick={closePlaneModal}
                            aria-label={`Close ${activePlane.name} details`}
                        >
                            Close
                        </button>
                    </div>

                    <div className={styles.modalBody}>
                        <div className={styles.carouselCard}>
                            <div className={styles.carouselFrame}>
                                <img
                                    src={currentSlide.src}
                                    alt={currentSlide.alt}
                                    className={styles.carouselImage}
                                />

                                {hasMultipleSlides && (
                                    <>
                                        <button
                                            type="button"
                                            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
                                            onClick={showPreviousSlide}
                                            aria-label="Previous aircraft photo"
                                        >
                                            ‹
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                                            onClick={showNextSlide}
                                            aria-label="Next aircraft photo"
                                        >
                                            ›
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className={styles.carouselFooter}>
                                <span className={styles.carouselCounter}>
                                    {activeSlide + 1} / {activeGallery.length}
                                </span>
                                <p className={styles.carouselCaption}>
                                    {currentSlide.caption ?? currentSlide.alt}
                                </p>
                            </div>

                            {hasMultipleSlides && (
                                <div className={styles.carouselDots}>
                                    {activeGallery.map((slide, index) => (
                                        <button
                                            key={`${slide.src}-${index}`}
                                            type="button"
                                            className={`${styles.carouselDot} ${index === activeSlide ? styles.carouselDotActive : ''}`}
                                            onClick={() => setActiveSlide(index)}
                                            aria-label={`Show aircraft photo ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.infoColumn}>
                            {(activePlane.reportUrl || activePlane.resources?.length > 0) && (
                                <section className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Design report</span>
                                    {activePlane.reportUrl && (
                                        <a
                                            href={activePlane.reportUrl}
                                            className={styles.reportLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            download={activePlane.reportUrl.startsWith('/') ? '' : undefined}
                                        >
                                            {activePlane.reportLabel || 'Download the design report (PDF)'}
                                        </a>
                                    )}
                                    {activePlane.resources?.length > 0 && (
                                        <ul className={styles.resourceList}>
                                            {activePlane.resources.map((resource) => (
                                                <li key={resource.url}>
                                                    <a
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        download={resource.url.startsWith('/') ? '' : undefined}
                                                    >
                                                        {resource.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </section>
                            )}

                            {(activePlane.overview || activePlane.buildGist) && (
                                <section className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Aircraft overview</span>
                                    {activePlane.overview && (
                                        <p className={styles.infoText}>{activePlane.overview}</p>
                                    )}
                                    {activePlane.buildGist && (
                                        <p className={styles.infoText}>{activePlane.buildGist}</p>
                                    )}
                                </section>
                            )}

                            {activePlane.competitionStructure?.length > 0 && (
                                <section className={styles.infoCard}>
                                    <span className={styles.infoLabel}>Season notes</span>
                                    <ul className={styles.infoList}>
                                        {activePlane.competitionStructure.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        {(activePlane.leadershipImage?.src || activePlane.leadArchitecture?.length > 0) && (
                            <section className={`${styles.infoCard} ${styles.leadershipCard}`}>
                                <div className={styles.leadershipHeader}>
                                    <span className={styles.infoLabel}>Leadership</span>
                                    {activePlane.leadershipImage?.src && activePlane.leadershipImage?.caption && (
                                        <p className={styles.infoText}>
                                            {activePlane.leadershipImage.caption}
                                        </p>
                                    )}
                                </div>

                                {activePlane.leadershipImage?.src && (
                                    <div className={styles.leadershipMedia}>
                                        <img
                                            src={activePlane.leadershipImage.src}
                                            alt={activePlane.leadershipImage.alt}
                                            className={styles.leadershipImage}
                                        />
                                    </div>
                                )}

                                {activePlane.leadArchitecture?.length > 0 && (
                                    <ul className={styles.infoList}>
                                        {activePlane.leadArchitecture.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </div>,
            document.body
        )
        : null;

    return (
        <>
            <section id="aircraft" ref={sectionRef} className={styles.section} data-navbar-tone="dark">
                <div ref={headingRef} className={styles.headingWrapper}>
                    <span className={styles.eyebrow}>{homeContent.pastAircraft.eyebrow}</span>
                    <h2 className={styles.heading}>{homeContent.pastAircraft.heading}</h2>
                </div>

                <div ref={trackRef} className={styles.track}>
                    {aircraft.map((plane, index) => (
                        <button
                            key={plane.year}
                            type="button"
                            data-polaroid
                            className={styles.polaroid}
                            style={{ '--rotation': `${plane.rotation}deg` }}
                            onClick={() => openPlaneModal(index)}
                            aria-label={`Open details for ${plane.name}`}
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
                                <div className={styles.planeMeta}>
                                    <span className={styles.planeYear}>{plane.year}</span>
                                    <span className={styles.planePlacement}>{plane.placement}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </section>
            {modal}
        </>
    );
}
