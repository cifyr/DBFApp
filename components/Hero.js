'use client';

import { useScroll, useTransform, motion, useSpring, useMotionValueEvent, useVelocity } from '@/lib/framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Hero.module.css';
import { homeContent } from '@/data/homeContent';

// Total number of frames (matches what we had)
const FRAME_COUNT = 240;

// Generate frame paths (ezgif-frame-001.jpg onwards)
const getFramePath = (index) => {
    const paddedIndex = String(index + 1).padStart(3, '0');
    return `/frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function Hero() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const imagesRef = useRef([]);

    // --- SCROLL LOGIC (Framer Motion) ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 40,
        restDelta: 0.001
    });

    const scrollVelocity = useVelocity(smoothProgress);

    // Variable Speed Logic: (Ported from BABAScroll)
    // First 144 frames are faster. Mapped to 250vh height.
    const frameIndex = useTransform(smoothProgress, [0, 0.18, 1], [0, 144, FRAME_COUNT - 1], { clamp: true });

    // --- TEXT ANIMATIONS (Ported & Mapped) ---

    // --- TEXT ANIMATIONS HELPERS ---
    const words = homeContent?.hero?.words || [];
    const totalWords = words.length;

    const getWordOpacity = (index) => {
        if (index === 0) return [0, 0.1];
        const rangeStart = 0.15;
        const rangeEnd = 0.99;
        const availableRange = rangeEnd - rangeStart;
        const itemRange = availableRange / (totalWords - 1);
        const start = rangeStart + (index - 1) * itemRange;
        const mid1 = start + itemRange * 0.2;
        const mid2 = start + itemRange * 0.7;
        const end = start + itemRange;
        return [start, mid1, mid2, end];
    };

    const getWordY = (index) => {
        if (index === 0) return ["-50%", "-70%"];
        const opacityRange = getWordOpacity(index);
        return [opacityRange[0], opacityRange[3]];
    };










    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

    // --- GRAVITY AUTO-SCROLL LOGIC ---
    // (Ported directly from BABAScroll to achieve the "cascade" effect)
    const [isInteracting, setIsInteracting] = useState(false);
    const interactionTimeout = useRef(null);
    const lastScrollY = useRef(0);
    const gravityPausedByUpScroll = useRef(false);

    // Detect interaction
    useEffect(() => {
        const handleInteraction = () => {
            setIsInteracting(true);
            if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
            interactionTimeout.current = setTimeout(() => setIsInteracting(false), 300);
        };
        window.addEventListener('wheel', handleInteraction, { passive: true });
        window.addEventListener('touchmove', handleInteraction, { passive: true });
        return () => {
            window.removeEventListener('wheel', handleInteraction);
            window.removeEventListener('touchmove', handleInteraction);
        };
    }, []);

    // Gravity Loop
    useEffect(() => {
        let frameId;

        const autoScrollLoop = () => {
            if (loading) {
                frameId = requestAnimationFrame(autoScrollLoop);
                return;
            }

            const currentY = window.scrollY;
            if (currentY < lastScrollY.current) {
                gravityPausedByUpScroll.current = true;
            } else if (currentY > lastScrollY.current) {
                gravityPausedByUpScroll.current = false;
            }
            lastScrollY.current = currentY;

            const currentFrame = frameIndex.get();
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return;

            // Stop Line: When hero bottom reaches middle of screen
            const stopLine = window.innerHeight * 0.5;
            const distanceToStop = containerRect.bottom - stopLine;
            const reachedEnd = distanceToStop <= 0;

            // We use frame 17 as specified
            const isStartTriggered = currentFrame >= 17;
            const canScroll = isStartTriggered && !isInteracting && !gravityPausedByUpScroll.current && !reachedEnd;

            // Log once when ready
            if (isStartTriggered && !canScroll && !reachedEnd && !loading && Math.round(currentFrame) === 17) {
                console.log('Gravity: Armed and waiting for interaction to stop / user to scroll down.');
            }

            if (canScroll) {
                // SPEED CALCULATION (Easing)
                let targetSpeed = 0;

                if (currentFrame < 37) {
                    // Ease In
                    const progress = (currentFrame - 17) / (37 - 17);
                    targetSpeed = 0.5 + progress * 1.5;
                } else {
                    // Dive - slightly slower for stability
                    targetSpeed = 4.2;

                    // Ease Out
                    if (distanceToStop < 400) {
                        const easeOutProgress = Math.max(0, distanceToStop / 400);
                        targetSpeed = targetSpeed * easeOutProgress + 0.5;
                    }
                }

                // Dispatch event for Lenis to handle
                window.dispatchEvent(new CustomEvent('hero-auto-scroll', {
                    detail: { target: currentY + targetSpeed }
                }));
            }

            frameId = requestAnimationFrame(autoScrollLoop);
        };

        frameId = requestAnimationFrame(autoScrollLoop);
        return () => cancelAnimationFrame(frameId);
    }, [loading, isInteracting, frameIndex, firstFrameLoaded]);


    // --- IMAGE LOADING & RENDERING ---

    // Load Images
    useEffect(() => {
        const loadImages = async () => {
            const CRITICAL_FRAMES = 50;
            let loadedCount = 0;

            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = getFramePath(i);

                img.onload = () => {
                    imagesRef.current[i] = img;
                    loadedCount++;

                    // Show first frame immediately
                    if (i === 0) {
                        setFirstFrameLoaded(true);
                        requestAnimationFrame(() => renderFrame(0));
                    }

                    // Unlock
                    if (loadedCount === CRITICAL_FRAMES && loading) {
                        setLoading(false);
                    }
                };

                img.onerror = () => {
                    // console.warn(`Frame ${i} failed`); // Silent fail
                    loadedCount++;
                    if (loadedCount === CRITICAL_FRAMES && loading) setLoading(false);
                };
            }
        };

        loadImages();
    }, [loading]);


    const renderFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Ensure canvas size
        if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
        if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

        const cw = canvas.width;
        const ch = canvas.height;

        ctx.clearRect(0, 0, cw, ch);

        // Frame selection (0-based in logic, but images stored 1-based ? Let's check logic)
        // frameIndex maps 0 -> 310. existing frames are 0001 -> 0310.
        // So we should floor + 1? No, logic maps 0 to 309 usually.
        // Let's rely on standard logic: Math.floor(index) + 1 for imagesRef lookup if 1-based.

        // Frame selection (0-based)
        const rawIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
        const floorIndex = Math.floor(rawIndex);
        const ceilIndex = Math.min(floorIndex + 1, FRAME_COUNT - 1);

        // Clamp
        if (floorIndex < 0) return;

        // Draw logic
        const drawImage = (imgIdx, alpha) => {
            const img = imagesRef.current[imgIdx];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const iw = img.width;
            const ih = img.height;

            // Check if screen is narrow (phone - 70% or less of image width)
            const isPhone = cw <= iw * 0.7;

            let scale;
            let x;
            let y;

            if (isPhone) {
                // Phone mode: start at 70% width, grow to full size over frames 0-100
                const zoomProgress = Math.min(index / 100, 1);
                const zoomFactor = 0.7 + (0.3 * zoomProgress);

                // Base scale: fit to screen width
                const baseScale = cw / iw;
                scale = baseScale / 0.7 * zoomFactor;

                const scaledWidth = iw * scale;
                const scaledHeight = ih * scale;
                // Center horizontally and vertically
                x = (cw - scaledWidth) / 2;
                y = (ch - scaledHeight) / 2;
            } else {
                // Desktop: fit to screen height (100% height)
                scale = ch / ih;
                const scaledWidth = iw * scale;
                const scaledHeight = ih * scale;
                // Center horizontally and vertically
                x = (cw - scaledWidth) / 2;
                y = (ch - scaledHeight) / 2;
            }

            ctx.globalAlpha = alpha;
            ctx.drawImage(img, x, y, iw * scale, ih * scale);
        };

        const fraction = index - floorIndex;

        // Draw floor frame (base)
        drawImage(floorIndex, 1);

        // Draw ceil frame (overlay) if different
        if (ceilIndex !== floorIndex && fraction > 0) {
            drawImage(ceilIndex, fraction);
        }

        ctx.globalAlpha = 1;
    }, []);

    // Sync Render loop
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loading) {
            requestAnimationFrame(() => renderFrame(latest));
        }
    });

    // Snap to frame
    useMotionValueEvent(scrollVelocity, "change", (v) => {
        if (Math.abs(v) < 0.001 && !loading) {
            requestAnimationFrame(() => renderFrame(Math.round(frameIndex.get())));
        }
    });

    // Handle Resize
    useEffect(() => {
        if (firstFrameLoaded) {
            const handleResize = () => requestAnimationFrame(() => renderFrame(frameIndex.get()));
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [firstFrameLoaded, frameIndex, renderFrame]);


    return (
        <section
            ref={containerRef}
            className={styles.hero}
            data-navbar-tone="dark"
            style={{ position: 'relative' }} // Explicitly setting to avoid Framer Motion warnings
        >
            {/* Sticky Wrapper */}
            <div className={styles.stickyContainer}>

                {/* Canvas */}
                <motion.canvas
                    ref={canvasRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={firstFrameLoaded ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={styles.canvas}
                />
                <div className={styles.canvasVignette} aria-hidden="true" />

                {/* Loading Overlay */}
                {loading && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.loadingContent}>
                            <span className={styles.loadingText}>Loading Experience...</span>
                        </div>
                    </div>
                )}

                {/* Dynamic Words */}
                {words.map((word, index) => (
                    <HeroWord
                        key={index}
                        word={word}
                        progress={smoothProgress}
                        opacityRange={getWordOpacity(index)}
                        yRange={getWordY(index)}
                        isIntro={index === 0}
                    />
                ))}

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
                    className={styles.scrollIndicator}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span>{homeContent.hero.scrollIndicator}</span>
                        <div className={styles.scrollArrow} />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

function HeroWord({ word, progress, opacityRange, yRange, isIntro }) {
    const opacity = useTransform(
        progress,
        opacityRange,
        isIntro ? [1, 0] : [0, 1, 1, 0]
    );

    const y = useTransform(
        progress,
        isIntro ? opacityRange : yRange,
        isIntro ? yRange : ["-30%", "-70%"]
    );

    let positionClass = styles.textCenter;
    let xOffset = "-50%";

    if (word.position === 'left') {
        positionClass = styles.textLeft;
        xOffset = "0%";
    } else if (word.position === 'right') {
        positionClass = styles.textRight;
        xOffset = "0%";
    }

    return (
        <motion.div
            className={`${styles.textWrapper} ${positionClass}`}
            style={{ opacity, x: xOffset, y }}
        >
            <h1
                className={`${styles.heroText} ${word.style === 'intro' ? styles.heroTextIntro : ''}`}
                style={{ color: word.color }}
            >
                {word.style === 'intro'
                    ? word.text.split('\n').map((line, lineIndex) => (
                        <span
                            key={line}
                            className={`${styles.heroTextLine} ${lineIndex === 0 ? styles.heroTextLineSmall : styles.heroTextLineLarge}`}
                        >
                            {line}
                        </span>
                    ))
                    : word.text}
            </h1>
        </motion.div>
    );
}
