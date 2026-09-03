"use client";

import Link from "next/link";
import type { Medicine } from "@/lib/types";
import { CLASS_LABELS } from "@/lib/types";
import { usedHigherOfScales } from "@/lib/scoring";

type Props = {
  medicines: Medicine[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function RegimenList({ medicines, expandedId, onToggle, onRemove }: Props) {
  if (medicines.length === 0) {
    return (
      <div className="panel px-5 py-8 text-center text-[var(--ink-muted)]">
        No medicines in the current regimen. Use search to add agents for review.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {medicines.map((medicine) => {
        const open = expandedId === medicine.id;
        const classLabel = medicine.class ? CLASS_LABELS[medicine.class] ?? medicine.class : null;
        const higher = usedHigherOfScales(medicine);

        return (
          <li key={medicine.id} className="panel overflow-hidden">
            <div className="flex items-start gap-3 p-4 sm:p-5">
              <button
                type="button"
                className="min-w-0 flex-1 text-left"
                aria-expanded={open}
                onClick={() => onToggle(medicine.id)}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold">{medicine.generic}</span>
                  <span
                    className="score-pill text-white"
                    style={{
                      background:
                        medicine.score >= 3
                          ? "var(--band-high)"
                          : medicine.score >= 1
                            ? "var(--band-moderate)"
                            : "var(--band-low)",
                    }}
                  >
                    Score {medicine.score}
                  </span>
                  {classLabel && (
                    <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-xs font-semibold text-[var(--ink-muted)]">
                      {classLabel}
                    </span>
                  )}
                </div>
                {medicine.brands.length > 0 && (
                  <p className="mt-1 text-sm text-[var(--ink-muted)]">
                    Brands: {medicine.brands.join(", ")}
                  </p>
                )}
              </button>
              <button
                type="button"
                onClick={() => onRemove(medicine.id)}
                className="no-print shrink-0 rounded-lg border border-[var(--line)] px-3 py-1.5 text-sm font-semibold text-[var(--ink-muted)] hover:border-[var(--band-high)] hover:text-[var(--band-high)]"
              >
                Remove
              </button>
            </div>

            {open && (
              <div
              className="border-t border-[var(--line)] px-4 py-4 sm:px-5"
              style={{ background: "color-mix(in srgb, var(--bg) 70%, white)" }}
            >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                      Scale transparency
                    </h3>
                    <dl className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between gap-3">
                        <dt>Combined score used</dt>
                        <dd className="font-semibold">{medicine.score}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt>ACB scale</dt>
                        <dd className="font-semibold">
                          {medicine.acbScore != null ? medicine.acbScore : "Not separately recorded"}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt>GABS</dt>
                        <dd className="font-semibold">
                          {medicine.gabsScore != null ? medicine.gabsScore : "Not separately recorded"}
                        </dd>
                      </div>
                    </dl>
                    {higher ? (
                      <p className="mt-2 text-sm text-[var(--ink-muted)]">
                        Scales disagreed; the higher value was used for safety.
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-[var(--ink-muted)]">
                        Combined methodology prefers the higher of ACB and GABS when they differ.{" "}
                        <Link href="/about">See methodology</Link>.
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                      Deprescribing considerations
                    </h3>
                    {medicine.score >= 1 && medicine.alternatives?.length ? (
                      <div className="mt-2 space-y-3 text-sm">
                        {medicine.alternatives.map((group) => (
                          <div key={group.label}>
                            <p className="font-semibold">{group.label}</p>
                            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[var(--ink-muted)]">
                              {group.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : medicine.score >= 1 ? (
                      <p className="mt-2 text-sm text-[var(--ink-muted)]">
                        No curated alternatives for this agent. See the{" "}
                        <Link href="/reducing">reducing ACB</Link> guidance by therapeutic class.
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-[var(--ink-muted)]">
                        Score 0 — included for reference; does not add to burden.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
