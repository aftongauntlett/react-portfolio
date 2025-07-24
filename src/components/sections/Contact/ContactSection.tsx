import Button from "@/components/shared/Button/Button";

const fields = [
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    rows: 4,
  },
];

export default function ContactSection() {
  return (
    <>
      <p className="text-[var(--color-muted)]">
        Whether you want to chat about a project, collaboration, or just say hi
        — my inbox is always open. I’ll try to respond as soon as I can!
      </p>

      <form className="space-y-4">
        {fields.map(({ id, label, type, rows }) => (
          <div key={id}>
            <label htmlFor={id} className="block mb-2">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                id={id}
                rows={rows}
                className="w-full border border-[var(--color-line)] bg-red-200 p-2 rounded"
              />
            ) : (
              <input
                id={id}
                type={type}
                className="w-full border border-[var(--color-line)] bg-green-300 p-2 rounded"
              />
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <Button type="submit">Send Message</Button>
        </div>
      </form>
    </>
  );
}
