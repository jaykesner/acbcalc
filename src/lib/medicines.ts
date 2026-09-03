import dataset from "../../data/medicines.v1.json";
import type { MedicinesDataset } from "./types";

export const medicinesDataset = dataset as MedicinesDataset;

export const medicines = medicinesDataset.medicines;
export const medicinesUpdatedAt = medicinesDataset.updatedAt;
export const methodologyBlurb = medicinesDataset.methodology;
