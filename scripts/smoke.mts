import assert from "node:assert/strict";
import { getRiskBand, rankByContribution, totalScore } from "../src/lib/scoring";
import { searchMedicines } from "../src/lib/search";
import { medicines } from "../src/lib/medicines";
import { formatClinicNotes } from "../src/lib/notes";

const amitriptyline = medicines.find((m) => m.id === "amitriptyline");
const oxybutynin = medicines.find((m) => m.id === "oxybutynin");
const chlorphenamine = medicines.find((m) => m.id === "chlorphenamine");
const mirabegron = medicines.find((m) => m.id === "mirabegron");

assert.ok(amitriptyline && oxybutynin && chlorphenamine && mirabegron);

const regimen = [amitriptyline, oxybutynin, chlorphenamine];
assert.equal(totalScore(regimen), 9);
assert.equal(getRiskBand(9).id, "high");
assert.equal(getRiskBand(4).id, "moderate");
assert.equal(getRiskBand(1).id, "low");

const ranked = rankByContribution(regimen);
assert.equal(ranked[0].score, 3);

const hits = searchMedicines(medicines, "elavil");
assert.ok(hits.some((m) => m.id === "amitriptyline"));

assert.ok(oxybutynin.alternatives && oxybutynin.alternatives.length > 0);
assert.equal(mirabegron.score, 0);

const notes = formatClinicNotes(regimen, "jd");
assert.match(notes, /Total ACB score: 9/);
assert.match(notes, /Patient initials: JD/);

console.log("Smoke tests passed.");
