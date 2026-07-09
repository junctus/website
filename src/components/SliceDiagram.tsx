"use client";

/**
 * Fig. 1 — an interactive model of one request through the overlay.
 *
 * Represents the real system: encrypt → slice k-of-n → each share down its own
 * onion-wrapped, timing-mixed, node-disjoint path over post-quantum links →
 * reassemble ≥ k → one of three exit models. Four things are playable:
 *   1. packets (real + cover) travel the circuit with per-path timing jitter;
 *   2. INSPECT a relay — it holds only a meaningless fragment;
 *   3. COMPROMISE relays — below k distinct shares, colluding nodes learn
 *      nothing; at ≥ k the flow is exposed (the honest limit, shown honestly);
 *   4. SEVER a path — reassembly still succeeds while ≥ k arrive;
 *   5. switch the EXIT MODEL — overlay peer, rotating clearnet, or MPC committee.
 */

import { useState } from "react";

const N = 4;
const K = 3;

const ROWS = [84, 168, 252, 336]; // y of each share path
const RELAY_X = [470, 545, 620]; // three hops per path
const AXIS = 210;
const COMMITTEE_Y = [176, 210, 244];

function sharePath(y: number) {
  return `M250,${AXIS} C312,${AXIS} 350,${y} 455,${y} L635,${y} C740,${y} 708,${AXIS} 770,${AXIS}`;
}

const EXITS = {
  overlay: {
    label: "Overlay",
    end: "NEO PEER",
    box: "PEER REASSEMBLES",
    note: "neo ↔ neo — sliced end to end; no relay ever reassembles; no responsible exit, ever.",
  },
  clearnet: {
    label: "Clearnet",
    end: "EXIT",
    box: "REASSEMBLE ≥ k",
    note: "a fresh rotating exit, per request — responsibility diffused, never eliminated.",
  },
  committee: {
    label: "Committee",
    end: "COMMITTEE",
    box: "REASSEMBLE ≥ k",
    note: "a k-of-n committee holds the request under threshold shares — no member sees the whole.",
  },
} as const;

type ExitMode = keyof typeof EXITS;

// deterministic (SSR-stable) pseudo-hex so a relay always shows the same fragment
function hex4(seed: number) {
  const a = (seed * 2654435761) >>> 0;
  const b = (a ^ (a >>> 15)) >>> 0;
  return (
    a.toString(16).padStart(8, "0").slice(0, 4) +
    " " +
    b.toString(16).padStart(8, "0").slice(4, 8)
  );
}

function relayId(share: number, hop: number) {
  const v = (((share + 1) * 0x9e37 + (hop + 1) * 0x85eb) >>> 0) & 0xffff;
  return v.toString(16).padStart(4, "0");
}

const rk = (s: number, h: number) => `${s}-${h}`;

type Relay = { share: number; hop: number; x: number; y: number };

export default function SliceDiagram() {
  const [severed, setSevered] = useState<Set<number>>(new Set());
  const [compromised, setCompromised] = useState<Set<string>>(new Set());
  const [tapMode, setTapMode] = useState<"inspect" | "attack">("inspect");
  const [exit, setExit] = useState<ExitMode>("clearnet");
  const [sel, setSel] = useState<Relay | null>(null);

  const isActive = (s: number) => !severed.has(s);
  const arrived = N - severed.size;
  const recovered = arrived >= K;

  // confidentiality: colluding relays only break the flow at ≥ k distinct shares
  const liveCompromised = [...compromised].filter((k) =>
    isActive(Number(k.split("-")[0])),
  );
  const sharesSeen = new Set(liveCompromised.map((k) => k.split("-")[0])).size;
  const exposed = sharesSeen >= K;

  function toggleShare(s: number) {
    setSevered((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
    setSel((cur) => (cur && cur.share === s ? null : cur));
  }

  function tapRelay(r: Relay) {
    if (!isActive(r.share)) return;
    if (tapMode === "attack") {
      setCompromised((prev) => {
        const next = new Set(prev);
        const key = rk(r.share, r.hop);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      });
    } else {
      setSel((cur) =>
        cur && cur.share === r.share && cur.hop === r.hop ? null : r,
      );
    }
  }

  function reset() {
    setSevered(new Set());
    setCompromised(new Set());
    setSel(null);
  }

  const packets = (s: number) => {
    const delays = [0, 0.9, 1.7];
    const durs = [2.4, 2.9, 2.6];
    return delays.map((d, i) => ({
      key: `${s}-${i}`,
      delay: d + s * 0.13,
      dur: durs[i],
    }));
  };

  const cfg = EXITS[exit];
  const touched = severed.size > 0 || compromised.size > 0;

  return (
    <div className="fig">
      <div className="diagram-scroll">
        <svg
          viewBox="0 0 1000 420"
          role="img"
          aria-label="Interactive diagram: a flow is encrypted, sliced into four shares, each sent across its own disjoint relay path over post-quantum links, and reassembled from any three. Inspect a relay to see it holds only a fragment; compromise relays to test collusion; sever a path to test recovery; switch the exit model."
        >
          {/* entry: you → slice */}
          <circle className="dg-node" cx={44} cy={AXIS} r={6} />
          <text className="dg-label" x={44} y={AXIS + 26} textAnchor="middle">
            YOU
          </text>
          <path className="dg-line" d={`M52,${AXIS} L118,${AXIS}`} />
          <path className="dg-flow" d={`M52,${AXIS} L118,${AXIS}`} />
          <rect className="pk pk--in" width={7} height={7} rx={1} />

          {/* slice box */}
          <rect className="dg-box" x={118} y={176} width={132} height={68} />
          <text className="dg-label dg-label--box" x={184} y={205} textAnchor="middle">
            ENCRYPT
          </text>
          <text className="dg-label dg-label--box" x={184} y={222} textAnchor="middle">
            SLICE k / n
          </text>

          <text className="dg-label" x={545} y={44} textAnchor="middle">
            DISJOINT PATHS · ONION-WRAPPED · TIMING-MIXED · PQ LINKS
          </text>

          {/* the four share paths */}
          {ROWS.map((y, s) => {
            const d = sharePath(y);
            const active = isActive(s);
            return (
              <g key={s}>
                <path className="dg-line" d={d} />
                <path
                  className={active ? "dg-flow" : "dg-flow dg-flow--off"}
                  d={d}
                />
                {active && (
                  <>
                    {/* cover traffic (outline) — indistinguishable from real */}
                    <rect
                      className="pk pk--cover"
                      width={6}
                      height={6}
                      rx={1}
                      style={{
                        offsetPath: `path("${d}")`,
                        animationDelay: `${0.5 + s * 0.4}s`,
                        animationDuration: "3.4s",
                      }}
                    />
                    {/* real share packets */}
                    {packets(s).map((p) => (
                      <rect
                        key={p.key}
                        className="pk"
                        width={7}
                        height={7}
                        rx={1}
                        style={{
                          offsetPath: `path("${d}")`,
                          animationDelay: `${p.delay}s`,
                          animationDuration: `${p.dur}s`,
                        }}
                      />
                    ))}
                  </>
                )}
                {!active && (
                  <g className="dg-x">
                    <path d={`M539,${y - 6} L551,${y + 6}`} />
                    <path d={`M551,${y - 6} L539,${y + 6}`} />
                  </g>
                )}

                <text
                  className={`dg-label ${active ? "" : "dg-label--dim"}`}
                  x={272}
                  y={y - 10}
                >
                  SHARE {s + 1}
                </text>

                {/* relays */}
                {RELAY_X.map((x, hop) => {
                  const evil = active && compromised.has(rk(s, hop));
                  const selected =
                    !evil &&
                    sel &&
                    sel.share === s &&
                    sel.hop === hop &&
                    active &&
                    tapMode === "inspect";
                  const cls = [
                    "dg-node",
                    "dg-node--relay",
                    active ? "" : "dg-node--off",
                    evil ? "dg-node--evil" : "",
                    selected ? "dg-node--sel" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <g key={hop}>
                      {active && (
                        <circle
                          className="peel"
                          cx={x}
                          cy={y}
                          r={6}
                          style={{ animationDelay: `${(s * 3 + hop) * 0.4}s` }}
                        />
                      )}
                      <g
                        className={active ? "dg-hit" : "dg-hit dg-hit--off"}
                        role="button"
                        tabIndex={active ? 0 : -1}
                        aria-label={`Relay ${relayId(s, hop)} on share ${s + 1}, hop ${hop + 1}`}
                        onClick={() => tapRelay({ share: s, hop, x, y })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            tapRelay({ share: s, hop, x, y });
                          }
                        }}
                      >
                        <circle cx={x} cy={y} r={12} fill="transparent" />
                        <circle className={cls} cx={x} cy={y} r={5} />
                      </g>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* reassemble box */}
          <rect
            className={`dg-box ${recovered ? "" : "dg-box--warn"}`}
            x={770}
            y={176}
            width={132}
            height={68}
          />
          <text
            className={`dg-label dg-label--box ${recovered ? "" : "dg-label--boxwarn"}`}
            x={836}
            y={205}
            textAnchor="middle"
          >
            {cfg.box.split(" ").slice(0, -1).join(" ") || cfg.box}
          </text>
          <text
            className={`dg-label dg-label--box ${recovered ? "" : "dg-label--boxwarn"}`}
            x={836}
            y={222}
            textAnchor="middle"
          >
            {cfg.box.split(" ").slice(-1)}
          </text>
          {ROWS.map((_, s) => (
            <rect
              key={s}
              className={`recv ${isActive(s) ? "recv--on" : ""}`}
              x={794 + s * 14}
              y={230}
              width={9}
              height={4}
            />
          ))}

          {/* exit — depends on the selected model */}
          {exit === "committee" ? (
            <>
              {COMMITTEE_Y.map((cy, i) => (
                <g key={i}>
                  <path className="dg-line" d={`M902,${AXIS} L946,${cy}`} />
                  {recovered && (
                    <path className="dg-flow" d={`M902,${AXIS} L946,${cy}`} />
                  )}
                  {recovered && (
                    <rect
                      className="pk pk--comm"
                      width={6}
                      height={6}
                      rx={1}
                      style={{
                        offsetPath: `path("M902,${AXIS} L946,${cy}")`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: "1.7s",
                      }}
                    />
                  )}
                  <circle
                    className={`dg-node ${recovered ? "dg-node--relay" : "dg-node--off"}`}
                    cx={952}
                    cy={cy}
                    r={5}
                  />
                </g>
              ))}
              <text className="dg-label" x={952} y={AXIS + 62} textAnchor="middle">
                COMMITTEE
              </text>
              <text className="dg-label dg-label--dim" x={952} y={AXIS + 76} textAnchor="middle">
                k-of-n
              </text>
            </>
          ) : (
            <>
              <path className="dg-line" d={`M902,${AXIS} L950,${AXIS}`} />
              {recovered && (
                <>
                  <path className="dg-flow" d={`M902,${AXIS} L950,${AXIS}`} />
                  <rect className="pk pk--out" width={7} height={7} rx={1} />
                </>
              )}
              <circle
                className={`dg-node ${recovered ? "" : "dg-node--off"}`}
                cx={958}
                cy={AXIS}
                r={6}
              />
              <text
                className={`dg-label ${recovered ? "" : "dg-label--dim"}`}
                x={958}
                y={AXIS + 26}
                textAnchor="middle"
              >
                {cfg.end}
              </text>
            </>
          )}
        </svg>
      </div>

      {/* console */}
      <div className="fig__panel">
        <div className="fig__console">
          <div className="fig__group">
            <span className="k">exit model</span>
            <div className="seg" role="group" aria-label="Exit model">
              {(Object.keys(EXITS) as ExitMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  className="seg__btn"
                  aria-pressed={exit === m}
                  onClick={() => setExit(m)}
                >
                  {EXITS[m].label}
                </button>
              ))}
            </div>
            <span className="fig__note">{cfg.note}</span>
          </div>

          <div className="fig__group">
            <span className="k">tapping a relay</span>
            <div className="seg" role="group" aria-label="Relay tap mode">
              <button
                type="button"
                className="seg__btn"
                aria-pressed={tapMode === "inspect"}
                onClick={() => setTapMode("inspect")}
              >
                Inspect
              </button>
              <button
                type="button"
                className="seg__btn seg__btn--danger"
                aria-pressed={tapMode === "attack"}
                onClick={() => setTapMode("attack")}
              >
                Compromise
              </button>
            </div>
          </div>

          <div className="fig__group">
            <span className="k">sever a path</span>
            <div className="fig__chips">
              {ROWS.map((_, s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip ${isActive(s) ? "" : "chip--off"}`}
                  aria-pressed={!isActive(s)}
                  onClick={() => toggleShare(s)}
                >
                  <span className="chip__dot" />
                  Share {s + 1}
                  <span className="chip__act">
                    {isActive(s) ? "sever" : "restore"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fig__readouts">
          <div className={`fig__stat ${recovered ? "" : "fig__stat--warn"}`}>
            <span className="k">availability</span>
            <span className="fig__stat-word">
              {recovered ? "Reconstructed" : "Below threshold"}
            </span>
            <span className="fig__stat-sub">
              {arrived} of {N} shares arrived · need ≥ {K}
            </span>
          </div>
          <div className={`fig__stat ${exposed ? "fig__stat--danger" : ""}`}>
            <span className="k">confidentiality</span>
            <span className="fig__stat-word">
              {exposed ? "Flow exposed" : "Learns nothing"}
            </span>
            <span className="fig__stat-sub">
              {liveCompromised.length === 0
                ? "no relay compromised"
                : `adversary controls ${sharesSeen} of ${K} shares needed`}
            </span>
          </div>
        </div>
      </div>

      {/* context readout */}
      <div
        className={`fig__inspect ${sel && tapMode === "inspect" ? "is-on" : ""} ${exposed ? "is-danger" : ""}`}
        aria-live="polite"
      >
        {tapMode === "attack" ? (
          <span className="fig__inspect-line">
            {liveCompromised.length === 0 ? (
              <>
                <span className="k k--danger">attack mode</span> — tap relays to
                collude. Each holds one onion layer of one share; the adversary
                only breaks the flow by controlling relays on ≥ {K} different
                shares.
              </>
            ) : exposed ? (
              <>
                <span className="k k--danger">exposed</span> — colluding relays
                now span {sharesSeen} of {N} shares (≥ {K}). This one request
                degrades: the honest limit we never hide.
              </>
            ) : (
              <>
                <span className="k k--accent">still private</span> — {sharesSeen}{" "}
                of {N} shares seen, below the threshold of {K}. Fewer than{" "}
                {K} shares reconstruct nothing — the colluding set holds only
                meaningless fragments.
              </>
            )}
          </span>
        ) : sel ? (
          <>
            <span className="k k--accent">relay {relayId(sel.share, sel.hop)}</span>
            <span className="fig__inspect-line">
              holds <b>share {sel.share + 1}</b>, onion layer{" "}
              <b>{sel.hop + 1}/3</b> — sees{" "}
              <code>{hex4(sel.share * 7 + sel.hop * 31 + 3)}</code>, one fragment
              of one share, over a post-quantum key-confirmed link. Knows the
              next hop only; cannot read the payload or peel a deeper layer.
            </span>
          </>
        ) : (
          <span className="fig__inspect-hint">
            ▶ tap any relay — confirm it holds only a meaningless fragment.
            Switch to Compromise to collude, or sever a path to test recovery.
          </span>
        )}
      </div>

      <div className="fig__legend">
        <span className="fig__leg">
          <i className="fig__leg-real" /> your data
        </span>
        <span className="fig__leg">
          <i className="fig__leg-cover" /> cover traffic
        </span>
        <span className="fig__leg">
          <i className="fig__leg-relay" /> relay
        </span>
        <span className="fig__leg">
          <i className="fig__leg-evil" /> compromised
        </span>
        {touched && (
          <button type="button" className="fig__reset" onClick={reset}>
            reset
          </button>
        )}
      </div>
    </div>
  );
}
