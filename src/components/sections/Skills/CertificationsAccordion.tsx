import Accordion from '@/components/shared/Accordion';
import Card from '@/components/shared/Card';
import { education } from '@/data/education';

export default function CertificationsAccordion() {
  return (
    <Accordion title="Education & Certifications" defaultOpen={true}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            subtitle={item.institution}
            date={item.date}
            badge={item.status}
            link={item.link}
          />
        ))}
      </div>
    </Accordion>
  );
}
