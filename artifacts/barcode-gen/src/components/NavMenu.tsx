import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useCredit } from '@/hooks/useCredit';

export default function NavMenu() {
  const [location, navigate] = useLocation();
  const { secretClick, dotColor, modal: creditModal } = useCredit();

  /* ── Theme toggle ── */
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const isTentang = location === '/tentang';

  /* ── breadcrumb expand/collapse animation ── */
  const [shown, setShown] = useState(isTentang);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const prevLocRef = useRef(location);

  useEffect(() => {
    if (location === prevLocRef.current) return;
    prevLocRef.current = location;
    const DELAY = 120;
    const t0 = setTimeout(() => setPhase('out'), DELAY);
    const t1 = setTimeout(() => {
      setShown(location === '/tentang');
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
        <button className="theme-toggle" onClick={toggleTheme} aria-label="toggle theme">
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
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
            {shown ? (
              <span className={crumbClass}>
                <span className="logo-sep"> / </span>
                <span className="logo-crumb">tentang</span>
              </span>
            ) : (
              <span className={crumbClass}>
                <span className="logo-sep"> / </span>
                <span className="logo-crumb">projects</span>
                <span className="logo-sep"> / </span>
                <span className="logo-crumb">imei</span>
                <span className="logo-sep"> / </span>
                <span className="logo-crumb">barcode-gen</span>
              </span>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className={`nav-menu${menuVisible ? ' visible' : ''}`}>
            <button
              className={`nav-menu-item${isTentang ? ' nav-menu-item--active' : ''}`}
              onClick={() => { if (!isTentang) { closeMenu(); navigate('/tentang'); } else closeMenu(); }}
            >
              tentang
            </button>
            <div className="nav-menu-sub-wrap">
              <span className="nav-menu-item nav-menu-item--parent">projects</span>
              <div className="nav-menu-sub">
                <button
                  className={`nav-menu-item nav-menu-item--child${!isTentang ? ' nav-menu-item--active' : ''}`}
                  onClick={() => { if (isTentang) { closeMenu(); navigate('/projects/imei/barcode-gen'); } else closeMenu(); }}
                >
                  imei / barcode-gen
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {creditModal}
    </>
  );
}
