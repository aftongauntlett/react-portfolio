import Button from '@/components/shared/Button';

const textInputClass = `
  mt-1 block w-full rounded-md
  border border-[var(--color-line)]
  bg-transparent px-3 py-2
  text-[var(--color-text)]
  placeholder-[var(--color-muted)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
`;

export default function ContactSection() {
  return (
    <section id="contact" className="space-y-6">
      <p className="text-[var(--color-muted)]">
        Whether you want to chat about a job opening, a project, collaboration, or just say hi - my
        inbox is always open. I’ll try to respond as soon as I can!
      </p>

      <form className="space-y-6" method="POST" action="/api/contact">
        {/* Name */}
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className={textInputClass}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className={textInputClass}
          />
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="How can I help?"
            className={textInputClass}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </section>
  );
}
