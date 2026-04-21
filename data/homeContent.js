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
    competitionStructure,
    buildGist,
    leadArchitecture = defaultLegacyLeadArchitecture,
    reportUrl = '',
    reportLabel = '',
    resources = [],
    gallery,
    leadershipImage,
}) => ({
    name,
    year,
    placement,
    rotation,
    imageUrl,
    overview,
    competitionStructure: competitionStructure ?? defaultLegacyCompetitionStructure(competitionFocus),
    buildGist,
    leadArchitecture,
    reportUrl,
    reportLabel,
    resources,
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
    leadershipImage: leadershipImage ?? null,
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
                placement: 'Design Report 26th',
                rotation: -3,
                imageUrl: photos.home.legacy.plane2025,
                overview: 'Ursa Major was the team\'s entry for the 2024-25 AIAA Design/Build/Fly X-1 Supersonic Test Flight Program. The aircraft had to fly a delivery mission, a captive carry of externally mounted fuel tanks and the X-1 test vehicle, and a launch mission that successfully released the X-1 vehicle into a designated landing area.',
                competitionFocus: 'launching an X-1 glider from an external carrier aircraft while managing fuel-tank drag and post-release center-of-gravity shifts',
                buildGist: 'A conventional single-motor, tricycle, high-wing aircraft with a 1.83 m wingspan, wing loading of 8.78 kg/m² (M2) and 5.83 kg/m² (M3), a 1.18 thrust-to-weight ratio, and a predicted cruise of 31.5 m/s. Carbon-fiber wing spars mounted the fuel tanks directly, and the X-1 glider was held by a servo-lock release with a pull-switch strobe activation.',
                reportUrl: '/reports/2025-Ursa-Major-Design-Report.pdf',
                reportLabel: 'Download the 2024-25 design report (PDF)',
            }),
            createLegacyAircraft({
                name: 'United Bearlines',
                year: '2024',
                placement: 'Placed 19th',
                rotation: 4,
                imageUrl: photos.home.legacy.plane2024,
                overview: 'United Bearlines was the team\'s entry for the 2023-24 AIAA Design/Build/Fly competition, themed around medical and urban-taxi transport. The aircraft flew a staging flight with a Crew payload, a medical transport mission carrying EMTs, a patient on a gurney and a medical supplies cabinet, and an urban taxi flight that completed as many laps as possible in a five-minute window with Crew and passengers.',
                competitionFocus: 'carrying heavy mission payloads, swapping passenger/medical configurations quickly, and taking off within a tight 20 ft field length',
                buildGist: 'A conventional single-motor, low-wing, bow-tricycle aircraft with a 1.34 m wingspan, ~12 kg/m² wing loading, a 2.18 thrust-to-weight ratio, and a predicted cruise of 34.08 m/s. The interior was laid out around easy M2/M3/GM payload access, with passenger, pilot, and medical inserts held in place with Velcro and dual loading hatches.',
                reportUrl: '/reports/2024-United-Bearlines-Design-Report.pdf',
                reportLabel: 'Download the 2023-24 design report (PDF)',
                resources: [
                    { url: '/reports/2024-United-Bearlines-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
            }),
            createLegacyAircraft({
                name: 'Bear Force One',
                year: '2023',
                placement: 'Design Report 16th · Placed 29th',
                rotation: -2,
                imageUrl: photos.home.legacy.plane2023,
                overview: 'Bear Force One was the team\'s entry for the 2022-23 AIAA Design/Build/Fly competition. The aircraft had to fly a staging flight, a surveillance mission carrying an Electronics Package as fast as possible around the course, and a jamming flight with a three-lap timed run while carrying a Jamming Antenna externally mounted to a wing.',
                competitionFocus: 'fast surveillance laps with an internal payload and a wing-mounted jamming antenna that demanded clean external aerodynamics',
                buildGist: 'A conventional single-motor, high-wing aircraft on bow tricycle landing gear with a 1310 mm wingspan, roughly 11 kg/m² max wing loading, a 1.38 thrust-to-weight ratio, and a predicted cruise of 37.78 m/s. The rear fuselage was optimized around M2 Electronics Package access, and the M3 jamming antenna attached through a shared ground fixture to keep the wing interface consistent.',
                reportUrl: '/reports/2023-Bear-Force-One-Design-Report.pdf',
                reportLabel: 'Download the 2022-23 design report (PDF)',
                resources: [
                    { url: '/reports/2023-Bear-Force-One-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
            }),
            createLegacyAircraft({
                name: 'Pflyzer',
                year: '2022',
                placement: 'Design Report 3rd · Placed 11th',
                rotation: 5,
                imageUrl: photos.home.legacy.plane2022,
                overview: 'Pflyzer was the team\'s entry for the 2021-22 AIAA Design/Build/Fly competition, themed around vaccine delivery. The aircraft had to fly a deployment verification flight, a staging mission carrying 40 syringes as fast as possible, and a vaccine delivery flight with repeated takeoffs, landings, and package deployments. The design report finished 3rd in the field — one of the team\'s strongest-ever placements.',
                competitionFocus: 'rapid-cycle flights that land, deploy a package, and return to the air while maintaining low-risk stability and takeoff margin',
                buildGist: 'A conventional single-motor, low-wing taildragger with a 5° dihedral and a 2400 mm wingspan, ~6 kgf/m² wing loading, a 1.52 thrust-to-weight ratio, and a predicted cruise of 22.5 m/s. The taildragger stance gave an 11° takeoff angle of attack, and a two-stage (servo release + ramp lowering) deployment system placed packages safely without tripping the shock sensors.',
                reportUrl: '/reports/2022-Pflyzer-Design-Report.pdf',
                reportLabel: 'Download the 2021-22 design report (PDF)',
                resources: [
                    { url: '/reports/2022-Pflyzer-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
            }),
            createLegacyAircraft({
                name: 'Red Bearon',
                year: '2021',
                placement: 'Virtual Competition · Placed 76th',
                rotation: 3,
                imageUrl: photos.home.legacy.plane2021,
                overview: 'Red Bearon was the team\'s entry for the 2020-21 AIAA Design/Build/Fly, held virtually because of COVID-19 restrictions. With no in-person fly-off and many parallels to the 2020 mission, WUDBF iterated on the Atlas airframe to cut risk while still demonstrating all required capabilities through video submissions.',
                competitionFocus: 'a virtual competition that rewarded a proven, low-risk airframe carrying sensors and able to trail an object behind the aircraft',
                buildGist: 'A conventional dual-motor, high-wing aircraft derived from the 2020 Atlas — with a 1.524 m (5 ft) wingspan, balsa wood construction, Fowler flaps, external storage, and internal storage through a nose-cone opening. Propulsion was tuned for 30 m/s cruise in M2 and 20 m/s in M3, and the airframe was sized to carry four sensors at about 5.9 kg takeoff weight.',
                reportUrl: '/reports/2021-Red-Bearon-Design-Report.pdf',
                reportLabel: 'Download the 2020-21 design report (PDF)',
            }),
            createLegacyAircraft({
                name: 'The Atlas',
                year: '2020',
                placement: 'Placed 52nd · No in-person fly-off (COVID-19)',
                rotation: 3,
                imageUrl: photos.home.legacy.plane2020,
                overview: 'The Atlas was the team\'s entry for the 2019-20 AIAA Design/Build/Fly competition. The aircraft had to fly a short-takeoff passenger transport and a banner-tow mission, with scoring that pushed for raw payload capacity and high-cruise laps. The 2020 in-person fly-off was cancelled due to COVID-19.',
                competitionFocus: 'carrying up to 21 passengers while still flying short-takeoff passenger laps and a trailing banner mission',
                buildGist: 'A conventional dual-motor, high-wing aircraft on tricycle landing gear with a 1.524 m (5 ft) wingspan, balsa wood construction, Fowler flaps, external storage, and internal storage via nose-cone opening. The propulsion package was tuned for 35 m/s cruise in M2 and 20 m/s in M3, and the aircraft carried 21 passengers plus luggage at about 7.3 kg M2 takeoff weight.',
                reportUrl: '/reports/2020-Atlas-Design-Report.pdf',
                reportLabel: 'Download the 2019-20 design report (PDF)',
            }),
            createLegacyAircraft({
                name: 'The Spirit',
                year: '2019',
                placement: 'Placed 64th',
                rotation: -5,
                imageUrl: photos.home.legacy.plane2019,
                overview: 'The Spirit of St. Louis Woodhams was the team\'s entry for the 2018-19 AIAA Design/Build/Fly competition in Tucson, AZ. The season was themed around aircraft-carrier operations — short takeoffs and wing folding for stowed storage — with scoring dominated by Mission 3 lap count.',
                competitionFocus: 'short-takeoff carrier operations and a stowable airframe while pushing Mission 3 lap counts to maximize scoring',
                buildGist: 'A single-engine pusher in the spirit of an F-35B, with a tapered swept wing, H-tail, and trailing-edge flaps. Thrust vectoring gave it the same static stability as a conventional aircraft with a much shorter takeoff distance. The airframe was sized to meet a ≥ 4 ft wingspan and a 3 ft × 2 ft stowed footprint.',
                reportUrl: '/reports/2019-Spirit-Design-Report.pdf',
                reportLabel: 'Download the 2018-19 design report (PDF)',
                resources: [
                    { url: '/reports/2019-Spirit-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
            }),
            createLegacyAircraft({
                name: 'The Spruce Zeus',
                year: '2018',
                placement: 'Placed 64th',
                rotation: 2,
                imageUrl: photos.home.legacy.plane2018,
                overview: 'The Spruce Zeus was the team\'s second-ever competition aircraft — a year spent maturing the design, manufacturing, and flight-test processes that the founding team had sketched out the season before.',
                competitionFocus: 'maturing the team\'s workflow — moving from a first-year prototype culture to a more organized design, build, and test cycle',
                buildGist: 'A lightweight, buildable airframe with simple subsystem integration, chosen so a small, fast-growing team could manufacture, assemble, and iterate without heavy tooling.',
            }),
            createLegacyAircraft({
                name: 'The Wrighton Flyer',
                year: '2017',
                placement: 'Placed 12th',
                rotation: -3,
                imageUrl: photos.home.legacy.plane2017,
                overview: 'The Wrighton Flyer was the founding year\'s aircraft — WUDBF\'s very first entry in AIAA Design/Build/Fly. A small co-founder-led team of ten got the whole thing from blank page to a 12th-place competition finish.',
                competitionFocus: 'standing up a brand-new competition team and proving its design, manufacturing, and flight-test process worked end-to-end',
                buildGist: 'A dependable, easy-to-understand configuration that a ten-person founding roster could actually manufacture, assemble, test, and improve under a tight first-year learning curve.',
                leadArchitecture: [
                    'Co-founders Peter Sharpe (President) and Christophe Foyer (Vice President / Treasurer) led a ten-person competition team.',
                    'Technical ownership was spread across the earliest members — Brian Mincks, Jonathan Delgizzi, Jason Xie, Kevin Hainline, Cameron Urban, Justin Kransdorf, Austin Stover, Noah Rowe, and Cameron Bard — who handled aircraft layout, structures, propulsion, manufacturing, and testing together.',
                    'With no prior subteam structure to inherit, the founding members set the technical and operational baseline that every later WUDBF team has built on.',
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
