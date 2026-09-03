# ACB Calculator

Clinician-facing rebuild of the anticholinergic burden calculator: typeahead regimen building, ranked score contributions, inline deprescribing alternatives, scale transparency, and printable clinic summaries.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data

Medicine scores live in [`data/medicines.v1.json`](data/medicines.v1.json). Combined ACB + GABS methodology; higher score used when scales disagree. No patient data is stored.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
