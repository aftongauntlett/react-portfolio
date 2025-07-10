import { jobs } from "@/data/jobTimeline";
import Timeline from "../timeline/Timeline";

export default function ExperienceSection() {
  return (
    <section id="experience" className="p-8">
      <Timeline items={jobs} />
    </section>
  );
}
