import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import CommandMenu from '@/components/CommandMenu';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import CurrentlyBuilding from '@/components/sections/CurrentlyBuilding';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import GitHubCard from '@/components/sections/GitHubCard';
import Notes from '@/components/sections/Notes';
import Connect from '@/components/sections/Connect';

export default function HomePage() {
  return (
    <>
      <Preloader />
      <CommandMenu />
      <Navbar />
      <AvailabilityBadge />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CurrentlyBuilding />
        <Experience />
        <Certifications />
        <GitHubCard />
        <Notes />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
