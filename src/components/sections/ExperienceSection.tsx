import { jobs } from "@/data/jobTimeline";
import Timeline from "../timeline/Timeline";

export default function ExperienceSection() {
  return (
    <section id="experience" className="p-8">
      <h2 className="text-2xl font-semibold mb-8">Experience</h2>
      <Timeline items={jobs} />
    </section>
  );
}
