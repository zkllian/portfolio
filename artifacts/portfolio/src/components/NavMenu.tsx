import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useCredit } from '@/hooks/useCredit';

export default function NavMenu() {
  const [location, navigate] = useLocation();
  const { secretClick, dotColor, modal: creditModal } = useCredit();

  const isTentang = location === '/' || location === '/tentang';
  const isKontak = location === '/kontak';
  const isProyek = location === '/proyek';

  /* ── breadcrumb expand/collapse animation ── */
  // 'tentang' | 'kontak' | 'proyek'
  type CrumbPage = 'tentang' | 'kontak' | 'proyek';
  const getCrumb = (loc: string): CrumbPage =>
    loc === '/kontak' ? 'kontak' : (loc === '/' || loc === '/tentang') ? 'tentang' : 'proyek';

  const [crumb, setCrumb] = useState<CrumbPage>(getCrumb(location));
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const prevLocRef = useRef(location);

  useEffect(() => {
    if (location === prevLocRef.current) return;
    prevLocRef.current = location;
    const DELAY = 120;
    const t0 = setTimeout(() => setPhase('out'), DELAY);
    const t1 = setTimeout(() => {
      setCrumb(getCrumb(location));
      setPhase('in');
    }, DELAY + 180);
    const t2 = setTimeout(() => setPhase('idle'), DELAY + 180 + 420);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [location]);

  const crumbClass = `logo-crumbs${
    phase === 'out' ? ' logo-crumbs--out' :
    phase === 'in'  ? ' logo-crumbs--in'  : ''
  }`;

  /* ── dropdown menu ── */
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuVisible(false);
    setTimeout(() => setMenuOpen(false), 180);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu();
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  function playMenuSound(type: 'open' | 'close') {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      if (type === 'open') {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.07);
      } else {
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.07);
      }
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
      osc.onended = () => ctx.close();
    } catch { /* AudioContext not supported or blocked */ }
  }

  function openMenu() {
    playMenuSound('open');
    setMenuOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setMenuVisible(true)));
  }
  function closeMenu() {
    playMenuSound('close');
    setMenuVisible(false);
    setTimeout(() => setMenuOpen(false), 240);
  }
  function toggleMenu() {
    if (menuOpen) closeMenu(); else openMenu();
  }

  return (
    <>
      <div className="nav-bar" ref={menuRef}>
        <div className="logo-wrap">
          <div className="logo-row">
            <div className="logo-icon-wrap" onClick={secretClick}>
              <div className="logo-icon-ring logo-icon-ring--1"></div>
              <div className="logo-icon-ring logo-icon-ring--2"></div>
              <div className="logo-icon" style={{ background: dotColor, transition: 'background 0.2s ease' }}></div>
            </div>
            <div className="logo-label">
              <button className="logo-menu-btn" onClick={toggleMenu}>
                <span className="logo-root">llian</span>
                <span className={`logo-menu-arrow${menuOpen ? ' open' : ''}`}>▾</span>
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className={`nav-menu${menuVisible ? ' visible' : ''}`}>
            <button
              className={`nav-menu-item${isTentang ? ' nav-menu-item--active' : ''}`}
              onClick={() => { if (!isTentang) { closeMenu(); navigate('/'); } else closeMenu(); }}
            >
              Tentang
            </button>
            <button
              className={`nav-menu-item${isKontak ? ' nav-menu-item--active' : ''}`}
              onClick={() => { if (!isKontak) { closeMenu(); navigate('/kontak'); } else closeMenu(); }}
            >
              Kontak
            </button>
            <button
              className={`nav-menu-item${isProyek ? ' nav-menu-item--active' : ''}`}
              onClick={() => { if (!isProyek) { closeMenu(); navigate('/proyek'); } else closeMenu(); }}
            >
              Proyek
            </button>
          </div>
        )}

        {crumb === 'tentang' ? (
          <div className={`breadcrumb-pill ${crumbClass}`}>
            <span className="logo-sep">/</span>
            <span className="logo-crumb">Tentang</span>
          </div>
        ) : crumb === 'kontak' ? (
          <div className={`breadcrumb-pill ${crumbClass}`}>
            <span className="logo-sep">/</span>
            <span className="logo-crumb">Kontak</span>
          </div>
        ) : (
          <div className={`breadcrumb-pill ${crumbClass}`}>
            <span className="logo-sep">/</span>
            <span className="logo-crumb">Proyek</span>
          </div>
        )}
      </div>

      {creditModal}
    </>
  );
}
