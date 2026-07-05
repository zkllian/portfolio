import { useEffect, useRef, useState } from 'react';

const TAP_COLORS = ['#ffffff', '#7850ff', '#00b96b'];

export function useCredit() {
  const BASE = import.meta.env.BASE_URL;
  const [creditOpen, setCreditOpen] = useState(false);
  const [creditVisible, setCreditVisible] = useState(false);
  const [dotColor, setDotColor] = useState('#000000');
  const tapCountRef = useRef(0);
  const tapResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (creditOpen) spawnParticles();
  }, [creditOpen]);

  useEffect(() => {
    if (!creditOpen) return;
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setCreditVisible(false);
        setTimeout(() => setCreditOpen(false), 300);
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [creditOpen]);

  function playPop() {
    try {
      // @ts-ignore
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const t = ac.currentTime;
      const o1 = ac.createOscillator(), g1 = ac.createGain();
      o1.connect(g1); g1.connect(ac.destination);
      o1.frequency.setValueAtTime(180, t); o1.frequency.exponentialRampToValueAtTime(60, t + 0.12);
      g1.gain.setValueAtTime(0.5, t); g1.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      o1.start(t); o1.stop(t + 0.18);
      const o2 = ac.createOscillator(), g2 = ac.createGain();
      o2.type = 'sine'; o2.connect(g2); g2.connect(ac.destination);
      o2.frequency.setValueAtTime(900, t + 0.05); o2.frequency.exponentialRampToValueAtTime(1400, t + 0.15);
      g2.gain.setValueAtTime(0.18, t + 0.05); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      o2.start(t + 0.05); o2.stop(t + 0.3);
      setTimeout(() => ac.close().catch(() => {}), 500);
    } catch {}
  }

  function spawnParticles() {
    const container = document.getElementById('creditParticles');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#7850ff', '#c850fc', '#0070f3', '#fff', '#ff5050', '#00b96b'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'credit-particle';
      const size = Math.random() * 6 + 3;
      const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.5;
      const dist = 60 + Math.random() * 60;
      const tx = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      p.style.cssText = `width:${size}px;height:${size}px;background:${colors[i % colors.length]};left:calc(50% - ${size / 2}px);top:calc(50% - ${size / 2}px);--tx:${tx};animation-delay:${Math.random() * 0.15}s;animation-duration:${0.9 + Math.random() * 0.4}s;`;
      container.appendChild(p);
    }
  }

  function secretClick() {
    if (tapResetRef.current) clearTimeout(tapResetRef.current);
    tapCountRef.current += 1;
    tapResetRef.current = setTimeout(() => { tapCountRef.current = 0; setDotColor('#000000'); }, 1500);
    const nextColor = TAP_COLORS[tapCountRef.current % TAP_COLORS.length];
    setDotColor(nextColor);
    if (tapCountRef.current < 3) return;
    tapCountRef.current = 0;
    setDotColor('#000000');
    if (navigator.vibrate) navigator.vibrate([40, 30, 60]);
    playPop();
    setCreditOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setCreditVisible(true)));
  }

  function closeCredit(e: React.MouseEvent) {
    if (e && e.target !== e.currentTarget) return;
    setCreditVisible(false);
    setTimeout(() => setCreditOpen(false), 300);
  }

  const modal = creditOpen ? (
    <div className={`credit-overlay open${creditVisible ? ' visible' : ''}`} onClick={closeCredit}>
      <div className="credit-modal">
        <div className="credit-particles" id="creditParticles"></div>
        <div className="credit-modal-glow"></div>
        <button className="credit-close" onClick={() => { setCreditVisible(false); setTimeout(() => setCreditOpen(false), 300); }}>✕</button>
        <div className="credit-tag">// made by</div>
        <div className="credit-modal-avatar">
          <img src={`${BASE}avatar.png`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        </div>
        <div className="credit-modal-name">agoy ganteng banget</div>
        <div className="credit-modal-sub">crafted with ✦ by the legend himself</div>
        <div className="credit-modal-divider"></div>
        <div className="credit-modal-footer">barcode-gen · imei · v1.0</div>
      </div>
    </div>
  ) : null;

  return { secretClick, dotColor, modal };
}
