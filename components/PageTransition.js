'use client';

import { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import styles from './PageTransition.module.css';

const PageTransitionContext = createContext();

export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider = ({ children }) => {
    const router = useRouter();
    const curtainRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Initial load animation (fade out curtain)
    useEffect(() => {
        if (curtainRef.current) {
            gsap.to(curtainRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Start hidden
                    gsap.set(curtainRef.current, { visibility: 'hidden' });
                }
            });
        }
    }, []);

    const transitionTo = (href) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Make visible and fade in, BLOCK clicks
        // Use fromTo to ensure starting state is applied immediately before animating
        gsap.fromTo(curtainRef.current,
            { opacity: 0, visibility: 'visible', pointerEvents: 'auto' },
            {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    router.push(href);
                }
            }
        );
    };

    // Listen for path changes to trigger fade out
    // We wrap this in a separate component to use usePathname

    return (
        <PageTransitionContext.Provider value={{ transitionTo }}>
            <div ref={curtainRef} className={styles.curtain} />
            <TransitionListener curtainRef={curtainRef} setIsTransitioning={setIsTransitioning}>
                {children}
            </TransitionListener>
        </PageTransitionContext.Provider>
    );
};

// Internal component to listen to pathname changes
import { usePathname } from 'next/navigation';

const TransitionListener = ({ children, curtainRef, setIsTransitioning }) => {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Handled by initial useEffect
        }

        // Path has changed, so we are on the "new page" (or at least new route)
        // Fade out the curtain
        if (curtainRef.current) {
            // Ensure it's opaque first (should be from the transitionTo)
            // Then fade out
            gsap.to(curtainRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                delay: 0.1, // Small delay to allow React to render new content
                onComplete: () => {
                    gsap.set(curtainRef.current, { visibility: 'hidden', pointerEvents: 'none' });
                    setIsTransitioning(false);
                }
            });
        }
    }, [pathname, curtainRef, setIsTransitioning]);

    return children;
};
