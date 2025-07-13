export default function Hero() {
  return (
    <section className="space-y-8 p-6 border border-dashed border-[var(--color-line)] rounded-lg">
      <h1 className="title">This is a .title (Heading Font)</h1>
      <h2 className="subtitle">This is a .subtitle (Heading Font)</h2>
      <p className="text-body">
        This is .text-body. It should match your active body font. The quick
        brown fox jumps over the lazy dog.
      </p>
      <p className="text-body italic text-[var(--color-muted)]">
        This is a body paragraph with <code>--color-muted</code> applied
        manually, plus <code>italic</code>.
      </p>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--color-line)]">
        <div>
          <p className="text-sm font-semibold">
            Font Test: Portal (light mode)
          </p>
          <p
            className="text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-portal)" }}
          >
            Portal font test — Outfit. The quick brown fox jumps over the lazy
            dog.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">
            Font Test: Half-Life (dark mode)
          </p>
          <p
            className="text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-halflife)" }}
          >
            Half-Life font test — Orbitron. The quick brown fox jumps over the
            lazy dog.
          </p>
        </div>
      </div>
    </section>
  );
}
