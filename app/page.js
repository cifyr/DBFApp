import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MissionSection from '@/components/MissionSection';
import WhoWeAre from '@/components/WhoWeAre';
import PolaroidGallery from '@/components/PolaroidGallery';
import MeetTheTeams from '@/components/MeetTheTeams';
import SocialCTA from '@/components/SocialCTA';
import MeetThePresidents from '@/components/MeetThePresidents';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <MissionSection />
            <WhoWeAre />
            <MeetTheTeams />
            <SocialCTA />
            <MeetThePresidents />
            <PolaroidGallery />
            <Footer />
        </main>
    );
}
