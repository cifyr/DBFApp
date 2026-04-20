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

const defaultLegacyCompetitionStructure = (focus) => ([
    'Written design work and pre-competition preparation before travel.',
    'Aircraft inspection, setup, and readiness checks at competition.',
    `Season focus: ${focus}`,
]);

const defaultLegacyLeadArchitecture = [
    'A systems-level project lead coordinated the overall schedule, aircraft integration, and major design reviews.',
    'Subteam leads in Aero+Payload, Structures, Propulsion, Manufacturing, Avionics, and SimDev owned their technical decisions and delivered the major subsystems.',
    'Flight-test and integration leadership brought the final aircraft together for trimming, troubleshooting, and competition readiness.',
];

const createLegacyAircraft = ({
    name,
    year,
    placement,
    rotation,
    imageUrl,
    overview,
    competitionFocus,
    buildGist,
    leadArchitecture = defaultLegacyLeadArchitecture,
    reportUrl = '',
    reportLabel = 'Design report archive coming soon',
    gallery,
    leadershipImage,
}) => ({
    name,
    year,
    placement,
    rotation,
    imageUrl,
    overview,
    competitionStructure: defaultLegacyCompetitionStructure(competitionFocus),
    buildGist,
    leadArchitecture,
    reportUrl,
    reportLabel,
    gallery: gallery ?? [
        {
            src: imageUrl,
            alt: `${name} aircraft`,
            caption: `${name} during the ${year} Design-Build-Fly season.`,
        },
        {
            src: photos.home.about,
            alt: 'DBF team archive photo',
            caption: 'Archive team photo from the broader DBF collection.',
        },
    ],
    leadershipImage: leadershipImage ?? {
        src: '',
        alt: `${name} leadership graphic for ${year}`,
        caption: `Leadership graphic for ${year} is coming soon.`,
    },
});

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
            'Provide students the opportunity to design and construct a complete RC aircraft',
            'Cultivate a strong aerospace community by fostering connections between students and professionals in the field',
        ],
    },

    // Who We Are Section
    about: {
        eyebrow: 'About Us',
        heading: 'Who We Are',
        // TODO(caden): Revisit this overview copy with any additional awards, milestones, and historical details you want highlighted.
        descriptions: [
            'Founded in 2016, WU Design-Build-Fly (WUDBF) brings together students from diverse majors and backgrounds who share an interest in aerospace and engineering design. By working on a multidisciplinary team, members develop strong communication and collaboration skills while gaining hands-on experience in designing, building, and testing an aircraft.',
            'WUDBF is a radio-controlled (RC) aircraft engineering design team that gives students hands-on experience in aerospace design through participation in the annual international American Institute of Aeronautics and Astronautics (AIAA) Design-Build-Fly competition. Each year features a new design task, requiring the team to design and build an entirely new aircraft.'
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
        // Add more modal photos by extending each aircraft's `gallery` array below.
        // Add a `reportUrl` when a report PDF or public drive link is available.
        // Add a `leadershipImage` object when a year-specific leadership PNG is available.
        aircraft: [
            createLegacyAircraft({
                name: 'Ursa Major',
                year: '2025',
                placement: 'Placed 35th',
                rotation: -3,
                imageUrl: photos.home.legacy.plane2025,
                overview: 'Ursa Major was the team’s 2025 aircraft, developed to balance mission flexibility, dependable flight performance, and clean subsystem integration across the full vehicle.',
                competitionFocus: 'balancing mission capability, repeatable operations, and overall performance through the scored flight sequence',
                buildGist: 'The aircraft used a conventional fixed-wing layout with a lightweight internal structure, a packaged mission area, and a propulsion setup tuned for reliable takeoffs and consistent mission execution.',
            }),
            createLegacyAircraft({
                name: 'United Bearlines',
                year: '2024',
                placement: 'Placed 19th',
                rotation: 4,
                imageUrl: photos.home.legacy.plane2024,
                overview: 'United Bearlines pushed the team toward a more refined competition package, with stronger systems integration and a cleaner balance between payload demands and stable flight.',
                competitionFocus: 'payload handling, dependable mission turnaround, and a polished competition-ready aircraft package',
                buildGist: 'The team built around a straightforward airframe with careful packaging, a practical manufacturing plan, and repeated integration work to keep the vehicle serviceable at competition.',
            }),
            createLegacyAircraft({
                name: 'Bear Force One',
                year: '2023',
                placement: 'Placed 29th',
                rotation: -2,
                imageUrl: photos.home.legacy.plane2023,
                overview: 'Bear Force One emphasized a balanced configuration that could carry mission hardware without giving up predictable handling and manageable field assembly.',
                competitionFocus: 'combining mission payload capability with stable flight behavior and efficient turnaround between attempts',
                buildGist: 'Its design centered on a practical fuselage-and-wing package, weight-conscious structures, and a build approach that made inspection, transport, and reassembly easier for the team.',
            }),
            createLegacyAircraft({
                name: 'Pflyzer',
                year: '2022',
                placement: 'Placed 11th',
                rotation: 5,
                imageUrl: photos.home.legacy.plane2022,
                overview: 'Pflyzer marked one of the team’s strongest finishes and reflected a season focused on building a simple, competitive aircraft with strong all-around execution.',
                competitionFocus: 'high overall scoring through efficient design choices, solid flight performance, and reliable mission execution',
                buildGist: 'The aircraft leaned on a clean structural concept, efficient propulsion matching, and a build process that prioritized repeatability and quick troubleshooting during testing.',
            }),
            createLegacyAircraft({
                name: 'The Atlas',
                year: '2020',
                placement: 'Placed 52nd',
                rotation: 3,
                imageUrl: photos.home.legacy.plane2020,
                overview: 'The Atlas was built around a more demanding mission concept, requiring the team to manage larger design tradeoffs in packaging, structure, and aircraft performance.',
                competitionFocus: 'handling a demanding mission profile while keeping the aircraft controllable, manufacturable, and competition-ready',
                buildGist: 'The aircraft combined a mission-oriented fuselage with a supportive wing and tail package, using structural decisions aimed at carrying the required load without overcomplicating the build.',
            }),
            createLegacyAircraft({
                name: 'The Spirit',
                year: '2019',
                placement: 'Placed 64th',
                rotation: -5,
                imageUrl: photos.home.legacy.plane2019,
                overview: 'The Spirit came from an earlier growth period for the team and centered on delivering a complete, flyable aircraft through the full DBF cycle.',
                competitionFocus: 'getting a reliable aircraft through inspection, mission preparation, and the scored flight sequence',
                buildGist: 'The build emphasized a straightforward fixed-wing layout, practical manufacturing methods, and subsystem choices that the team could integrate and debug with the resources available.',
            }),
            createLegacyAircraft({
                name: 'The Spruce Zeus',
                year: '2018',
                placement: 'Placed 64th',
                rotation: 2,
                imageUrl: photos.home.legacy.plane2018,
                overview: 'The Spruce Zeus represented one of the team’s earliest full competition efforts, with the focus on producing a viable aircraft and learning the end-to-end process.',
                competitionFocus: 'developing a competition-capable aircraft while establishing stronger design, build, and test workflows for later teams',
                buildGist: 'The aircraft relied on a lightweight, buildable structure and simple subsystem integration, giving the team a manageable platform for learning how to move from concept to flight.',
            }),
            createLegacyAircraft({
                name: 'The Wrighton Flyer',
                year: '2017',
                placement: 'Placed 12th',
                rotation: -3,
                imageUrl: photos.home.legacy.plane2017,
                overview: 'The Wrighton Flyer was the founding team’s first competition aircraft and set the baseline for the technical culture that followed.',
                competitionFocus: 'building a credible first competition entry while proving out the team’s design, manufacturing, and flight-test process',
                buildGist: 'Its construction focused on a dependable, easy-to-understand configuration that the young team could manufacture, assemble, test, and improve under a tight learning curve.',
                leadArchitecture: [
                    'A small founding leadership group coordinated the entire project, from recruiting members to scheduling design and build milestones.',
                    'Technical ownership was spread across the earliest subteam leads, who handled aircraft layout, structures, propulsion, manufacturing, and testing in a much tighter organization than the team uses today.',
                    'Competition preparation depended on close collaboration between design leads and the students who assembled, trimmed, and flew the aircraft.',
                ],
            }),
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
                description: 'We size the wings and tail, analyze stability and solve the compeition payload design challenge.',
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
            { label: 'LinkedIn', url: 'https://www.linkedin.com/company/wudbf/', iconType: 'linkedin', ariaLabel: 'LinkedIn', openInNewTab: true },
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
