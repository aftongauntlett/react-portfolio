export default function Hero() {
  return (
    <section className="space-y-8 p-6 border border-dashed border-[var(--color-line)] rounded-lg">
      <h1 className="title">title (Themed)</h1>
      <h2 className="subtitle">subtitle (shared - Montserrat)</h2>
      <p className="">text-body (shared)</p>
      <p className="text-muted">Color Muted</p>

      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--color-line)]">
        <div>
          <p className="font-title-light">Font Test: Portal (light mode)</p>
          <p
            className="text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-portal)" }}
          >
            Portal font test — Outfit. The quick brown fox jumps over the lazy
            dog.
          </p>
        </div>
        <div>
          <p className="font-title-dark">Font Test: Half-Life (dark mode)</p>
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
