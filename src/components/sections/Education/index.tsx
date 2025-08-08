import AwardsAccordion from './AwardsAccordion';
import CertificationsAccordion from './CertificationsAccordion';

export default function EducationSection() {
  return (
    <div className="space-y-6">
      <AwardsAccordion />
      <CertificationsAccordion />
    </div>
  );
}
