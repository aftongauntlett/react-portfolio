import AwardsAccordion from '../Skills/AwardsAccordion';
import CertificationsAccordion from '../Skills/CertificationsAccordion';

export default function CredentialsSection() {
  return (
    <div className="space-y-6">
      <AwardsAccordion />
      <CertificationsAccordion />
    </div>
  );
}
