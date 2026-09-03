import type { RiskBand } from "@/lib/types";
import { bandAccent } from "@/lib/scoring";

type Props = {
  total: number;
  band: RiskBand;
  count: number;
};

export function ScoreSummary({ total, band, count }: Props) {
  const accent = bandAccent(band.id);

  return (
    <section
      className="panel relative overflow-hidden p-5 sm:p-6"
      aria-live="polite"
      style={{ borderColor: `color-mix(in srgb, ${accent} 35%, var(--line))` }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5"
        style={{ background: accent }}
        aria-hidden
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-muted)]">
            Total ACB score
          </p>
          <p
            className="mt-1 text-6xl font-semibold leading-none tracking-tight sm:text-7xl"
            style={{ fontFamily: "var(--font-fraunces), var(--font-display)", color: accent }}
          >
            {total}
          </p>
          <p className="mt-3 text-lg font-semibold" style={{ color: accent }}>
            {band.label}
            <span className="ml-2 text-base font-medium text-[var(--ink-muted)]">
              ({band.rangeLabel})
            </span>
          </p>
        </div>
        <p className="max-w-md text-[var(--ink-muted)] sm:text-right">
          {count === 0
            ? "Add medicines to calculate anticholinergic burden."
            : band.guidance}
        </p>
      </div>
      {total >= 3 && (
        <p
          className="mt-4 rounded-lg px-3 py-2 text-sm text-[var(--band-high)]"
          style={{ background: "color-mix(in srgb, var(--band-high) 8%, white)" }}
        >
          Score ≥3 is associated with higher risk of confusion, falls, and mortality. Review
          contributing medicines with the patient where possible.
        </p>
      )}
    </section>
  );
}
