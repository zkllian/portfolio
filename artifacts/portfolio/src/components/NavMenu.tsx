import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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

  const active = PAGES.find(p => p.match(location)) ?? PAGES[0];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        rootRef.current && !rootRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // close on route change
  useEffect(() => { setOpen(false); }, [location]);

  // position the portaled menu relative to the trigger button
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const btn = triggerRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      setMenuPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open]);

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

        <div className="nav-dropdown" ref={rootRef}>
          <button
            id="nav-dropdown-trigger"
            ref={triggerRef}
            className={`nav-dropdown-trigger${open ? ' nav-dropdown-trigger--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="nav-dropdown-menu"
          >
            <span>{active.label}</span>
            <svg
              className="nav-dropdown-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {createPortal(
            <div
              id="nav-dropdown-menu"
              ref={menuRef}
              className={`nav-dropdown-menu${open ? ' nav-dropdown-menu--open' : ''}`}
              style={{ top: menuPos.top, right: menuPos.right }}
              aria-hidden={!open}
              inert={open ? undefined : true}
            >
              {PAGES.map(({ label, path, match }) => {
                const isActive = match(location);
                return (
                  <button
                    key={path}
                    tabIndex={open ? 0 : -1}
                    className={`nav-dropdown-item${isActive ? ' nav-dropdown-item--active' : ''}`}
                    onClick={() => { if (!isActive) navigate(path); setOpen(false); }}
                  >
                    {label}
                    {isActive && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-dropdown-check">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>,
            document.body
          )}
        </div>
      </div>

      {creditModal}
    </>
  );
}
