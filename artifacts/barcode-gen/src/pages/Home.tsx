'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

function NudgeRow({ label, xField, yField, pos, onSetPos, onStartNudge, onStopNudge }: {
  label: string;
  xField: string;
  yField: string;
  pos: Record<string, number>;
  onSetPos: (fn: (p: Record<string, number>) => Record<string, number>) => void;
  onStartNudge: (field: string, dir: number) => void;
  onStopNudge: () => void;
}) {
  return (
    <div className="pos-row">
      <span className="pos-label">{label}</span>
      <div className="nudge-group">
        <div className="nudge-axis">
          <span className="axis-lbl">X</span>
          <button className="nb"
            onPointerDown={() => onStartNudge(xField, -1)}
            onPointerUp={onStopNudge}
            onPointerLeave={onStopNudge}>‹</button>
          <input type="number" value={pos[xField]}
            onChange={e => onSetPos(p => ({ ...p, [xField]: parseInt(e.target.value) || 0 }))} />
          <button className="nb"
            onPointerDown={() => onStartNudge(xField, 1)}
            onPointerUp={onStopNudge}
            onPointerLeave={onStopNudge}>›</button>
        </div>
        <div className="nudge-axis">
          <span className="axis-lbl">Y</span>
          <button className="nb"
            onPointerDown={() => onStartNudge(yField, -1)}
            onPointerUp={onStopNudge}
            onPointerLeave={onStopNudge}>▲</button>
          <input type="number" value={pos[yField]}
            onChange={e => onSetPos(p => ({ ...p, [yField]: parseInt(e.target.value) || 0 }))} />
          <button className="nb"
            onPointerDown={() => onStartNudge(yField, 1)}
            onPointerUp={onStopNudge}
            onPointerLeave={onStopNudge}>▼</button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [inputVal, setInputVal] = useState('');
  const [imeiCount, setImeiCount] = useState('0 set');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Generating...');
  const [loadingCount, setLoadingCount] = useState('');
  const [view, setView] = useState('input');
  const [results, setResults] = useState<{ url: string; index: number }[]>([]);
  const [resultLabel, setResultLabel] = useState('0 results');

  const [posOpen, setPosOpen] = useState(false);
  const [pos, setPos] = useState<Record<string, number>>({
    eid_x: 102, eid_y: 369,
    imei1_x: 275, imei1_y: 670,
    imei2_x: 285, imei2_y: 955,
    meid_x: 285, meid_y: 1238,
    font_size: 31,
  });
  const posRef = useRef(pos);
  const [nudgeStep, setNudgeStep] = useState(1);
  const nudgeStepRef = useRef(1);
  const [previewDim, setPreviewDim] = useState('738 × 1600');
  const [pickedCoord, setPickedCoord] = useState<{ x: number; y: number } | null>(null);
  const [showPickInfo, setShowPickInfo] = useState(false);

  const [creditOpen, setCreditOpen] = useState(false);
  const [creditVisible, setCreditVisible] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const [showToastState, setShowToastState] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inlineError, setInlineError] = useState('');

  const [dotHintVisible, setDotHintVisible] = useState(false);
  const [dotHintMsg, setDotHintMsg] = useState('');

  const inputValRef = useRef('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval> | null>(null);
  const pickedXRef = useRef(0);
  const pickedYRef = useRef(0);

  const BASE = import.meta.env.BASE_URL;

  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    const img = new Image();
    img.src = `${BASE}template.png`;
    img.onload = () => {
      if (canvasRef.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
      }
    };
    baseImageRef.current = img;
    if (document.fonts?.load) {
      document.fonts.load("400 32px 'SF Pro Custom'");
      document.fonts.load("500 32px 'SF Pro Custom'");
    }
  }, []);

  useEffect(() => {
    const msgs = [
      'psst... coba klik aku 👀',
      'ada yang tersembunyi di sini~',
      'hmm, kira-kira ada apa ya?',
      'jangan diklik kalau penasaran 😏',
      'klik aku deh, sekali aja',
      'ada rahasia kecil di sini...',
      '...kamu tidak penasaran?',
      'ini tombol apa ya 🤔',
    ];
    let hintTimeout: ReturnType<typeof setTimeout>;
    let hideTimeout: ReturnType<typeof setTimeout>;
    function showHint() {
      setDotHintMsg(msgs[Math.floor(Math.random() * msgs.length)]);
      setDotHintVisible(true);
      hideTimeout = setTimeout(() => { setDotHintVisible(false); scheduleNext(); }, 3500);
    }
    function scheduleNext() {
      hintTimeout = setTimeout(showHint, 12000 + Math.random() * 18000);
    }
    hintTimeout = setTimeout(showHint, 8000 + Math.random() * 10000);
    return () => { clearTimeout(hintTimeout); clearTimeout(hideTimeout); };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && creditOpen) {
        setCreditVisible(false);
        setTimeout(() => setCreditOpen(false), 300);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [creditOpen]);

  useEffect(() => {
    if (creditOpen) spawnParticles();
  }, [creditOpen]);

  useEffect(() => {
    if (posOpen) drawPreview(posRef.current);
  }, [posOpen]);

  useEffect(() => {
    if (posOpen) drawPreview(pos);
  }, [pos]);

  function randomDigits(len: number) {
    return Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');
  }
  function randomEID() { return '89049032' + randomDigits(24); }
  function meidFromImei(imei: string) { return imei.slice(0, 14); }

  function showToast(msg: string) {
    setToastMsg(msg);
    setShowToastState(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setShowToastState(false), 3000);
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value.replace(/[^0-9\n]/g, '');
    inputValRef.current = val;
    setInputVal(val);
    const lines = val.split('\n').filter(Boolean);
    setImeiCount(Math.floor(lines.length / 2) + ' set');
  }

  function resetAll() {
    inputValRef.current = '';
    setInputVal('');
    setResults([]);
    setView('input');
    setImeiCount('0 set');
    setInlineError('');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }

  function goBack() {
    setView('input');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }

  async function generateBulk() {
    setInlineError('');
    try {
      const lines = inputValRef.current.split('\n').map((v: string) => v.trim()).filter(Boolean);
      if (lines.length < 2) {
        setInlineError('Minimal 1 set: IMEI 1 + IMEI 2 (masing-masing 15 digit)');
        return;
      }

      const totalSets = Math.floor(lines.length / 2);
      for (let i = 0; i < totalSets; i++) {
        const im1 = lines[i * 2], im2 = lines[i * 2 + 1];
        if (im1.length !== 15) { setInlineError(`Set ${i+1}: IMEI 1 harus 15 digit (dapat ${im1.length})`); return; }
        if (im2.length !== 15) { setInlineError(`Set ${i+1}: IMEI 2 harus 15 digit (dapat ${im2.length})`); return; }
      }

      const img = baseImageRef.current;
      if (!img) { setInlineError('Image belum siap, coba lagi'); return; }
      if (!img.complete || !img.naturalWidth) {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Gagal load template image'));
        });
      }
      if (!img.naturalWidth) { setInlineError('Template image gagal dimuat'); return; }

      if (document.fonts?.load) {
        await Promise.allSettled([
          document.fonts.load("400 32px 'SF Pro Custom'"),
          document.fonts.load("500 32px 'SF Pro Custom'"),
        ]);
      }

      const cvs = canvasRef.current;
      if (!cvs) { setInlineError('Canvas tidak ditemukan'); return; }
      cvs.width = img.naturalWidth;
      cvs.height = img.naturalHeight;
      const ctx = cvs.getContext('2d');
      if (!ctx) { setInlineError('Tidak bisa buat canvas context'); return; }

      const newResults: { url: string; index: number }[] = [];
      setIsLoading(true);

      for (let i = 0; i < totalSets; i++) {
        setLoadingText('Generating barcode...');
        setLoadingCount(`${i + 1}/${totalSets}`);
        await new Promise(r => setTimeout(r, 30));

        const eid = randomEID();
        const im1 = lines[i * 2];
        const im2 = lines[i * 2 + 1];
        const p = posRef.current;

        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#000';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.font = `400 ${p.font_size}px 'SF Pro Custom', -apple-system, sans-serif`;

        ctx.fillText(eid,               p.eid_x,   p.eid_y);
        ctx.fillText(im1,               p.imei1_x, p.imei1_y);
        ctx.fillText(im2,               p.imei2_x, p.imei2_y);
        ctx.fillText(meidFromImei(im1), p.meid_x,  p.meid_y);

        newResults.push({ url: cvs.toDataURL('image/png'), index: i + 1 });
      }

      setIsLoading(false);
      setResults(newResults);
      setResultLabel(totalSets + ' result' + (totalSets > 1 ? 's' : ''));
      setView('results');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } catch (err: unknown) {
      setIsLoading(false);
      setInlineError('Error: ' + ((err instanceof Error) ? err.message : String(err)));
    }
  }

  function downloadImage(dataUrl: string, index: number) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `barcode-${index}.png`;
    a.click();
  }

  async function shareImage(dataUrl: string) {
    if (!navigator.share) { showToast('Browser tidak mendukung share'); return; }
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], 'barcode.png', { type: 'image/png' });
    // @ts-ignore
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file] });
    }
  }

  function setStep(v: number) {
    setNudgeStep(v);
    nudgeStepRef.current = v;
  }

  function startNudge(field: string, dir: number) {
    doNudge(field, dir);
    nudgeTimerRef.current = setTimeout(() => {
      nudgeTimerRef.current = setInterval(() => doNudge(field, dir), 60);
    }, 350);
  }

  function stopNudge() {
    if (nudgeTimerRef.current) {
      clearTimeout(nudgeTimerRef.current as ReturnType<typeof setTimeout>);
      clearInterval(nudgeTimerRef.current as ReturnType<typeof setInterval>);
    }
    nudgeTimerRef.current = null;
  }

  function doNudge(field: string, dir: number) {
    setPos(prev => ({ ...prev, [field]: (prev[field] || 0) + dir * nudgeStepRef.current }));
  }

  function drawMarker(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    const s = 14;
    ctx.strokeStyle = color; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - s, y + 5); ctx.lineTo(x + s, y + 5);
    ctx.moveTo(x, y + 5 - s); ctx.lineTo(x, y + 5 + s);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - s + 2, y + 5); ctx.lineTo(x + s - 2, y + 5);
    ctx.moveTo(x, y + 5 - s + 2); ctx.lineTo(x, y + 5 + s - 2);
    ctx.stroke();
  }

  function drawPreview(p: Record<string, number>) {
    const img = baseImageRef.current;
    if (!img || !img.complete || !img.naturalWidth) return;
    const cvs = previewCanvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    const W = img.width, H = img.height;
    cvs.width = W; cvs.height = H;
    setPreviewDim(`${W} × ${H}`);

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = '#000'; ctx.textBaseline = 'top'; ctx.textAlign = 'left';
    ctx.font = `400 ${p.font_size}px 'SF Pro Custom', -apple-system, sans-serif`;

    ctx.fillText('88166587266534996332652007294687', p.eid_x,   p.eid_y);
    ctx.fillText('111111111111111',                  p.imei1_x, p.imei1_y);
    ctx.fillText('222222222222222',                  p.imei2_x, p.imei2_y);
    ctx.fillText('11111111111111',                   p.meid_x,  p.meid_y);

    drawMarker(ctx, p.eid_x,   p.eid_y,   '#f59e0b');
    drawMarker(ctx, p.imei1_x, p.imei1_y, '#3b82f6');
    drawMarker(ctx, p.imei2_x, p.imei2_y, '#10b981');
    drawMarker(ctx, p.meid_x,  p.meid_y,  '#e879f9');

    const legend = [
      { color: '#f59e0b', label: 'EID' },
      { color: '#3b82f6', label: 'IMEI 1' },
      { color: '#10b981', label: 'IMEI 2' },
      { color: '#e879f9', label: 'MEID' },
    ];
    legend.forEach((l, i) => {
      ctx.fillStyle = l.color;
      ctx.fillRect(16, 16 + i * 36, 10, 10);
      ctx.fillStyle = '#000';
      ctx.font = `500 ${Math.max(p.font_size - 2, 12)}px -apple-system, sans-serif`;
      ctx.fillText(l.label, 32, 14 + i * 36);
    });
  }

  function handlePreviewClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const cvs = previewCanvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const scaleX = cvs.width / rect.width;
    const scaleY = cvs.height / rect.height;
    pickedXRef.current = Math.round((e.clientX - rect.left) * scaleX);
    pickedYRef.current = Math.round((e.clientY - rect.top) * scaleY);
    setPickedCoord({ x: pickedXRef.current, y: pickedYRef.current });
    setShowPickInfo(true);
  }

  function applyPick(field: string) {
    const x = pickedXRef.current, y = pickedYRef.current;
    if (field === 'eid')        setPos(p => ({ ...p, eid_x: x, eid_y: y }));
    else if (field === 'imei1') setPos(p => ({ ...p, imei1_x: x, imei1_y: y }));
    else if (field === 'imei2') setPos(p => ({ ...p, imei2_x: x, imei2_y: y }));
    else if (field === 'meid')  setPos(p => ({ ...p, meid_x: x, meid_y: y }));
    setShowPickInfo(false);
  }

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
    } catch (e) {}
  }

  function spawnParticles() {
    const container = document.getElementById('creditParticles');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#7850ff','#c850fc','#0070f3','#fff','#ff5050','#00b96b'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'credit-particle';
      const size = Math.random() * 6 + 3;
      const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.5;
      const dist = 60 + Math.random() * 60;
      const tx = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
      p.style.cssText = `width:${size}px;height:${size}px;background:${colors[i % colors.length]};left:calc(50% - ${size/2}px);top:calc(50% - ${size/2}px);--tx:${tx};animation-delay:${Math.random()*0.15}s;animation-duration:${0.9+Math.random()*0.4}s;`;
      container.appendChild(p);
    }
  }

  function secretClick() {
    setDotHintVisible(false);
    if (navigator.vibrate) navigator.vibrate([40, 30, 60]);
    playPop();
    spawnParticles();
    setCreditOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setCreditVisible(true)));
  }

  function closeCredit(e: React.MouseEvent) {
    if (e && e.target !== e.currentTarget) return;
    setCreditVisible(false);
    setTimeout(() => setCreditOpen(false), 300);
  }

  const nudgeProps = { pos, onSetPos: setPos, onStartNudge: startNudge, onStopNudge: stopNudge };

  return (
    <>
      <div className="logo-wrap">
        <div className="logo-row">
          <div className="logo-icon-wrap" onClick={secretClick}>
            <div className="logo-icon-ring"></div>
            <div className="logo-icon"></div>
          </div>
          <div className="logo-label">
            <span className="logo-name">imei</span>
            <span className="logo-sep"> / </span>
            <span>barcode-gen</span>
          </div>
        </div>
      </div>

      <div className="container">

        {view === 'input' && (
          <div className="view-input">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Input</span>
                <span className="badge">{imeiCount}</span>
              </div>
              <div className="input-wrap">
                <textarea
                  value={inputVal}
                  onChange={handleInput}
                  placeholder="Masukan nomor IMEI..."
                />
              </div>

              {inlineError && (
                <div className="inline-error">{inlineError}</div>
              )}
              <div className="btn-row">
                <button className="btn btn-primary" onClick={() => generateBulk()} disabled={isLoading}>Generate</button>
              </div>
              {isLoading && (
                <div className="status-bar active">
                  <div className="spinner"></div>
                  <span className="status-progress">{loadingText}</span>
                  <span className="status-count">{loadingCount}</span>
                </div>
              )}
            </div>

            <div className="card pos-card">
              <div className="card-header pos-toggle" onClick={() => setPosOpen(v => !v)}>
                <span className="card-title">Posisi Teks</span>
                <span className={`pos-arrow${posOpen ? ' open' : ''}`}>›</span>
              </div>
              <div className={`pos-body${posOpen ? ' open' : ''}`}>
                <div className="nudge-step-row">
                  <span className="pos-label" style={{ width: 'auto', color: 'var(--text-dim)' }}>step</span>
                  <div className="step-btns">
                    {[0.5, 1, 5, 10].map(v => (
                      <button key={v} className={`step-btn${nudgeStep === v ? ' active' : ''}`} onClick={() => setStep(v)}>{v}</button>
                    ))}
                  </div>
                </div>
                <NudgeRow label="EID"    xField="eid_x"   yField="eid_y"   {...nudgeProps} />
                <NudgeRow label="IMEI 1" xField="imei1_x" yField="imei1_y" {...nudgeProps} />
                <NudgeRow label="IMEI 2" xField="imei2_x" yField="imei2_y" {...nudgeProps} />
                <NudgeRow label="MEID"   xField="meid_x"  yField="meid_y"  {...nudgeProps} />
                <div className="pos-row">
                  <span className="pos-label">Font</span>
                  <div className="nudge-group">
                    <div className="nudge-axis">
                      <span className="axis-lbl">px</span>
                      <button className="nb" onPointerDown={() => startNudge('font_size', -1)} onPointerUp={stopNudge} onPointerLeave={stopNudge}>‹</button>
                      <input type="number" min="8" max="60" step="0.5" value={pos.font_size}
                        onChange={e => setPos(p => ({ ...p, font_size: parseFloat(e.target.value) || 8 }))} />
                      <button className="nb" onPointerDown={() => startNudge('font_size', 1)} onPointerUp={stopNudge} onPointerLeave={stopNudge}>›</button>
                    </div>
                  </div>
                </div>
                <div className="preview-wrap">
                  <div className="preview-header">
                    <span className="preview-label">live preview</span>
                    <span className="preview-dim">{previewDim}</span>
                  </div>
                  <div className="preview-stage">
                    <canvas ref={previewCanvasRef} id="previewCanvas" onClick={handlePreviewClick}></canvas>
                    <div className="preview-tap-hint">tap gambar → ambil koordinat X,Y</div>
                  </div>
                  {showPickInfo && pickedCoord && (
                    <div className="preview-pick-info">
                      <span className="pick-label">X: {pickedCoord.x}  Y: {pickedCoord.y} → terapkan ke:</span>
                      <div className="pick-btns">
                        <button onClick={() => applyPick('eid')}>EID</button>
                        <button onClick={() => applyPick('imei1')}>IMEI 1</button>
                        <button onClick={() => applyPick('imei2')}>IMEI 2</button>
                        <button onClick={() => applyPick('meid')}>MEID</button>
                        <button className="pick-cancel" onClick={() => setShowPickInfo(false)}>Batal</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'results' && (
          <div className="view-results">
            <div className="results-topbar">
              <button className="results-back-btn" onClick={goBack}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 2.5L4 7L8.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="results-count-badge">{resultLabel}</span>
              <button className="results-reset-btn" onClick={resetAll}>Reset</button>
            </div>
            <div className="results-list">
              {results.map(r => (
                <div key={r.index} className="result-card" style={{ animationDelay: `${(r.index - 1) * 60}ms` }}>
                  <div className="result-header">
                    <span className="result-name">barcode-{String(r.index).padStart(2, '0')}.png</span>
                    <span className="result-status"><div className="dot-ready"></div>ready</span>
                  </div>
                  <div className="result-img-wrap">
                    <img src={r.url} alt={`Barcode ${r.index}`} />
                  </div>
                  <div className="result-actions">
                    <button className="result-btn" onClick={() => downloadImage(r.url, r.index)}>↓ Download</button>
                    <button className="result-btn primary-action" onClick={() => shareImage(r.url)}>↗ Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {creditOpen && (
        <div className={`credit-overlay open${creditVisible ? ' visible' : ''}`} onClick={closeCredit}>
          <div className="credit-modal">
            <div className="credit-particles" id="creditParticles"></div>
            <div className="credit-modal-glow"></div>
            <button className="credit-close" onClick={() => { setCreditVisible(false); setTimeout(() => setCreditOpen(false), 300); }}>✕</button>
            <div className="credit-tag">// made by</div>
            <div className="credit-modal-avatar"><img src={`${BASE}avatar.png`} alt="avatar" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} /></div>
            <div className="credit-modal-name">agoy ganteng banget</div>
            <div className="credit-modal-sub">crafted with ✦ by the legend himself</div>
            <div className="credit-modal-divider"></div>
            <div className="credit-modal-footer">barcode-gen · imei · v1.0</div>
          </div>
        </div>
      )}

      <div className="secret-trigger" onClick={secretClick}>
        <div className={`logo-hint bottom${dotHintVisible ? ' visible' : ''}`}>
          <span className="logo-hint-arrow bottom-arrow"></span>
          {dotHintMsg}
        </div>
      </div>

      <div className={`toast${showToastState ? ' show' : ''}`}>{toastMsg}</div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </>
  );
}
