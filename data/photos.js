/**
 * PHOTO DATA CONFIGURATION
 * 
 * This file centralizes all image links for the DBF website.
 * Update URLs here to change images throughout the site.
 */

export const photos = {
    // ========================================
    // HOME PAGE
    // ========================================
    home: {
        about: '/images/home.jpg',
        legacy: {
            plane2025: '/images/2025.jpg',
            plane2024: '/images/2024.jpeg',
            plane2023: '/images/2023.jpg',
            plane2022: '/images/2022.png',
            plane2021: '/images/2021.jpg',
            plane2020: '/images/2020.jpg',
            plane2019: '/images/2019.jpeg',
            plane2018: '/images/2018.jpg',
            plane2017: '/images/2017.jpeg',
        }
    },

    // ========================================
    // PEOPLE / HEADSHOTS
    // ========================================
    people: {
        presidents: {
            sam: '/headshots/sam.jpg',
            sarah: '/headshots/sarah.png',
        },
        teamLeaders: {
            aerodynamics: {
                sam: '/headshots/sam-herrare.png',
            },
            structures: {
                alec: '/headshots/alec.png',
                jacob: '/headshots/jacob.png',
            },
            propulsion: {
                evelyn: '/headshots/evelyn.png',
                yahir: '/headshots/yahir.jpg',
            },
            manufacturing: {
                preston: '/headshots/preston.png',
            },
            electrics: {
                julia: '/headshots/julia.jpeg',
                ruth: '/headshots/ruth.jpeg',
            },
            dev: {
                mischa: '/headshots/mischa.jpeg',
            }
        },
        admin: {
            joshua: '/headshots/joshua.png',
            ruby: '/headshots/ruby.png',
            maddy: '/headshots/maddy.png',
            danny: '/headshots/danny.png',
        }
    },

    // ========================================
    // TEAMS
    // ========================================
    teams: {
        aerodynamics: {
            hero: '/images/aero.JPG',
            about: '/images/aero.JPG',
        },
        structures: {
            hero: '/images/structures.jpeg',
            about: '/images/structures.jpeg',
        },
        propulsion: {
            hero: '/images/propulsion.JPG',
            about: '/images/propulsion.JPG',
        },
        manufacturing: {
            hero: '/images/structures.JPG',
            about: '/images/structures.JPG',
        },
        electrics: {
            hero: '/images/avionics.JPG',
            about: '/images/avionics.JPG',
        },
        dev: {
            hero: '/images/SimulationDevelopment.JPG',
            about: '/images/SimulationDevelopment.JPG',
        },
        admin: {
            hero: 'https://picsum.photos/1920/1080?random=106',
            about: 'https://picsum.photos/600/400?random=211',
        }
    }
};
