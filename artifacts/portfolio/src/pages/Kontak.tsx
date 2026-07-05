import { useEffect } from 'react';

export default function Kontak() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('reveal-in'); observer.unobserve(e.target); }
      }),
      { threshold: 0.06 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 9;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 6;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const offMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <div className="container">
      <div className="cv-wrap">

        {/* ── Hero ── */}
        <div className="cv-hero reveal">
          <div className="cv-avatar" role="img" aria-label="avatar" />
          <div className="cv-hero-info">
            <div className="cv-name">Yoga Aprilliansyan N</div>
            <div className="cv-role">Front-End Developer</div>
            <div className="cv-meta">
              <span>26 Tahun</span>
              <span className="cv-meta-dot">·</span>
              <span>Cianjur</span>
            </div>
          </div>
        </div>

        {/* ── Kontak ── */}
        <div className="cv-section reveal">
          <div className="cv-section-label">
            <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Kontak
          </div>
          <div className="cv-contacts">
            <a className="cv-contact-item" href="mailto:llianified@gmail.com" onMouseMove={onMagnet} onMouseLeave={offMagnet}>
              <svg className="cv-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
              </svg>
              <span>llianified@gmail.com</span>
            </a>
            <a className="cv-contact-item" href="tel:085199273883" onMouseMove={onMagnet} onMouseLeave={offMagnet}>
              <svg className="cv-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span>085199273883</span>
            </a>
            <a className="cv-contact-item" href="https://twitter.com/llianified" target="_blank" rel="noreferrer" onMouseMove={onMagnet} onMouseLeave={offMagnet}>
              <svg className="cv-contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.847L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>@llianified</span>
            </a>
            <a className="cv-contact-item" href="https://github.com/zkllian" target="_blank" rel="noreferrer" onMouseMove={onMagnet} onMouseLeave={offMagnet}>
              <svg className="cv-contact-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>github.com/zkllian</span>
            </a>
          </div>
        </div>

        {/* ── Ketersediaan + Preferensi Kerja (2-col on desktop) ── */}
        <div className="cv-row-2col">
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Ketersediaan
            </div>
            <div className="cv-availability">
              <span className="cv-availability-dot" />
              <span>Terbuka untuk kerja remote &amp; freelance</span>
            </div>
            <p className="cv-about">
              Biasanya balas pesan dalam 1x24 jam. Untuk respon paling cepat, hubungi lewat email atau WhatsApp.
            </p>
          </div>

          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Preferensi Kerja
            </div>
            <div className="cv-info-grid">
              <div className="cv-info-row">
                <span className="cv-info-key">Tipe</span>
                <div className="cv-tags">
                  <span className="cv-tag">Full-time</span>
                  <span className="cv-tag">Freelance</span>
                  <span className="cv-tag">Kontrak</span>
                </div>
              </div>
              <div className="cv-info-row">
                <span className="cv-info-key">Lokasi</span>
                <div className="cv-tags">
                  <span className="cv-tag">Remote</span>
                  <span className="cv-tag">Cianjur &amp; sekitarnya</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
