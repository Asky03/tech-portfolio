import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { MapPin, Cloud, Dumbbell } from 'lucide-react';

export default function About() {
  return (
    <section id="about" aria-label="About me" className="py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="About"
          title={<>The short version, <em className="italic gradient-text">honestly written.</em></>}
        />

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
          <Reveal className="space-y-5 text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl">
            <p>
              I&apos;m Ashutosh — a third-year CS student in Bengaluru who builds
              backend systems and cloud-based applications. I like working on
              problems where the hard part isn&apos;t the framework, it&apos;s the
              data flow, the failure modes, and what happens when traffic spikes.
            </p>
            <p>
              Right now I&apos;m going deeper on{' '}
              <strong className="text-white">AWS, system design, and DevOps workflows</strong>{' '}
              while building{' '}
              <strong className="text-white">CrowdShield</strong> — an AI crowd-monitoring
              prototype that does person detection and risk estimation from event footage.
              Looking for software engineering internships where I can own real
              backend work end-to-end.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-3 text-sm">
            <Pill icon={<MapPin size={14} />} label="Bengaluru, India" />
            <Pill icon={<Cloud size={14} />} label="Backend · Cloud · DevOps" />
            <Pill icon={<Dumbbell size={14} />} label="Off-keyboard: fitness, design" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass rounded-xl p-3.5 flex items-center gap-3 text-white/80">
      <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}