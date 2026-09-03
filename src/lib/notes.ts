import type { Medicine } from "./types";
import { getRiskBand, rankByContribution, totalScore } from "./scoring";

export function formatClinicNotes(
  medicines: Medicine[],
  patientInitials?: string,
): string {
  const ranked = rankByContribution(medicines);
  const total = totalScore(ranked);
  const band = getRiskBand(total);
  const date = new Date().toISOString().slice(0, 10);

  const lines: string[] = [
    "Anticholinergic Burden (ACB) review",
    `Date: ${date}`,
  ];

  if (patientInitials?.trim()) {
    lines.push(`Patient initials: ${patientInitials.trim().toUpperCase()}`);
  }

  lines.push(
    `Total ACB score: ${total} (${band.label}, ${band.rangeLabel})`,
    "",
    "Medicines (ranked by contribution):",
  );

  if (ranked.length === 0) {
    lines.push("- None selected");
  } else {
    for (const m of ranked) {
      const brands = m.brands.length ? ` [${m.brands.join(", ")}]` : "";
      lines.push(`- ${m.generic}${brands}: score ${m.score}`);
      if (m.alternatives?.length) {
        for (const group of m.alternatives) {
          lines.push(`  Alternatives (${group.label}): ${group.items.join("; ")}`);
        }
      }
    }
  }

  lines.push(
    "",
    "Notes:",
    "- Score ≥3 is associated with increased risk of cognitive impairment, falls, and mortality.",
    "- Dose is not incorporated into the score; higher doses carry greater risk.",
    "- Do not stop medicines abruptly without a clinical plan; taper where appropriate.",
    "- Follow local formulary. This tool is decision support, not a prescribing mandate.",
    "- If a medicine is not listed, treat as score 0.",
  );

  return lines.join("\n");
}
