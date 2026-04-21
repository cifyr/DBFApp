'use client';

import { useEffect, useRef } from 'react';
import { PageTransitionProvider } from '@/components/PageTransition';

export default function AppShell({ children }) {
    const lenisRef = useRef(null);
    const gsapRef = useRef(null);
    const scrollLockCountRef = useRef(0);

    useEffect(() => {
        let mounted = true;
        let cleanupTicker = null;
        let handleHashScroll = null;
        let handleAutoScroll = null;
        let handleScrollLock = null;

        const setupSmoothScroll = async () => {
            const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
                import('@studio-freight/lenis'),
                import('gsap'),
                import('gsap/ScrollTrigger'),
            ]);

            if (!mounted) return;

            gsap.registerPlugin(ScrollTrigger);
            gsapRef.current = gsap;

            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                smoothWheel: true,
            });

            lenisRef.current = lenis;
            lenis.on('scroll', ScrollTrigger.update);

            handleHashScroll = () => {
                const hash = window.location.hash;
                if (!hash) return;

                const target = document.querySelector(hash);
                if (!target) return;

                setTimeout(() => {
                    const viewportHeight = window.innerHeight;
                    const targetHeight = target.offsetHeight;
                    const navbarHeight = 80;

                    let offset = 0;
                    if (targetHeight < viewportHeight - navbarHeight) {
                        offset = (viewportHeight - targetHeight) / 2;
                    } else {
                        offset = navbarHeight + 20;
                    }

                    lenis.scrollTo(target, {
                        offset,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        immediate: false,
                    });
                }, 400);
            };

            handleAutoScroll = (event) => {
                lenis.scrollTo(event.detail.target, {
                    immediate: true,
                    force: true,
                });
            };

            handleScrollLock = (event) => {
                const shouldLock = Boolean(event.detail?.locked);

                scrollLockCountRef.current = shouldLock
                    ? scrollLockCountRef.current + 1
                    : Math.max(0, scrollLockCountRef.current - 1);

                if (scrollLockCountRef.current > 0) {
                    lenis.stop();
                    return;
                }

                lenis.start();
            };

            window.addEventListener('hero-auto-scroll', handleAutoScroll);
            window.addEventListener('hashchange', handleHashScroll);
            window.addEventListener('dbf-scroll-lock', handleScrollLock);
            handleHashScroll();

            if (scrollLockCountRef.current > 0) {
                lenis.stop();
            }

            const tick = (time) => {
                lenis.raf(time * 1000);
            };

            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);
            cleanupTicker = () => gsap.ticker.remove(tick);
        };

        setupSmoothScroll();

        return () => {
            mounted = false;

            if (cleanupTicker) cleanupTicker();
            if (handleAutoScroll) window.removeEventListener('hero-auto-scroll', handleAutoScroll);
            if (handleHashScroll) window.removeEventListener('hashchange', handleHashScroll);
            if (handleScrollLock) window.removeEventListener('dbf-scroll-lock', handleScrollLock);
            if (lenisRef.current) lenisRef.current.destroy();
        };
    }, []);

    return <PageTransitionProvider>{children}</PageTransitionProvider>;
}
