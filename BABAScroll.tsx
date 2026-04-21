'use client';

import { useScroll, useTransform, motion, useSpring, useMotionValueEvent, useVelocity } from '@/lib/framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

const FRAME_COUNT = 240;

export default function BABAScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const imagesRef = useRef<HTMLImageElement[]>([]);

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

    // Variable Speed Logic:
    // First 144 frames are 4x faster.
    // Total frames: 310. Fast frames: 144. Normal frames: 166.
    // Cost: (144/4) + 166 = 36 + 166 = 202 units.
    // Split point: 36 / 202 = 0.178 (~0.18)
    const frameIndex = useTransform(smoothProgress, [0, 0.18, 1], [0, 144, FRAME_COUNT - 1]);

    // --- TEXT ANIMATIONS ---

    // 1. "Visualize Your..." (Centered Vertically)
    // Softened transitions: 8% fade-in/out
    const opacityVisualize = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    // Small float up effect for visualize
    const yVisualize = useTransform(smoothProgress, [0.15, 0.45], [20, -20]);

    // Continuous Upward Drift for Martial Arts (Lower start, slower movement)
    const yDrift = useTransform(smoothProgress, [0.6, 1.0], [400, -200]);

    // 2. "Judo" (Starts 0.50, softer fades)
    const opacityJudo = useTransform(smoothProgress, [0.48, 0.56, 0.66, 0.74], [0, 1, 1, 0]);

    // 3. "Karate" (Starts 0.75, softer fades)
    const opacityKarate = useTransform(smoothProgress, [0.73, 0.81, 0.91, 0.99], [0, 1, 1, 0]);

    // 4. "Jiujitsu" (Overlaps slightly, fades out at the very end)
    const opacityJiujitsu = useTransform(smoothProgress, [0.93, 0.97, 0.99, 1.00], [0, 1, 1, 0]);


    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            const CRITICAL_FRAMES = 50;
            let loadedCount = 0;

            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                const formattedIndex = (i + 1).toString().padStart(4, '0');
                img.src = `/ezgif-split/${formattedIndex}.webp`;

                img.onload = () => {
                    imagesRef.current[i] = img;
                    loadedCount++;

                    // Show first frame immediately
                    if (i === 0) {
                        setFirstFrameLoaded(true);
                        requestAnimationFrame(() => renderFrame(0));
                    }

                    // Unlock interactivity after critical frames
                    if (loadedCount === CRITICAL_FRAMES && loading) {
                        setLoading(false);
                    }
                };

                img.onerror = () => {
                    console.warn(`Frame ${i} missing or failed`);
                    loadedCount++; // Count as "processed" to avoid blocking
                    if (loadedCount === CRITICAL_FRAMES && loading) {
                        setLoading(false);
                    }
                };
            }
        };

        loadImages();
    }, [loading]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
        if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

        const cw = canvas.width;
        const ch = canvas.height;

        ctx.clearRect(0, 0, cw, ch);

        const floorIndex = Math.floor(index);
        const ceilIndex = Math.min(floorIndex + 1, FRAME_COUNT - 1);
        const fraction = index - floorIndex;

        const drawImage = (imgIdx: number, alpha: number) => {
            const img = imagesRef.current[imgIdx];
            // Only draw if image is actually loaded in our ref
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const iw = img.width;
            const ih = img.height;
            
            // Check if screen is narrow (phone - 70% or less of image width)
            const isPhone = cw <= iw * 0.7;
            
            let scale: number;
            let x: number;
            let y: number;
            
            if (isPhone) {
                // Phone mode: start at 70% width, grow to full size over frames 0-100
                const zoomProgress = Math.min(index / 100, 1); // 0 to 1 over frames 0-100
                const zoomFactor = 0.7 + (0.3 * zoomProgress); // 0.7 -> 1.0
                
                // Base scale: fit to screen width
                const baseScale = cw / iw;
                scale = baseScale / 0.7 * zoomFactor; // Start at 70% width, grow to 100% width
                
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

        // Draw floor frame (base)
        drawImage(floorIndex, 1);

        // Draw ceil frame (overlay) if different
        if (ceilIndex !== floorIndex && fraction > 0) {
            drawImage(ceilIndex, fraction);
        }

        ctx.globalAlpha = 1;
    }, []);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loading) {
            requestAnimationFrame(() => renderFrame(latest));
        }
    });

    // Snap to nearest frame when animation settles to avoid "stuck between frames" blur
    useMotionValueEvent(scrollVelocity, "change", (v) => {
        if (Math.abs(v) < 0.001 && !loading) {
            requestAnimationFrame(() => renderFrame(Math.round(frameIndex.get())));
        }
    });

    // Remove no-scrollbar class management as it is now global in CSS

    const [isInteracting, setIsInteracting] = useState(false);
    const interactionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastScrollY = useRef(0);

    // Detect user interaction (wheel/touch) to pause auto-scroll
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

    const gravityPausedByUpScroll = useRef(false);

    // Gravity Auto-Scroll Hook
    useEffect(() => {
        let frameId: number;

        const autoScrollLoop = () => {
            if (loading) {
                frameId = requestAnimationFrame(autoScrollLoop);
                return;
            }

            const currentY = window.scrollY;
            if (currentY < lastScrollY.current) {
                gravityPausedByUpScroll.current = true; // User scrolled up, pause until they scroll down
            } else if (currentY > lastScrollY.current) {
                gravityPausedByUpScroll.current = false; // User scrolled down, gravity resumes
            }
            lastScrollY.current = currentY;

            const currentFrame = frameIndex.get();
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return;

            // Stop Line: When hero bottom reaches middle of screen (user's preferred stop)
            const stopLine = window.innerHeight * 0.5;
            const distanceToStop = containerRect.bottom - stopLine;
            const reachedEnd = distanceToStop <= 0;

            // START TRIGGER: Frame 17
            // STOP IF: Interacting, Paused by up-scroll, or reached end
            if (currentFrame >= 17 && !isInteracting && !gravityPausedByUpScroll.current && !reachedEnd) {

                // SPEED CALCULATION (Easing)
                let targetSpeed = 0;

                if (currentFrame < 37) {
                    // Ease In: Frame 17 to 37 (Slowly start)
                    const progress = (currentFrame - 17) / (37 - 17);
                    targetSpeed = 0.67 + progress * 1.33; // Ramps 0.67 -> 2 (2/3 of previous 1->3)
                } else {
                    // Dive: Accelerate quickly after frame 37
                    targetSpeed = 4.67; // 2/3 of previous 7

                    // Ease Out: Decelerate with a steeper derivative
                    // Start slowing down later (400px) for a sharper stop
                    if (distanceToStop < 400) {
                        const easeOutProgress = Math.max(0, distanceToStop / 400);
                        // Linear ramp to a slightly faster minimum crawl (0.5) to avoid sluggishness
                        targetSpeed = targetSpeed * easeOutProgress + 0.5;
                    }
                }

                window.scrollBy(0, targetSpeed);
            }

            frameId = requestAnimationFrame(autoScrollLoop);
        };

        frameId = requestAnimationFrame(autoScrollLoop);
        return () => cancelAnimationFrame(frameId);
    }, [loading, isInteracting, frameIndex]);

    useEffect(() => {
        if (firstFrameLoaded) {
            const handleResize = () => requestAnimationFrame(() => renderFrame(frameIndex.get()));
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [firstFrameLoaded, frameIndex, renderFrame]);

    return (
        <div ref={containerRef} className="relative h-[250vh] w-full bg-transparent">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-end justify-center">
                <motion.canvas
                    ref={canvasRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={firstFrameLoaded ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                />

                {/* "Visualize Your..." - Centered Vertically */}
                <motion.div
                    style={{ opacity: opacityVisualize, y: yVisualize }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center mix-blend-difference w-full"
                >
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white/90 leading-tight">
                        Visualize Your...
                    </h2>
                </motion.div>

                {/* Scrolling List: Judo -> Karate -> Jiujitsu */}
                {/* Now centered relative to hero section */}

                {/* Judo (Right) */}
                <motion.div
                    style={{ opacity: opacityJudo }}
                    className="absolute top-1/2 right-[10%] -translate-y-1/2 z-10 pointer-events-none text-right"
                >
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        Judo
                    </h2>
                </motion.div>

                {/* Karate (Left) */}
                <motion.div
                    style={{ opacity: opacityKarate }}
                    className="absolute top-1/2 left-[10%] -translate-y-1/2 z-10 pointer-events-none text-left"
                >
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        Karate
                    </h2>
                </motion.div>

                {/* Jiujitsu (Right) - Positioned 75% down */}
                <motion.div
                    style={{ opacity: opacityJiujitsu }}
                    className="absolute top-[75%] right-[10%] -translate-y-1/2 z-10 pointer-events-none text-right"
                >
                    <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        Jiujitsu
                    </h2>
                </motion.div>
            </div>

            {/* Scroll Indicator (Throbbing 0-5%) */}
            <motion.div
                style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70">
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
}
