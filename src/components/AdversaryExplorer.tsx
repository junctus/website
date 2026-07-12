"use client";

/**
 * §05 — the threat model as a master-detail explorer, mirroring MechExplorer:
 * a compact list of adversaries on the left, and for the selected one its
 * capability / defense / honest-limit fields plus an animated scene on the
 * right. Reuses the `.mex` layout classes; adds `.adv-*` for the three fields.
 * Keyboard: ↑/↓ (or ←/→) move the selection; narrow screens become an accordion.
 */

import { useRef, useState } from "react";
import AdversaryVisual from "@/components/AdversaryVisual";

type Threat = { who: string; can: string; answer: string; limit: string };

function Fields({ t }: { t: Threat }) {
  return (
    <dl className="adv-fields">
      <div className="adv-field">
        <dt className="k adv-field__k--bad">They can</dt>
        <dd>{t.can}</dd>
      </div>
      <div className="adv-field">
        <dt className="k adv-field__k--good">Junctus does</dt>
        <dd>{t.answer}</dd>
      </div>
      <div className="adv-field">
        <dt className="k adv-field__k--warn">The honest limit</dt>
        <dd>{t.limit}</dd>
      </div>
    </dl>
  );
}

export default function AdversaryExplorer({ items }: { items: Threat[] }) {
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
        aria-label="Adversaries"
      >
        {items.map((t, i) => {
          const selected = i === active;
          return (
            <div key={t.who} className="mex__group">
              <button
                type="button"
                role="tab"
                id={`adv-tab-${i}`}
                aria-selected={selected}
                aria-controls={`adv-panel-${i}`}
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
                <span className="mex__name">{t.who}</span>
                <span
                  className="mex__dot mex__dot--research"
                  aria-hidden="true"
                />
              </button>
              <div
                className="mex__acc"
                role="region"
                aria-labelledby={`adv-tab-${i}`}
                hidden={!selected}
              >
                <Fields t={t} />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mex__detail"
        role="tabpanel"
        id={`adv-panel-${active}`}
        aria-labelledby={`adv-tab-${active}`}
      >
        <div className="mex__detail-top">
          <span className="mex__no">{String(active + 1).padStart(2, "0")}</span>
          <span className="mex__tag mex__tag--threat">adversary</span>
        </div>
        <h3>{cur.who}</h3>
        <Fields t={cur} />
        <div className="mex__viz">
          <AdversaryVisual index={active} />
        </div>
        <div className="mex__detail-foot">
          <span className="k">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")} adversaries
          </span>
          <span className="k mex__hint">↑ ↓ browse · click to pin</span>
        </div>
      </div>
    </div>
  );
}
