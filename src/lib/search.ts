import type { Medicine } from "./types";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreMatch(query: string, medicine: Medicine): number {
  const q = normalize(query);
  if (!q) return 0;

  const generic = normalize(medicine.generic);
  const brands = medicine.brands.map(normalize);
  const haystacks = [generic, ...brands];

  let best = 0;
  for (const h of haystacks) {
    if (h === q) best = Math.max(best, 100);
    else if (h.startsWith(q)) best = Math.max(best, 80);
    else if (h.includes(q)) best = Math.max(best, 60);
    else {
      const tokens = q.split(" ");
      if (tokens.every((t) => h.includes(t))) best = Math.max(best, 50);
    }
  }

  // Prefer scored (≥1) medicines slightly when match quality is equal
  if (best > 0 && medicine.score >= 1) best += 5;
  return best;
}

export function searchMedicines(
  medicines: Medicine[],
  query: string,
  limit = 12,
): Medicine[] {
  const q = query.trim();
  if (!q) {
    return medicines
      .filter((m) => m.score >= 1)
      .slice()
      .sort((a, b) => a.generic.localeCompare(b.generic))
      .slice(0, limit);
  }

  return medicines
    .map((m) => ({ m, s: scoreMatch(q, m) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => {
      if (b.s !== a.s) return b.s - a.s;
      if (b.m.score !== a.m.score) return b.m.score - a.m.score;
      return a.m.generic.localeCompare(b.m.generic);
    })
    .slice(0, limit)
    .map((x) => x.m);
}
