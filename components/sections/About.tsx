import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { MapPin, Coffee, Code2 } from 'lucide-react';

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
            {/* TODO: rewrite this paragraph in your own voice. Keep it to 3 sentences max. */}
            <p>
              I&apos;m Ashutosh — a software developer in Bengaluru who&apos;s most at home on the
              backend. I like systems with clear contracts, infrastructure that doesn&apos;t
              surprise you at 2am, and frontends that respect the user&apos;s attention.
            </p>
            <p>
              Lately I&apos;ve been building <strong className="text-white">CrowdShield</strong>{' '}
              (AI-driven crowd monitoring on AWS), shipping smaller GenAI experiments with RAG, and
              going deeper on cloud architecture and security fundamentals. I&apos;m currently
              looking for software engineering internships and full-stack roles where I can ship
              real things end-to-end.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-3 text-sm">
            <Pill icon={<MapPin size={14} />} label="Bengaluru, India" />
            <Pill icon={<Code2 size={14} />} label="Backend · Cloud · GenAI" />
            <Pill icon={<Coffee size={14} />} label="Currently learning DevOps & system design" />
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
