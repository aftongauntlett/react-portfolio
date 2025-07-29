import MotionSection from '@/components/shared/MotionSection';
import Certifications from './Certifications';
import Awards from './Awards';

export default function EducationSection() {
  return (
    <MotionSection className="space-y-6">
      <Certifications />
      <Awards />
    </MotionSection>
  );
}
