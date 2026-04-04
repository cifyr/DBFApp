'use client';

import React, { useState } from 'react';
import { photos } from '@/data/photos';
import { teamData } from '@/data/teamData';
import styles from './photos.module.css';

const teamDisplayNames = Object.fromEntries(
    teamData.map((team) => [team.slug, team.title])
);

const PhotoCard = ({ label, name, url }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.photoCard}>
            <div className={styles.imageWrapper}>
                {url ? (
                    <img src={url} alt={name || label} loading="lazy" />
                ) : (
                    <div className={styles.placeholder}>No Image Link</div>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.label}>{label}</div>
                <div className={styles.name}>{name || 'Unnamed Asset'}</div>
                <div className={styles.urlContainer}>
                    <div className={styles.urlText} title={url}>{url || 'Empty'}</div>
                    <button
                        className={styles.copyButton}
                        onClick={handleCopy}
                        title="Copy URL"
                    >
                        {copied ? (
                            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                        ) : (
                            <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function PhotosPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Photo Dashboard</h1>
                <p>Manage and visualize every image in the WUDBF application from one place. Change URLs in <code>/data/photos.js</code> to update the entire site.</p>
            </header>

            {/* HOME PAGE SECTION */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🏠 Home Page</h2>
                <div className={styles.grid}>
                    <PhotoCard label="About Section" name="Team in Action" url={photos.home.about} />
                </div>

                <div className={styles.subSection}>
                    <h3 className={styles.subSectionTitle}>📜 Our Legacy (Past Aircraft)</h3>
                    <div className={styles.grid}>
                        {Object.entries(photos.home.legacy).map(([key, url]) => (
                            <PhotoCard
                                key={key}
                                label="Legacy Aircraft"
                                name={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                url={url}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* PEOPLE SECTION */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>👥 People & Headshots</h2>

                <div className={styles.subSection}>
                    <h3 className={styles.subSectionTitle}>👑 Presidents</h3>
                    <div className={styles.grid}>
                        <PhotoCard label="President" name="Samantha Feldman" url={photos.people.presidents.sam} />
                        <PhotoCard label="President" name="Sarah Donner" url={photos.people.presidents.sarah} />
                    </div>
                </div>

                <div className={styles.subSection}>
                    <h3 className={styles.subSectionTitle}>🛠️ Team Leaders</h3>
                    <div className={styles.grid}>
                        {Object.entries(photos.people.teamLeaders).map(([team, leaders]) => (
                            Object.entries(leaders).map(([name, url]) => (
                                <PhotoCard
                                    key={`${team}-${name}`}
                                    label={`${teamDisplayNames[team] || team} Leader`}
                                    name={name.charAt(0).toUpperCase() + name.slice(1)}
                                    url={url}
                                />
                            ))
                        ))}
                    </div>
                </div>

                <div className={styles.subSection}>
                    <h3 className={styles.subSectionTitle}>💼 Admin Leaders</h3>
                    <div className={styles.grid}>
                        <PhotoCard label="Treasurer" name="Maddy Pestine" url={photos.people.admin.maddy} />
                        <PhotoCard label="Finance" name="Joshua Berner" url={photos.people.admin.joshua} />
                        <PhotoCard label="Graphic Design" name="Ruby Choi" url={photos.people.admin.ruby} />
                        <PhotoCard label="Social" name="Danny Burns" url={photos.people.admin.danny} />
                    </div>
                </div>
            </section>

            {/* TEAM PAGES SECTION */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🛸 Team Assets</h2>
                {Object.entries(photos.teams).map(([slug, data]) => (
                    <div key={slug} className={styles.subSection}>
                        <h3 className={styles.subSectionTitle}>
                            {teamDisplayNames[slug] || slug}
                        </h3>
                        <div className={styles.grid}>
                            <PhotoCard label="Hero Image" name={`${teamDisplayNames[slug] || slug} Hero`} url={data.hero} />
                            <PhotoCard label="About Image 1" name={`${teamDisplayNames[slug] || slug} About 1`} url={data.about1} />
                            <PhotoCard label="About Image 2" name={`${teamDisplayNames[slug] || slug} About 2`} url={data.about2} />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
