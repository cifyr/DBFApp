import { photos } from './photos';
import { homeContent } from './homeContent';

const homeTeamDescriptions = Object.fromEntries(
    (homeContent?.teamsSection?.teams ?? []).map((team) => [team.id, team.description])
);

const getHomeTeamDescription = (teamId) => homeTeamDescriptions[teamId];

const teamCarouselMedia = {
    aerodynamics: [
        {
            src: '/images/Carousel/aero1.png',
            alt: 'Aero+Payload design work',
            description: 'Early layout studies help the team compare wing, tail, and payload concepts before the aircraft geometry is finalized.',
        },
        {
            src: '/images/Carousel/aero2.png',
            alt: 'Aero+Payload analysis session',
            description: 'Analysis work connects stability and control predictions to the mission requirements driving the design.',
        },
        {
            src: '/images/Carousel/aero3.png',
            alt: 'Aero+Payload testing and iteration',
            description: 'Testing and iteration refine aerodynamic choices before the rest of the airplane is committed to build.',
        },
    ],
    structures: [
        {
            src: '/images/Carousel/stuctures1.png',
            displaySrc: '/images/Carousel/structures1-centered.png',
            alt: 'Structures CAD and design work',
            description: 'Full-aircraft CAD lets the team study packaging, manufacturability, and how the airframe fits together.',
        },
        {
            src: '/images/Carousel/structures2.png',
            alt: 'Structures analysis and modeling',
            description: 'Structural analysis highlights where loads concentrate so critical parts can be strengthened without adding unnecessary mass.',
        },
        {
            src: '/images/Carousel/structures3.png',
            alt: 'Structures team build detail',
            description: 'Detailed internal design work turns the concept into parts that can move cleanly into manufacturing.',
        },
    ],
    propulsion: [
        {
            src: '/images/Carousel/propulsion1.png',
            alt: 'Propulsion system testing',
            description: 'Bench testing compares motor, propeller, and battery combinations to find efficient thrust for the mission.',
        },
        {
            src: '/images/Carousel/propulsion2.png',
            alt: 'Propulsion hardware setup',
            description: 'Instrumented hardware setups let the team validate propulsion performance before the aircraft flies.',
        },
    ],
    manufacturing: [
        {
            src: '/images/Carousel/manufacturing1.jpg',
            alt: 'Manufacturing shop work',
            description: 'Shop work turns drawings into real parts through cutting, layups, assembly, and repeated process refinement.',
        },
        {
            src: '/images/Carousel/manufacturing2.jpg',
            alt: 'Manufacturing build process',
            description: 'Hands-on build time helps the team understand tolerances, materials, and how the design behaves in reality.',
        },
    ],
    electrics: [
        {
            src: '/images/Carousel/avionics1.jpg',
            alt: 'Avionics wiring and controls work',
            description: 'Controls integration connects servos, receivers, and wiring so the aircraft responds reliably in the air.',
        },
        {
            src: '/images/Carousel/avionics2.jpg',
            alt: 'Avionics integration and setup',
            description: 'Electronics setup supports clean packaging, repeatable testing, and dependable system bring-up.',
        },
        {
            src: '/images/Carousel/avionics3.jpg',
            alt: 'Avionics testing and data logging',
            description: 'Data logging captures useful test information that feeds back into flight readiness and design decisions.',
        },
    ],
    dev: [
        {
            src: '/images/Carousel/simdev1.png',
            alt: 'Simulation Development model output',
            description: 'Simulation outputs help the team compare concepts before committing time and materials to a build.',
        },
        {
            src: '/images/Carousel/simdev2.png',
            alt: 'Simulation Development analysis tools',
            description: 'Custom analysis tools make it easier to study trends, sensitivities, and tradeoffs across the aircraft.',
        },
        {
            src: '/images/Carousel/simdev3.gif',
            alt: 'Simulation Development animated result',
            description: 'Dynamic visualizations show how the model responds as assumptions change and help guide early design choices.',
        },
    ],
    admin: [],
};

const buildCarouselConfig = (teamId, heading = 'Subteam Highlights') => ({
    heading,
    maxHeight: '50vh',
    items: teamCarouselMedia[teamId] ?? [],
});

/**
 * TEAM PAGES DATA CONFIGURATION
 * 
 * HOW TO UPDATE:
 * - Personnel (Leaders, Presidents, etc.) are managed in /data/people.js.
 * - This file (/data/teamData.js) now only handles team descriptors, hero images, and "About" content.
 */

export const teamData = [
    {
        id: 'aerodynamics',
        slug: 'aerodynamics',
        title: 'Aero+Payload',
        description: getHomeTeamDescription('aerodynamics'),
        heroImage: photos.teams.aerodynamics.hero,
        carousel: buildCarouselConfig('aerodynamics'),
        about: {
            heading: 'Aerodynamic Stability and Payload Design',
            content: [
                "The Aero+Payload subteam sizes the wing and tail, studies stability and control, and designs mission payload systems so the aircraft can complete the course requirements. Members use tools like XFLR5, CFD, and CAD to compare design options and understand how aerodynamic choices affect the rest of the airplane. It is a good place to build intuition for aircraft performance while working on both core flight surfaces and mission hardware."
            ],
            images: [
                photos.teams.aerodynamics.about
            ]
        }
    },
    {
        id: 'structures',
        slug: 'structures',
        title: 'Structures',
        description: getHomeTeamDescription('structures'),
        heroImage: photos.teams.structures.hero,
        carousel: buildCarouselConfig('structures'),
        about: {
            heading: 'CAD + FEA for a Strong, Lightweight Airframe',
            content: [
                "The structures subteam designs the wing, tail, and fuselage in SolidWorks and uses FEA to make sure the airframe is strong, lightweight, and manufacturable. Members gain experience with CAD, structural analysis, and iterative design while learning how manufacturing constraints shape the final airplane. It is a strong way to build practical design intuition and the confidence to turn concepts into real hardware."
            ],
            images: [
                photos.teams.structures.about
            ]
        }
    },
    {
        id: 'propulsion',
        slug: 'propulsion',
        title: 'Propulsion',
        description: getHomeTeamDescription('propulsion'),
        heroImage: photos.teams.propulsion.hero,
        carousel: buildCarouselConfig('propulsion'),
        about: {
            heading: 'Propulsion System Design + Testing',
            content: [
                "The propulsion subteam designs and tests the aircraft’s propulsion system by selecting the right motor, propeller, and battery combination for the mission. Members use tools like eCalc, RC Benchmark, and hands-on test setups to compare configurations and measure thrust, efficiency, and reliability. It is a strong introduction to experimental testing and to how power system choices affect the aircraft as a whole."
            ],
            images: [
                photos.teams.propulsion.about
            ]
        }
    },
    {
        id: 'manufacturing',
        slug: 'manufacturing',
        title: 'Manufacturing',
        description: getHomeTeamDescription('manufacturing'),
        heroImage: photos.teams.manufacturing.hero,
        carousel: buildCarouselConfig('manufacturing'),
        about: {
            heading: 'From SolidWorks to Shop Floor',
            content: [
                "The manufacturing subteam takes the design from the computer to the shop floor by selecting materials and building aircraft components from drawings and CAD models. Members gain hands-on experience with processes like laser cutting, fiberglass layups, hot-wire foam cutting, 3D printing, and balsa construction. It is a practical way to learn how build methods, tolerances, and material choices influence the final aircraft."
            ],
            images: [
                photos.teams.manufacturing.about
            ]
        }
    },
    {
        id: 'electrics',
        slug: 'electrics',
        title: 'Avionics',
        description: getHomeTeamDescription('electrics'),
        heroImage: photos.teams.electrics.hero,
        carousel: buildCarouselConfig('electrics'),
        about: {
            heading: 'Controls and Data Logging',
            content: [
                "The avionics subteam handles controls and data logging by integrating the aircraft’s servos, receiver, wiring, and data acquisition hardware. Members gain experience with circuitry, soldering, PCB design, and flight data collection while helping ensure the aircraft is reliable in both ground testing and flight. It is a good fit for anyone interested in electronics, control systems, and the connection between hardware and flight performance."
            ],
            images: [
                photos.teams.electrics.about
            ]
        }
    },
    {
        id: 'dev',
        slug: 'dev',
        title: 'SimDev',
        description: getHomeTeamDescription('dev'),
        heroImage: photos.teams.dev.hero,
        carousel: buildCarouselConfig('dev'),
        about: {
            heading: 'Digital Engineering',
            content: [
                "The simulation development subteam creates models and analysis tools that support design decisions across the aircraft. Members use MATLAB, Simulink, and Python to study performance trends, run sensitivity analyses, and compare concepts before manufacturing begins. It is a strong way to develop computational skills while working on problems that directly inform the aircraft design."
            ],
            images: [
                photos.teams.dev.about
            ]
        }
    },
    {
        id: 'admin',
        slug: 'admin',
        title: 'Admin',
        description: getHomeTeamDescription('admin'),
        heroImage: photos.teams.admin.hero,
        carousel: buildCarouselConfig('admin'),
        about: {
            heading: 'Operations, Sponsorship, and Team Support',
            content: [
                "Our Treasurer manages budgeting, reimbursements, grants, and SU work so the administrative side of the team stays organized and well supported. This role tracks spending, handles financial paperwork, and keeps the resources in place for the team to design, build, and travel.",
                "Our Finance team focuses on vendor relations and sponsorships, building the partnerships that help fund the team and supply materials each season. They communicate with current and prospective supporters and help make sure WUDBF can keep moving forward.",
                "Our Graphic Design team creates our visual identity, marketing materials, and social media content. They shape how WUDBF presents itself to sponsors, partners, and the broader community while helping strengthen the team’s brand each season.",
                "Our Social Coordinator manages team onboarding, community-building events, and internal culture initiatives. This role ensures that every new member finds their place, organizes team bonding activities, and preserves our team legacy for years to come through documentation and traditions."
            ],
            images: []
        }
    }
];
