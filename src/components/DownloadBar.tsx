"use client";

/**
 * The download strip under the hero. The macOS entry is live: on mount it
 * resolves the newest .dmg from the GitHub releases API (asset names are
 * versioned, so a static latest/download permalink would go stale) and falls
 * back to the releases/latest page when the API is unreachable.
 */

import { useEffect, useState } from "react";

const MAC_RELEASES = "https://github.com/junctus/react-native/releases";
const MAC_API_LATEST =
  "https://api.github.com/repos/junctus/react-native/releases/latest";

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

const PENDING: { os: string; icon: React.ReactNode }[] = [
  { os: "Ubuntu", icon: <UbuntuLogo /> },
  { os: "Android", icon: <AndroidLogo /> },
  { os: "iPhone", icon: <AppleLogo /> },
];

export default function DownloadBar() {
  const [dmgHref, setDmgHref] = useState(`${MAC_RELEASES}/latest`);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(MAC_API_LATEST)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (rel: {
          tag_name?: string;
          assets?: { name?: string; browser_download_url?: string }[];
        } | null) => {
          if (cancelled || !rel) return;
          const dmg = rel.assets?.find((a) => a.name?.endsWith(".dmg"));
          if (dmg?.browser_download_url) setDmgHref(dmg.browser_download_url);
          if (rel.tag_name) setVersion(rel.tag_name);
        },
      )
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="dl" aria-label="Downloads">
      <div className="wrap dl__inner">
        <div className="dl__label">
          <span className="k">Get Started</span>
        </div>
        <a
          className="dl__item dl__item--live"
          href={dmgHref}
          aria-label={`Download Junctus neo for macOS${version ? ` ${version}` : ""} (.dmg)`}
        >
          <span className="dl__row">
            <span className="dl__id">
              <AppleLogo />
              <span className="dl__os">macOS</span>
            </span>
            <span className="dl__tag dl__tag--live">
              {version ? `${version} ↓` : ".dmg ↓"}
            </span>
          </span>
        </a>
        {PENDING.map((d) => (
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
