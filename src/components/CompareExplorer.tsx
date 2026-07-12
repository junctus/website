"use client";

/**
 * §02 — the comparison as a master-detail explorer, mirroring MechExplorer /
 * AdversaryExplorer: a list of comparison dimensions on the left, and for the
 * selected dimension all four contenders shown together — each with its cell
 * text and a three-segment strength bar. The bars are editorial but honest:
 * Junctus is not the winner of every row, and the list dot for each dimension
 * takes Junctus's own colour (green strong / amber partial / red weak) so the
 * rows it loses are visible at a glance. Reuses the `.mex` layout; `.cmpx-*`
 * styles the four-way breakdown. Keyboard: ↑/↓ (or ←/→) move the selection.
 */

import { useRef, useState } from "react";

type Cell = { t: string; r: number };
type Row = { dim: string; cells: Cell[] };
type Data = { solutions: string[]; rows: Row[] };

function dotClass(r: number) {
  return r >= 3
    ? "mex__dot--live"
    : r === 2
      ? "mex__dot--research"
      : "mex__dot--bad";
}

function Bars({ r, us }: { r: number; us: boolean }) {
  return (
    <span className="cmpx__bar" role="img" aria-label={`strength ${r} of 3`}>
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          className={`cmpx__seg ${
            i < r ? (us ? "cmpx__seg--us" : "cmpx__seg--on") : ""
          }`}
          style={{ animationDelay: `${i * 0.09}s` }}
        />
      ))}
    </span>
  );
}

function Breakdown({ row, solutions }: { row: Row; solutions: string[] }) {
  const max = Math.max(...row.cells.map((c) => c.r));
  return (
    <div className="cmpx__rows" key={row.dim}>
      {row.cells.map((c, i) => {
        const us = i === 0;
        const win = c.r === max && max >= 2;
        return (
          <div key={i} className={`cmpx__row ${us ? "cmpx__row--us" : ""}`}>
            <div className="cmpx__head">
              <span className="cmpx__name">{solutions[i]}</span>
              <Bars r={c.r} us={us} />
              {win && <span className="cmpx__win">strongest</span>}
            </div>
            <p className="cmpx__cell">{c.t}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function CompareExplorer({ data }: { data: Data }) {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rows = data.rows;

  function focusTo(i: number) {
    const n = ((i % rows.length) + rows.length) % rows.length;
    setActive(n);
    btnRefs.current[n]?.focus();
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      focusTo(i + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      focusTo(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTo(rows.length - 1);
    }
  }

  const cur = rows[active];

  return (
    <div className="mex rv">
      <div
        className="mex__list"
        role="tablist"
        aria-orientation="vertical"
        aria-label="Comparison dimensions"
      >
        {rows.map((row, i) => {
          const selected = i === active;
          return (
            <div key={row.dim} className="mex__group">
              <button
                type="button"
                role="tab"
                id={`cmp-tab-${i}`}
                aria-selected={selected}
                aria-controls={`cmp-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                className={`mex__row ${selected ? "mex__row--on" : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="mex__no">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mex__name">{row.dim}</span>
                <span
                  className={`mex__dot ${dotClass(row.cells[0].r)}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="mex__acc"
                role="region"
                aria-labelledby={`cmp-tab-${i}`}
                hidden={!selected}
              >
                <Breakdown row={row} solutions={data.solutions} />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mex__detail"
        role="tabpanel"
        id={`cmp-panel-${active}`}
        aria-labelledby={`cmp-tab-${active}`}
      >
        <div className="mex__detail-top">
          <span className="mex__no">{String(active + 1).padStart(2, "0")}</span>
          <span className="mex__tag mex__tag--cmp">dimension</span>
        </div>
        <h3>{cur.dim}</h3>
        <Breakdown row={cur} solutions={data.solutions} />
        <div className="mex__detail-foot">
          <span className="k">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(rows.length).padStart(2, "0")} dimensions
          </span>
          <span className="k mex__hint">↑ ↓ browse · click to pin</span>
        </div>
      </div>
    </div>
  );
}
