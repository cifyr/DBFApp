'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransitionProvider } from '@/components/PageTransition';
import { homeContent } from '@/data/homeContent';
import './globals.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function RootLayout({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Handle anchor links / hashes
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) {
                    // Give the page a moment to settle
                    setTimeout(() => {
                        const viewportHeight = window.innerHeight;
                        const targetHeight = target.offsetHeight;
                        const navbarHeight = 80; // Estimated navbar height

                        // Calculate offset to center the section in the viewport
                        // If section is taller than viewport, align top with offset for navbar
                        let offset = 0;
                        if (targetHeight < viewportHeight - navbarHeight) {
                            offset = (viewportHeight - targetHeight) / 2;
                        } else {
                            offset = navbarHeight + 20; // Space for navbar
                        }

                        lenis.scrollTo(target, {
                            offset: offset,
                            duration: 1.5,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                            immediate: false
                        });
                    }, 400);
                }
            }
        };

        // Listen for internal "manual" scroll requests
        const handleAutoScroll = (e) => {
            lenis.scrollTo(e.detail.target, {
                immediate: true,
                force: true
            });
        };

        // Check hash on load
        handleHashScroll();

        window.addEventListener('hero-auto-scroll', handleAutoScroll);
        window.addEventListener('hashchange', handleHashScroll);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            window.removeEventListener('hero-auto-scroll', handleAutoScroll);
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, []);

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={homeContent.brand.metaDescription} />
                <title>{homeContent.brand.pageTitle}</title>
            </head>
            <body>
                <PageTransitionProvider>
                    {children}
                </PageTransitionProvider>
            </body>
        </html>
    );
}
