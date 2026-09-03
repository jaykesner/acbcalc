import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reducing ACB",
};

const swapExamples = [
  {
    from: "Chlorphenamine",
    to: "Nasal sprays; loratadine; fexofenadine",
  },
  {
    from: "Oxybutynin",
    to: "Pelvic floor exercises / bladder training; mirabegron. Prefer agents with lower CNS penetration (e.g. trospium, solifenacin, tolterodine) when an antimuscarinic is still needed.",
  },
  {
    from: "Amitriptyline (depression)",
    to: "Lifestyle / psychological options; SSRIs (citalopram, sertraline) or SNRIs (duloxetine, venlafaxine)",
  },
  {
    from: "Amitriptyline (pain)",
    to: "Conservative measures (stretching, heat); gabapentin; duloxetine",
  },
  {
    from: "Tramadol",
    to: "Physiotherapy, massage, stretching, heat/ice; paracetamol",
  },
];

const classTable: {
  group: string;
  minimal: string[];
  mild: string[];
  moderate: string[];
  severe: string[];
}[] = [
  {
    group: "Antidepressants",
    minimal: ["Bupropion", "Duloxetine"],
    mild: ["Mirtazapine", "Sertraline", "Venlafaxine"],
    moderate: [],
    severe: ["Amitriptyline", "Imipramine", "Nortriptyline", "Paroxetine"],
  },
  {
    group: "Urinary incontinence",
    minimal: ["Mirabegron"],
    mild: [],
    moderate: [],
    severe: [
      "Darifenacin",
      "Fesoterodine",
      "Oxybutynin",
      "Solifenacin",
      "Tolterodine",
      "Trospium",
    ],
  },
  {
    group: "Nausea and vomiting",
    minimal: ["Prochlorperazine", "Domperidone", "Metoclopramide"],
    mild: [],
    moderate: [],
    severe: ["Levomepromazine", "Cyclizine"],
  },
  {
    group: "Antihistamines",
    minimal: ["Fexofenadine"],
    mild: ["Cetirizine", "Desloratadine", "Loratadine"],
    moderate: [],
    severe: ["Chlorphenamine", "Clemastine"],
  },
  {
    group: "Reflux medications",
    minimal: ["Esomeprazole"],
    mild: ["Cimetidine", "Lansoprazole", "Omeprazole", "Ranitidine"],
    moderate: [],
    severe: [],
  },
];

export default function ReducingPage() {
  return (
    <article className="mx-auto max-w-4xl">
      <h1
        className="text-3xl font-semibold tracking-tight"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        Reducing ACB risk
      </h1>
      <p className="mt-4 text-[var(--ink-muted)]">
        If the total score is high, discuss implications with the patient and consider
        deprescribing. Scores do not include dose, but higher doses increase risk — dose reduction
        can help when cessation is not possible. Any reduction in cumulative burden is worthwhile.
      </p>
      <p
        className="mt-3 rounded-xl border px-4 py-3 text-sm text-[var(--band-high)]"
        style={{
          borderColor: "color-mix(in srgb, var(--band-high) 30%, var(--line))",
          background: "color-mix(in srgb, var(--band-high) 6%, white)",
        }}
      >
        Do not stop medicines abruptly without a clinical plan — withdrawal can cause harm. Plan
        tapers where appropriate. Follow local formulary when choosing alternatives.
      </p>
      <p className="mt-3">
        <Link href="/">Open calculator</Link> to see alternatives inline beside contributing
        medicines.
      </p>

      <h2
        className="mt-10 text-2xl font-semibold"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        Common swaps
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--line)]">
              <th className="py-2 pr-4 font-semibold">Higher burden</th>
              <th className="py-2 font-semibold">Consider</th>
            </tr>
          </thead>
          <tbody>
            {swapExamples.map((row) => (
              <tr key={row.from} className="border-b border-[var(--line)] align-top">
                <td className="py-3 pr-4 font-semibold">{row.from}</td>
                <td className="py-3 text-[var(--ink-muted)]">{row.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2
        className="mt-10 text-2xl font-semibold"
        style={{ fontFamily: "var(--font-fraunces), var(--font-display)" }}
      >
        Therapeutic class guidance
      </h2>
      <p className="mt-3 text-sm text-[var(--ink-muted)]">
        Adapted from Scottish Intercollegiate Guidelines Network (SIGN) Polypharmacy Guidance,
        March 2015. Where published scales disagree, this tool uses the higher burden score for
        safety.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--line)]">
              <th className="py-2 pr-3 font-semibold">Medicine group</th>
              <th className="py-2 pr-3 font-semibold">Minimal</th>
              <th className="py-2 pr-3 font-semibold">Mild</th>
              <th className="py-2 pr-3 font-semibold">Moderate</th>
              <th className="py-2 font-semibold">Severe</th>
            </tr>
          </thead>
          <tbody>
            {classTable.map((row) => (
              <tr key={row.group} className="border-b border-[var(--line)] align-top">
                <td className="py-3 pr-3 font-semibold">{row.group}</td>
                <td className="py-3 pr-3 text-[var(--ink-muted)]">{row.minimal.join(", ") || "—"}</td>
                <td className="py-3 pr-3 text-[var(--ink-muted)]">{row.mild.join(", ") || "—"}</td>
                <td className="py-3 pr-3 text-[var(--ink-muted)]">
                  {row.moderate.join(", ") || "—"}
                </td>
                <td className="py-3 text-[var(--ink-muted)]">{row.severe.join(", ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[var(--ink-muted)]">
        Primum non nocere — first, do no harm.
      </p>
    </article>
  );
}
