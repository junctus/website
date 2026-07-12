"use client";

/**
 * §04 — the mechanisms as a master-detail explorer: a compact numbered list on
 * the left, the full description of the selected mechanism on the right. Keeps
 * every word of the old card grid but collapses eleven stacked cards into one
 * screen. Keyboard: ↑/↓ (or ←/→) move the selection; the list is a roving
 * tablist. On narrow screens it becomes an accordion.
 */

import { useRef, useState } from "react";
import MechVisual from "@/components/MechVisual";

type Mech = { title: string; desc: string; tag: string; live: boolean };

export default function MechExplorer({ items }: { items: Mech[] }) {
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTo(i: number) {
    const n = ((i % items.length) + items.length) % items.length;
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
      focusTo(items.length - 1);
    }
  }

  const cur = items[active];

  return (
    <div className="mex rv">
      <div
        className="mex__list"
        role="tablist"
        aria-orientation="vertical"
        aria-label="Mechanisms"
      >
        {items.map((m, i) => {
          const selected = i === active;
          return (
            <div key={m.title} className="mex__group">
              <button
                type="button"
                role="tab"
                id={`mex-tab-${i}`}
                aria-selected={selected}
                aria-controls={`mex-panel-${i}`}
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
                <span className="mex__name">{m.title}</span>
                <span
                  className={`mex__dot ${m.live ? "mex__dot--live" : "mex__dot--research"}`}
                  aria-hidden="true"
                />
              </button>
              {/* accordion body — only rendered/visible on narrow screens via CSS */}
              <div
                className="mex__acc"
                id={`mex-acc-${i}`}
                role="region"
                aria-labelledby={`mex-tab-${i}`}
                hidden={!selected}
              >
                <span
                  className={`mex__tag ${m.live ? "mex__tag--live" : "mex__tag--research"}`}
                >
                  {m.tag}
                </span>
                <p>{m.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mex__detail"
        role="tabpanel"
        id={`mex-panel-${active}`}
        aria-labelledby={`mex-tab-${active}`}
      >
        <div className="mex__detail-top">
          <span className="mex__no">{String(active + 1).padStart(2, "0")}</span>
          <span
            className={`mex__tag ${cur.live ? "mex__tag--live" : "mex__tag--research"}`}
          >
            {cur.tag}
          </span>
        </div>
        <h3>{cur.title}</h3>
        <p>{cur.desc}</p>
        <div className="mex__viz">
          <MechVisual index={active} />
        </div>
        <div className="mex__detail-foot">
          <span className="k">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")} mechanisms
          </span>
          <span className="k mex__hint">↑ ↓ browse · click to pin</span>
        </div>
      </div>
    </div>
  );
}
