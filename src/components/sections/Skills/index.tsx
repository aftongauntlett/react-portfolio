import AwardsAccordion from './AwardsAccordion';
import CertificationsAccordion from './CertificationsAccordion';
import SkillsAccordion from './SkillsAccordion';

export default function SkillsSection() {
  return (
    <div className="space-y-6">
      <AwardsAccordion />
      <CertificationsAccordion />
      <SkillsAccordion />
    </div>
  );
}
