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
    leadershipRoster = [],
    leadershipNote = '',
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
    leadershipRoster,
    leadershipNote,
    reportUrl,
    reportLabel,
    resources,
    gallery: gallery ?? [
        {
            src: imageUrl,
            alt: `${name} aircraft`,
            caption: `${name} during the ${year} Design-Build-Fly season.`,
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
                competitionStructure: [
                    'M1 — delivery flight verifying design and flight capability of the carrier aircraft.',
                    'M2 — captive carry of externally mounted fuel tanks plus the X-1 test vehicle around the course.',
                    'M3 — launch flight that successfully released the X-1 glider into a designated landing area.',
                    'GM — full installation-to-release demonstration of fuel tanks and test vehicle on the flight aircraft.',
                    'Predicted total mission score of 5.78 / 7, design report finished 26th.',
                ],
                reportUrl: '/reports/2025-Ursa-Major-Design-Report.pdf',
                reportLabel: 'Download the 2024-25 design report (PDF)',
                leadershipNote: '2024-25 leadership that designed and built Ursa Major.',
                leadershipRoster: [
                    { role: 'Administrative President', names: ['Jake Schwartz'] },
                    { role: 'Technical President', names: ['Eleni Kambouris'] },
                    { role: 'VP of Finance', names: ['Joshua Berner'] },
                    { role: 'Treasurer', names: ['Razi Khan'] },
                    { role: 'Communications', names: ['Joshua Einhorn'] },
                    { role: 'Graphic Design', names: ['Ruby'] },
                    { role: 'Aerodynamics', names: ['Sarah Donner', 'Luke McCann'] },
                    { role: 'Structures', names: ['Samantha Feldman', 'Alec Garcia-Caceres'] },
                    { role: 'Manufacturing', names: ['Birdie Lee'] },
                    { role: 'Avionics', names: ['Julia Peppe', 'Ruth Mellin'] },
                    { role: 'SimDev', names: ['Daniel Ruskin'] },
                ],
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
                competitionStructure: [
                    'M1 — staging flight with the Crew payload, verifying basic function of the aircraft.',
                    'M2 — medical transport with Crew, EMTs, a patient on a gurney, and a medical supplies cabinet.',
                    'M3 — urban taxi flight: as many scoring laps as possible around the course in a five-minute window carrying Crew and passengers.',
                    'GM — timed demonstration of the aircraft\'s ability to change mission configurations.',
                    'Predicted total mission score of 5.4 / 7; placed 19th overall at competition.',
                ],
                reportUrl: '/reports/2024-United-Bearlines-Design-Report.pdf',
                reportLabel: 'Download the 2023-24 design report (PDF)',
                resources: [
                    { url: '/reports/2024-United-Bearlines-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
                leadershipNote: '2023-24 leadership that designed and built United Bearlines (roster sourced from the design report).',
                leadershipRoster: [
                    { role: 'Administrative President', names: ['Kyler Schaetzle'] },
                    { role: 'Technical President', names: ['Ranch Kimball'] },
                    { role: 'Finance Lead', names: ['Samantha Witt'] },
                    { role: 'Communications', names: ['Frank Jiang'] },
                    { role: 'Aerodynamics', names: ['Jeffrey Reinhold'] },
                    { role: 'Structures', names: ['Majeed Lalani'] },
                    { role: 'Manufacturing', names: ['Birdie Lee', 'Eleni Kambouris'] },
                    { role: 'Propulsion', names: ['Juan Becerra-Garcia'] },
                    { role: 'Avionics', names: ['Eric Todd'] },
                    { role: 'SimDev', names: ['Daniel Ruskin'] },
                    { role: 'Faculty Advisor', names: ['Swami Karunamoorthy'] },
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
                competitionStructure: [
                    'M1 — staging flight verifying the function of the aircraft.',
                    'M2 — surveillance flight carrying an internal Electronics Package around the course as fast as possible.',
                    'M3 — jamming flight: three timed laps while carrying a Jamming Antenna mounted externally to the wing.',
                    'GM — structural margin demonstration of the airframe on the ground.',
                    'Predicted total mission score of 5.87 / 7; design report placed 16th, final finish 29th.',
                ],
                reportUrl: '/reports/2023-Bear-Force-One-Design-Report.pdf',
                reportLabel: 'Download the 2022-23 design report (PDF)',
                resources: [
                    { url: '/reports/2023-Bear-Force-One-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
                leadershipNote: '2022-23 leadership that designed and built Bear Force One.',
                leadershipRoster: [
                    { role: 'Administrative President', names: ['Ethan Bandick'] },
                    { role: 'Technical President', names: ['Ranch Kimball'] },
                    { role: 'VP of Communications', names: ['Kyler Schaetzle'] },
                    { role: 'VP of Finance', names: ['Jake Tillman'] },
                    { role: 'Aerodynamics', names: ['Jeffrey Reinhold', 'Jackson V. Kipper'] },
                    { role: 'Structures', names: ['Majeed Lalani'] },
                    { role: 'Manufacturing', names: ['Birdie Lee', 'Eleni Kambouris'] },
                    { role: 'Avionics', names: ['Eric Todd'] },
                    { role: 'SimDev', names: ['Daniel Ruskin', 'Will Rosenberg'] },
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
                competitionStructure: [
                    'M1 — deployment flight verifying the function of the aircraft.',
                    'M2 — staging flight carrying a payload of 40 syringes around the course as fast as possible.',
                    'M3 — vaccine delivery flight: repeated takeoffs and landings with a package deployment after each landing.',
                    'GM — timed demonstration of the aircraft.',
                    'Predicted total mission score of 6.283 / 7; design report placed 3rd (the team\'s strongest-ever DR result), final finish 11th.',
                ],
                reportUrl: '/reports/2022-Pflyzer-Design-Report.pdf',
                reportLabel: 'Download the 2021-22 design report (PDF)',
                resources: [
                    { url: '/reports/2022-Pflyzer-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
                leadershipNote: '2021-22 leadership that designed and built Pflyzer.',
                leadershipRoster: [
                    { role: 'Administrative President', names: ['Miles Petersen'] },
                    { role: 'Technical President', names: ['Sean Wong'] },
                    { role: 'VP of Finance', names: ['Alex Goertz'] },
                    { role: 'Aerodynamics (Co-Leads)', names: ['Alex Goertz', 'Jackson V. Kipper'] },
                    { role: 'Structures', names: ['Ethan Bandick'] },
                    { role: 'Manufacturing', names: ['Ranch Kimball'] },
                    { role: 'Avionics', names: ['Michael Qiu'] },
                    { role: 'SimDev', names: ['Rachit Jain'] },
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
                competitionStructure: [
                    'No in-person fly-off — the 2021 competition ran virtually because of COVID-19 restrictions.',
                    'Video submissions replaced the physical mission flights, with carry capacity and trailing-object capability among the scored criteria.',
                    'Design iterated on the 2020 Atlas airframe to lower build risk and prioritize member safety during the pandemic.',
                    'Sized to carry four sensors at around 5.9 kg M2 takeoff weight.',
                    'Estimated total mission score of 5.53; design report placed 55th, final finish 76th.',
                ],
                reportUrl: '/reports/2021-Red-Bearon-Design-Report.pdf',
                reportLabel: 'Download the 2020-21 design report (PDF)',
                leadershipNote: '2020-21 leadership that designed and built Red Bearon during the COVID-19 virtual competition.',
                leadershipRoster: [
                    { role: 'Administrative President', names: ['Hailey Hayes'] },
                    { role: 'Technical President', names: ['Jason Woodring'] },
                    { role: 'VP of Finance', names: ['Drew Marolf'] },
                    { role: 'Aerodynamics', names: ['Isaac Stone'] },
                    { role: 'Structures', names: ['Sean Wong'] },
                    { role: 'Manufacturing', names: ['Jerry Gammie'] },
                    { role: 'Avionics', names: ['Michael Qiu', 'Edric Choi'] },
                    { role: 'SimDev', names: ['Rachit Jain'] },
                ],
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
                competitionStructure: [
                    'M1 — staging flight verifying function of the aircraft.',
                    'M2 — passenger transport mission carrying up to 21 passengers plus luggage.',
                    'M3 — banner-tow mission towing a 0.50 × 0.25 m banner at altitude.',
                    'GM — structural demonstration on the ground.',
                    'In-person fly-off cancelled due to COVID-19; scoring ended at the design-report phase (52nd) which was also the final placement.',
                    'Estimated total mission score of 5.82.',
                ],
                reportUrl: '/reports/2020-Atlas-Design-Report.pdf',
                reportLabel: 'Download the 2019-20 design report (PDF)',
                leadershipNote: '2019-20 leadership that designed and built The Atlas.',
                leadershipRoster: [
                    { role: 'Administrative President', names: ['Justin Kransdorf'] },
                    { role: 'Technical President', names: ['Jonathan Richter'] },
                    { role: 'VP of Finance', names: ['Beau Allen'] },
                    { role: 'Aerodynamics', names: ['Andrew Amend'] },
                    { role: 'Structures', names: ['Jason Woodring'] },
                    { role: 'Manufacturing', names: ['Jerry Gammie'] },
                    { role: 'Avionics', names: ['Austin Stover'] },
                    { role: 'SimDev', names: ['Daniel Cherenson'] },
                ],
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
                competitionStructure: [
                    'Season themed around aircraft-carrier operations — short takeoffs and wing folding for stowed storage.',
                    'Airframe had to fit a 3 ft × 2 ft stowed box with a ≥ 4 ft wingspan once deployed.',
                    'Mission 3 lap count dominated scoring, pushing the design toward high cruise speed and efficient turnaround.',
                    'Competition held in Tucson, AZ; design report placed 36th, final finish 64th.',
                ],
                reportUrl: '/reports/2019-Spirit-Design-Report.pdf',
                reportLabel: 'Download the 2018-19 design report (PDF)',
                resources: [
                    { url: '/reports/2019-Spirit-Judges-Comments.pdf', label: 'Judges\' design report comments (PDF)' },
                ],
                leadershipNote: '2018-19 leadership that designed and built The Spirit of St. Louis Woodhams.',
                leadershipRoster: [
                    { role: 'President', names: ['Cameron Urban'] },
                    { role: 'VP of Operations', names: ['Taylor Tuleja'] },
                    { role: 'VP of Communications', names: ['Marie White'] },
                    { role: 'VP of Finance', names: ['Michele Anderson'] },
                    { role: 'Aerodynamics', names: ['Jonathan Richter'] },
                    { role: 'Structures', names: ['Jonathan Delgizzi'] },
                    { role: 'Manufacturing', names: ['Stella Fang'] },
                    { role: 'Avionics', names: ['Austin Stover'] },
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
                competitionStructure: [
                    'Second-ever WUDBF entry — the team was still growing from its founding roster and building out its subteam structure.',
                    'Season focused on running the full design/build/fly cycle end-to-end, rather than chasing a specialized mission profile.',
                    'Design report placed 45th; final finish 64th.',
                ],
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
                competitionStructure: [
                    'First-ever WUDBF entry — the team launched in 2016-17 with ten members and no prior infrastructure.',
                    'Season focused on standing up the team, sourcing materials, and proving the full design/build/fly workflow.',
                    'Design report placed 83rd, but the aircraft performed well at the fly-off and the team finished 12th overall — one of the team\'s strongest placements ever.',
                ],
                leadArchitecture: [
                    'Co-founders Peter Sharpe (President) and Christophe Foyer (Vice President / Treasurer) led a ten-person competition team.',
                    'Technical ownership was spread across the earliest members, who handled aircraft layout, structures, propulsion, manufacturing, and testing together.',
                    'With no prior subteam structure to inherit, the founding members set the technical and operational baseline that every later WUDBF team has built on.',
                ],
                leadershipNote: 'Founding 2016-17 team — WUDBF\'s first season.',
                leadershipRoster: [
                    { role: 'President (Co-founder)', names: ['Peter Sharpe'] },
                    { role: 'Vice President & Treasurer (Co-founder)', names: ['Christophe Foyer'] },
                    { role: 'Competition Team', names: ['Brian Mincks', 'Jonathan Delgizzi', 'Jason Xie', 'Kevin Hainline', 'Cameron Urban', 'Justin Kransdorf', 'Austin Stover', 'Noah Rowe', 'Peter Sharpe', 'Cameron Bard'] },
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
