"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Medicine } from "@/lib/types";
import { searchMedicines } from "@/lib/search";

type Props = {
  medicines: Medicine[];
  selectedIds: Set<string>;
  onAdd: (medicine: Medicine) => void;
};

export function MedicineSearch({ medicines, selectedIds, onAdd }: Props) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchMedicines(medicines, query, 10).filter(
    (m) => !selectedIds.has(m.id),
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function choose(medicine: Medicine) {
    onAdd(medicine);
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (event.key === "ArrowDown" || event.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const pick = results[activeIndex];
      if (pick) choose(pick);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor="medicine-search" className="mb-2 block text-sm font-semibold text-[var(--ink)]">
        Add medicine
      </label>
      <input
        ref={inputRef}
        id="medicine-search"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined}
        autoComplete="off"
        placeholder="Search generic or brand name…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-[1.05rem] outline-none ring-[var(--accent)] placeholder:text-[var(--ink-muted)] focus:ring-2"
      />
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        If a medicine is not listed, treat it as score 0. Type to search; arrow keys and Enter to add.
      </p>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-[var(--line)] bg-white py-1 shadow-[var(--shadow)]"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-[var(--ink-muted)]">
              No matches. Unlisted medicines can be assumed to score 0.
            </li>
          ) : (
            results.map((medicine, index) => (
              <li key={medicine.id} role="option" aria-selected={index === activeIndex} id={`${listId}-${medicine.id}`}>
                <button
                  type="button"
                  className={`flex w-full items-start justify-between gap-3 px-4 py-2.5 text-left ${
                    index === activeIndex ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--bg)]"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(medicine)}
                >
                  <span>
                    <span className="block font-semibold">{medicine.generic}</span>
                    {medicine.brands.length > 0 && (
                      <span className="text-sm text-[var(--ink-muted)]">
                        {medicine.brands.slice(0, 3).join(", ")}
                        {medicine.brands.length > 3 ? "…" : ""}
                      </span>
                    )}
                  </span>
                  <span className="score-pill shrink-0 bg-[var(--accent-soft)] text-[var(--accent)]">
                    {medicine.score}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
