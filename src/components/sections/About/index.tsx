import { HiMail } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import PaintSplashText from '@/components/shared/PaintSplashEffect';
import MotionSection from '@/components/shared/MotionSection';

const aboutParagraphs = [
  'I’m {Afton} - a senior frontend engineer with {5+ years} of experience building scalable, accessible UIs using {React}, {TypeScript}, and component-driven design systems. I’ve led frontend architecture at companies ranging from a Fortune 500 firm like {Booz Allen Hamilton} to small businesses generating {$300M+} annually.',
  'As the founder of {Gauntlet Designs}, I built custom platforms from the ground up. This included a complete overhaul of an internal app for the 6th-largest {Applebee’s} franchisee, which still serves thousands of employees and fundraisers across multiple states.',
  'At {Booz Allen}, I led the frontend efforts for 7 {React} apps, introduced multi-theme systems and reusable component libraries, migrated legacy codebases from {Angular/Node.js} to modular {React/Flask}, integrated collaborative tools like {Figma} and {TanStack Query}, and advocated for {accessibility} and code maintainability across multiple teams.',
];

function markBold(str: string) {
  const parts = str.split(/({.*?})/g);
  return parts.map((part, i) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      return (
        <span key={i} className="font-medium text-[var(--color-primary)]">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export default function AboutSection() {
  return (
    <div aria-labelledby="about-title" className="pt-8 lg:pt-12 space-y-6 text-[var(--color-text)]">
      <MotionSection>
        <h1 id="about-title" className="mb-6">
          <PaintSplashText tag="span" className="title block">
            Hello.
          </PaintSplashText>
        </h1>
      </MotionSection>

      <motion.div
        className="space-y-4 sm:space-y-6 max-w-3xl pb-4 sm:pb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2, // Slower stagger for reading
            },
          },
        }}
      >
        {aboutParagraphs.map((text, idx) => (
          <MotionSection
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: 'easeOut' as const,
                },
              },
            }}
          >
            <p className="text-body">{markBold(text)}</p>
          </MotionSection>
        ))}
      </motion.div>

      <MotionSection delay={0.3}>
        <div className="flex justify-end">
          <Button href="#contact" icon={<HiMail />} variant="primary">
            Contact Me
          </Button>
        </div>
      </MotionSection>
    </div>
  );
}
