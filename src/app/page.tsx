import AuditCarousel from "@/components/AuditCarousel";
import Dial from "@/components/Dial";
import PipelineStepper from "@/components/PipelineStepper";
import SliceDiagram from "@/components/SliceDiagram";

const REPO = "https://github.com/junctus/neo";

/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a className="nav__mark" href="#top">
          Junctus <span className="k">· an anonymity layer</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          <a href="#pipeline">How it works</a>
          <a href="#adversaries">Adversaries</a>
          <a href="#security">Security</a>
          <a href="#limits">Limits</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#platforms">Platforms</a>
        </nav>
        <a className="nav__cta" href={REPO}>
          View on GitHub
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <p className="hero__kicker k k--accent">
          ~/junctus — an open-source, post-quantum anonymity layer
        </p>
        <h1>
          An anonymity layer: no node holds{" "}
          <span className="it">the whole.</span>
        </h1>
        <p className="hero__sub">
          Junctus encrypts each flow, slices it into <em>k</em>-of-<em>n</em>{" "}
          shares, and sends every share down its own onion-wrapped,
          timing-mixed path. Any single relay — any group smaller than{" "}
          <em>k</em> — only ever sees a meaningless fragment.
        </p>
        <div className="hero__actions">
          <a className="btn btn--solid" href={REPO}>
            View on GitHub
          </a>
          <a className="btn btn--ghost" href="#adversaries">
            Read the threat model ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function HeroFigure() {
  return (
    <section
      className="hero-fig"
      aria-label="Figure 1 — one request through the overlay"
    >
      <div className="wrap">
        <div className="hero__diagram">
          <span className="k">
            Fig. 1 — one request through the overlay (n = 4, k = 3)
          </span>
          <SliceDiagram />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true">
      <path
        fill="currentColor"
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </svg>
  );
}

function UbuntuLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <mask id="cof-mask">
        <rect width="24" height="24" fill="white" />
        <circle cx="12" cy="4" r="4.2" fill="black" />
        <circle cx="18.93" cy="16" r="4.2" fill="black" />
        <circle cx="5.07" cy="16" r="4.2" fill="black" />
      </mask>
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        mask="url(#cof-mask)"
      />
      <circle cx="12" cy="4" r="2.4" fill="currentColor" />
      <circle cx="18.93" cy="16" r="2.4" fill="currentColor" />
      <circle cx="5.07" cy="16" r="2.4" fill="currentColor" />
    </svg>
  );
}

function AndroidLogo() {
  return (
    <svg viewBox="0 0 576 512" aria-hidden="true">
      <path
        fill="currentColor"
        d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"
      />
    </svg>
  );
}

const DOWNLOADS: { os: string; icon: React.ReactNode }[] = [
  { os: "macOS", icon: <AppleLogo /> },
  { os: "Ubuntu", icon: <UbuntuLogo /> },
  { os: "Android", icon: <AndroidLogo /> },
  { os: "iPhone", icon: <AppleLogo /> },
];

function Downloads() {
  return (
    <section className="dl" aria-label="Downloads">
      <div className="wrap dl__inner">
        <div className="dl__label">
          <span className="k">Get Started</span>
        </div>
        {DOWNLOADS.map((d) => (
          <div className="dl__item" key={d.os} aria-disabled="true">
            <span className="dl__row">
              <span className="dl__id">
                {d.icon}
                <span className="dl__os">{d.os}</span>
              </span>
              <span className="dl__tag">soon</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function SectionHead({
  no,
  title,
  intro,
}: {
  no: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <div className="section__head rv">
      <span className="section__no">§ {no}</span>
      <h2 className="section__title">{title}</h2>
      {intro && <p className="section__intro">{intro}</p>}
    </div>
  );
}

function Thesis() {
  return (
    <section className="section" id="thesis">
      <div className="wrap">
        <SectionHead
          no="01"
          title={
            <>
              Trust <span className="it">less</span> than Tor.
            </>
          }
        />
        <div className="thesis rv">
          <div className="thesis__body">
            <p>
              A classic VPN asks you to trust one company. Onion routing asks
              you to trust that a handful of relays never collude. Junctus is
              built so there is{" "}
              <span className="mark">nothing worth seizing</span>: a flow is
              encrypted, sliced into <em>n</em> shares of which any <em>k</em>{" "}
              reconstruct it — and the shares never travel together.
            </p>
            <p>
              Every request gets a fresh route and a fresh exit. Timing is
              mixed against a global observer. Handshakes and onion packets are
              post-quantum from day one — recorded traffic stays sealed even
              against a future quantum adversary. The network runs end to end, from zero-config discovery
              to live multi-hop circuits whose responses no middle relay can
              read.
            </p>
            <p>
              Where the overlay must touch the open web, responsibility is
              diffused — rotated per request, and split across a threshold
              committee so that no minority of members learns anything at all.
              The engine is <em>neo</em>, one open Rust core shared by every
              platform. The claims are tested, the limits are documented, and
              nothing here asks for your trust where a proof — or an honest
              caveat — will do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pipeline() {
  return (
    <section className="section" id="pipeline">
      <div className="wrap">
        <SectionHead
          no="02"
          title={
            <>
              Six verbs per flow<span className="it">, in order.</span>
            </>
          }
          intro="This is the entire per-flow pipeline, exactly as it runs in the engine. Reassembly is the reverse: collect at least k authentic shares, decode, decrypt."
        />
        <PipelineStepper />
        <p className="pipe__note rv">
          Discovery — a Kademlia DHT over libp2p, hardened with self-certifying
          signed records and witnessed snapshots, bootstrapped through signed
          DNS-over-HTTPS records — only ever <em>finds</em> peers. It never
          carries user data, and it always runs behind the obfuscating
          transport.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const MECHS: {
  title: string;
  desc: string;
  tag: string;
  live: boolean;
}[] = [
  {
    title: "Information slicing",
    desc: "The core mechanism. Flows are encrypted, then split k-of-n across mutually disjoint multi-hop paths. Colluding relays below the threshold learn nothing, and a corrupted share is detected, attributed, and routed around — properties asserted by tests, not prose.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Live circuits & tunnels",
    desc: "Sphinx onions travel sockets between separate processes, and a circuit stays open to carry a real TCP byte stream both ways, onion-layered per cell. Only the exit sees the payload; tampering, replay, or reordering anywhere is caught at the endpoint; and no middle relay can read the response.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Fresh route + exit, per request",
    desc: "No two requests share a full path; concurrent routes share no hop — not even the exit; exits rotate and never immediately repeat. There is no stable circuit to watch.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Mixnet timing defense",
    desc: "Exponential per-packet delays and Poisson cover traffic, scaled by the privacy dial — and since the third review, cover and real frames travel as length-identical fixed-size cells, so an observer watching every link at once cannot split them apart.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Post-quantum from day one",
    desc: "Hybrid X25519 + ML-KEM-768 key-confirmed handshakes and Sphinx onion packets, Ed25519-signed identities. “Harvest now, decrypt later” harvests ciphertext that stays ciphertext.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Self-certifying discovery",
    desc: "Signed peer records whose id must equal the hash of their keys; witness-signed relay snapshots any untrusted mirror can serve; a DHT clients never appear in — bootstrapped over signed DNS-over-HTTPS records that rotate without a client rebuild.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Verifiable routing",
    desc: "A commit-then-VRF handshake: the client commits before seeing any randomness, and the beacon’s VRF has exactly one possible output — so neither side can bias the path, and anyone can verify the result. Aborting and retrying buys no bias either: commitments are bound to an epoch and a counter.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Anonymous bandwidth credits",
    desc: "Privacy-Pass-style VOPRF tokens: the issuer blind-signs a serial it never sees, so earning and spending cannot be linked. Issuance is gated on proven, receipt-backed relay work; receipts are capped and expire; and double-spend logs are epoch-scoped so a key rotation cannot resurrect old serials.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Committee exit",
    desc: "The flagship, and it now runs: a real two-party MPC-TLS stack computes the whole ChaCha20-Poly1305 record and SHA-256 key schedule under 2PC — oblivious-transfer extension, garbled circuits verified against their KATs — so the record key, keystream, and plaintext are never assembled at any one party. Today’s gadgets are honest-but-curious by design; malicious-secure garbling and live wiring to a real socket are the remaining, scoped steps.",
    tag: "core shipped",
    live: false,
  },
  {
    title: "Verifiable privacy",
    desc: "Two-server PIR fetches a relay by node id without either server learning which. A zero-knowledge shuffle argument lets a mix prove it permuted honestly without revealing the permutation — binding it into the live mix is the step ahead.",
    tag: "shipped",
    live: true,
  },
];

function Mechanisms() {
  return (
    <section className="section" id="mechanisms">
      <div className="wrap">
        <SectionHead
          no="03"
          title={
            <>
              The mechanisms<span className="it">, honestly labeled.</span>
            </>
          }
          intro="All ten have running, tested code — including the four that were research-grade a season ago. Where a hard boundary remains, the card says so, because a roadmap is not a feature."
        />
        <div className="mechs rv">
          {MECHS.map((m, i) => (
            <article className="mech" key={m.title}>
              <div className="mech__top">
                <span className="mech__no">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mech__tag ${
                    m.live ? "mech__tag--live" : "mech__tag--research"
                  }`}
                >
                  {m.tag}
                </span>
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const THREATS = [
  {
    who: "Your ISP",
    can: "Sees your link, runs deep packet inspection",
    answer: "Everything encrypted; the transport mimics mainstream TLS/QUIC",
    limit: "Traffic volume is still observable",
  },
  {
    who: "An on-path censor",
    can: "Blocks by IP, SNI, or protocol; probes actively",
    answer:
      "Signed DoH rendezvous, an obfuscation ladder, and a REALITY-style authenticated flight — a prober only ever sees a decoy",
    limit: "Camouflage mimics QUIC/WebRTC shape, not yet their full protocol crypto",
  },
  {
    who: "Colluding relays",
    can: "Run several nodes on your path",
    answer: "k-of-n slicing — fewer than k shares reveal nothing — plus onion layering",
    limit: "Collusion ≥ k across one request’s paths degrades it",
  },
  {
    who: "A global observer",
    can: "Watches every link at once, correlates timing",
    answer: "Cover traffic and Poisson timing mixing",
    limit: "Costs latency and bandwidth; imperfect at small scale",
  },
  {
    who: "A malicious exit",
    can: "Inspects or tampers with clearnet traffic",
    answer:
      "Fresh per-request exits; a committee that computes the TLS session under two-party MPC, so no member holds the key or the plaintext",
    limit: "Plaintext to a clearnet site is inherently visible to some egress",
  },
  {
    who: "A Sybil attacker",
    can: "Floods fake nodes to map or deanonymize",
    answer: "Bandwidth credits make identities costly; VRF paths resist herding",
    limit: "An open problem; residual risk while the network is young",
  },
  {
    who: "A quantum adversary",
    can: "Records today, decrypts later",
    answer: "PQ-hybrid handshakes and onion packets from day one",
    limit: "Rests on the assumptions of the PQ primitives",
  },
];

function Adversaries() {
  return (
    <section className="section section--inv" id="adversaries">
      <div className="wrap">
        <SectionHead
          no="04"
          title={
            <>
              Seven adversaries<span className="it">, one table.</span>
            </>
          }
          intro="A threat model is a table, not a slogan. Every row names what an adversary can do, what Junctus does about it — and the limit we will not hide from you."
        />
        <div className="tm-scroll rv">
          <table className="tm">
            <thead>
              <tr>
                <th>Adversary</th>
                <th>What they can do</th>
                <th>What Junctus does</th>
                <th className="tm__limit-head">The honest limit</th>
              </tr>
            </thead>
            <tbody>
              {THREATS.map((t) => (
                <tr key={t.who}>
                  <td>{t.who}</td>
                  <td>{t.can}</td>
                  <td>{t.answer}</td>
                  <td>{t.limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="foot rv">
          Several rows are asserted by adversary-simulation tests in CI today:
          colluding relays below the threshold learn nothing; a single relay
          learns only its next hop, and a tampered payload avalanches instead
          of carrying a signal; an on-path observer sees only ciphertext;
          forged discovery data is rejected outright; and no committee minority
          can open a request. Explicit non-goals for v1: censors who accept large
          collateral damage, hiding from the destination that a connection
          happened, compromised endpoints, and formal anonymity bounds. And the
          table is not just defended — it has been attacked directly, by us.
          That story is next.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const AUDIT_STATS = [
  { n: "05", label: "critical breaks — found, proven, fixed", warn: false },
  { n: "82", label: "findings closed across three rounds", warn: false },
  { n: "00", label: "highs or mediums left open", warn: false },
  { n: "01", label: "external audit not yet delivered", warn: true },
];

function Security() {
  return (
    <section className="section" id="security">
      <div className="wrap">
        <SectionHead
          no="05"
          title={
            <>
              We attacked it <span className="it">first.</span>
            </>
          }
          intro="Three rounds of adversarial review: first the handshake, the onion layer, the novel core, and the discovery plane — then everything that had grown since — and, most recently, the newest surface of all: the two-party MPC-TLS stack, the REALITY probe-resistant transport, persistent circuit tunnels, the credit economy, and the seed, mix, and camouflage layers around them. Findings cite file and line; the worst were proven with working exploits against the real code. Every finding from all three rounds is closed — fixed in code with a regression test standing guard, or, where the defect was an overclaimed doc, by correcting the claim itself."
        />
        <div className="audit__stats rv">
          {AUDIT_STATS.map((s) => (
            <div className="audit__stat" key={s.label}>
              <span
                className={`audit__n ${s.warn ? "audit__n--warn" : ""}`}
              >
                {s.n}
              </span>
              <span className="k">{s.label}</span>
            </div>
          ))}
        </div>
        <AuditCarousel />
        <p className="pipe__note rv">
          The third round was the harshest by design: fifty-seven findings
          against code no review had ever touched, from a probe-resistance
          authenticator forgeable with a degenerate curve point to a credit
          mint wired to nothing. All fifty-seven are closed. Findings that
          looked severe but did not survive adversarial re-verification were
          downgraded and the reasoning recorded — a plausible-but-wrong finding
          is treated as a defect of the review, not a win. And the supply chain
          is now guarded too: any RustSec advisory in the dependency tree fails
          CI. An internal review is still not an audit: the external gate
          stands.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function DialSection() {
  return (
    <section className="section" id="dial">
      <div className="wrap">
        <SectionHead
          no="06"
          title={
            <>
              One dial<span className="it">, honest trade-offs.</span>
            </>
          }
          intro="Strong anonymity, low latency, low overhead — pick two. That trilemma is mathematics, not marketing, so Junctus surfaces it as a control instead of pretending it away."
        />
        <Dial />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const LIMITS = [
  {
    title: "The trilemma is real.",
    body: "Junctus deliberately pays a latency and bandwidth tax for anonymity. If a network promises you all three, it is lying about at least one.",
  },
  {
    title: "“No responsible exit” has an asterisk.",
    body: "Inside the overlay it holds fully — no relay ever reassembles a flow. Toward the open web it is diffused and rotated per request, and split across a threshold committee at the strongest setting: reduced, never zero, because some machine must speak to the destination.",
  },
  {
    title: "A small network is weak anonymity.",
    body: "Slicing and mixing hide you in a crowd. Until the crowd grows, the anonymity set is small — and we say so, rather than round it up.",
  },
  {
    title: "Sybil is answered, not solved.",
    body: "Bandwidth credits make fake identities expensive, not impossible — and today’s proof-of-relay receipts are client-attested, not a trustless measurement. Bootstrap may require a seed set. This remains an open research problem everywhere.",
  },
  {
    title: "Phones are participants, not pack mules.",
    body: "Mobile devices throttle the dial on battery and cellular, and are never mandatory relays or committee members.",
  },
  {
    title: "It is not audited.",
    body: "Three rounds of internal adversarial review found real breaks — five of them critical — and every finding is fixed. But that is not the external security and cryptography audit that gates real-world use. Until that audit: experiment, contribute, poke holes — do not bet your freedom on it.",
  },
];

function Limits() {
  return (
    <section className="section" id="limits">
      <div className="wrap">
        <SectionHead
          no="07"
          title={
            <>
              What we <span className="it">won’t</span> pretend.
            </>
          }
          intro="Every privacy tool has limits. Most bury them. Ours are part of the specification, kept next to the features and versioned with the code."
        />
        <div className="limits rv">
          <span className="limits__stamp">Not audited</span>
          <ol className="limits__list">
            {LIMITS.map((l) => (
              <li key={l.title}>
                <div>
                  <strong>{l.title}</strong>
                  <p>{l.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

type Milestone = {
  name: string;
  desc: string;
  state: "done" | "pending" | "gate";
};

const CORE: Milestone[] = [
  { name: "Foundation", desc: "PQ-hybrid identity (Ed25519 + X25519 + ML-KEM-768), config, CLI.", state: "done" },
  { name: "MVP tunnel", desc: "Signed hybrid handshake, encrypted session, a real TUN bridge.", state: "done" },
  { name: "Onion routing", desc: "Full Sphinx: fixed-size packets, per-hop MACs, replay tags.", state: "done" },
  { name: "Information slicing", desc: "Encrypt-then-slice k-of-n over Reed–Solomon; any-k recovery.", state: "done" },
  { name: "Decentralization", desc: "libp2p Kademlia DHT discovery and the connection ladder.", state: "done" },
  { name: "Runnable discovery", desc: "Signed peer records, witnessed snapshots, seed infrastructure, zero-config `neo run`.", state: "done" },
  { name: "Live onion forwarding", desc: "Sphinx circuits over real sockets — a live seed, three relays, and a sender, end to end; plaintext seen by exactly one node.", state: "done" },
  { name: "Timing defense", desc: "Poisson mixing and cover traffic in the live data plane; global-observer simulation.", state: "done" },
  { name: "Unblockable transport", desc: "Pluggable obfuscation, length bucketing, QUIC.", state: "done" },
  { name: "Diffused exit", desc: "Opt-in exit policy; rotating fresh-per-request exits.", state: "done" },
  { name: "Mobile", desc: "UniFFI bindings over the core; iOS and Android shells.", state: "done" },
  { name: "Core hardening", desc: "Adversary simulations, wire-parser fuzzing, the threat model.", state: "done" },
];

const FRONTIER: Milestone[] = [
  { name: "Anonymous bandwidth credits", desc: "VOPRF tokens: unlinkable issuance, double-spends rejected.", state: "done" },
  { name: "Verifiable routing", desc: "Commit-then-VRF path seeds neither client nor beacon can bias.", state: "done" },
  { name: "Committee exit", desc: "Threshold trust-split with verifiable, attributable key custody.", state: "done" },
  { name: "Verifiable privacy", desc: "Two-server PIR and oblivious lookup by node id; a real ZK shuffle.", state: "done" },
];

const HARDENING: Milestone[] = [
  { name: "Security hardening", desc: "Every finding from two review rounds fixed with regression tests — twenty-five, three of them critical.", state: "done" },
  { name: "Bidirectional streaming", desc: "A return path with per-hop stream keys; middle relays read nothing.", state: "done" },
  { name: "NAT traversal", desc: "AutoNAT reachability and a hole-punch ladder with relay fallback.", state: "done" },
  { name: "Earn-side accounting", desc: "Capped proof-of-relay receipts gate credit issuance; spending stays anonymous.", state: "done" },
  { name: "DoH bootstrap", desc: "Signed rendezvous records over DNS-over-HTTPS; rotate without a client rebuild.", state: "done" },
  { name: "ZK verifiable shuffle", desc: "A mix proves an honest permutation without revealing it.", state: "done" },
  { name: "Verifiable committee custody", desc: "Feldman-verified key shares; a corrupted share is detected and attributed.", state: "done" },
  { name: "Persistent circuit tunnels", desc: "A circuit stays open and carries a real TCP byte stream, onion-layered per cell; a mauled cell is caught at the endpoint.", state: "done" },
  { name: "Threshold committee decryption", desc: "Client-combined partial decryptions with DLEQ proofs — the committee never assembles the key or the plaintext.", state: "done" },
  { name: "Probe-resistant transports", desc: "A REALITY-style authenticated first flight — a prober only ever sees a decoy — with QUIC/MASQUE and WebRTC/DTLS shape camouflage.", state: "done" },
  { name: "Two-party MPC-TLS core", desc: "A full ChaCha20-Poly1305 record and SHA-256 key schedule computed under 2PC — OT extension, garbled circuits matched to their KATs; honest-but-curious today, by design.", state: "done" },
  { name: "Adversarial hardening, round three", desc: "Fifty-seven findings against the newest surfaces — MPC-TLS, REALITY, circuit tunnels, credits, seed, mix — every one closed; internal dial-outs default-denied; a RustSec advisory gate now fails CI.", state: "done" },
];

const REMAINING: Milestone[] = [
  { name: "Malicious-secure, live MPC-TLS", desc: "Authenticated garbling to close dual-execution's ≤1-bit leak, the DECO point-to-bit conversion, and wiring to a real TLS socket on the server's own curve.", state: "pending" },
  { name: "Stream multiplexing", desc: "Congestion control and many streams over one circuit, above today's single-stream tunnel.", state: "pending" },
  { name: "External audit", desc: "Security + cryptography audit before anyone relies on Junctus. A hard gate, not a milestone to rush past.", state: "gate" },
];

function RoadGroup({ label, items }: { label: string; items: Milestone[] }) {
  return (
    <div className="road__group rv">
      <span className="k">{label}</span>
      <div className="road">
        {items.map((it, i) => (
          <div
            className={`road__row ${it.state === "gate" ? "road__row--gate" : ""}`}
            key={it.name}
          >
            <span className="road__m">
              {it.state === "gate" ? "—" : String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`road__dot ${
                it.state === "done"
                  ? "road__dot--done"
                  : it.state === "gate"
                    ? "road__dot--gate"
                    : ""
              }`}
            />
            <span className="road__name">{it.name}</span>
            <span className="road__desc">{it.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Roadmap() {
  return (
    <section className="section" id="roadmap">
      <div className="wrap">
        <SectionHead
          no="08"
          title={
            <>
              Built in the open<span className="it">, gated by an audit.</span>
            </>
          }
          intro="Everything below with a filled marker has running, tested code — the core, the frontier that was research a season ago, and a hardening tier driven by our own attack on the system. What remains is listed just as plainly."
        />
        <RoadGroup label="Core — implemented" items={CORE} />
        <RoadGroup label="Frontier — implemented" items={FRONTIER} />
        <RoadGroup label="Hardening & expansion — implemented" items={HARDENING} />
        <RoadGroup label="What remains" items={REMAINING} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const PLATFORMS = [
  {
    name: "CLI & daemon",
    desc: (
      <>
        macOS and Linux — one cfg-gated binary that runs as client, relay, or
        discovery seed.
      </>
    ),
  },
  {
    name: "macOS app",
    desc: (
      <>
        The full data path in an app: a react-native-macos shell whose system
        VPN (<code>NEPacketTunnelProvider</code>) claims the default route and
        gives every intercepted TCP flow its own fresh multi-hop onion circuit
        to its destination — relay snapshots witness-verified before use, one
        identity shared with the CLI. Builds from source today; not yet
        notarized for distribution.
      </>
    ),
  },
  {
    name: "iOS",
    desc: (
      <>
        Swift shell over the Rust core via <code>xcframework</code>, tunneling
        through <code>NEPacketTunnelProvider</code>.
      </>
    ),
  },
  {
    name: "Android",
    desc: (
      <>
        Kotlin shell built with <code>cargo-ndk</code>, tunneling through{" "}
        <code>VpnService</code>.
      </>
    ),
  },
  {
    name: "One core",
    desc: (
      <>
        Every platform shares the same open Rust engine — fifteen crates, from{" "}
        <code>neo-crypto</code> to <code>neo-verify</code>. AGPL-3.0. No forks
        of trust.
      </>
    ),
  },
];

function Platforms() {
  return (
    <section className="section" id="platforms">
      <div className="wrap">
        <SectionHead
          no="09"
          title={
            <>
              One engine<span className="it">, every pocket.</span>
            </>
          }
          intro="The protocol lives in a shared Rust core; the platforms are thin shells around it. Phones join the network on their own terms — never as mandatory relays."
        />
        <div className="plats">
          <div className="plat-list rv">
            {PLATFORMS.map((p) => (
              <div className="plat" key={p.name}>
                <span className="plat__name">{p.name}</span>
                <span className="plat__desc">{p.desc}</span>
              </div>
            ))}
          </div>
          <div className="term rv" aria-label="Terminal example">
            <div className="term__bar">
              <i />
              <i />
              <i />
            </div>
            <pre>
              <span className="c"># one Rust workspace, fifteen crates</span>
              {"\n"}
              <span className="p">$</span> git clone {REPO}
              {"\n"}
              <span className="p">$</span> cd neo && cargo build --release
              {"\n\n"}
              <span className="c"># a discovery seed — serves no user traffic</span>
              {"\n"}
              <span className="p">$</span> neo seed --witness witness.key
              {"\n\n"}
              <span className="c"># relays that register and forward onions</span>
              {"\n"}
              <span className="p">$</span> neo run --relay --listen 127.0.0.1:9001
              {"\n"}
              <span className="p">$</span> neo run --relay --listen 127.0.0.1:9002
              {"\n\n"}
              <span className="c"># only the exit can read it</span>
              {"\n"}
              <span className="p">$</span> neo send --message {'"hello"'} --hops 2
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <div className="footer__word">
              Junctus<span className="it">.</span>
            </div>
            <p className="footer__tag">
              From the Latin <em>iunctus</em> — joined. A network joined so
              tightly that no single part of it knows you.
            </p>
          </div>
          <div>
            <h4>Read the spec</h4>
            <ul>
              <li>
                <a href={`${REPO}/blob/main/docs/ARCHITECTURE.md`}>
                  Architecture
                </a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/docs/PROTOCOL.md`}>Protocol</a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/docs/THREAT_MODEL.md`}>
                  Threat model
                </a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/docs/SECURITY_ANALYSIS.md`}>
                  Security analysis
                </a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/docs/SECURITY_REVIEW_3.md`}>
                  Security review, round 3
                </a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/docs/CRYPTO.md`}>Crypto notes</a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/docs/DISCOVERY.md`}>Discovery</a>
              </li>
              <li>
                <a href={`${REPO}/blob/main/docs/MILESTONES.md`}>Milestones</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Join the network</h4>
            <ul>
              <li>
                <a href={REPO}>Source — github.com/junctus/neo</a>
              </li>
              <li>
                <a href="#platforms">Run a relay</a>
              </li>
              <li>
                <a href="https://discovery.junctus.org">
                  discovery.junctus.org
                </a>
              </li>
              <li>
                <a href="#roadmap">Status &amp; roadmap</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__legal">
          <span>© 2026 Junctus · engine: neo · AGPL-3.0-or-later</span>
          <span>No trackers. No analytics. Obviously.</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Downloads />
        <HeroFigure />
        <Thesis />
        <Pipeline />
        <Mechanisms />
        <Adversaries />
        <Security />
        <DialSection />
        <Limits />
        <Roadmap />
        <Platforms />
      </main>
      <Footer />
    </>
  );
}
