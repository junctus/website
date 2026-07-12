"use client";

/**
 * The download strip under the hero. macOS and Linux are live: on mount they
 * resolve the newest assets from the GitHub releases API (asset names are
 * versioned, so a static latest/download permalink would go stale) and fall
 * back to the releases pages when the API is unreachable. Linux opens a
 * lightbox to pick an architecture (amd64 / arm64 .deb).
 */

import { useEffect, useRef, useState } from "react";

const MAC_RELEASES = "https://github.com/junctus/react-native/releases";
const MAC_API_LATEST =
  "https://api.github.com/repos/junctus/react-native/releases/latest";
const LINUX_RELEASES = "https://github.com/junctus/linux/releases";
const LINUX_API_LATEST =
  "https://api.github.com/repos/junctus/linux/releases/latest";

type GhRelease = {
  tag_name?: string;
  assets?: { name?: string; browser_download_url?: string }[];
} | null;

function fetchLatest(url: string, onRelease: (rel: GhRelease) => void) {
  return fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .then(onRelease)
    .catch(() => {});
}

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

function LinuxLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <ellipse cx="12" cy="7" rx="4.2" ry="4.4" fill="currentColor" />
      <ellipse cx="12" cy="14.6" rx="5.6" ry="6.9" fill="currentColor" />
      <ellipse cx="7.9" cy="21.5" rx="2.7" ry="1.5" fill="currentColor" />
      <ellipse cx="16.1" cy="21.5" rx="2.7" ry="1.5" fill="currentColor" />
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
  { os: "Android", icon: <AndroidLogo /> },
  { os: "iPhone", icon: <AppleLogo /> },
];

export default function DownloadBar() {
  const [dmgHref, setDmgHref] = useState(`${MAC_RELEASES}/latest`);
  const [macVersion, setMacVersion] = useState<string | null>(null);
  const [linux, setLinux] = useState<{
    amd: string;
    arm: string;
    version: string | null;
  }>({
    amd: `${LINUX_RELEASES}/latest`,
    arm: `${LINUX_RELEASES}/latest`,
    version: null,
  });
  const [linuxOpen, setLinuxOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchLatest(MAC_API_LATEST, (rel) => {
      if (cancelled || !rel) return;
      const dmg = rel.assets?.find((a) => a.name?.endsWith(".dmg"));
      if (dmg?.browser_download_url) setDmgHref(dmg.browser_download_url);
      if (rel.tag_name) setMacVersion(rel.tag_name);
    });
    fetchLatest(LINUX_API_LATEST, (rel) => {
      if (cancelled || !rel) return;
      const amd = rel.assets?.find((a) => a.name?.endsWith("_amd64.deb"));
      const arm = rel.assets?.find((a) => a.name?.endsWith("_arm64.deb"));
      setLinux((prev) => ({
        amd: amd?.browser_download_url ?? prev.amd,
        arm: arm?.browser_download_url ?? prev.arm,
        version: rel.tag_name ?? prev.version,
      }));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!linuxOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLinuxOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [linuxOpen]);

  return (
    <section className="dl" aria-label="Downloads">
      <div className="wrap dl__inner">
        <div className="dl__label">
          <span className="k">Get Started</span>
        </div>
        <a
          className="dl__item dl__item--live"
          href={dmgHref}
          aria-label={`Download Junctus neo for macOS${macVersion ? ` ${macVersion}` : ""} (.dmg)`}
        >
          <span className="dl__row">
            <span className="dl__id">
              <AppleLogo />
              <span className="dl__os">macOS</span>
            </span>
            <span className="dl__tag dl__tag--live">
              {macVersion ? `${macVersion} ↓` : ".dmg ↓"}
            </span>
          </span>
        </a>
        <button
          type="button"
          className="dl__item dl__item--live"
          aria-haspopup="dialog"
          aria-label={`Download Junctus neo for Linux${linux.version ? ` ${linux.version}` : ""} (.deb)`}
          onClick={() => setLinuxOpen(true)}
        >
          <span className="dl__row">
            <span className="dl__id">
              <LinuxLogo />
              <span className="dl__os">Linux</span>
            </span>
            <span className="dl__tag dl__tag--live">
              {linux.version ? `${linux.version} ↓` : ".deb ↓"}
            </span>
          </span>
        </button>
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

      {linuxOpen && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Linux downloads"
          onClick={() => setLinuxOpen(false)}
        >
          <div className="lb__panel" onClick={(e) => e.stopPropagation()}>
            <div className="lb__head">
              <span className="k">
                linux — pick your architecture
                {linux.version ? ` · ${linux.version}` : ""}
              </span>
              <button
                type="button"
                className="lb__x"
                ref={closeRef}
                onClick={() => setLinuxOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <a className="lb__opt" href={linux.amd}>
              <span className="lb__arch">AMD / Intel</span>
              <span className="k">x86_64 · .deb</span>
              <span className="dl__tag dl__tag--live">
                {linux.version ? `${linux.version} ↓` : "latest ↓"}
              </span>
            </a>
            <a className="lb__opt" href={linux.arm}>
              <span className="lb__arch">ARM</span>
              <span className="k">arm64 · .deb</span>
              <span className="dl__tag dl__tag--live">
                {linux.version ? `${linux.version} ↓` : "latest ↓"}
              </span>
            </a>
            <p className="lb__hint k">
              install: sudo dpkg -i neo-linux_*.deb · not sure? uname -m —
              x86_64 → AMD, aarch64 → ARM
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
