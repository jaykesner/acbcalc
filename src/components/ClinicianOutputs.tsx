"use client";

import { useMemo, useState } from "react";
import type { Medicine } from "@/lib/types";
import { formatClinicNotes } from "@/lib/notes";

type Props = {
  medicines: Medicine[];
  total: number;
  bandLabel: string;
};

export function ClinicianOutputs({ medicines, total, bandLabel }: Props) {
  const [initials, setInitials] = useState("");
  const [copied, setCopied] = useState(false);

  const notes = useMemo(
    () => formatClinicNotes(medicines, initials),
    [medicines, initials],
  );

  async function copyNotes() {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="panel p-5 sm:p-6">
      <h2
        className="text-xl font-semibold"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        Clinician outputs
      </h2>
      <p className="mt-1 text-sm text-[var(--ink-muted)]">
        Optional initials stay in this browser session only and are never stored on a server.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="patient-initials" className="mb-1 block text-sm font-semibold">
            Patient initials (optional)
          </label>
          <input
            id="patient-initials"
            value={initials}
            onChange={(e) => setInitials(e.target.value.slice(0, 8))}
            placeholder="e.g. J.D."
            className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2 outline-none ring-[var(--accent)] focus:ring-2"
          />
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyNotes}
            className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110"
          >
            {copied ? "Copied" : "Copy clinic notes"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:border-[var(--accent)]"
          >
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="print-only mt-6">
        <h2 className="text-2xl font-semibold">ACB medication review summary</h2>
        <p className="mt-1 text-sm">
          Date: {new Date().toISOString().slice(0, 10)}
          {initials.trim() ? ` · Patient initials: ${initials.trim().toUpperCase()}` : ""}
        </p>
        <p className="mt-2 text-lg font-semibold">
          Total ACB score: {total} ({bandLabel})
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          {medicines.length === 0 && <li>No medicines selected</li>}
          {medicines.map((m) => (
            <li key={m.id}>
              <strong>{m.generic}</strong> — score {m.score}
              {m.brands.length > 0 ? ` (${m.brands.join(", ")})` : ""}
              {m.alternatives && m.alternatives.length > 0 && (
                <ul className="mt-1 list-disc pl-5 text-sm">
                  {m.alternatives.map((g) => (
                    <li key={g.label}>
                      {g.label}: {g.items.join("; ")}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm">
          Disclaimer: Advisory decision support only. Dose is not scored. Do not stop medicines
          abruptly without a plan. Follow local formulary. If a medicine is not listed, treat as
          score 0.
        </p>
      </div>
    </section>
  );
}
