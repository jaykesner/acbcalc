"use client";

import { useCallback, useMemo, useState } from "react";
import type { Medicine } from "@/lib/types";
import { medicines as allMedicines, medicinesUpdatedAt, methodologyBlurb } from "@/lib/medicines";
import { getRiskBand, rankByContribution, totalScore } from "@/lib/scoring";
import { MedicineSearch } from "@/components/MedicineSearch";
import { ScoreSummary } from "@/components/ScoreSummary";
import { RegimenList } from "@/components/RegimenList";
import { ClinicianOutputs } from "@/components/ClinicianOutputs";
import Link from "next/link";

export function Calculator() {
  const [regimen, setRegimen] = useState<Medicine[]>([]);
  const [history, setHistory] = useState<Medicine[][]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const ranked = useMemo(() => rankByContribution(regimen), [regimen]);
  const total = useMemo(() => totalScore(ranked), [ranked]);
  const band = useMemo(() => getRiskBand(total), [total]);
  const selectedIds = useMemo(() => new Set(regimen.map((m) => m.id)), [regimen]);

  const pushHistory = useCallback((next: Medicine[]) => {
    setHistory((h) => [...h.slice(-19), regimen]);
    setRegimen(next);
  }, [regimen]);

  const addMedicine = useCallback(
    (medicine: Medicine) => {
      if (selectedIds.has(medicine.id)) return;
      pushHistory([...regimen, medicine]);
      if (medicine.score >= 1) setExpandedId(medicine.id);
    },
    [pushHistory, regimen, selectedIds],
  );

  const removeMedicine = useCallback(
    (id: string) => {
      pushHistory(regimen.filter((m) => m.id !== id));
      setExpandedId((current) => (current === id ? null : current));
    },
    [pushHistory, regimen],
  );

  const clearAll = useCallback(() => {
    if (regimen.length === 0) return;
    pushHistory([]);
    setExpandedId(null);
  }, [pushHistory, regimen.length]);

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const previous = h[h.length - 1];
      setRegimen(previous);
      return h.slice(0, -1);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <ScoreSummary total={total} band={band} count={regimen.length} />

      <section className="panel p-5 sm:p-6">
        <MedicineSearch
          medicines={allMedicines}
          selectedIds={selectedIds}
          onAdd={addMedicine}
        />
        <div className="no-print mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={undo}
            disabled={history.length === 0}
            className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold disabled:opacity-40"
          >
            Undo last change
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={regimen.length === 0}
            className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold disabled:opacity-40"
          >
            Clear regimen
          </button>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
            >
              Current regimen
            </h2>
            <p className="text-sm text-[var(--ink-muted)]">
              Ranked by contribution to total score. Expand a medicine for scale detail and
              alternatives.
            </p>
          </div>
          <p className="shrink-0 text-sm text-[var(--ink-muted)]">{regimen.length} selected</p>
        </div>
        <RegimenList
          medicines={ranked}
          expandedId={expandedId}
          onToggle={(id) => setExpandedId((current) => (current === id ? null : id))}
          onRemove={removeMedicine}
        />
      </section>

      <aside
        className="no-print rounded-xl border border-dashed border-[var(--line)] px-4 py-3 text-sm text-[var(--ink-muted)]"
        style={{ background: "color-mix(in srgb, var(--accent-soft) 55%, white)" }}
      >
        <p>
          Dose is not included in the score, but higher doses increase risk. Do not stop medicines
          abruptly — plan a taper when deprescribing. Always follow local formulary.{" "}
          <Link href="/reducing">Reducing ACB guidance</Link> ·{" "}
          <Link href="/about">Methodology</Link>.
        </p>
        <p className="mt-2">
          Database updated {medicinesUpdatedAt}. {methodologyBlurb}
        </p>
      </aside>

      <ClinicianOutputs medicines={ranked} total={total} bandLabel={band.label} />
    </div>
  );
}
