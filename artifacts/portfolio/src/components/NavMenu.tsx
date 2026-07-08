import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useCredit } from '@/hooks/useCredit';

const PAGES = [
  { label: 'Tentang', path: '/tentang', match: (l: string) => l === '/' || l === '/tentang' },
  { label: 'Kontak',  path: '/kontak',  match: (l: string) => l === '/kontak'  },
  { label: 'Proyek',  path: '/proyek',  match: (l: string) => l === '/proyek'  },
];

export default function NavMenu() {
  const [location, navigate] = useLocation();
  const { secretClick, dotColor, modal: creditModal } = useCredit();

  const activeIdx = PAGES.findIndex(p => p.match(location));
  const btnRefs   = useRef<(HTMLButtonElement | null)[]>([]);
  const linksRef  = useRef<HTMLDivElement>(null);

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [ready, setReady]         = useState(false);

  function measure(idx: number) {
    const btn    = btnRefs.current[idx];
    const parent = linksRef.current;
    if (!btn || !parent) return;
    const bRect = btn.getBoundingClientRect();
    const pRect = parent.getBoundingClientRect();
    setIndicator({ left: bRect.left - pRect.left, width: bRect.width });
  }

  useEffect(() => {
    if (activeIdx < 0) return;
    measure(activeIdx);
    const t = setTimeout(() => setReady(true), 32);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (activeIdx < 0) return;
    measure(activeIdx);
  }, [activeIdx]);

  return (
    <>
      <div className="nav-pill">
        <div className="nav-pill-left">
          <div className="logo-icon-wrap" onClick={secretClick}>
            <div className="logo-icon-ring logo-icon-ring--1"></div>
            <div className="logo-icon-ring logo-icon-ring--2"></div>
            <div
              className="logo-icon"
              style={{ background: dotColor, transition: 'background 0.2s ease' }}
            />
          </div>
          <span className="nav-pill-name">llian</span>
        </div>

        <div className="nav-pill-links" ref={linksRef}>
          <div
            className="nav-pill-indicator"
            style={{
              left:  indicator.left,
              width: indicator.width,
              transition: ready
                ? 'left 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.25s, width 0.38s cubic-bezier(0.34,1.56,0.64,1) 0.25s'
                : 'none',
            }}
          />

          {PAGES.map(({ label, path, match }, i) => {
            const active = match(location);
            return (
              <button
                key={path}
                ref={el => { btnRefs.current[i] = el; }}
                className={`nav-pill-link${active ? ' nav-pill-link--active' : ''}`}
                onClick={() => { if (!active) navigate(path); }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {creditModal}
    </>
  );
}
