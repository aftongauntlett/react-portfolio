export default function ContactSection() {
  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-3xl font-bold">Get in Touch</h2>
      <p className="text-[var(--color-muted)]">
        Whether you want to chat about a project, collaboration, or just say hi
        — my inbox is always open. I’ll try to respond as soon as I can!
      </p>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border border-[var(--color-line)] bg-transparent p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-[var(--color-line)] bg-transparent p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full border border-[var(--color-line)] bg-transparent p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 border rounded border-[var(--color-line)] hover:bg-[var(--color-line)] transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
