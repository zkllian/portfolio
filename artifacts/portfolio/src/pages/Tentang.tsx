import { useEffect, useState } from 'react';

function useBandungClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetch('/api/stats/today')
      .then(r => r.json())
      .then(d => setCount(d.count ?? d.today ?? d.barcodes ?? null))
      .catch(() => {});
  }, []);
  return count;
}

export default function Tentang() {
  const time = useBandungClock();
  const visitors = useVisitorCount();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="p-wrap">

      {/* ── Profile ── */}
      <div className="p-profile">
        <div className="p-avatar" role="img" aria-label="Yoga Aprilliansyah N" />
        <div>
          <div className="p-name">
            Yoga Aprilliansyah N
            <svg className="p-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="p-role">Front-End Developer</div>
        </div>
      </div>

      {/* ── Bio ── */}
      <p className="p-bio">
        Saya seorang <span className="p-bio-em">Front-End Developer</span> berbasis di Bandung, Indonesia —
        membangun website dengan tampilan rapi dan kode yang scalable.
      </p>
      <p className="p-bio">
        Hubungi saya via{' '}
        <a href="mailto:yogaaprilliansyahn@gmail.com">email</a>
        {' '}|{' '}
        lihat kode saya di{' '}
        <a href="https://github.com/lliandev" target="_blank" rel="noreferrer">GitHub</a>.
      </p>
      <p className="p-bio p-bio--last">
        Temukan saya di{' '}
        <a href="https://linkedin.com/in/yoga-aprilliansyah" target="_blank" rel="noreferrer">LinkedIn</a>,{' '}
        <a href="https://x.com/lliandev" target="_blank" rel="noreferrer">Twitter / X</a>.
      </p>

      {/* ── Pengalaman ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>pengalaman</h2>
        <p className="p-section-sub">Tempat saya kirim hal nyata.</p>

        <div className="p-entry">
          <div className="p-entry-icon">I</div>
          <div className="p-entry-body">
            <div className="p-entry-top">
              <span className="p-entry-co">imei.org</span>
              <span className="p-entry-date">feb 2023 – skrg</span>
            </div>
            <div className="p-entry-role">Web Front-End Developer</div>
            <div className="p-entry-via">via PT Imigrasi Digital</div>
          </div>
        </div>

        <div className="p-entry">
          <div className="p-entry-icon">F</div>
          <div className="p-entry-body">
            <div className="p-entry-top">
              <span className="p-entry-co">Freelance</span>
              <span className="p-entry-date">2020 – 2022</span>
            </div>
            <div className="p-entry-role">UI/UX Designer & Web Developer</div>
          </div>
        </div>
      </div>

      {/* ── Proyek ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>proyek</h2>
        <p className="p-section-sub">Yang sudah dan sedang saya bangun.</p>

        <div className="p-project">
          <div className="p-project-name">
            llian portfolio{' '}
            <span className="p-badge">
              <span className="p-badge-dot"></span>live
            </span>
          </div>
          <p className="p-project-desc">
            Situs portfolio ini — dibangun sendiri dengan React, Vite, dan TypeScript dari nol sampai live.
          </p>
          <div className="p-project-links">
            <a href="/" className="p-link">↗ kunjungi</a>
          </div>
        </div>

        <div className="p-project">
          <div className="p-project-name">
            barcode-gen{' '}
            <span className="p-badge">
              <span className="p-badge-dot"></span>live
            </span>
          </div>
          <p className="p-project-desc">
            Generator barcode IMEI massal untuk keperluan kerja — layout adjustable, download langsung.
          </p>
          <div className="p-project-links">
            <a href="/projects/imei/barcode-gen" className="p-link">↗ buka</a>
          </div>
        </div>

        <div className="p-project">
          <div className="p-project-name">Jobstreet Scraper</div>
          <p className="p-project-desc">
            Tool open source untuk scraping data lowongan kerja dari Jobstreet — dibuat karena capek cari loker satu-satu.
          </p>
          <div className="p-project-links">
            <span className="p-link p-link--muted">github</span>
          </div>
        </div>

        <div className="p-project">
          <div className="p-project-name">AdMob Auto Impression</div>
          <p className="p-project-desc">
            Otomasi open source untuk menaikkan volume tayangan AdMob di background tanpa intervensi manual.
          </p>
          <div className="p-project-links">
            <span className="p-link p-link--muted">github</span>
          </div>
        </div>
      </div>

      {/* ── Gabung Sebagai ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>gabung sebagai</h2>
        <p className="p-section-sub">Saya bisa bergabung di tim sebagai :</p>

        <div className="p-role-card">
          <div className="p-role-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <span className="p-role-name">Front-End Developer</span>
        </div>

        <div className="p-role-card">
          <div className="p-role-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span className="p-role-name">UI / UX Designer</span>
        </div>
      </div>

      {/* ── Ask AI ── */}
      <div className="p-section">
        <p className="p-section-title--sm">
          <span className="hash"># </span>tanya mengapa saya bisa bermanfaat di platform manapun
        </p>
        <div className="p-ai-row">
          {/* ChatGPT */}
          <a
            href="https://chatgpt.com/?q=Siapa+Yoga+Aprilliansyah+N+Front-End+Developer+Bandung"
            target="_blank" rel="noreferrer"
            className="p-ai-btn" title="ChatGPT"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
            </svg>
          </a>
          {/* Claude */}
          <a
            href="https://claude.ai/new?q=Siapa+Yoga+Aprilliansyah+N+Front-End+Developer"
            target="_blank" rel="noreferrer"
            className="p-ai-btn" title="Claude"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.709 15.955l4.72-2.647.08-.13-.08-.132-4.72-2.646-.708 1.229 3.245 1.549-3.245 1.549.708 1.228zm14.584-7.91l-4.72 2.646-.08.132.08.13 4.72 2.647.707-1.228-3.245-1.549 3.245-1.549-.707-1.229zM7.364 19.095l2.648-4.72-.13-.08H9.75l-2.647-4.72-1.228.707 1.548 3.245-3.245-1.548-.707 1.228 4.72 2.647.13-.08v.13l-1.957 3.483 1.228.708zm9.272-14.19L14.988 9.625l.13.08v.13l2.647 4.72 1.228-.707-1.548-3.245 3.245 1.548.707-1.228-4.72-2.647-.13.08v-.13l1.957-3.484-1.228-.707zM4.181 9.18L9.625 11.827l.13-.08V11.62l2.647-4.72-1.228-.708-1.549 3.245L8.077 6.19l-1.228.707 2.647 4.72.08.13H9.45l-3.483-1.957-.785 1.39zm15.638 5.64l-5.444-2.647-.13.08v.126l-2.647 4.72 1.228.708 1.549-3.245 1.548 3.245 1.228-.707-2.647-4.72-.08-.13h.126l3.483 1.957.786-1.389zm-9.182 4.74l.707-1.228-3.245-1.548 3.245-1.549-.707-1.228-4.72 2.646-.08.131.08.131 4.72 2.647zm2.726-14.12l-.707 1.228 3.245 1.549-3.245 1.548.707 1.229 4.72-2.647.08-.131-.08-.13-4.72-2.647z"/>
            </svg>
          </a>
          {/* Perplexity */}
          <a
            href="https://www.perplexity.ai/search?q=Yoga+Aprilliansyah+N+Front-End+Developer+Bandung"
            target="_blank" rel="noreferrer"
            className="p-ai-btn" title="Perplexity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.704 7.168H13.85V2.976L8.073 8.752v3.4H1.296v1.696h6.777v3.4l5.777 5.776v-4.192h8.854v-1.696H13.85v-4.92h8.854V7.168zm-10.55 9.864l-3.585-3.585v-2.295h3.585v5.88zm0-7.576H8.569V7.16l3.585-3.584v5.88z"/>
            </svg>
          </a>
          {/* Gemini */}
          <a
            href="https://gemini.google.com/app?q=Siapa+Yoga+Aprilliansyah+N+Front-End+Developer"
            target="_blank" rel="noreferrer"
            className="p-ai-btn" title="Gemini"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="p-footer">
        <p>Designed &amp; Developed by <strong>Yoga</strong></p>
        <p>© 2025 All rights reserved.</p>
        <p className="p-footer-stats">
          Visitors <strong>#{visitors !== null ? visitors.toLocaleString() : '—'}</strong>
        </p>
        <p className="p-footer-loc">Bandung, Indonesia {time} WIB</p>
        <button
          className="p-theme-btn"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle theme"
        >
          {dark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </footer>

    </div>
  );
}
