import { BulletItem, BulletList } from '@/components/shared/BulletList';
import type { Job } from '@/data/jobs';

export default function NewJobEntry({ job }: { job: Job }) {
  return (
    <>
      <BulletList>
        <BulletList>
          {job.description.map((desc, idx) => (
            <BulletItem key={idx}>{desc}</BulletItem>
          ))}
        </BulletList>
      </BulletList>
    </>
  );
}
