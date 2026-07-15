import AdversaryExplorer from "@/components/AdversaryExplorer";
import AuditCarousel from "@/components/AuditCarousel";
import CompareExplorer from "@/components/CompareExplorer";
import Dial from "@/components/Dial";
import DownloadBar from "@/components/DownloadBar";
import MechExplorer from "@/components/MechExplorer";
import PipelineStepper from "@/components/PipelineStepper";

const REPO = "https://github.com/junctus/neo";

/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a className="nav__mark" href="#top">
          Junctus <span className="nav__mark-neo">neo</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          <a href="#compare">Compare</a>
          <a href="#pipeline">How it works</a>
          <a href="#adversaries">Adversaries</a>
          <a href="#security">Security</a>
          <a href="#limits">Limits</a>
          <a href="#roadmap">Roadmap</a>
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
          ~/junctus neo — an open-source, post-quantum anonymity layer
        </p>
        <h1>
          An anonymity layer, <span className="site-green-text">where no node sees{" "}
          the entire picture.</span>
        </h1>
        <p className="hero__sub">
          Junctus neo anonymises your data by encrypting each flow, slicing it into <em>k</em>-of-<em>n</em>{" "}
          shares, and sending every share down its own onion-wrapped,
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
              What the <span className="it site-green-text">hell did you do?</span>
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
              diffused — rotated per request, and at the strongest setting
              handed to a committee whose joint key no member holds: the
              response returns threshold-encrypted, and each member can prove
              it cannot read it.
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

/* Strength ranks (0–3) are editorial but deliberately honest — Junctus is not
   the winner of every dimension (mixnets take the global observer; Tor takes
   blocking resistance; Tor and VPNs take maturity). Order per row: Junctus,
   Tor, Commercial VPNs, Mixnets. */
const COMPARE = {
  solutions: ["Junctus neo", "Tor", "Commercial VPNs", "Mixnets"],
  rows: [
    {
      dim: "Who you must trust",
      cells: [
        {
          t: "No one in particular — fewer than k colluding relays, and any committee minority, learn nothing",
          r: 3,
        },
        { t: "Your guard and exit must not collude", r: 2 },
        { t: "One company, completely", r: 1 },
        { t: "A majority of mix operators", r: 2 },
      ],
    },
    {
      dim: "One seized machine reveals",
      cells: [
        { t: "A meaningless fragment of one flow’s ciphertext", r: 3 },
        { t: "Connection metadata; a guard–exit pair can correlate you", r: 2 },
        { t: "Your identity and your entire traffic, in one place", r: 1 },
        { t: "One hop’s queue", r: 2 },
      ],
    },
    {
      dim: "Traffic splitting",
      cells: [
        {
          t: "k-of-n slices over disjoint onion paths — the shares never travel together",
          r: 3,
        },
        { t: "One circuit carries the whole flow", r: 1 },
        { t: "One tunnel carries everything", r: 1 },
        { t: "Per-packet routes, but each packet travels whole", r: 2 },
      ],
    },
    {
      dim: "Post-quantum",
      cells: [
        {
          t: "Hybrid X25519 + ML-KEM handshakes and onion packets from day one",
          r: 3,
        },
        { t: "In progress", r: 2 },
        { t: "Varies by provider", r: 2 },
        { t: "Not yet", r: 1 },
      ],
    },
    {
      dim: "A global observer",
      cells: [
        { t: "Poisson mixing and cover traffic, scaled by a dial", r: 2 },
        { t: "Explicitly out of scope", r: 0 },
        { t: "No defense", r: 0 },
        { t: "The founding feature", r: 3 },
      ],
    },
    {
      dim: "The exit",
      cells: [
        {
          t: "Fresh per request; at the strongest setting, a committee that provably cannot read the response",
          r: 3,
        },
        { t: "Long-lived exits see plaintext", r: 1 },
        { t: "The provider is the exit", r: 1 },
        { t: "Gateways see egress traffic", r: 1 },
      ],
    },
    {
      dim: "Blocking resistance",
      cells: [
        {
          t: "Probe-resistant authenticated flights + QUIC/DTLS camouflage — young",
          r: 2,
        },
        { t: "Bridges and pluggable transports, battle-tested", r: 3 },
        { t: "Widely blocked; obfuscation varies", r: 1 },
        { t: "Limited today", r: 1 },
      ],
    },
    {
      dim: "Maturity",
      cells: [
        {
          t: "Young, a small anonymity set, external audit not yet delivered — the row we lose, stated plainly",
          r: 1,
        },
        { t: "Twenty-five years, millions of users, deeply studied", r: 3 },
        { t: "Mature, audited businesses", r: 3 },
        { t: "Growing, token-incentivized", r: 2 },
      ],
    },
  ],
};

function Compare() {
  return (
    <section className="section" id="compare">
      <div className="wrap">
        <SectionHead
          no="02"
          title={
            <>
              The alternatives, <span className="it site-green-text">without the spin.</span>
            </>
          }
          intro="Every comparison table you have ever read was written by the vendor who wins it. So was this one — which is why it keeps the rows we lose. If a cell is wrong, open an issue; the table is versioned with the code."
        />
        <CompareExplorer data={COMPARE} />
        <p className="foot rv">
          Generalizations, honestly made: “Tor” means the stock Tor Browser
          circuit model, “commercial VPNs” the typical one-hop provider
          (several now offer post-quantum tunnels), “mixnets” the
          Nym-style continuous-mix design. Each column’s best deployment is
          better than its worst row here.
        </p>
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
          no="03"
          title={
            <>
              Breaking down, <span className="it site-green-text">the flow.</span>
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
    desc: "Sphinx onions travel sockets between separate processes, and a circuit stays open to carry real traffic both ways — a TCP byte stream, UDP datagrams so DNS rides along, and now many independent streams multiplexed over one circuit with per-stream flow control — onion-layered per cell. Only the exit sees the payload; tampering, replay, or reordering anywhere is caught at the endpoint; and no middle relay can read the response.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Fresh route + exit, per request",
    desc: "No two requests share a full path; concurrent routes share no hop — not even the exit; exits rotate subnet, not just node, and never immediately repeat. No two hops of a circuit share a subnet where the network can avoid it. There is no stable circuit to watch.",
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
    desc: "Signed peer records whose id must equal the hash of their keys; witness-signed relay snapshots any untrusted mirror can serve; a DHT clients never appear in — bootstrapped over signed DNS-over-HTTPS records that rotate without a client rebuild. Snapshots sync as compact, witness-verifiable deltas: a tampered diff rebuilds to a body no signature matches and collapses to a full refetch.",
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
    desc: "The committee’s joint key is born dealer-less by distributed key generation — no party, not even the client, ever holds it. The exit threshold-encrypts the clearnet response and discards the plaintext; each hop seals its partial decryption; only the client can combine them. Every member can publish a DLEQ non-custody proof: even the exit cannot read the response. The honest boundary: this covers the response the committee returns to you — the outbound request is still spoken to the destination by an egress member, and for HTTPS your own end-to-end TLS keeps that ciphertext to yourself.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Verifiable privacy",
    desc: "Two-server PIR fetches a relay by node id without either server learning which. A zero-knowledge shuffle argument lets a mix prove it permuted honestly without revealing the permutation — binding it into the live mix is the step ahead.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Sybil-resistant admission",
    desc: "Joining the relay set costs: a NodeId-bound proof-of-work, a dial-back attestation of an address you actually control, per-subnet and per-ASN caps on what one network can list, and an optional seed-measured uptime gate no relay can forge. Honest scope: this prices out the cheap same-box flood — it does not solve Sybil, because nothing does yet.",
    tag: "shipped",
    live: true,
  },
  {
    title: "Oblivious 2PC-TLS exit",
    desc: "An experimental, opt-in exit for when trust matters more than speed. Two committee members jointly run a real TLS 1.3 session to the destination under two-party computation, so no single member ever holds the session key or sees the plaintext — the destination’s certificate chain verified to real trust anchors. It is wired end to end into the relay data plane and reachable from the client (neo committee2pc-onion). The honest boundary: a handshake takes tens of seconds — millions of gates computed obliviously — so this is a research-grade building block for TLS oracles and split-trust exits, not the way neo browses. Everyday traffic takes the fast path: the onion overlay plus your own end-to-end TLS.",
    tag: "experimental",
    live: false,
  },
];

function Mechanisms() {
  return (
    <section className="section" id="mechanisms">
      <div className="wrap">
        <SectionHead
          no="04"
          title={
            <>
              The mechanisms, <span className="it site-green-text">explained.</span>
            </>
          }
          intro="Eleven have running, tested code; a twelfth is experimental and labeled so. Where a hard boundary remains, the card says so, because a roadmap is not a feature."
        />
        <MechExplorer items={MECHS} />
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
      "Fresh per-request exits; at the strongest setting, a committee exit whose DKG’d joint key no member holds — responses return threshold-encrypted, and only the client can open them",
    limit: "Plaintext to a clearnet site is inherently visible to some egress",
  },
  {
    who: "A Sybil attacker",
    can: "Floods fake nodes to land on both ends of your circuit",
    answer:
      "Per-subnet and per-ASN admission caps, proof-of-work registration, dial-back attestation, an unforgeable uptime gate — and no two hops share a subnet",
    limit: "Raises the cost to owning many networks; an adversary spanning ASNs still Sybils — unsolved everywhere",
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
          no="05"
          title={
            <>
              The risks, <span className="it site-green-text"> by adversary.</span>
            </>
          }
          intro="A threat model is a list of adversaries, not a slogan. Pick one: it names what they can do, what Junctus does about it — and the limit we will not hide from you."
        />
        <AdversaryExplorer items={THREATS} />
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
  { n: "07", label: "critical breaks — found, proven, fixed", warn: false },
  { n: "90", label: "findings closed across four rounds", warn: false },
  { n: "00", label: "highs or mediums left open", warn: false },
  { n: "01", label: "external audit not yet delivered", warn: true },
];

function Security() {
  return (
    <section className="section" id="security">
      <div className="wrap">
        <SectionHead
          no="06"
          title={
            <>
              We have already attacked it, <span className="it site-green-text"> a lot.</span>
            </>
          }
          intro="Four rounds of adversarial review: first the handshake, the onion layer, the novel core, and the discovery plane — then everything that had grown since — then the newest surface of all: the REALITY transport, the committee, circuit tunnels, and the credit economy — and, most recently, a whole-codebase pass across all sixteen crates, run as a multi-agent workflow where every critical and high finding had to survive a second reviewer trying to refute it from the source. Findings cite file and line; the worst were proven with working exploits against the real code. Every finding from all four rounds is closed — fixed in code with a regression test standing guard, or, where the defect was an overclaimed doc, by correcting the claim itself."
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
          The fourth round was the widest: a single multi-agent sweep of the
          whole codebase — roughly twenty-five thousand lines across sixteen
          crates, ten domains reviewed in parallel — where every critical and
          high finding was handed to a second reviewer tasked with refuting it
          from the source before it counted. Two high-severity claims were
          correctly refuted and are not bugs; a plausible-but-wrong finding is
          treated as a defect of the review, not a win. Of the eight that
          survived, two were critical — an IPv4-mapped-IPv6 address slipping
          past the SSRF guard, and a circuit counter whose overflow would have
          reused keystream — and all eight are fixed. The cryptographic core,
          the committee, the credit economy, and routing all came back clean.
          An internal review is still not an audit: the external gate stands.
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
          no="07"
          title={
            <>
              Trade-offs <span className="it site-green-text">in your control.</span>
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
    body: "Inside the overlay it holds fully — no relay ever reassembles a flow. Toward the open web it is diffused and rotated per request, and split across a threshold committee at the strongest setting — one that can prove it cannot read the response: reduced, never zero, because some machine must still speak the request to the destination.",
  },
  {
    title: "A small network is weak anonymity.",
    body: "Slicing and mixing hide you in a crowd. Until the crowd grows, the anonymity set is small — and we say so, rather than round it up.",
  },
  {
    title: "Sybil is answered, not solved.",
    body: "Flooding the relay set now costs real resources: a proof-of-work per registration, a dial-back per address, and per-subnet and per-ASN caps — plus an uptime gate the relay cannot forge. That turns “sign N records on one box” into “control N hosts across many networks.” It is still not full Sybil resistance: an adversary with a /16 or an IPv6 block defeats subnet diversity, and we deliberately refused to weight selection by bandwidth receipts, because they are client-attested and forgeable — security theater has no place in the anti-Sybil path.",
  },
  {
    title: "Phones are participants, not pack mules.",
    body: "Mobile devices throttle the dial on battery and cellular, and are never mandatory relays or committee members.",
  },
  {
    title: "It is not audited.",
    body: "Four rounds of internal adversarial review found real breaks — seven of them critical — and every finding is fixed. But that is not the external security and cryptography audit that gates real-world use. Until that audit: experiment, contribute, poke holes — do not bet your freedom on it.",
  },
];

function Limits() {
  return (
    <section className="section" id="limits">
      <div className="wrap">
        <SectionHead
          no="08"
          title={
            <>
              What we <span className="it site-green-text">are not going to pretend.</span>
            </>
          }
          intro="Every privacy tool has limits. Some bury them. Ours are part of the specification, kept next to the features and versioned with the code."
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
  { name: "Adversarial hardening, round three", desc: "Fifty-seven findings against the newest surfaces — the committee, REALITY, circuit tunnels, credits, seed, mix — every one closed; internal dial-outs default-denied; a RustSec advisory gate now fails CI.", state: "done" },
  { name: "Snapshot delta sync", desc: "Compact records shrink snapshots ~85%, and mirrors serve witness-verifiable diffs — the client rebuilds the signed body and verifies the witnesses over the result, so a tampered diff collapses to a full refetch.", state: "done" },
  { name: "Live committee exit", desc: "Dealer-less, crash-fault-tolerant DKG; an SSRF-guarded clearnet exit that threshold-encrypts, chunks, and discards plaintext; k-subset retry liveness; seed-served descriptors; a runnable CLI — and a publishable DLEQ proof that no member can read the response.", state: "done" },
  { name: "UDP over circuits", desc: "DNS and every other UDP flow now rides onion circuits beside TCP — per-flow exit splices, one datagram per sealed cell, the same per-cell MACs and strict sequencing.", state: "done" },
  { name: "Sybil-resistant admission", desc: "Per-subnet and per-ASN attestation caps counting only dial-back-verified addresses, NodeId-bound registration proof-of-work, an unforgeable uptime maturation gate, and subnet-diverse selection in every circuit builder.", state: "done" },
  { name: "Stream multiplexing", desc: "Many independent logical streams over one circuit, each with per-stream byte flow control, so a SOCKS proxy or full VPN return path rides a single onion — no extra crypto, all of the cell channel's integrity inherited.", state: "done" },
  { name: "In-ClientHello REALITY", desc: "The authenticator now hides inside a structurally-valid TLS 1.3 ClientHello, and an un-authenticated prober is reverse-proxied to a real upstream site. Honest boundary: the authenticated session is still distinguishable from a full TLS handshake — matched full-session mimicry is the remaining flagship step.", state: "done" },
  { name: "Adversarial hardening, round four", desc: "A whole-codebase multi-agent sweep — sixteen crates, ten domains, every critical/high adversarially re-verified. Eight real findings, two critical, all fixed; two more claims correctly refuted; the crypto core, committee, credits, and routing came back clean.", state: "done" },
];

const REMAINING: Milestone[] = [
  { name: "Point any app at neo", desc: "A local SOCKS5 / HTTP-CONNECT proxy over the built multi-stream circuit, so any browser or CLI routes through the overlay — no new crypto, just the last mile of plumbing.", state: "pending" },
  { name: "Full-session REALITY mimicry", desc: "Proxy a real upstream handshake on the authenticated path with matched timing and a browser-exact fingerprint, so a censor cannot distinguish a neo bridge from the site it impersonates.", state: "pending" },
  { name: "Resilience & supply", desc: "A second independent seed with a k-of-n witness quorum to kill the bootstrap single point of failure, signed one-command relay onboarding, and store-signed client releases.", state: "pending" },
  { name: "External audit", desc: "Security + cryptography audit before anyone relies on Junctus, preceded by a frozen audit-readiness package. A hard gate, not a milestone to rush past.", state: "gate" },
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
          no="09"
          title={
            <>
              We are building <span className="it site-green-text"> in the open</span>
            </>
          }
          intro="Everything below with a filled marker has running, tested code — the core, the frontier that was research a season ago, and a hardening tier driven by our own attack on the system. What remains is now engineering and an audit, not open research: it is listed just as plainly."
        />
        <div
          className="road-scroll rv"
          tabIndex={0}
          role="region"
          aria-label="Implemented milestones — scrollable list"
        >
          <RoadGroup label="Core — implemented" items={CORE} />
          <RoadGroup label="Frontier — implemented" items={FRONTIER} />
          <RoadGroup
            label="Hardening & expansion — implemented"
            items={HARDENING}
          />
        </div>
        <p className="road-scroll__hint k rv">
          ↕ 34 shipped milestones — scroll the ledger
        </p>
        <RoadGroup label="What remains" items={REMAINING} />
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
                <a href={`${REPO}/blob/main/docs/SECURITY_REVIEW.md`}>
                  Security review
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
                <a href={REPO}>Run a relay</a>
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
        <DownloadBar />
        <Thesis />
        <Compare />
        <Pipeline />
        <Mechanisms />
        <Adversaries />
        <Security />
        <DialSection />
        <Limits />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
