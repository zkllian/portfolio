import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'wouter';
import JsBarcode from 'jsbarcode';
import { FiZap, FiEye, FiDownload, FiShare2, FiAlignJustify, FiBarChart2, FiMove } from 'react-icons/fi';
import { content } from '@/content';

const h = content.home;
const s = content.home.stats;


function NudgeRow({ label, yField, pos, onStartNudge, onStopNudge, color }: {
  label: string;
  yField: string;
  pos: Record<string, number>;
  onStartNudge: (field: string, dir: number) => void;
  onStopNudge: () => void;
  color?: string;
}) {
  return (
    <div className="pos-row">
      <span className="pos-label">
        {color && <span className="pos-dot" style={{ background: color }} />}
        {label}
      </span>
      <div className="nudge-group">
        <div className="nudge-axis">
          <span className="axis-lbl">Y</span>
          <button className="nb"
            onPointerDown={() => onStartNudge(yField, -1)}
            onPointerUp={onStopNudge}
            onPointerLeave={onStopNudge}>▲</button>
          <input type="number" value={pos[yField]} readOnly />
          <button className="nb"
            onPointerDown={() => onStartNudge(yField, 1)}
            onPointerUp={onStopNudge}
            onPointerLeave={onStopNudge}>▼</button>
        </div>
      </div>
    </div>
  );
}

function genUserId() {
  try {
    const k = 'bc-user-id';
    let id = localStorage.getItem(k);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(k, id);
    }
    return id;
  } catch {
    // localStorage blocked — use ephemeral ID so stats stay per-session
    return crypto.randomUUID();
  }
}

export default function Home() {

  const [inputVal, setInputVal] = useState('');
  const [imeiCount, setImeiCount] = useState('0 sets');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState('');
  const [view, setView] = useState('input');
  const [results, setResults] = useState<{ url: string; index: number }[]>([]);
  const [resultLabel, setResultLabel] = useState('0 output');
  const [leaving, setLeaving] = useState(false);
  const [resetAnimating, setResetAnimating] = useState(false);

  const DEFAULT_POS: Record<string, number> = {
    eid_x: 19,     eid_y: 454,
    imei1_x: 141,  imei1_y: 744.5,
    imei2_x: 140.5,imei2_y: 1035,
    meid_x: 179,   meid_y: 1325,
    eid_tx: 98.8,  eid_ty: 370,
    imei1_tx: 270, imei1_ty: 672,
    imei2_tx: 278.5,imei2_ty: 956.5,
    meid_tx: 287.5,meid_ty: 1240,
    font_size: 30.5,
  };
  function loadSavedPos(): Record<string, number> {
    try {
      const raw = localStorage.getItem('bc-pos');
      if (raw) return { ...DEFAULT_POS, ...JSON.parse(raw) };
    } catch {}
    return { ...DEFAULT_POS };
  }
  const [pos, setPos] = useState<Record<string, number>>(loadSavedPos);
  const posRef = useRef(pos);
  const nudgeStepRef = useRef(0.5);

  const BC = { eid: { h: 72, w: 700.5 }, imei1: { h: 71, w: 455 }, imei2: { h: 69, w: 455 }, meid: { h: 69.5, w: 380 } };
  const [previewDim, setPreviewDim] = useState('738 × 1600');

  const [toastMsg, setToastMsg] = useState('');
  const [showToastState, setShowToastState] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const COUNTER_KEY = 'imei_total_generated';
  const DATE_KEY    = 'imei_total_generated_date';
  const HISTORY_KEY = 'bc-history';
  type HistoryEntry = { input: string; sets: number; ts: number; results?: { url: string; index: number }[] };
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
  });
  function getWIBDateStr() {
    return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Jakarta' });
  }
  const [totalImei, setTotalImei] = useState<number>(() => {
    const today   = getWIBDateStr();
    const savedDate = localStorage.getItem(DATE_KEY);
    if (savedDate !== today) {
      localStorage.setItem(COUNTER_KEY, '0');
      localStorage.setItem(DATE_KEY, today);
      return 0;
    }
    const saved = localStorage.getItem(COUNTER_KEY);
    return saved ? parseInt(saved, 10) || 0 : 0;
  });
  const [confirmReset, setConfirmReset] = useState(false);
  const [counterOpen, setCounterOpen] = useState(false);
  const [counterVisible, setCounterVisible] = useState(false);
  const [coordsOpen, setCoordsOpen] = useState(false);
  const [coordsVisible, setCoordsVisible] = useState(false);

  type StatsData = { today: number; total: number; mine: number; others: number; online: number } | null;
  const [statsOpen, setStatsOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stats, setStats] = useState<StatsData>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(false);
  const [confirmResetGlobal, setConfirmResetGlobal] = useState(false);
  const [statsResetting, setStatsResetting] = useState(false);
  const badgeTapRef = useRef(0);
  const badgeTapResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleBadgeTap() {
    if (badgeTapResetRef.current) clearTimeout(badgeTapResetRef.current);
    badgeTapRef.current += 1;
    badgeTapResetRef.current = setTimeout(() => { badgeTapRef.current = 0; }, 1500);
    if (badgeTapRef.current >= 5) {
      badgeTapRef.current = 0;
      openStats();
    }
  }

  const counterTapRef = useRef(0);
  const counterTapResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inputValRef = useRef('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval> | null>(null);
  const userIdRef = useRef<string>(genUserId());

  const BASE = import.meta.env.BASE_URL;

  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    function scheduleReset() {
      const now = new Date();
      const wibNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
      const midnight = new Date(wibNow);
      midnight.setHours(24, 0, 0, 0);
      const msUntilMidnight = midnight.getTime() - wibNow.getTime();
      return setTimeout(() => {
        setTotalImei(0);
        localStorage.setItem(COUNTER_KEY, '0');
        localStorage.setItem(DATE_KEY, getWIBDateStr());
        scheduleReset();
      }, msUntilMidnight);
    }
    const t = scheduleReset();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = `${BASE}template.png`;
    img.onload = () => {
      if (canvasRef.current) {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
      }
      drawPreview(posRef.current);
    };
    baseImageRef.current = img;
    if (document.fonts?.load) {
      document.fonts.load("400 32px 'SF Pro Custom'");
      document.fonts.load("500 32px 'SF Pro Custom'");
    }
  }, []);

  useEffect(() => {
    drawPreview(pos);
  }, [pos]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (statsOpen) closeStats();
        if (coordsOpen) closeCoords();
        if (counterOpen) closeCounter();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [statsOpen, coordsOpen, counterOpen]);

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
    const sets = Math.floor(lines.length / 2);
    setImeiCount(`${sets} sets`);
    if (lines.length > 0 && lines.length % 2 !== 0) {
      showToast(`imei ${lines[lines.length - 1]} tidak diproses — butuh pasangan`);
    }
  }

  function resetAll() {
    setResetAnimating(true);
    setTimeout(() => {
      inputValRef.current = '';
      setInputVal('');
      setResults([]);
      setView('input');
      setImeiCount('0 sets');
      setResetAnimating(false);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, 260);
  }

  function goBack() {
    setLeaving(true);
    setTimeout(() => {
      setView('input');
      setLeaving(false);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, 260);
  }

  async function generateBulk() {
    try {
      const lines = inputValRef.current.split('\n').map((v: string) => v.trim()).filter(Boolean);
      if (lines.length < 2) {
        showToast('min 1 set — imei[0] + imei[1] required (15 digits each)');
        return;
      }

      const totalSets = Math.floor(lines.length / 2);
      for (let i = 0; i < totalSets; i++) {
        const im1 = lines[i * 2], im2 = lines[i * 2 + 1];
        if (im1.length !== 15) { showToast(`set[${i}]: imei[0] expects 15 digits, got ${im1.length}`); return; }
        if (im2.length !== 15) { showToast(`set[${i}]: imei[1] expects 15 digits, got ${im2.length}`); return; }
      }

      const img = baseImageRef.current;
      if (!img) { showToast('template not ready — retry'); return; }
      if (!img.complete || !img.naturalWidth) {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('gagal load template'));
        });
      }
      if (!img.naturalWidth) { showToast('template image load failed'); return; }

      if (document.fonts?.load) {
        await Promise.allSettled([
          document.fonts.load("400 32px 'SF Pro Custom'"),
          document.fonts.load("500 32px 'SF Pro Custom'"),
        ]);
      }

      const cvs = canvasRef.current;
      if (!cvs) { showToast('canvas context null'); return; }
      cvs.width = img.naturalWidth;
      cvs.height = img.naturalHeight;
      const ctx = cvs.getContext('2d');
      if (!ctx) { showToast('ctx2d unavailable'); return; }

      const newResults: { url: string; index: number }[] = [];
      setPendingCount(totalSets);
      setIsLoading(true);

      for (let i = 0; i < totalSets; i++) {
        setLoadingCount(`${i + 1}/${totalSets}`);
        await new Promise(r => setTimeout(r, 30));

        const eid = randomEID();
        const im1 = lines[i * 2];
        const im2 = lines[i * 2 + 1];
        const p = posRef.current;

        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0);

        drawBarcode(ctx, eid,               p.eid_x,   p.eid_y,   BC.eid.h,   p.font_size, BC.eid.w);
        drawBarcode(ctx, im1,               p.imei1_x, p.imei1_y, BC.imei1.h, p.font_size, BC.imei1.w);
        drawBarcode(ctx, im2,               p.imei2_x, p.imei2_y, BC.imei2.h, p.font_size, BC.imei2.w);
        drawBarcode(ctx, meidFromImei(im1), p.meid_x,  p.meid_y,  BC.meid.h,  p.font_size, BC.meid.w);

        ctx.font = `400 ${p.font_size}px 'SF Pro Custom', -apple-system, sans-serif`;
        ctx.letterSpacing = '0.5px';
        ctx.fillStyle = '#000000';
        ctx.textBaseline = 'top';
        ctx.fillText(eid,               p.eid_tx,   p.eid_ty);
        ctx.fillText(im1,               p.imei1_tx, p.imei1_ty);
        ctx.fillText(im2,               p.imei2_tx, p.imei2_ty);
        ctx.fillText(meidFromImei(im1), p.meid_tx,  p.meid_ty);

        newResults.push({ url: cvs.toDataURL('image/png'), index: i + 1 });
      }

      setIsLoading(false);
      setResults(newResults);
      setResultLabel(`${totalSets} output`);
      setHistory(prev => {
        const entry: HistoryEntry = { input: inputValRef.current, sets: totalSets, ts: Date.now(), results: newResults };
        const next = [entry, ...prev.filter(h => h.input !== entry.input)].slice(0, 5);
        try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next.map(({ results: _, ...rest }) => rest))); } catch {}
        return next;
      });
      setTotalImei(prev => {
        const next = prev + totalSets;
        localStorage.setItem(COUNTER_KEY, String(next));
        localStorage.setItem(DATE_KEY, getWIBDateStr());
        return next;
      });
      try {
        fetch(`/api/stats/ping`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: totalSets, userId: userIdRef.current }),
        }).catch(() => {});
      } catch {}
      setView('results');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } catch (err: unknown) {
      setIsLoading(false);
      showToast((err instanceof Error) ? err.message : String(err));
    }
  }

  function resetCounter() {
    setTotalImei(0);
    localStorage.setItem(COUNTER_KEY, '0');
    setConfirmReset(false);
    showToast(h.toastCounterReset);
  }

  function downloadImage(dataUrl: string, index: number) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `barcode-${index}.png`;
    a.click();
  }

  async function shareImage(dataUrl: string) {
    if (!navigator.share) { showToast(h.toastShareUnsupported); return; }
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'barcode.png', { type: 'image/png' });
      // @ts-ignore
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        showToast(h.toastShareFailed);
      }
    }
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

  function drawBarcode(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, barHeight: number, fontSize: number, barcodeWidth: number, opacity = 1) {
    const tmp = document.createElement('canvas');
    try {
      JsBarcode(tmp, value, {
        format: 'CODE128',
        width: 2,
        height: barHeight,
        displayValue: false,
        margin: 6,
        background: '#ffffff',
        lineColor: '#000000',
      });
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      if (barcodeWidth > 0 && tmp.width > 0) {
        const scaledH = tmp.height * (barcodeWidth / tmp.width);
        ctx.drawImage(tmp, x, y, barcodeWidth, scaledH);
      } else {
        ctx.drawImage(tmp, x, y);
      }
      ctx.globalAlpha = 1;
    } catch {
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      ctx.fillStyle = '#000';
      ctx.textBaseline = 'top';
      ctx.font = `400 ${fontSize}px -apple-system, sans-serif`;
      ctx.fillText(value, x, y);
      ctx.globalAlpha = 1;
    }
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

    drawBarcode(ctx, '89049032000209061050588208994839', p.eid_x,   p.eid_y,   BC.eid.h,   p.font_size, BC.eid.w);
    drawBarcode(ctx, '356730111869006',                  p.imei1_x, p.imei1_y, BC.imei1.h, p.font_size, BC.imei1.w);
    drawBarcode(ctx, '356687114789203',                  p.imei2_x, p.imei2_y, BC.imei2.h, p.font_size, BC.imei2.w);
    drawBarcode(ctx, '35673011186900',                   p.meid_x,  p.meid_y,  BC.meid.h,  p.font_size, BC.meid.w);

    ctx.font = `400 ${p.font_size}px 'SF Pro Custom', -apple-system, sans-serif`;
    ctx.letterSpacing = '0.5px';
    ctx.fillStyle = '#000000';
    ctx.textBaseline = 'top';
    ctx.fillText('89049032000209061050588208994839', p.eid_tx,   p.eid_ty);
    ctx.fillText('356730111869006',                  p.imei1_tx, p.imei1_ty);
    ctx.fillText('356687114789203',                  p.imei2_tx, p.imei2_ty);
    ctx.fillText('35673011186900',                   p.meid_tx,  p.meid_ty);
  }

  function handleCounterTap() {
    if (counterTapResetRef.current) clearTimeout(counterTapResetRef.current);
    counterTapRef.current += 1;
    counterTapResetRef.current = setTimeout(() => { counterTapRef.current = 0; }, 1200);
    if (counterTapRef.current >= 3) {
      counterTapRef.current = 0;
      if (navigator.vibrate) navigator.vibrate([30, 20, 50]);
      openStats();
    }
  }

  async function openStats() {
    setStats(null);
    setStatsError(false);
    setConfirmResetGlobal(false);
    setStatsLoading(true);
    setStatsOpen(true);
    document.body.classList.add('nav-hidden');
    requestAnimationFrame(() => requestAnimationFrame(() => setStatsVisible(true)));
    try {
      const res = await fetch(`/api/stats/today?userId=${encodeURIComponent(userIdRef.current)}`);
      if (res.ok) {
        const data = await res.json() as { today: number; total: number; mine: number; others: number; online: number };
        setStats(data);
      } else {
        setStatsError(true);
      }
    } catch {
      setStatsError(true);
    } finally {
      setStatsLoading(false);
    }
  }

  function closeStats() {
    setStatsVisible(false);
    setConfirmResetGlobal(false);
    document.body.classList.remove('nav-hidden');
    setTimeout(() => setStatsOpen(false), 300);
  }

  function openCounter() {
    setCounterOpen(true);
    document.body.classList.add('nav-hidden');
    requestAnimationFrame(() => requestAnimationFrame(() => setCounterVisible(true)));
  }

  function closeCounter() {
    setCounterVisible(false);
    setConfirmReset(false);
    document.body.classList.remove('nav-hidden');
    setTimeout(() => setCounterOpen(false), 300);
  }

  function openCoords() {
    setCoordsOpen(true);
    document.body.classList.add('nav-hidden');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setCoordsVisible(true);
      drawPreview(posRef.current);
    }));
  }

  function closeCoords() {
    setCoordsVisible(false);
    document.body.classList.remove('nav-hidden');
    setTimeout(() => setCoordsOpen(false), 300);
  }

  async function handleGlobalReset() {
    setStatsResetting(true);
    try {
      const res = await fetch(`/api/stats/reset`, { method: 'POST' });
      if (!res.ok) throw new Error(`reset failed: ${res.status}`);
      setStats({ today: 0, total: 0, mine: 0, others: 0, online: 0 });
      setConfirmResetGlobal(false);
      showToast(s.toastResetSuccess);
    } catch {
      showToast(s.toastResetFailed);
    } finally {
      setStatsResetting(false);
    }
  }

  const nudgeProps = { pos, onSetPos: setPos, onStartNudge: startNudge, onStopNudge: stopNudge };


  return (
    <>
      <div className="container">

        {view === 'input' && (
          <div className="view-input">
            <Link href="/" className="home-link">← home</Link>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-title-icon" onClick={handleBadgeTap} style={{ cursor: 'pointer' }}><FiAlignJustify size={14} /></div>
                <div className="card-title-text">
                  <span className="card-title">{h.pageTitle}</span>
                </div>
              </div>
              <div className="card-header-actions">
                <button className="icon-btn" onClick={openCounter} title={h.barcodeCardTitle}>
                  <FiBarChart2 size={14} />
                </button>
                <button className="icon-btn" onClick={openCoords} title={h.coordsTitle}>
                  <FiMove size={14} />
                </button>
              </div>
            </div>
            <div className="card">
              <div className="input-wrap">
                <textarea
                  value={inputVal}
                  onChange={handleInput}
                  placeholder={`00000xxxxx00000\n00000xxxxx00000\n00000xxxxx00000\n00000xxxxx00000\n00000xxxxx00000\n00000xxxxx00000`}
                />
                <span className="badge input-badge" style={{ userSelect: 'none' }}>{imeiCount}</span>
              </div>
              <div className="btn-row">
                <button className="tool-btn tool-btn--dark" onClick={() => generateBulk()} disabled={isLoading}>
                  {isLoading
                    ? <><span className="btn-spinner" />{loadingCount}</>
                    : <><FiZap size={13} style={{ flexShrink: 0 }} />{h.executeBtn}</>}
                </button>
              </div>
            </div>
            {history.length > 0 && (
              <div className="history-list">
                <span className="history-label">riwayat</span>
                {history.map((h2, i) => (
                  <button key={i} className="history-item" onClick={() => {
                    if (h2.results) {
                      setResults(h2.results);
                      setResultLabel(`${h2.sets} output`);
                      setView('results');
                      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                    } else {
                      setInputVal(h2.input);
                      inputValRef.current = h2.input;
                    }
                  }}>
                    <span className="history-sets">{h2.sets} set</span>
                    <span className="history-preview">{h2.input.split('\n')[0]?.trim()}</span>
                    <span className="history-time">{new Date(h2.ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'results' && (
          <div className={`view-results${leaving || resetAnimating ? ' view-leaving' : ''}`}>
            <button className="home-link" onClick={goBack}>← kembali</button>
            <div className="results-topbar">
              <span className="results-count-badge">{resultLabel}</span>
              <button className="results-reset-btn" onClick={resetAll}>{h.resetBtn}</button>
            </div>
            <div className="results-list">
              {results.map(r => (
                <div key={r.index} className="result-card" style={{ animationDelay: `${(r.index - 1) * 60}ms` }}>
                  <div className="result-header">
                    <span className="result-name">barcode-{String(r.index).padStart(2, '0')}.png</span>
                    <span className="result-status"><div className="dot-ready"></div>{h.statusReady}</span>
                  </div>
                  <div className="result-img-wrap">
                    <img src={r.url} alt={`barcode ${r.index}`} />
                  </div>
                  <div className="result-actions">
                    <button className="result-btn" onClick={() => downloadImage(r.url, r.index)}><FiDownload size={12} />{h.downloadLabel}</button>
                    <button className="result-btn primary-action" onClick={() => shareImage(r.url)}><FiShare2 size={12} />{h.shareLabel}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {statsOpen && createPortal(
        <div className={`stats-overlay open${statsVisible ? ' visible' : ''}`} onClick={e => { if (e.target === e.currentTarget) closeStats(); }}>
          <div className="stats-modal">
            <div className="stats-modal-header">
              <button className="stats-close-btn" onClick={closeStats}>✕</button>
            </div>

            <div className="stats-grid">
              <div className="stats-cell">
                <span className="stats-cell-label">{s.todayLabel}</span>
                <span className="stats-cell-value">
                  {statsLoading ? <span className="stats-shimmer">···</span> : statsError ? '—' : (stats?.today ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="stats-cell">
                <span className="stats-cell-label">{s.totalLabel}</span>
                <span className="stats-cell-value">
                  {statsLoading ? <span className="stats-shimmer">···</span> : statsError ? '—' : (stats?.total ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="stats-cell">
                <span className="stats-cell-label" style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="stats-online-dot" />
                  {s.onlineLabel}
                </span>
                <span className="stats-cell-value" style={{ color: 'var(--green)' }}>
                  {statsLoading ? <span className="stats-shimmer">···</span> : statsError ? '—' : (stats?.online ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="stats-cell">
                <span className="stats-cell-label">{s.othersLabel}</span>
                <span className="stats-cell-value">
                  {statsLoading ? <span className="stats-shimmer">···</span> : statsError ? '—' : (stats?.others ?? 0).toLocaleString()}
                </span>
              </div>
            </div>

            {statsError && (
              <div className="stats-error-note">{s.serverUnavailable}</div>
            )}

            <div className="stats-esc-row">
              {!confirmResetGlobal ? (
                <button className="stats-reset-btn" onClick={() => setConfirmResetGlobal(true)}>{s.resetGlobalBtn}</button>
              ) : (
                <div className="stats-reset-confirm">
                  <span className="stats-reset-confirm-text">{s.resetConfirmPrompt}</span>
                  <button className="stats-reset-yes" onClick={handleGlobalReset} disabled={statsResetting}>
                    {statsResetting ? '···' : s.resetYes}
                  </button>
                  <button className="stats-reset-no" onClick={() => setConfirmResetGlobal(false)}>{s.resetNo}</button>
                </div>
              )}
              <span className="stats-note">{s.footerNote}</span>
              <span className="stats-esc-text">esc to close</span>
            </div>
          </div>
        </div>
      , document.body)}

      {counterOpen && createPortal(
        <div className={`stats-overlay open${counterVisible ? ' visible' : ''}`} onClick={e => { if (e.target === e.currentTarget) closeCounter(); }}>
          <div className="stats-modal counter-modal">
            <div className="stats-modal-header">
              <button className="stats-close-btn" onClick={closeCounter}>✕</button>
            </div>
            <div className="counter-modal-body">
              <span className="stats-cell-label">{h.barcodeTodayLabel}</span>
              <span className="counter-number" onClick={handleCounterTap} style={{ cursor: 'default', userSelect: 'none' }}>{totalImei.toLocaleString()}</span>
            </div>
            <div className="stats-esc-row">
              {!confirmReset ? (
                <button className="stats-reset-btn" onClick={() => setConfirmReset(true)}>{h.resetBtn}</button>
              ) : (
                <div className="stats-reset-confirm">
                  <span className="stats-reset-confirm-text">{h.confirmResetPrompt}</span>
                  <button className="stats-reset-yes" onClick={resetCounter}>{h.confirmYes}</button>
                  <button className="stats-reset-no" onClick={() => setConfirmReset(false)}>{h.confirmNo}</button>
                </div>
              )}
              <span className="stats-esc-text">esc to close</span>
            </div>
          </div>
        </div>
      , document.body)}

      {coordsOpen && createPortal(
        <div className={`stats-overlay open${coordsVisible ? ' visible' : ''}`} onClick={e => { if (e.target === e.currentTarget) closeCoords(); }}>
          <div className="stats-modal coords-modal">
            <div className="stats-modal-header">
              <button className="stats-close-btn" onClick={closeCoords}>✕</button>
            </div>
            <div className="coords-modal-body">
              <NudgeRow label="eid.t"  yField="eid_ty"   {...nudgeProps} color="#f59e0b" />
              <NudgeRow label="im0.t"  yField="imei1_ty" {...nudgeProps} color="#3b82f6" />
              <NudgeRow label="im1.t"  yField="imei2_ty" {...nudgeProps} color="#10b981" />
              <NudgeRow label="meid.t" yField="meid_ty"  {...nudgeProps} color="#e879f9" />
              <div className="preview-wrap">
                <div className="preview-header">
                  <span className="preview-label"><FiEye size={11} style={{ marginRight: 5, opacity: 0.7 }} />{h.livePreviewLabel}</span>
                  <span className="preview-dim">{previewDim}</span>
                </div>
                <div className="preview-stage">
                  <canvas ref={previewCanvasRef} id="previewCanvas" />
                </div>
              </div>
            </div>
            <div className="stats-esc-row">
              <button className="save-default-btn" onClick={() => {
                try { localStorage.setItem('bc-pos', JSON.stringify(posRef.current)); } catch {}
                showToast(h.toastSaved);
              }}>{h.saveBtn}</button>
              <span className="stats-esc-text">esc to close</span>
            </div>
          </div>
        </div>
      , document.body)}

      <div className={`toast${showToastState ? ' show' : ''}`}><span className="toast-prefix">// err :</span> {toastMsg}</div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </>
  );
}
