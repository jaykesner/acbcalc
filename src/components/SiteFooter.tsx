import { medicinesUpdatedAt } from "@/lib/medicines";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-[var(--line)] pt-5 text-sm text-[var(--ink-muted)]">
      <div className="no-print flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <p>
          Decision support for clinicians. Follow local formulary. Not a prescribing mandate.
          Medicine database updated {medicinesUpdatedAt}.
        </p>
      </div>
      <p className="print-only mt-2">
        ACB Calculator · Decision support only · Database {medicinesUpdatedAt}
      </p>
    </footer>
  );
}
