"use client";

/**
 * §02 — an interactive walk through the per-flow pipeline. Clicking a stage
 * shows a "payload monitor": how the same request actually looks after that
 * stage runs, plus the guarantee that stage adds. Deterministic (SSR-stable).
 */

import { useState } from "react";

const PLAINTEXT = "GET /inbox HTTP/2";

// deterministic byte-ish hex from a string + salt (stable across renders)
function hexBlock(seed: number, n: number) {
  const out: string[] = [];
  let x = (seed * 2654435761) >>> 0;
  for (let i = 0; i < n; i++) {
    x = (x ^ (x << 13)) >>> 0;
    x = (x ^ (x >>> 17)) >>> 0;
    x = (x ^ (x << 5)) >>> 0;
    out.push((x & 0xff).toString(16).padStart(2, "0"));
  }
  return out.join(" ");
}

type Stage = {
  step: string;
  crate: string;
  desc: string;
  guarantee: string;
  monitor: React.ReactNode;
};

const STAGES: Stage[] = [
  {
    step: "Encrypt",
    crate: "neo-crypto",
    desc: "AEAD-seal the flow under PQ-hybrid keys — X25519 + ML-KEM-768, Ed25519-authenticated.",
    guarantee: "Even a quantum “harvest now, decrypt later” adversary keeps only ciphertext.",
    monitor: (
      <>
        <span className="mon__lbl">ciphertext · AEAD</span>
        <code className="mon__hex">{hexBlock(11, 16)}</code>
      </>
    ),
  },
  {
    step: "Slice",
    crate: "neo-slicing",
    desc: "Reed–Solomon k-of-n, encrypt-then-slice, a MAC on every share. Fewer than k shares are useless.",
    guarantee: "Any 3 of 4 rebuild it; fewer than 3 reconstruct nothing at all.",
    monitor: (
      <>
        <span className="mon__lbl">4 shares · any 3 rebuild</span>
        {[0, 1, 2, 3].map((s) => (
          <code className="mon__share" key={s}>
            <b>s{s + 1}</b> {hexBlock(20 + s, 6)}
          </code>
        ))}
      </>
    ),
  },
  {
    step: "Wrap",
    crate: "neo-crypto",
    desc: "Each share becomes a fixed-size Sphinx onion packet: per-hop MACs, replay tags, no size leaks.",
    guarantee: "Every packet is the same length — the wire reveals nothing by size.",
    monitor: (
      <>
        <span className="mon__lbl">fixed-size Sphinx onions · 1024 B each</span>
        {[0, 1, 2, 3].map((s) => (
          <code className="mon__onion" key={s}>
            <b>s{s + 1}</b> ⟦ ⟦ ⟦ {hexBlock(40 + s, 3)} ⟧ ⟧ ⟧
          </code>
        ))}
      </>
    ),
  },
  {
    step: "Route",
    crate: "neo-routing",
    desc: "Each share gets its own node-disjoint path from a commit-then-VRF seed — fresh per request, unbiasable.",
    guarantee: "No two shares share a relay; neither client nor beacon can bias the choice.",
    monitor: (
      <>
        <span className="mon__lbl">node-disjoint paths · VRF-seeded</span>
        {[0, 1, 2, 3].map((s) => (
          <code className="mon__route" key={s}>
            <b>s{s + 1}</b> → {["a41f", "7c02", "9e6b", "d3a8"][s]} ·
            {["b18d", "3f5c", "0a92", "c47e"][s]} · {["e2c9", "88a1", "5d0f", "1b6a"][s]}
          </code>
        ))}
      </>
    ),
  },
  {
    step: "Mix",
    crate: "neo-mix",
    desc: "Per-hop Poisson delays plus cover traffic decorrelate timing against a global passive observer.",
    guarantee: "Output order is decorrelated from input; real packets hide among cover.",
    monitor: (
      <>
        <span className="mon__lbl">Poisson delays + cover traffic</span>
        <code className="mon__mix">
          s1 <b>+18ms</b> · s2 <b>+4ms</b> · s3 <b>+26ms</b> · s4 <b>+11ms</b>
        </code>
        <code className="mon__mix mon__mix--cover">
          + cover ▫ ▫ ▫ (indistinguishable on the wire)
        </code>
      </>
    ),
  },
  {
    step: "Send",
    crate: "neo-transport",
    desc: "Every hop link is an authenticated, key-confirmed PQ session on a DPI-resistant, length-obfuscated transport.",
    guarantee: "To a censor it looks like ordinary QUIC — never a raw, fingerprintable wire.",
    monitor: (
      <>
        <span className="mon__lbl">length-bucketed · camouflaged</span>
        <code className="mon__hex">{hexBlock(70, 20)}</code>
        <code className="mon__mix mon__mix--cover">shape ≈ QUIC / MASQUE datagram</code>
      </>
    ),
  },
];

export default function PipelineStepper() {
  const [active, setActive] = useState(0);
  const cur = STAGES[active];

  return (
    <div className="pipe-x rv">
      <div className="pipe" role="tablist" aria-label="Per-flow pipeline stages">
        {STAGES.map((row, i) => (
          <button
            key={row.step}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`pipe__row ${active === i ? "pipe__row--active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="pipe__no">{String(i + 1).padStart(2, "0")}</span>
            <span className="pipe__step">{row.step}</span>
            <span className="pipe__desc">{row.desc}</span>
          </button>
        ))}
      </div>

      <aside className="pipe__monitor" aria-live="polite">
        <div className="pipe__mon-head">
          <span className="k">payload monitor</span>
          <span className="pipe__mon-step">
            after <b>{cur.step}</b> · {cur.crate}
          </span>
        </div>
        <div className="mon__in">
          <span className="mon__lbl">input · your request</span>
          <code className="mon__plain">{PLAINTEXT}</code>
        </div>
        <div className="mon__arrow">▼</div>
        <div className="mon__out">{cur.monitor}</div>
        <p className="pipe__mon-guarantee">{cur.guarantee}</p>
      </aside>
    </div>
  );
}
