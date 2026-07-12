/**
 * §05 — one small animated schematic per adversary, keyed by index to the
 * THREATS order in page.tsx. Reuses the `.mv` visual primitives/animations from
 * the mechanism scenes (globals.css). Framing is threat-first: each scene shows
 * what the adversary sees or tries, and why it fails.
 *
 * Order: 0 ISP · 1 censor · 2 colluding relays · 3 global observer ·
 * 4 malicious exit · 5 Sybil · 6 quantum.
 */

const VB = "0 0 360 190";

function svg(children: React.ReactNode, label: string, key: number) {
  return (
    <svg className="mv" viewBox={VB} role="img" aria-label={label} key={key}>
      {children}
    </svg>
  );
}

function Eye({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse className="mv-eye" cx={x} cy={y} rx="15" ry="9" />
      <circle className="mv-pupil" cx={x} cy={y} r="3.5" />
    </g>
  );
}

function Isp() {
  const d = "M46,110 L314,110";
  return (
    <>
      <circle className="mv-node mv-node--on" cx="46" cy="110" r="6" />
      <circle className="mv-node mv-node--on" cx="314" cy="110" r="6" />
      <path className="mv-line" d={d} />
      <Eye x={180} y={48} />
      <text className="mv-lbl" x="180" y="30" textAnchor="middle">
        isp / dpi
      </text>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          className="mv-chip mv-travel"
          x="-4"
          y="-4"
          width="8"
          height="8"
          style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 0.7}s` }}
        />
      ))}
      <text className="mv-lbl mv-lbl--accent" x="180" y="88" textAnchor="middle">
        sees ciphertext only
      </text>
      {/* volume still leaks */}
      <rect className="mv-box" x="120" y="150" width="120" height="12" rx="2" />
      <rect className="mv-bar-fill" x="122" y="152" height="8" rx="1" />
      <text className="mv-lbl" x="46" y="140" textAnchor="middle">
        you
      </text>
      <text className="mv-lbl mv-lbl--warn" x="180" y="180" textAnchor="middle">
        volume still visible
      </text>
    </>
  );
}

function Censor() {
  return (
    <>
      {/* censor wall */}
      {[46, 54, 62].map((x) => (
        <path key={x} className="mv-line" d={`M${x},40 L${x},150`} />
      ))}
      <text className="mv-lbl" x="54" y="170" textAnchor="middle">
        censor
      </text>
      {/* neo bridge */}
      <circle className="mv-node mv-node--on" cx="180" cy="95" r="7" />
      <text className="mv-lbl" x="180" y="120" textAnchor="middle">
        bridge
      </text>
      {/* active probe bounces to a decoy site */}
      <circle
        className="mv-chip mv-chip--reject mv-travel"
        r="4"
        style={{ offsetPath: 'path("M70,95 L172,95")' }}
      />
      <rect className="mv-box" x="270" y="70" width="60" height="50" rx="3" />
      <path className="mv-tick" d="M290,95 l6,6 l12,-14" />
      <text className="mv-lbl mv-lbl--accent" x="300" y="140" textAnchor="middle">
        real decoy site
      </text>
      <path className="mv-line mv-dash" d="M188,92 L268,95" />
      <text className="mv-lbl" x="230" y="60" textAnchor="middle">
        prober → decoy
      </text>
    </>
  );
}

function Colluding() {
  const relays = [
    [100, false],
    [160, true],
    [220, true],
    [280, false],
  ] as const;
  return (
    <>
      <path className="mv-line" d="M34,95 L330,95" />
      <circle className="mv-node mv-node--on" cx="34" cy="95" r="6" />
      <circle className="mv-node mv-node--on" cx="330" cy="95" r="6" />
      {relays.map(([x, bad], i) => (
        <g key={i}>
          <circle
            className={`mv-node ${bad ? "mv-node--bad" : "mv-node--on"}`}
            cx={x}
            cy="95"
            r="6"
          />
          {bad && (
            <text className="mv-lbl mv-lbl--bad" x={x} y="76" textAnchor="middle">
              ?
            </text>
          )}
        </g>
      ))}
      <text className="mv-lbl" x="34" y="120" textAnchor="middle">
        you
      </text>
      <text className="mv-lbl" x="330" y="120" textAnchor="middle">
        exit
      </text>
      {/* a share travelling — a fragment */}
      <rect
        className="mv-chip mv-travel"
        x="-4"
        y="-4"
        width="8"
        height="8"
        style={{ offsetPath: 'path("M34,95 L330,95")' }}
      />
      <text className="mv-lbl mv-lbl--bad" x="190" y="150" textAnchor="middle">
        2 colluding &lt; k
      </text>
      <text className="mv-lbl mv-lbl--accent" x="190" y="168" textAnchor="middle">
        below k → they learn nothing
      </text>
    </>
  );
}

function GlobalObserver() {
  const inY = [50, 80, 110];
  const outOrder = [110, 50, 80];
  return (
    <>
      <rect className="mv-box" x="155" y="34" width="50" height="110" rx="2" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="164" textAnchor="middle">
        mix
      </text>
      <Eye x={90} y={24} />
      <Eye x={270} y={24} />
      {inY.map((y, i) => (
        <circle
          key={`i${i}`}
          className="mv-chip mv-travel"
          r="3.5"
          style={{ offsetPath: `path("M24,${y} L155,${y}")`, animationDelay: `${i * 0.3}s` }}
        />
      ))}
      {outOrder.map((y, i) => (
        <circle
          key={`o${i}`}
          className="mv-chip mv-chip--out mv-travel"
          r="3.5"
          style={{
            offsetPath: `path("M205,90 L336,${y}")`,
            animationDelay: `${1.3 + i * 0.6}s`,
          }}
        />
      ))}
      <circle
        className="mv-chip mv-chip--cover mv-travel"
        r="3.5"
        style={{ offsetPath: 'path("M205,90 L336,140")', animationDelay: "2.2s" }}
      />
      <path className="mv-cut" d="M90,36 C130,90 130,90 90,150" />
      <path className="mv-cut-x" d="M84,84 l12,12 M96,84 l-12,12" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="184" textAnchor="middle">
        timing decorrelated
      </text>
    </>
  );
}

function MaliciousExit() {
  const members = [
    [250, 44],
    [300, 70],
    [300, 120],
    [250, 146],
  ];
  return (
    <>
      <circle className="mv-node mv-node--on" cx="40" cy="95" r="8" />
      <text className="mv-lbl mv-lbl--accent" x="40" y="122" textAnchor="middle">
        client
      </text>
      {members.map(([x, y], i) => (
        <g key={i}>
          <circle className="mv-node mv-node--on" cx={x} cy={y} r="5" />
          <circle
            className="mv-chip mv-travel"
            r="3"
            style={{ offsetPath: `path("M${x},${y} L48,95")`, animationDelay: `${i * 0.4}s` }}
          />
        </g>
      ))}
      <text className="mv-lbl" x="275" y="176" textAnchor="middle">
        committee exit
      </text>
      {/* exit can't read */}
      <path className="mv-lock" d="M165,86 a8,8 0 0,1 16,0 v6 h-16 z" />
      <rect className="mv-box" x="160" y="92" width="26" height="18" rx="2" />
      <path className="mv-cut-x" d="M120,88 l14,14 M134,88 l-14,14" />
      <text className="mv-lbl mv-lbl--accent" x="150" y="140" textAnchor="middle">
        no member reads the response
      </text>
    </>
  );
}

function Sybil() {
  const attackers = [
    [24, 46, true],
    [24, 78, false],
    [24, 110, true],
    [24, 142, false],
    [52, 62, true],
    [52, 126, false],
  ] as const;
  return (
    <>
      <path className="mv-line" d="M180,28 L180,74 M180,116 L180,162" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="100" textAnchor="middle">
        pow + subnet cap
      </text>
      {attackers.map(([x, y, pass], i) => (
        <circle
          key={i}
          className={`mv-chip mv-travel ${pass ? "" : "mv-chip--reject"}`}
          r="4"
          style={{
            offsetPath: `path("M${x},${y} L170,95 L${pass ? 330 : 36},95")`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      <text className="mv-lbl" x="40" y="182">
        fake nodes
      </text>
      <text className="mv-lbl mv-lbl--accent" x="322" y="182" textAnchor="end">
        can’t own both ends
      </text>
    </>
  );
}

function Quantum() {
  const feed = "M78,95 L150,95";
  return (
    <>
      {/* Q harvester */}
      <rect className="mv-box" x="34" y="74" width="44" height="42" rx="3" />
      <text className="mv-lbl mv-lbl--bad" x="56" y="99" textAnchor="middle">
        Q
      </text>
      <text className="mv-lbl" x="56" y="132" textAnchor="middle">
        harvests
      </text>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          className="mv-chip mv-travel"
          x="-4"
          y="-4"
          width="8"
          height="8"
          style={{ offsetPath: `path("${feed}")`, animationDelay: `${i * 0.7}s` }}
        />
      ))}
      {/* vault stays locked, PQ shield */}
      <rect className="mv-box" x="200" y="58" width="120" height="74" rx="3" />
      <path
        className="mv-shield"
        d="M260,72 L280,80 L280,104 C280,118 271,125 260,131 C249,125 240,118 240,104 L240,80 Z"
      />
      <path className="mv-lock" d="M253,96 a7,7 0 0,1 14,0 v6 h-14 z" />
      <text className="mv-lbl mv-lbl--accent" x="260" y="152" textAnchor="middle">
        still ciphertext
      </text>
    </>
  );
}

const SCENES = [
  Isp,
  Censor,
  Colluding,
  GlobalObserver,
  MaliciousExit,
  Sybil,
  Quantum,
];

const LABELS = [
  "the ISP sees only ciphertext, though traffic volume still leaks",
  "an active probe is answered with a real decoy site, not the bridge",
  "two colluding relays hold only meaningless fragments below the k threshold",
  "a global observer watches every link, but timing mixing decorrelates in from out",
  "a committee exit whose members cannot read the response",
  "a Sybil flood is filtered by proof-of-work and subnet caps",
  "a quantum adversary harvests ciphertext that stays ciphertext",
];

export default function AdversaryVisual({ index }: { index: number }) {
  const Scene = SCENES[index] ?? Isp;
  return svg(<Scene />, LABELS[index] ?? "", index);
}
