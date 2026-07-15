/**
 * §04 — one small animated schematic per mechanism, keyed by index to the MECHS
 * order in page.tsx. Pure inline SVG + CSS animations (classes live in
 * globals.css under `.mv`), so it is self-contained and needs no client JS
 * beyond React re-rendering the right scene when the selection changes.
 *
 * Order: 0 slicing · 1 circuits · 2 fresh-route · 3 mixnet · 4 post-quantum ·
 * 5 discovery · 6 verifiable-routing · 7 credits · 8 committee · 9 PIR ·
 * 10 sybil.
 */

const VB = "0 0 360 190";

function svg(children: React.ReactNode, label: string, key: number) {
  return (
    <svg
      className="mv"
      viewBox={VB}
      role="img"
      aria-label={label}
      /* key forces the SVG to remount so CSS animations restart on switch */
      key={key}
    >
      {children}
    </svg>
  );
}

function Slicing() {
  const ys = [34, 78, 112, 156];
  return (
    <>
      <text className="mv-lbl" x="20" y="100">
        you
      </text>
      <text className="mv-lbl" x="322" y="100">
        exit
      </text>
      <circle className="mv-node mv-node--on" cx="46" cy="95" r="6" />
      <circle className="mv-node mv-node--on" cx="314" cy="95" r="6" />
      {ys.map((y, i) => {
        const d = `M46,95 C150,95 150,${y} 250,${y} S 300,95 314,95`;
        return (
          <g key={i}>
            <path className="mv-line mv-dash" d={d} />
            <rect
              className="mv-chip mv-travel"
              x="-3"
              y="-3"
              width="6"
              height="6"
              style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 0.5}s` }}
            />
          </g>
        );
      })}
      <text className="mv-lbl mv-lbl--accent" x="180" y="18" textAnchor="middle">
        k of n
      </text>
    </>
  );
}

function Circuits() {
  const xs = [46, 150, 240, 314];
  const path = "M46,95 L314,95";
  const back = "M314,120 L46,120";
  return (
    <>
      <path className="mv-line" d="M46,95 L314,95" />
      {xs.map((x, i) => (
        <g key={i}>
          <circle
            className="mv-node mv-node--on"
            cx={x}
            cy="95"
            r="6"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
        </g>
      ))}
      {/* onion cell travelling out, shedding layers */}
      <g className="mv-travel mv-cell" style={{ offsetPath: `path("${path}")` }}>
        <rect x="-9" y="-9" width="18" height="18" className="mv-onion mv-onion--3" />
        <rect x="-6" y="-6" width="12" height="12" className="mv-onion mv-onion--2" />
        <rect x="-3" y="-3" width="6" height="6" className="mv-onion mv-onion--1" />
      </g>
      {/* sealed response travelling back */}
      <circle
        className="mv-chip mv-travel"
        r="3"
        style={{ offsetPath: `path("${back}")`, animationDelay: "1.4s" }}
      />
      <text className="mv-lbl" x="46" y="150" textAnchor="middle">
        you
      </text>
      <text className="mv-lbl mv-lbl--accent" x="314" y="150" textAnchor="middle">
        exit reads
      </text>
    </>
  );
}

function FreshRoute() {
  const routes = [
    "M40,95 C120,40 220,40 320,60",
    "M40,95 C120,150 220,60 320,120",
    "M40,95 C120,60 220,150 320,150",
  ];
  const mids = [
    [120, 55],
    [200, 95],
    [230, 135],
  ];
  return (
    <>
      <circle className="mv-node mv-node--on" cx="40" cy="95" r="6" />
      {[60, 120, 150].map((y, i) => (
        <circle key={i} className="mv-node" cx="320" cy={y} r="5" />
      ))}
      {mids.map(([x, y], i) => (
        <circle key={i} className="mv-node" cx={x} cy={y} r="4" />
      ))}
      {routes.map((d, i) => (
        <path
          key={i}
          className="mv-line mv-route"
          d={d}
          style={{ animationDelay: `${i * 1.4}s` }}
        />
      ))}
      <text className="mv-lbl" x="30" y="120">
        you
      </text>
      <text className="mv-lbl mv-lbl--accent" x="300" y="175" textAnchor="middle">
        a fresh path every request
      </text>
    </>
  );
}

function Mixnet() {
  const inY = [40, 70, 100, 130];
  const outOrder = [100, 40, 130, 70];
  return (
    <>
      <rect className="mv-box" x="150" y="30" width="60" height="120" rx="2" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="168" textAnchor="middle">
        mix
      </text>
      {inY.map((y, i) => (
        <circle
          key={`i${i}`}
          className="mv-chip mv-travel"
          r="3.5"
          style={{
            offsetPath: `path("M20,${y} L150,${y}")`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      {outOrder.map((y, i) => (
        <circle
          key={`o${i}`}
          className="mv-chip mv-chip--out mv-travel"
          r="3.5"
          style={{
            offsetPath: `path("M210,90 L340,${y}")`,
            animationDelay: `${1.4 + i * 0.55}s`,
          }}
        />
      ))}
      {/* cover packet */}
      <circle
        className="mv-chip mv-chip--cover mv-travel"
        r="3.5"
        style={{ offsetPath: `path("M210,90 L340,160")`, animationDelay: "2.4s" }}
      />
    </>
  );
}

function PostQuantum() {
  return (
    <>
      <circle className="mv-node mv-node--on" cx="44" cy="100" r="6" />
      <circle className="mv-node mv-node--on" cx="316" cy="100" r="6" />
      <path className="mv-line mv-dash" d="M50,100 L150,100" />
      <path className="mv-line mv-dash" d="M210,100 L310,100" />
      {/* hybrid shield */}
      <path
        className="mv-shield"
        d="M180,58 L206,70 L206,104 C206,124 194,134 180,142 C166,134 154,124 154,104 L154,70 Z"
      />
      <text className="mv-lbl mv-lbl--accent" x="180" y="98" textAnchor="middle">
        x25519
      </text>
      <text className="mv-lbl mv-lbl--accent" x="180" y="114" textAnchor="middle">
        +ml-kem
      </text>
      {/* quantum adversary bolt bouncing off */}
      <text className="mv-lbl" x="180" y="30" textAnchor="middle">
        Q
      </text>
      <path className="mv-bolt" d="M180,38 L180,54" />
      <text className="mv-lbl" x="44" y="128" textAnchor="middle">
        a
      </text>
      <text className="mv-lbl" x="316" y="128" textAnchor="middle">
        b
      </text>
    </>
  );
}

function Discovery() {
  return (
    <>
      <rect className="mv-box" x="70" y="45" width="220" height="100" rx="3" />
      <text className="mv-lbl" x="86" y="80">
        keys
      </text>
      <rect className="mv-chip-box" x="130" y="66" width="140" height="18" rx="2" />
      <text className="mv-lbl mv-lbl--accent" x="86" y="122">
        id
      </text>
      <rect
        className="mv-chip-box mv-chip-box--hash"
        x="130"
        y="108"
        width="140"
        height="18"
        rx="2"
      />
      {/* hash arrow keys -> id */}
      <path className="mv-line mv-dash" d="M200,86 L200,106" />
      <text className="mv-lbl mv-lbl--accent" x="228" y="100">
        = blake3()
      </text>
      {/* match check */}
      <g className="mv-check">
        <circle className="mv-node mv-node--on" cx="300" cy="95" r="12" />
        <path className="mv-tick" d="M294,95 L299,100 L307,89" />
      </g>
    </>
  );
}

function VerifiableRouting() {
  return (
    <>
      {/* commit box (locked) */}
      <rect className="mv-box" x="30" y="76" width="46" height="40" rx="3" />
      <path className="mv-lock" d="M46,76 a7,7 0 0,1 14,0 v6 h-14 z" />
      <text className="mv-lbl" x="53" y="132" textAnchor="middle">
        commit
      </text>
      <path className="mv-line mv-dash" d="M76,96 L138,96" />
      {/* VRF wheel */}
      <circle className="mv-wheel" cx="180" cy="96" r="34" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            className="mv-spoke"
            x1={180 + 12 * Math.cos(r)}
            y1={96 + 12 * Math.sin(r)}
            x2={180 + 34 * Math.cos(r)}
            y2={96 + 34 * Math.sin(r)}
          />
        );
      })}
      <text className="mv-lbl mv-lbl--accent" x="180" y="150" textAnchor="middle">
        vrf
      </text>
      <path className="mv-line mv-dash" d="M222,96 L284,96" />
      {/* verify check */}
      <g className="mv-check">
        <circle className="mv-node mv-node--on" cx="304" cy="96" r="12" />
        <path className="mv-tick" d="M298,96 L303,101 L311,90" />
      </g>
    </>
  );
}

function Credits() {
  return (
    <>
      {/* earn side */}
      <text className="mv-lbl" x="40" y="150" textAnchor="middle">
        earn
      </text>
      <text className="mv-lbl" x="320" y="150" textAnchor="middle">
        spend
      </text>
      {/* token being blinded then signed then unblinded */}
      <circle className="mv-token mv-travel" r="9" style={{ offsetPath: 'path("M40,95 L320,95")' }} />
      {/* blinding wrapper appears mid-path */}
      <circle className="mv-blindwrap" cx="150" cy="95" r="15" />
      {/* issuer stamp */}
      <rect className="mv-box" x="168" y="40" width="24" height="24" rx="2" />
      <path className="mv-line mv-dash" d="M180,64 L180,80" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="34" textAnchor="middle">
        issuer blind-signs
      </text>
      {/* unlinkable: crossed link between earn and spend */}
      <path className="mv-line mv-cut" d="M70,120 L290,120" />
      <path className="mv-cut-x" d="M172,112 L188,128 M188,112 L172,128" />
      <text className="mv-lbl" x="180" y="150" textAnchor="middle">
        unlinkable
      </text>
    </>
  );
}

function Committee() {
  const members = [
    [70, 40],
    [70, 80],
    [70, 120],
    [70, 160],
  ];
  return (
    <>
      {members.map(([x, y], i) => (
        <g key={i}>
          <circle className="mv-node mv-node--on" cx={x} cy={y} r="6" style={{ animationDelay: `${i * 0.2}s` }} />
          <circle
            className="mv-chip mv-travel"
            r="3.5"
            style={{ offsetPath: `path("M${x},${y} L300,100")`, animationDelay: `${i * 0.4}s` }}
          />
        </g>
      ))}
      <text className="mv-lbl" x="70" y="184" textAnchor="middle">
        members
      </text>
      {/* client combines */}
      <circle className="mv-node mv-node--on" cx="306" cy="100" r="9" />
      <text className="mv-lbl mv-lbl--accent" x="306" y="132" textAnchor="middle">
        only client combines
      </text>
      {/* none can read: eye with slash near members */}
      <path className="mv-cut-x" d="M150,96 L166,112 M166,96 L150,112" />
      <text className="mv-lbl" x="200" y="70" textAnchor="middle">
        no member reads
      </text>
    </>
  );
}

function Pir() {
  return (
    <>
      <rect className="mv-box" x="40" y="34" width="80" height="34" rx="2" />
      <text className="mv-lbl" x="80" y="55" textAnchor="middle">
        server a
      </text>
      <rect className="mv-box" x="240" y="34" width="80" height="34" rx="2" />
      <text className="mv-lbl" x="280" y="55" textAnchor="middle">
        server b
      </text>
      <circle className="mv-node mv-node--on" cx="180" cy="150" r="8" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="176" textAnchor="middle">
        client xors → record
      </text>
      {/* queries up */}
      <path className="mv-line mv-dash" d="M172,144 L84,70" />
      <path className="mv-line mv-dash" d="M188,144 L276,70" />
      {/* shares back */}
      <circle className="mv-chip mv-travel" r="3.5" style={{ offsetPath: 'path("M84,70 L172,144")', animationDelay: "0.9s" }} />
      <circle className="mv-chip mv-travel" r="3.5" style={{ offsetPath: 'path("M276,70 L188,144")', animationDelay: "1.2s" }} />
      <text className="mv-lbl" x="180" y="26" textAnchor="middle">
        neither learns which
      </text>
    </>
  );
}

function Sybil() {
  const attackers = [
    [26, 50, true],
    [26, 80, true],
    [26, 110, false],
    [26, 140, true],
    [54, 66, false],
    [54, 124, true],
  ] as const;
  return (
    <>
      {/* gate */}
      <path className="mv-line" d="M180,30 L180,80 M180,110 L180,160" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="100" textAnchor="middle">
        pow + subnet cap
      </text>
      {attackers.map(([x, y, pass], i) => (
        <circle
          key={i}
          className={`mv-chip mv-travel ${pass ? "" : "mv-chip--reject"}`}
          r="4"
          style={{
            offsetPath: `path("M${x},${y} L170,95 L${pass ? 330 : 40},95")`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      <text className="mv-lbl" x="40" y="180">
        floods
      </text>
      <text className="mv-lbl mv-lbl--accent" x="322" y="180" textAnchor="end">
        admitted
      </text>
    </>
  );
}

function TwoPcExit() {
  return (
    <>
      <circle className="mv-node mv-node--on" cx="34" cy="95" r="7" />
      <text className="mv-lbl" x="34" y="120" textAnchor="middle">
        you
      </text>
      {/* two committee members jointly running the TLS session */}
      <circle className="mv-node mv-node--on" cx="140" cy="62" r="6" />
      <circle className="mv-node mv-node--on" cx="140" cy="128" r="6" />
      <text className="mv-lbl" x="140" y="158" textAnchor="middle">
        2 members
      </text>
      <path className="mv-line mv-dash" d="M41,95 L134,66" />
      <path className="mv-line mv-dash" d="M41,95 L134,124" />
      {/* the joint session key neither member holds */}
      <path className="mv-line" d="M146,62 L196,88" />
      <path className="mv-line" d="M146,128 L196,102" />
      <rect className="mv-box" x="196" y="82" width="26" height="26" rx="2" />
      <path className="mv-lock" d="M203,86 a6,6 0 0,1 12,0 v4 h-12 z" />
      <path className="mv-cut-x" d="M150,88 l10,10 M160,88 l-10,10" />
      <text className="mv-lbl mv-lbl--accent" x="180" y="72" textAnchor="middle">
        no member holds the key
      </text>
      {/* real TLS 1.3 to the destination, cert verified */}
      <path
        className="mv-line mv-dash"
        d="M222,95 L286,95"
        style={{ animationDuration: "2.2s" }}
      />
      <rect className="mv-box" x="286" y="78" width="40" height="34" rx="3" />
      <path className="mv-tick" d="M298,95 l6,6 l12,-14" />
      <text className="mv-lbl" x="306" y="128" textAnchor="middle">
        real TLS 1.3
      </text>
      <text className="mv-lbl mv-lbl--warn" x="180" y="184" textAnchor="middle">
        experimental · tens of seconds
      </text>
    </>
  );
}

const SCENES = [
  Slicing,
  Circuits,
  FreshRoute,
  Mixnet,
  PostQuantum,
  Discovery,
  VerifiableRouting,
  Credits,
  Committee,
  Pir,
  Sybil,
  TwoPcExit,
];

const LABELS = [
  "k-of-n slices fan out across disjoint paths and reassemble at the exit",
  "an onion cell travels the circuit, shedding a layer at each hop",
  "every request takes a fresh path through the relays",
  "packets enter a mix and leave reordered, delayed, among cover traffic",
  "a hybrid post-quantum handshake a quantum adversary cannot break",
  "a node id equals the hash of its keys, so records self-certify",
  "commit, then a one-output VRF nobody can bias, then verify",
  "the issuer blind-signs a token it never sees, so earn and spend cannot be linked",
  "committee members each emit a partial; only the client combines them",
  "a query splits across two servers, neither learning which record",
  "proof-of-work and subnet caps filter a flood of fake nodes",
  "two committee members jointly run a real TLS session so neither holds the key — slow, experimental",
];

export default function MechVisual({ index }: { index: number }) {
  const Scene = SCENES[index] ?? Slicing;
  return svg(<Scene />, LABELS[index] ?? "", index);
}
