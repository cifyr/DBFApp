'use client';
import TransitionLink from './TransitionLink';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MeetTheTeams.module.css';
import { homeContent } from '@/data/homeContent';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Team data - moved to data/homeContent.js
const teams = homeContent.teamsSection.teams;

export default function MeetTheTeams() {
    const [activeTeam, setActiveTeam] = useState(null);
    const [promptTeamIds, setPromptTeamIds] = useState([]);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const heading = headingRef.current;

        if (!section || !heading) return;

        gsap.fromTo(
            heading,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    useEffect(() => {
        const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
        setPromptTeamIds(shuffledTeams.slice(0, 3).map((team) => team.id));
    }, []);

    const handlePanelClick = (teamId) => {
        setPromptTeamIds((currentIds) => currentIds.filter((id) => id !== teamId));
        setActiveTeam(activeTeam === teamId ? null : teamId);
    };

    const handlePanelKeyDown = (event, teamId) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handlePanelClick(teamId);
        }
    };

    const handlePanelMouseEnter = (teamId) => {
        setPromptTeamIds((currentIds) => currentIds.filter((id) => id !== teamId));
    };

    const handleLearnMoreClick = (event) => {
        event.stopPropagation();
    };

    return (
        <section id="teams" ref={sectionRef} className={styles.section} data-navbar-tone="dark">
            <div ref={headingRef} className={styles.headingWrapper}>
                <span className={styles.eyebrow}>{homeContent.teamsSection.eyebrow}</span>
                <h2 className={styles.heading}>{homeContent.teamsSection.heading}</h2>
                <p className={styles.subheading}>{homeContent.teamsSection.subheading}</p>
            </div>

            <div className={styles.accordion}>
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className={`${styles.panel} ${activeTeam === team.id ? styles.active : ''} ${promptTeamIds.includes(team.id) ? styles.panelPrompt : ''}`}
                        style={{ '--team-color': team.color }}
                        onClick={() => handlePanelClick(team.id)}
                        onMouseEnter={() => handlePanelMouseEnter(team.id)}
                        onKeyDown={(event) => handlePanelKeyDown(event, team.id)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={activeTeam === team.id}
                        aria-label={`${activeTeam === team.id ? 'Collapse' : 'Expand'} ${team.name}`}
                    >
                        <div className={styles.panelHeader}>
                            <span className={styles.panelIcon}>{team.icon}</span>
                            <span className={styles.panelShortName}>{team.name}</span>
                        </div>

                        <div className={styles.panelContent}>
                            <h3 className={styles.teamName}>{team.name}</h3>
                            <p className={styles.teamDescription}>{team.description}</p>
                            <TransitionLink
                                href={`/team/${team.id}`}
                                className={styles.learnMore}
                                onClick={handleLearnMoreClick}
                            >
                                View Subteam →
                            </TransitionLink>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
