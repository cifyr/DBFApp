import { photos } from './photos';

/**
 * PEOPLE DATA CONFIGURATION
 * 
 * This file centralizes all people data for the DBF website.
 * Update headshot URLs, names, majors, and grad years here to change what appears on the site.
 * 
 * HOW TO UPDATE:
 * 1. Find the relevant section (presidents, team leaders, or admin)
 * 2. Update the image URL, name, major, grad year, and email
 * 3. For team leaders: they're organized by team slug (aerodynamics, structures, etc.)
 * 4. You can have 1+ leaders per team - just add/remove objects from the array
 * 
 * NOTE: Headshot images should be added to /public/headshots/ directory
 * and referenced as '/headshots/firstname-lastname.jpg'
 */

// ========================================
// PRESIDENTS
// ========================================
// These appear in the "Meet the Presidents" section on the home page
export const presidents = [
    {
        name: 'Samantha Feldman',
        major: 'Mechanical Engineering Major',
        gradYear: '',
        email: 'feldman.s@wustl.edu',
        section: 'Administrative President',
        image: photos.people.presidents.sam
    },
    {
        name: 'Sarah Donner',
        major: 'Mechanical Engineering Major',
        gradYear: '',
        email: 'donner@wustl.edu',
        section: 'Technical President',
        image: photos.people.presidents.sarah
    }
];

// ========================================
// TEAM LEADERS
// ========================================
// These appear in the "Current Leaders" section on each subteam page
// You can have 1 or more leaders per team
export const teamLeaders = {
    aerodynamics: [
        {
            name: 'Sam Herrera',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'herrera.s.j@wustl.edu',
            section: 'Aero+Payload',
            image: photos.people.teamLeaders.aerodynamics.sam
        }
    ],

    structures: [
        {
            name: 'Alec Garcia-Caceres',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'a.a.garcia-caceres@wustl.edu',
            section: 'Structures',
            image: photos.people.teamLeaders.structures.alec
        },
        {
            name: 'Jacob Tenorio-Alcantar',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'j.tenorio-alcantar@wustl.edu',
            section: 'Structures',
            image: photos.people.teamLeaders.structures.jacob
        }
    ],

    propulsion: [
        {
            name: 'Evelyn Madrigal',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'e.madrigal@wustl.edu',
            section: 'Propulsion',
            image: photos.people.teamLeaders.propulsion.evelyn
        },
        {
            name: 'Yahir Dominguez',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'd.yahir@wustl.edu',
            section: 'Propulsion',
            image: photos.people.teamLeaders.propulsion.yahir
        }
    ],

    manufacturing: [
        {
            name: 'Preston Gee',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'g.preston@wustl.edu',
            section: 'Manufacturing',
            image: photos.people.teamLeaders.manufacturing.preston
        }
    ],

    electrics: [
        {
            name: 'Julia Peppe',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'j.b.peppe@wustl.edu',
            section: 'Avionics',
            image: photos.people.teamLeaders.electrics.julia
        },
        {
            name: 'Ruth Mellin',
            major: 'Mechanical Engineering Major',
            gradYear: '',
            email: 'mellin@wustl.edu',
            section: 'Avionics',
            image: photos.people.teamLeaders.electrics.ruth
        }
    ],

    dev: [
        {
            name: 'Mischa Trainor',
            major: 'Electrical Engineering Major',
            gradYear: '',
            email: 'm.e.trainor@wustl.edu',
            section: 'SimDev',
            image: photos.people.teamLeaders.dev.mischa
        }
    ]
};

// ========================================
// ADMIN LEADERS
// ========================================
// These appear on the admin page, one next to each of the 4 paragraphs
// Each leads a different admin section
export const adminLeaders = [
    {
        name: 'Maddy Pestine',
        major: 'Business Major',
        gradYear: '',
        email: 'm.pestine@wustl.edu',
        section: 'Treasurer',
        image: photos.people.admin.maddy
    },
    {
        name: 'Joshua Berner',
        major: 'Mechanical Engineering Major',
        gradYear: '',
        email: 'berner.j.l@wustl.edu',
        section: 'Finance',
        image: photos.people.admin.joshua
    },
    {
        name: 'Ruby Choi',
        major: 'Mechanical Engineering Major',
        gradYear: '',
        email: 'choi.r@wustl.edu',
        section: 'Graphic Design',
        image: photos.people.admin.ruby
    },
    {
        name: 'Danny Burns',
        major: 'Mechanical Engineering Major',
        gradYear: '',
        email: 'burns.d@wustl.edu',
        section: 'Social Coordinator',
        image: photos.people.admin.danny
    }
];

export function formatPersonAcademicInfo(person) {
    const major = person?.major?.trim() ?? '';
    const gradYear = person?.gradYear?.trim() ?? '';

    if (!major) {
        return '';
    }

    return gradYear ? `${major} ’${gradYear}` : major;
}
