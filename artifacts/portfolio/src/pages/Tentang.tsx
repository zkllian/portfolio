import { useEffect, useState } from 'react';
import {
  SiReact, SiTypescript, SiNextdotjs, SiVite, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiFigma, SiVercel,
  SiGithub, SiCanva, SiDrizzle,
} from 'react-icons/si';

/* ─────────── Inline SVG Icons — exact paths from nikhilwho.in ─────────── */

/** Verified badge (MdVerified) — next to name */
const IcoVerified = () => (
  <svg fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24"
    width="16" height="16" style={{ color: '#3b82f6', flexShrink: 0 }}
    xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 2.73-2.17-2.17-1.41 1.41 3.58 3.58 7.42-7.42-1.4-1.41-6.02 6.01z" />
  </svg>
);

/** Envelope / email */
const IcoEmail = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 512 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
  </svg>
);

/** WhatsApp */
const IcoWhatsApp = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 24 24" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/** GitHub Octocat */
const IcoGitHub = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 496 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.9-.3-1.9-3-3.2-5.9-2.6zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
  </svg>
);

/** Twitter / X */
const IcoX = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 512 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

/** LinkedIn */
const IcoLinkedIn = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 448 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

/** Arrow up-right diagonal — for project links */
const IcoArrow = ({ size = 12 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 24 24" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
  </svg>
);

/* ─────────── Hooks ─────────── */

function useBandungClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () =>
      setT(new Date().toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false,
      }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
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

/* ─────────── Component ─────────── */

export default function Tentang() {
  const time = useBandungClock();
  const visitors = useVisitorCount();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="p-wrap page-wrap--enter">

      {/* ── Profile ── */}
      <div className="p-profile">
        <div className="p-avatar" role="img" aria-label="Yoga Aprilliansyah N" />
        <div>
          <div className="p-name">
            Yoga Aprilliansyah N
            <IcoVerified />
          </div>
          <div className="p-role">Front-End Developer</div>
        </div>
      </div>

      {/* ── Bio ── */}
      <p className="p-bio">
        Saya seorang{' '}
        <a href="https://github.com/zkllian" target="_blank" rel="noreferrer">Front-End Developer</a>
        {' '}berbasis di Bandung, Indonesia — membangun website dengan tampilan rapi dan kode yang scalable.
      </p>
<p className="p-bio">
        Hubungi saya via{' '}
        <a href="https://wa.me/6285199273883" target="_blank" rel="noreferrer">
          <IcoWhatsApp />WhatsApp
        </a>
        {' '}atau{' '}
        <a href="mailto:llianified@gmail.com">
          <IcoEmail />email
        </a>
        {' '}| lihat kode saya di{' '}
        <a href="https://github.com/zkllian" target="_blank" rel="noreferrer">
          <IcoGitHub />GitHub
        </a>.
      </p>
      <p className="p-bio p-bio--last">
        Temukan saya di{' '}
        <a href="https://x.com/llianified" target="_blank" rel="noreferrer">
          <IcoX />Twitter / X
        </a>.
      </p>

      {/* ── Tech Marquee ── */}
      {(() => {
        const items: { icon: React.ReactNode; label: string }[] = [
          { icon: <SiReact />,           label: 'React' },
          { icon: <SiTypescript />,      label: 'TypeScript' },
          { icon: <SiNextdotjs />,       label: 'Next.js' },
          { icon: <SiVite />,            label: 'Vite' },
          { icon: <SiTailwindcss />,     label: 'Tailwind CSS' },
          { icon: <SiNodedotjs />,       label: 'Node.js' },
          { icon: <SiExpress />,         label: 'Express.js' },
          { icon: <SiDrizzle />,         label: 'Drizzle ORM' },
          { icon: <SiPostgresql />,      label: 'PostgreSQL' },
          { icon: <SiVercel />,          label: 'Vercel' },
          { icon: <SiFigma />,           label: 'Figma' },
          { icon: <SiGithub />,          label: 'GitHub' },
          { icon: <SiCanva />,           label: 'Canva' },
        ];
        const row = items.map((it, i) => (
          <span className="mq-pill" key={i}>
            <span className="mq-ico">{it.icon}</span>
            {it.label}
          </span>
        ));
        return (
          <div className="mq-wrap">
            <div className="mq-track">
              {row}{row}
            </div>
          </div>
        );
      })()}

      {/* ── Pengalaman ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>pengalaman</h2>
        <p className="p-section-sub">Tempat saya kirim hal nyata.</p>

        <div className="p-entry">
          <div className="p-entry-icon">Z</div>
          <div className="p-entry-body">
            <div className="p-entry-top">
              <span className="p-entry-co">Zenius Store</span>
              <span className="p-entry-date">mar – sep 2021</span>
            </div>
            <div className="p-entry-role">Digital Marketing</div>
          </div>
        </div>

        <div className="p-entry">
          <div className="p-entry-icon">U</div>
          <div className="p-entry-body">
            <div className="p-entry-top">
              <span className="p-entry-co">Universitas Suryakancana</span>
              <span className="p-entry-date">agu – nov 2017</span>
            </div>
            <div className="p-entry-role">Admin Intern</div>
          </div>
        </div>
      </div>

      {/* ── Kontribusi Digital ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>kontribusi digital</h2>
        <p className="p-section-sub">Hal yang saya bangun di komunitas dan media.</p>

        {[
          { i: 'S', co: 'Swisstronik',    date: 'sep 2024 – jan 2025', role: 'Brand Ambassador' },
          { i: 'S', co: 'Story Protocol', date: 'jul 2024 – apr 2025', role: 'Content Writer' },
          { i: 'U', co: 'Union',          date: 'jul 2024 – apr 2025', role: 'Content Writer' },
          { i: 'M', co: 'Mitosis',        date: 'jul 2024 – apr 2025', role: 'Content Writer' },
          { i: 'N', co: 'Nesa',           date: 'mar 2024 – mei 2025', role: 'Brand Ambassador' },
          { i: 'I', co: 'Injective',      date: 'jan 2024 – mar 2025', role: 'Brand Ambassador' },
          { i: 'V', co: 'Verso',          date: 'mar 2018 – des 2019', role: 'Community Manager' },
          { i: 'B', co: 'Blog Independen',date: '2012',                role: 'Blogger · Google AdSense' },
        ].map(e => (
          <div className="p-entry" key={e.co}>
            <div className="p-entry-icon">{e.i}</div>
            <div className="p-entry-body">
              <div className="p-entry-top">
                <span className="p-entry-co">{e.co}</span>
                <span className="p-entry-date">{e.date}</span>
              </div>
              <div className="p-entry-role">{e.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pendidikan ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>pendidikan</h2>
        <p className="p-section-sub">Dari mana saya mulai.</p>

        <div className="p-entry">
          <div className="p-entry-icon">S</div>
          <div className="p-entry-body">
            <div className="p-entry-top">
              <span className="p-entry-co">SMK Pasundan 1 Bandung</span>
              <span className="p-entry-date">2015 – 2018</span>
            </div>
            <div className="p-entry-role">Teknik Komputer &amp; Jaringan</div>
          </div>
        </div>
      </div>

      {/* ── Proyek — 2-column grid ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>proyek</h2>
        <p className="p-section-sub">Yang sudah dan sedang saya bangun.</p>

        <div className="p-projects-grid">

          <div className="p-project">
            <div className="p-project-name">
              Llian Portfolio
              <span className="p-badge"><span className="p-badge-dot" />live</span>
            </div>
            <p className="p-project-desc">
              Situs portfolio pribadi ini — dibangun sendiri pakai React, Vite, dan TypeScript dari nol sampai online.
            </p>
            <div className="p-project-links">
              <a href="https://llian.vercel.app" target="_blank" rel="noreferrer" className="p-link">
                <IcoArrow />kunjungi
              </a>
            </div>
          </div>

          <div className="p-project">
            <div className="p-project-name">
              barcode-gen
              <span className="p-badge"><span className="p-badge-dot" />live</span>
            </div>
            <p className="p-project-desc">
              Generator barcode IMEI massal — layout adjustable, export langsung, untuk keperluan kerja di imei.org.
            </p>
            <div className="p-project-links">
              <a href="/projects/imei/barcode-gen" className="p-link">
                <IcoArrow />buka
              </a>
            </div>
          </div>

          <div className="p-project">
            <div className="p-project-name">Jobstreet Scraper</div>
            <p className="p-project-desc">
              Tool open source buat scraping data lowongan dari Jobstreet — otomatis sekaligus.
            </p>
            <div className="p-project-links">
              <a href="https://github.com/zkllian" target="_blank" rel="noreferrer" className="p-link">
                <IcoGitHub size={12} />github
              </a>
            </div>
          </div>

          <div className="p-project">
            <div className="p-project-name">AdMob Auto Impression</div>
            <p className="p-project-desc">
              Tool open source berbasis otomasi untuk naikin volume tayangan AdMob tanpa intervensi manual.
            </p>
            <div className="p-project-links">
              <a href="https://github.com/zkllian" target="_blank" rel="noreferrer" className="p-link">
                <IcoGitHub size={12} />github
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Gabung Sebagai ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>gabung sebagai</h2>
        <p className="p-section-sub">Terbuka untuk kerja remote &amp; freelance.</p>

        <div className="p-role-card">
          <div className="p-role-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <span className="p-role-name">Front-End Developer</span>
        </div>

        <div className="p-role-card">
          <div className="p-role-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span className="p-role-name">UI / UX Designer</span>
        </div>

        <div className="p-role-card">
          <div className="p-role-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>
          <span className="p-role-name">Content Writer</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="p-footer">
        <p>Designed &amp; Developed by <strong>Yoga</strong></p>
        <p>© 2026 All rights reserved.</p>
        <p className="p-footer-stats">
          Visitors <strong>#{visitors !== null ? visitors.toLocaleString() : '—'}</strong>
        </p>
        <p className="p-footer-loc">Bandung, Indonesia {time}</p>
        <button className="p-theme-btn" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
          {dark
            ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>
      </footer>

    </div>
  );
}
