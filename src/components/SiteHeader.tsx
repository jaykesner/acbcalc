import Link from "next/link";

const links = [
  { href: "/", label: "Calculator" },
  { href: "/reducing", label: "Reducing ACB" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="no-print flex flex-col gap-4 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Clinical decision support
        </p>
        <Link href="/" className="mt-1 block no-underline">
          <h1
            className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl"
            style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
          >
            ACB Calculator
          </h1>
        </Link>
        <p className="mt-1 max-w-xl text-[var(--ink-muted)]">
          Anticholinergic burden scoring for medication review in older adults.
        </p>
      </div>
      <nav aria-label="Primary" className="flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] font-semibold">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-[var(--ink)] no-underline hover:text-[var(--accent)]">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
