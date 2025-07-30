import Accordion from '@/components/shared/Accordion';
import Card from '@/components/shared/Card';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import { awards } from '@/data/education';

export default function AwardsAccordion() {
  const awardHover = useHoverGroup();
  return (
    <Accordion title="Awards & Recognition" defaultOpen={true}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {awards.map((award, index) => (
          <Card
            key={index}
            title={award.title}
            subtitle={award.organization}
            date={award.date}
            description={award.description}
            subtitleColor="primary"
            isDimmed={awardHover.isDimmed(index)}
            isHovered={awardHover.isHovered(index)}
            onMouseEnter={() => awardHover.setHovered(index)}
            onMouseLeave={awardHover.clearHovered}
          />
        ))}
      </div>
    </Accordion>
  );
}
