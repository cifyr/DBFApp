import { photos } from './photos';

/**
 * This file contains all the text and image links for the home page.
 * It's designed to be easily editable by anyone.
 * 
 * Rules for editing:
 * 1. Text should be inside single or double quotes: 'Example' or "Example".
 * 2. Arrays (lists) look like this: [ 'item1', 'item2' ].
 * 3. Make sure every line (except the last one in a list) ends with a comma.
 */

export const homeContent = {
    brand: {
        navbarTitle: 'Washington University in St. Louis',
        navbarSubtitle: 'Design-Build-Fly Team',
        logo: '/images/DBF Logo.png',
        pageTitle: 'Washington University in St. Louis Design-Build-Fly Team',
        metaDescription: 'Washington University in St. Louis Design-Build-Fly Team designs, builds, and flies competition aircraft for the AIAA Design-Build-Fly challenge.',
    },

    // Hero Section (Top of page)
    hero: {
        words: [
            { text: 'Washington University in St. Louis\nDesign-Build-Fly Team', color: 'var(--color-pastel-green-dark)', position: 'center', style: 'intro' },
            { text: 'DESIGN', color: 'var(--color-pastel-green-dark)', position: 'center' },
            { text: 'BUILD', color: 'var(--color-pastel-red-dark)', position: 'right' },
            { text: 'FLY', color: 'var(--color-pastel-green-dark)', position: 'left' },
        ],
        scrollIndicator: 'Scroll',
    },

    mission: {
        eyebrow: 'Our Mission',
        heading: 'WUDBF\'s Threefold Mission:',
        descriptions: [
            'Teach practical engineering skills beyond the classroom',
            'Provide students the opportunity to design and construct a complete aircraft',
            'Cultivate a strong aerospace community by fostering connections between students and professionals in the field',
        ],
    },

    // Who We Are Section
    about: {
        eyebrow: 'About Us',
        heading: 'Who We Are',
        // TODO(caden): Revisit this overview copy with any additional awards, milestones, and historical details you want highlighted.
        descriptions: [
            'Founded in 2016, WU Design-Build-Fly (WUDBF) brings together students from diverse majors and backgrounds who share an interest in aerospace and engineering design. By working on a multidisciplinary team, members develop strong communication and collaboration skills while gaining hands-on experience in designing, building, and testing aircraft.',
            'WUDBF is a radio-controlled (RC) aircraft engineering design team that gives students hands-on experience in aerospace design through participation in the annual international American Institute of Aeronautics and Astronautics (AIAA) Design-Build-Fly competition. Each year features a new mission, requiring the team to design and build an entirely new aircraft.'
        ],
        stats: [
            { number: '60+', label: 'Team Members' },
            { number: '7', label: 'Subteams' },
            { number: '2016', label: 'Founded' },
            { number: '3', label: 'Top-20 Finishes' },
        ],
        image: {
            url: photos.home.about,
            alt: 'Team working together in the lab',
            caption: 'Our team in action'
        }
    },

    // Past Aircraft Section (Polaroid Gallery)
    pastAircraft: {
        eyebrow: 'Our Legacy',
        heading: 'Past Aircraft',
        aircraft: [
            { name: 'Ursa Major', year: '2025', placement: 'Placed 35th', rotation: -3, imageUrl: photos.home.legacy.plane2025 },
            { name: 'United Bearlines', year: '2024', placement: 'Placed 19th', rotation: 4, imageUrl: photos.home.legacy.plane2024 },
            { name: 'Bear Force One', year: '2023', placement: 'Placed 29th', rotation: -2, imageUrl: photos.home.legacy.plane2023 },
            { name: 'Pflyzer', year: '2022', placement: 'Placed 11th', rotation: 5, imageUrl: photos.home.legacy.plane2022 },
            { name: 'The Atlas', year: '2020', placement: 'Placed 52nd', rotation: 3, imageUrl: photos.home.legacy.plane2020 },
            { name: 'The Spirit', year: '2019', placement: 'Placed 64th', rotation: -5, imageUrl: photos.home.legacy.plane2019 },
            { name: 'The Spruce Zeus', year: '2018', placement: 'Placed 64th', rotation: 2, imageUrl: photos.home.legacy.plane2018 },
            { name: 'The Wrighton Flyer', year: '2017', placement: 'Placed 12th', rotation: -3, imageUrl: photos.home.legacy.plane2017 },
        ],
    },

    // Meet The Teams Section (Accordion)
    teamsSection: {
        eyebrow: 'Our Teams',
        heading: 'Meet the Crew',
        subheading: 'Explore each subteam',
        teams: [
            {
                id: 'aerodynamics',
                name: 'Aero+Payload',
                shortName: 'Aero+Payload',
                color: '#A8D0E6',
                description: 'We size the wing and tail, study stability and control, and integrate mission payload systems so the aircraft can complete the mission.',
                icon: '✈️',
            },
            {
                id: 'structures',
                name: 'Structures',
                shortName: 'Structures',
                color: '#C9A227',
                description: 'We design the wing, tail, and fuselage in SolidWorks and use FEA to keep the airframe lightweight, strong, and manufacturable.',
                icon: '🏗️',
            },
            {
                id: 'propulsion',
                name: 'Propulsion',
                shortName: 'Propulsion',
                color: '#E07A5F',
                description: 'We design, select, and test the motor, propeller, and battery system that gives the aircraft the thrust it needs.',
                icon: '⚡',
            },
            {
                id: 'manufacturing',
                name: 'Manufacturing',
                shortName: 'Manufacturing',
                color: '#81B29A',
                description: 'We select materials and build aircraft components from drawings and CAD using the shop processes that bring the airplane to life.',
                icon: '🔧',
            },
            {
                id: 'electrics',
                name: 'Avionics',
                shortName: 'Avionics',
                color: '#F2CC8F',
                description: 'We handle controls and data logging by integrating servos, the receiver, wiring, and flight-test instrumentation.',
                icon: '📡',
            },
            {
                id: 'dev',
                name: 'SimDev',
                shortName: 'SimDev',
                color: '#6D597A',
                description: 'We build simulation and analysis tools that help the team optimize designs and study sensitivity before the aircraft is built.',
                icon: '📊',
            },
            {
                id: 'admin',
                name: 'Admin',
                shortName: 'Admin',
                color: '#9B2335',
                description: 'We support the team through sponsorships, budgeting, design, and community-building that keep the project moving.',
                icon: '💼',
            },
        ],
    },

    // Social / Call to Action Section
    socialCTA: {
        bannerText: 'Follow Our Journey',
        links: [
            { label: '@washudbf', url: 'https://instagram.com/washudbf', iconType: 'instagram', ariaLabel: 'Instagram' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/company/wudbf/', iconType: 'linkedin', ariaLabel: 'LinkedIn' },
        ],
    },

    // Footer
    footer: {
        brandName: 'WashU DBF',
        tagline: 'Design-Build-Fly Team',
        email: 'washu.dbf@gmail.com',
        instagramHandle: '@washudbf',
        instagramUrl: 'https://instagram.com/washudbf',
        sections: [
            {
                title: 'Site',
                links: [
                    { label: 'Mission', url: '/#mission' },
                    { label: 'Who We Are', url: '/#about' },
                    { label: 'Teams', url: '/#teams' },
                    { label: 'Past Aircraft', url: '/#aircraft' },
                    { label: 'Join Team', url: '/join' },
                    { label: 'Partner With Us', url: '/partners' },
                ]
            },
            {
                title: 'Subteams',
                links: [
                    { label: 'Aero+Payload', url: '/team/aerodynamics' },
                    { label: 'Structures', url: '/team/structures' },
                    { label: 'Propulsion', url: '/team/propulsion' },
                    { label: 'Manufacturing', url: '/team/manufacturing' },
                    { label: 'Avionics', url: '/team/electrics' },
                    { label: 'SimDev', url: '/team/dev' },
                    { label: 'Admin', url: '/team/admin' },
                ]
            }
        ],
        aiaaLink: 'https://www.aiaa.org/dbf',
    },

    // Sponsors Section
    sponsors: {
        eyebrow: 'Partner With Us',
        heading: 'Fuel Our Mission',
        description: 'Design-Build-Fly is expensive. From carbon fiber to competition travel, we rely on corporate partners to help us reach new heights.',
        benefits: [
            "Connect with top engineering talent for recruitment and mentorship.",
            "Gain brand visibility on our aircraft and team apparel.",
            "Support hands-on aerospace education at WashU."
        ],
        contact: {
            text: 'Become a Sponsor',
            email: 'washu.dbf@gmail.com'
        }
    },

    // Recruitment Section
    recruitment: {
        eyebrow: 'JOIN THE TEAM',
        heading: 'Join the Team',
        status: 'Open', // Options: 'Open', 'Closed'
        openBadgeLabel: 'No Application Required',
        closedBadgeLabel: 'Applications Closed',
        closedMessage: 'We are not currently accepting applications for the current season.',
        openMessage: 'The best way to join is to show up in person. We meet every Saturday at 11:00 AM in Jubel 120 or 222.',
        subtext: 'No prior experience required—just a willingness to learn and show up.'
    },

    // Navigation Menu
    navigation: {
        links: [
            { label: 'Home', href: '/' },
            { label: 'Aero+Payload', href: '/team/aerodynamics' },
            { label: 'Structures', href: '/team/structures' },
            { label: 'Propulsion', href: '/team/propulsion' },
            { label: 'Manufacturing', href: '/team/manufacturing' },
            { label: 'Avionics', href: '/team/electrics' },
            { label: 'SimDev', href: '/team/dev' },
            { label: 'Admin', href: '/team/admin' },
            { label: 'Partner with us', href: '/partners' },
        ]
    }
};
