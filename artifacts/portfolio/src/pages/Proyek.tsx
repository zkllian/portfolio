import { useEffect } from 'react';

export default function Proyek() {
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

  return (
    <div className="container">
      <div className="cv-outer-box">
      <div className="cv-wrap">

        {/* ── Proyek ── */}
        <div className="cv-section reveal">
          <div className="cv-section-label">
            <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Proyek
          </div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <div className="cv-entry-header-left">
                <span className="cv-entry-role">Llian Portfolio</span>
                <svg className="cv-entry-link--dead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
              <span className="cv-entry-period">2025 – Skrg</span>
            </div>
            <p className="cv-about" style={{ marginTop: 2 }}>Situs portfolio pribadi ini — yang sekarang lagi kamu baca. Dibangun sendiri pakai React, Vite, dan TypeScript, karena saya mau buktiin bahwa saya bisa bikin sesuatu dari nol sampai online.</p>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <div className="cv-entry-header-left">
                <span className="cv-entry-role">Jobstreet Scraper</span>
                <svg className="cv-entry-link--dead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
              <span className="cv-entry-period">2024</span>
            </div>
            <p className="cv-about" style={{ marginTop: 2 }}>Tool open source buat scraping data lowongan dari Jobstreet — dibuat karena capek cari loker satu-satu, jadi langsung otomatis sekaligus.</p>
          </div>

          <div className="cv-entry">
            <div className="cv-entry-header">
              <div className="cv-entry-header-left">
                <span className="cv-entry-role">AdMob Auto Impression</span>
                <svg className="cv-entry-link--dead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
              <span className="cv-entry-period">2024</span>
            </div>
            <p className="cv-about" style={{ marginTop: 2 }}>Tool open source berbasis otomasi untuk naikin volume tayangan AdMob tanpa harus intervensi manual — biar kerja di background sendiri.</p>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}
