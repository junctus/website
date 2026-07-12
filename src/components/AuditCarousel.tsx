"use client";

/**
 * §05 — the security-review cases as one sliding row: native scroll-snap
 * (drag / trackpad / touch) plus prev-next controls and dot indicators.
 */

import { useEffect, useRef, useState } from "react";

const CASES = [
  {
    sev: "was critical",
    title: "The tagging attack",
    body: "The onion payload carried no integrity check at any layer, so a malicious first relay could imprint a bit-pattern and a colluding exit could read it back — defeating the unlinkability the mixnet exists to provide. The payload is now an exit-verified wide-block cipher: any en-route tamper avalanches the entire block and is rejected — a corrupted packet cannot carry a message.",
  },
  {
    sev: "was critical",
    title: "The key-free forgery",
    body: "Feeding the protocol a degenerate curve point collapsed every node’s per-hop keys to a public constant — anyone could forge a packet a victim would accept, with no key at all. The identity point is now rejected outright, with a regression test standing guard.",
  },
  {
    sev: "was high",
    title: "The costly hello",
    body: "A replayed handshake opener forced the responder into an expensive post-quantum computation every time — a free denial-of-service. The handshake now demands a stateless retry cookie and key confirmation: a replay costs the attacker a round-trip and the responder only a MAC, and no session exists until the initiator proves its key.",
  },
  {
    sev: "was critical",
    title: "The infinite mint",
    body: "Found in the second review: a single validly-signed relay receipt could claim an astronomical byte count and mint trillions of bandwidth credits in one call — defeating the whole proof-of-relay economy. Receipts are now capped per claim, and the honest residual (a colluding pair can still forge many capped receipts) is documented rather than papered over.",
  },
  {
    sev: "was critical",
    title: "The counterfeit capability",
    body: "Third round: the probe-resistant transport ran Diffie–Hellman on whatever ephemeral point a stranger sent — including degenerate points that collapse the shared secret to a public constant. A censor could forge the authenticated flight with no capability at all, proven with a working exploit against the shipped code. Degenerate points now silently take the decoy path, a replay cache swallows captured flights, and the hello no longer has a fixed length to fingerprint.",
  },
  {
    sev: "was critical",
    title: "The mint wired to nothing",
    body: "The credit issuer would blind-sign for anyone who asked: issuance never consulted the earning ledger, so unlimited spendable credits could be minted at zero bandwidth — voiding the economy’s anti-Sybil premise. Issuance now atomically consumes proven, receipt-backed earnings; receipts expire; and double-spend logs are scoped to key epochs, so a rotation or redeploy cannot resurrect old serials.",
  },
  {
    sev: "was high",
    title: "The give-away silence",
    body: "Cover packets left the mixer at one constant size while real frames varied — so a passive observer could split cover from real by length alone, quietly voiding half the cover-traffic defense. Every frame now travels as a fixed-size cell, length-identical on the wire, with the true length sealed inside the encryption.",
  },
  {
    sev: "was critical",
    title: "The address in disguise",
    body: "Fourth round, whole-codebase sweep: the SSRF guard that keeps exits and dial-backs off internal networks classified IPv6 correctly but missed IPv4-mapped addresses, so a target like [::ffff:169.254.169.254] — cloud metadata — read as a public address and was allowed. The IPv6 branch now recurses on the mapped IPv4 form, and mapped loopback, RFC1918, and metadata ranges are all covered by tests.",
  },
  {
    sev: "was critical",
    title: "The counter that wraps",
    body: "Each circuit cell is XOR-encrypted under a keystream keyed by its sequence number, incremented with an unchecked add. On a 64-bit wrap the keystream would repeat, and an observer could XOR two cells to recover plaintext — unreachable in practice, but a guarantee that was merely conditional. All six increment sites now use a checked add and abort on overflow, so the one-time property is unconditional.",
  },
];

export default function AuditCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function step() {
    const el = ref.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>(".audit__case");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return card ? card.offsetWidth + gap : el.clientWidth;
  }

  function sync() {
    const el = ref.current;
    if (!el) return;
    setIdx(Math.round(el.scrollLeft / (step() || 1)));
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }

  useEffect(() => {
    sync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(i: number) {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(CASES.length - 1, i));
    el.scrollTo({ left: clamped * step(), behavior: "smooth" });
  }

  return (
    <div className="acar">
      <div
        className="acar__viewport"
        ref={ref}
        onScroll={sync}
        tabIndex={0}
        role="group"
        aria-label="Security review cases"
      >
        {CASES.map((c) => (
          <article className="audit__case" key={c.title}>
            <div className="mech__top">
              <span className="mech__tag mech__tag--research">{c.sev}</span>
              <span className="mech__tag mech__tag--live">fixed</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </article>
        ))}
      </div>

      <div className="acar__bar">
        <div className="acar__dots" role="tablist" aria-label="Select case">
          {CASES.map((c, i) => (
            <button
              key={c.title}
              type="button"
              className={`acar__dot ${i === idx ? "acar__dot--on" : ""}`}
              aria-label={`Go to ${c.title}`}
              aria-selected={i === idx}
              role="tab"
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="acar__nav">
          <span className="acar__count">
            {String(idx + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="acar__btn"
            aria-label="Previous case"
            disabled={atStart}
            onClick={() => go(idx - 1)}
          >
            ←
          </button>
          <button
            type="button"
            className="acar__btn"
            aria-label="Next case"
            disabled={atEnd}
            onClick={() => go(idx + 1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
