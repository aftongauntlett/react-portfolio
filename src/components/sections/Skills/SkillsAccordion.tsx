import Accordion from '@/components/shared/Accordion';
import SkillsSectionContent from './SkillsSectionContent';

export default function SkillsAccordion() {
  return (
    <Accordion title="Technical Skills" defaultOpen={true}>
      <SkillsSectionContent />
    </Accordion>
  );
}
