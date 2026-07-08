import { useEffect } from 'react';
import { content } from '@/content';

const p = content.proyek;

export default function Proyek() {
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
            {p.sectionTitle}
          </div>

          {p.items.map(item => (
            <div className="cv-entry" key={item.title}>
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">{item.title}</span>
                  <svg className="cv-entry-link--dead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <span className="cv-entry-period">{item.period}</span>
              </div>
              <p className="cv-about" style={{ marginTop: 2 }}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
      </div>
    </div>
  );
}
