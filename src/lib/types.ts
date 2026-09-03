export type AlternativeGroup = {
  label: string;
  items: string[];
};

export type Medicine = {
  id: string;
  generic: string;
  brands: string[];
  score: number;
  acbScore?: number;
  gabsScore?: number;
  class?: string;
  alternatives?: AlternativeGroup[];
};

export type MedicinesDataset = {
  version: string;
  updatedAt: string;
  methodology: string;
  medicines: Medicine[];
};

export type RiskBandId = "low" | "moderate" | "high";

export type RiskBand = {
  id: RiskBandId;
  label: string;
  rangeLabel: string;
  guidance: string;
};

export const CLASS_LABELS: Record<string, string> = {
  antidepressants: "Antidepressants",
  urinary_incontinence: "Urinary incontinence",
  nausea_vomiting: "Nausea and vomiting",
  antihistamines: "Antihistamines",
  antipsychotics: "Antipsychotics",
  antiparkinson: "Antiparkinson agents",
  antispasmodics: "Antispasmodics",
  muscle_relaxants: "Muscle relaxants",
  benzodiazepines: "Benzodiazepines",
  analgesics: "Analgesics",
  cardiovascular: "Cardiovascular",
  corticosteroids: "Corticosteroids",
  respiratory: "Respiratory",
};
