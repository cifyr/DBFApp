import { teamData } from '@/data/teamData';
import { teamLeaders, adminLeaders } from '@/data/people';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubTeamHero from '@/components/templates/SubTeamHero';
import SubTeamContent from '@/components/templates/SubTeamContent';
import AdminContent from '@/components/templates/AdminContent';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return teamData.map((team) => ({
        slug: team.slug,
    }));
}

export default function TeamPage({ params }) {
    const team = teamData.find(t => t.slug === params.slug);

    if (!team) {
        notFound();
    }

    const isAdmin = team.slug === 'admin';

    return (
        <main>
            <Navbar />
            <SubTeamHero
                title={team.title}
                description={team.description}
                image={team.heroImage}
            />
            {isAdmin ? (
                <AdminContent
                    about={team.about}
                    carousel={team.carousel}
                    adminLeaders={adminLeaders}
                />
            ) : (
                <SubTeamContent
                    about={team.about}
                    carousel={team.carousel}
                    leaders={teamLeaders[team.slug]}
                />
            )}
            <Footer />
        </main>
    );
}
