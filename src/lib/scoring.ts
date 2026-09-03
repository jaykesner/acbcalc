import type { Medicine, RiskBand, RiskBandId } from "./types";

export function totalScore(medicines: Medicine[]): number {
  return medicines.reduce((sum, m) => sum + m.score, 0);
}

export function rankByContribution(medicines: Medicine[]): Medicine[] {
  return [...medicines].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.generic.localeCompare(b.generic);
  });
}

export function getRiskBand(score: number): RiskBand {
  if (score >= 6) {
    return {
      id: "high",
      label: "High burden",
      rangeLabel: "≥6",
      guidance:
        "Prioritise systematic deprescribing. Identify the highest-scoring agents, involve pharmacy where available, and consider specialist input.",
    };
  }
  if (score >= 3) {
    return {
      id: "moderate",
      label: "Moderate burden",
      rangeLabel: "3–5",
      guidance:
        "Clinically significant anticholinergic burden. Review highest-scoring medicines and consider lower-burden alternatives where appropriate.",
    };
  }
  return {
    id: "low",
    label: "Low burden",
    rangeLabel: "0–2",
    guidance:
      "No immediate action required based on score alone. Maintain awareness if new anticholinergic medicines are added.",
  };
}

export function usedHigherOfScales(medicine: Medicine): boolean {
  if (medicine.acbScore == null || medicine.gabsScore == null) return false;
  return medicine.acbScore !== medicine.gabsScore;
}

export function bandAccent(id: RiskBandId): string {
  switch (id) {
    case "high":
      return "var(--band-high)";
    case "moderate":
      return "var(--band-moderate)";
    default:
      return "var(--band-low)";
  }
}
