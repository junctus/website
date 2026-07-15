"use client";

import { useState } from "react";

type Level = "off" | "balanced" | "paranoid";

const LEVELS: Record<
  Level,
  {
    label: string;
    quote: string;
    mixing: string;
    cover: string;
    exit: string;
    observer: string;
    latency: number;
    latencyNote: string;
  }
> = {
  off: {
    label: "Off",
    quote: "No mixing or cover traffic — fastest, weakest privacy. Development only.",
    mixing: "None — packets forward immediately",
    cover: "None",
    exit: "Fresh per-request exit",
    observer: "Timing correlatable",
    latency: 12,
    latencyNote: "overlay RTT only",
  },
  balanced: {
    label: "Balanced",
    quote: "A sane default: moderate mixing and cover traffic.",
    mixing: "Moderate Poisson per-hop delays",
    cover: "Moderate, blended with real flows",
    exit: "Fresh rotating exit per request",
    observer: "Timing decorrelated",
    latency: 45,
    latencyNote: "a deliberate tax",
  },
  paranoid: {
    label: "Paranoid",
    quote: "Maximum anonymity: heavy cover traffic, deep mixing, committee exits.",
    mixing: "Deep per-hop mixing",
    cover: "Heavy, near constant-rate",
    exit: "k-of-n threshold committee — no member can read the response",
    observer: "Decorrelated · ZK shuffle proofs built, live wiring ahead",
    latency: 85,
    latencyNote: "heavy — by design",
  },
};

const ORDER: Level[] = ["off", "balanced", "paranoid"];

export default function Dial() {
  const [level, setLevel] = useState<Level>("balanced");
  const active = LEVELS[level];

  return (
    <div className="dial rv">
      <div className="dial__left">
        <span className="k">config · privacy_level</span>
        <div className="dial__opts" role="group" aria-label="Privacy level">
          {ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className="dial__opt"
              aria-pressed={level === key}
              onClick={() => setLevel(key)}
            >
              {LEVELS[key].label}
              {key === "balanced" && (
                <span className="dial__opt-default">default</span>
              )}
            </button>
          ))}
        </div>
        <p className="dial__trilemma">
          The anonymity trilemma: strong anonymity, low latency, low overhead —
          pick two. The dial decides which two. There is no fourth option, here
          or anywhere.
        </p>
      </div>

      <div className="dial__right">
        <p className="dial__quote">“{active.quote}”</p>
        <dl className="dial__rows">
          <div className="dial__row">
            <dt>Timing mixing</dt>
            <dd>{active.mixing}</dd>
          </div>
          <div className="dial__row">
            <dt>Cover traffic</dt>
            <dd>{active.cover}</dd>
          </div>
          <div className="dial__row">
            <dt>Clearnet exit</dt>
            <dd>{active.exit}</dd>
          </div>
          <div className="dial__row">
            <dt>Global observer</dt>
            <dd>{active.observer}</dd>
          </div>
          <div className="dial__row">
            <dt>Latency cost</dt>
            <dd className="meter">
              <span className="meter__track">
                <span
                  className="meter__fill"
                  style={{ width: `${active.latency}%` }}
                />
              </span>
              <span className="meter__val">{active.latencyNote}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
