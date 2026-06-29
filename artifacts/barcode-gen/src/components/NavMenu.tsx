import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useCredit } from '@/hooks/useCredit';

export default function NavMenu() {
  const [location] = useLocation();
  const { secretClick, dotColor, modal: creditModal } = useCredit();

  const isTentang = location === '/tentang';
  const [shown, setShown] = useState(isTentang);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const prevRef = useRef(location);

  useEffect(() => {
    if (location === prevRef.current) return;
    prevRef.current = location;

    setPhase('out');
    const t1 = setTimeout(() => {
      setShown(location === '/tentang');
      setPhase('in');
    }, 180);
    const t2 = setTimeout(() => setPhase('idle'), 180 + 420);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [location]);

  const crumbClass = `logo-crumbs${
    phase === 'out' ? ' logo-crumbs--out' :
    phase === 'in'  ? ' logo-crumbs--in'  : ''
  }`;

  return (
    <>
      <div className="logo-wrap">
        <div className="logo-row">
          <div className="logo-icon-wrap" onClick={secretClick}>
            <div className="logo-icon-ring logo-icon-ring--1"></div>
            <div className="logo-icon-ring logo-icon-ring--2"></div>
            <div className="logo-icon" style={{ background: dotColor, transition: 'background 0.2s ease' }}></div>
          </div>
          <div className="logo-label">
            <span className="logo-root">llian</span>
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
      </div>
      {creditModal}
    </>
  );
}
