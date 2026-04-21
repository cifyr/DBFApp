'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from '@/lib/framer-motion';
import { homeContent } from '@/data/homeContent';
import { teamData } from '@/data/teamData';
import styles from './Navbar.module.css';
import TransitionLink from './TransitionLink';

const NAVBAR_TONES = {
    DARK: 'dark',
    LIGHT: 'light',
    MENU: 'menu',
};

function findNavbarTone(element) {
    let current = element;

    while (current && current !== document.body) {
        if (current instanceof HTMLElement) {
            const tone = current.dataset.navbarTone;

            if (tone === NAVBAR_TONES.DARK || tone === NAVBAR_TONES.LIGHT) {
                return tone;
            }
        }

        current = current.parentElement;
    }

    return null;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [navbarTone, setNavbarTone] = useState(NAVBAR_TONES.DARK);
    const navRef = useRef(null);
    const frameRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const primaryLinks = [
        { label: 'Home', href: '/' },
        { label: 'Partner with us', href: '/partners' },
    ];

    const teamLinks = teamData.map(team => ({
        label: team.title,
        href: `/team/${team.slug}`,
        isSubLink: true
    }));

    const orderedTeamLinks = [
        teamLinks.find((team) => team.href === '/team/aerodynamics'),
        teamLinks.find((team) => team.href === '/team/structures'),
        teamLinks.find((team) => team.href === '/team/propulsion'),
        teamLinks.find((team) => team.href === '/team/manufacturing'),
        teamLinks.find((team) => team.href === '/team/electrics'),
        teamLinks.find((team) => team.href === '/team/dev'),
        teamLinks.find((team) => team.href === '/team/admin'),
    ].filter(Boolean);

    const allLinks = [primaryLinks[0], ...orderedTeamLinks, primaryLinks[1]];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: 50,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
        exit: {
            opacity: 0,
            x: 30,
            filter: 'blur(5px)',
            transition: {
                duration: 0.2,
            },
        },
    };

    const resolveNavbarTone = useCallback(() => {
        if (isOpen) {
            setNavbarTone(NAVBAR_TONES.MENU);
            return;
        }

        const nav = navRef.current;
        const navRect = nav?.getBoundingClientRect();
        const sampleY = navRect
            ? Math.min(window.innerHeight - 1, Math.max(1, Math.round(navRect.top + Math.min(navRect.height / 2, 48))))
            : 40;
        const sampleXs = [
            Math.round(window.innerWidth * 0.2),
            Math.round(window.innerWidth * 0.5),
            Math.round(window.innerWidth * 0.8),
        ];

        for (const rawX of sampleXs) {
            const sampleX = Math.min(window.innerWidth - 1, Math.max(1, rawX));
            const elements = typeof document.elementsFromPoint === 'function'
                ? document.elementsFromPoint(sampleX, sampleY)
                : [document.elementFromPoint(sampleX, sampleY)].filter(Boolean);

            for (const element of elements) {
                if (!(element instanceof HTMLElement)) continue;
                if (nav && nav.contains(element)) continue;

                const tone = findNavbarTone(element);

                if (tone) {
                    setNavbarTone(tone);
                    return;
                }
            }
        }

        setNavbarTone(NAVBAR_TONES.DARK);
    }, [isOpen]);

    const scheduleToneUpdate = useCallback(() => {
        if (frameRef.current !== null) return;

        frameRef.current = window.requestAnimationFrame(() => {
            frameRef.current = null;
            resolveNavbarTone();
        });
    }, [resolveNavbarTone]);

    useEffect(() => {
        if (isOpen) {
            setNavbarTone(NAVBAR_TONES.MENU);
            return;
        }

        const handleViewportChange = () => scheduleToneUpdate();
        const initialTimeout = window.setTimeout(handleViewportChange, 120);

        scheduleToneUpdate();
        window.addEventListener('scroll', handleViewportChange, { passive: true });
        window.addEventListener('resize', handleViewportChange);
        window.addEventListener('load', handleViewportChange);

        return () => {
            window.clearTimeout(initialTimeout);
            window.removeEventListener('scroll', handleViewportChange);
            window.removeEventListener('resize', handleViewportChange);
            window.removeEventListener('load', handleViewportChange);

            if (frameRef.current !== null) {
                window.cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
            }
        };
    }, [isOpen, scheduleToneUpdate]);

    const toneClassName =
        navbarTone === NAVBAR_TONES.LIGHT
            ? styles.toneLight
            : navbarTone === NAVBAR_TONES.MENU
                ? styles.toneMenu
                : styles.toneDark;

    return (
        <>
            <nav ref={navRef} className={`${styles.navbar} ${toneClassName}`}>
                <div className={styles.topbar}>
                    <div className={styles.logo}>
                        <TransitionLink
                            href="/"
                            aria-label={homeContent.brand.pageTitle}
                            className={styles.logoLink}
                        >
                            <span className={styles.logoIconSpacer} aria-hidden="true" />
                            <span className={styles.logoText}>
                                <span className={styles.logoTitle}>{homeContent.brand.navbarTitle}</span>
                                <span className={styles.logoSubtitle}>{homeContent.brand.navbarSubtitle}</span>
                            </span>
                        </TransitionLink>
                    </div>

                    <button
                        onClick={toggleMenu}
                        className={styles.menuToggle}
                        aria-label="Menu"
                    >
                        <motion.div
                            className={styles.toggleRing}
                            animate={isOpen ? {
                                scale: 1.1,
                                rotate: 180,
                            } : {
                                scale: 1,
                                rotate: [0, 360],
                            }}
                            transition={isOpen ?
                                { duration: 0.6, ease: "circOut" } :
                                {
                                    rotate: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    scale: { duration: 0.3 }
                                }
                            }
                            whileHover={!isOpen ? {
                                rotate: [0, 360],
                                transition: {
                                    rotate: {
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                }
                            } : {}}
                        />

                        <div className={styles.hamburgerLines}>
                            <motion.span
                                className={styles.line}
                                animate={isOpen ? {
                                    rotate: 45,
                                    y: 6,
                                } : {
                                    rotate: 0,
                                    y: 0,
                                }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <motion.span
                                className={styles.line}
                                animate={isOpen ? {
                                    scale: 0,
                                    opacity: 0,
                                } : {
                                    scale: 1,
                                    opacity: 1,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className={styles.line}
                                animate={isOpen ? {
                                    rotate: -45,
                                    y: -6,
                                } : {
                                    rotate: 0,
                                    y: 0,
                                    width: '80%',
                                }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                    </button>
                </div>

                <span className={styles.logoMarkOverlay} aria-hidden="true">
                    <img src={homeContent.brand.logo} alt="" aria-hidden="true" />
                </span>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.backdrop}
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            key="menu-panel"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className={styles.menuPanel}
                        >
                            <div className={styles.panelContent}>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={styles.linkList}
                                >
                                    {allLinks.map((link, index) => (
                                        <motion.div
                                            key={link.label}
                                            variants={itemVariants}
                                            className={`${styles.linkItem} ${link.isSubLink ? styles.subLink : ''}`}
                                        >
                                            <TransitionLink
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                            >
                                                <span className={styles.linkNumber}>0{index + 1}</span>
                                                <span className={styles.linkLabel}>{link.label}</span>
                                                <div className={styles.linkUnderline} />
                                            </TransitionLink>
                                        </motion.div>
                                    ))}

                                    <motion.div variants={itemVariants}>
                                        <TransitionLink
                                            href="/join"
                                            onClick={() => setIsOpen(false)}
                                            className={styles.ctaButton}
                                        >
                                            Join Team
                                        </TransitionLink>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
