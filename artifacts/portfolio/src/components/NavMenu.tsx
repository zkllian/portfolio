import { useRef } from 'react';
import { useLocation } from 'wouter';
import { useCredit } from '@/hooks/useCredit';

export default function NavMenu() {
  const [location, navigate] = useLocation();
  const { secretClick, dotColor, modal: creditModal } = useCredit();
  const navRef = useRef<HTMLDivElement>(null);

  const isTentang = location === '/' || location === '/tentang';
  const isKontak  = location === '/kontak';
  const isProyek  = location === '/proyek';

  const pages = [
    { label: 'Tentang', path: '/tentang', active: isTentang },
    { label: 'Kontak',  path: '/kontak',  active: isKontak  },
    { label: 'Proyek',  path: '/proyek',  active: isProyek  },
  ];

  return (
    <>
      <div className="nav-pill" ref={navRef}>
        {/* ── Left: logo dot + name ── */}
        <div className="nav-pill-left">
          <div className="logo-icon-wrap" onClick={secretClick}>
            <div className="logo-icon-ring logo-icon-ring--1"></div>
            <div className="logo-icon-ring logo-icon-ring--2"></div>
            <div
              className="logo-icon"
              style={{ background: dotColor, transition: 'background 0.2s ease' }}
            ></div>
          </div>
          <span className="nav-pill-name">llian</span>
        </div>

        {/* ── Right: page links ── */}
        <div className="nav-pill-links">
          {pages.map(({ label, path, active }) => (
            <button
              key={path}
              className={`nav-pill-link${active ? ' nav-pill-link--active' : ''}`}
              onClick={() => !active && navigate(path)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {creditModal}
    </>
  );
}
