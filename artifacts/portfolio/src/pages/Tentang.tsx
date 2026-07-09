import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import {
  SiReact, SiTypescript, SiNextdotjs, SiVite, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiFigma, SiVercel,
  SiGithub, SiCanva, SiDrizzle,
} from 'react-icons/si';
import { content } from '@/content';

const { profile, bio, bioEN, links, tech, tentang, tentangEN } = content;

/* ─────────── Inline SVG Icons ─────────── */

const IcoVerified = () => (
  <svg fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24"
    width="16" height="16" style={{ color: '#000', flexShrink: 0 }}
    xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z" />
    <path fillRule="evenodd" d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 2.73-2.17-2.17-1.41 1.41 3.58 3.58 7.42-7.42-1.4-1.41-6.02 6.01z" />
  </svg>
);

const IcoEmail = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 512 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
  </svg>
);

const IcoWhatsApp = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 24 24" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IcoGitHub = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 496 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.9-.3-1.9-3-3.2-5.9-2.6zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
  </svg>
);

const IcoX = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 512 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

const IcoLinkedIn = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 448 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const IcoInstagram = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 448 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
  </svg>
);

const IcoPdf = ({ size = 13 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 384 512" className="p-ico" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/>
  </svg>
);

const IcoArrow = ({ size = 12 }: { size?: number }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
    viewBox="0 0 24 24" height={size} width={size}
    xmlns="http://www.w3.org/2000/svg">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z" />
  </svg>
);

/* ─────────── Hooks ─────────── */

function useCianjurClock() {
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

/* ─────────── Tech icon map ─────────── */

const TECH_ICONS: Record<string, React.ReactNode> = {
  'React':        <SiReact />,
  'TypeScript':   <SiTypescript />,
  'Next.js':      <SiNextdotjs />,
  'Vite':         <SiVite />,
  'Tailwind CSS': <SiTailwindcss />,
  'Node.js':      <SiNodedotjs />,
  'Express.js':   <SiExpress />,
  'Drizzle ORM':  <SiDrizzle />,
  'PostgreSQL':   <SiPostgresql />,
  'Vercel':       <SiVercel />,
  'Figma':        <SiFigma />,
  'GitHub':       <SiGithub />,
  'Canva':        <SiCanva />,
};

/* ─────────── Component ─────────── */

export default function Tentang() {
  const time = useCianjurClock();
  const visitors = useVisitorCount();
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [switching, setSwitching] = useState(false);
  const isEN = lang === 'en';
  const t = isEN ? tentangEN : tentang;
  const b = isEN ? bioEN : { ...bio, line1Prefix: 'Saya seorang' };
  const f = t.footer;

  function toggleLang() {
    setSwitching(true);
    setTimeout(() => {
      setLang(l => l === 'id' ? 'en' : 'id');
      setSwitching(false);
    }, 150);
  }

  return (
    <div className="p-wrap page-wrap--enter">

      {/* ── Profile ── */}
      <div className="p-profile">
        <div className="p-avatar" role="img" aria-label={profile.ariaLabel} />
        <div>
          <div className="p-name">
            {profile.name}
            <IcoVerified />
          </div>
          <div className="p-role">{profile.role}</div>
        </div>
        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          <span className={lang === 'id' ? 'lang-active' : ''}>ID</span>
          <span className="lang-sep">|</span>
          <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
        </button>
      </div>

      {/* ── Translatable content ── */}
      <div className={`lang-content${switching ? ' lang-content--blur' : ''}`}>

      {/* ── Bio ── */}
      <p className="p-bio">
        {b.line1Prefix}{' '}
        <a href={links.github} target="_blank" rel="noreferrer" className="p-sketch-link">{b.line1LinkLabel}</a>
        {' '}{b.line1Suffix}
      </p>
      <p className="p-bio">
        {b.line2Prefix}{' '}
        <a href={links.instagram} target="_blank" rel="noreferrer">
          <IcoInstagram />{b.line2IgLabel}
        </a>{b.line2Comma}{' '}
        <a href={links.whatsapp} target="_blank" rel="noreferrer">
          <IcoWhatsApp />WhatsApp
        </a>
        {' '}{b.line2Or}{' '}
        <a href={`mailto:${links.email}`}>
          <IcoEmail />{b.line2EmailLabel}
        </a>
        {' '}{b.line2GitPrefix}{' '}
        <a href={links.github} target="_blank" rel="noreferrer">
          <IcoGitHub />{b.line2GitLabel}
        </a>.
      </p>
      <p className="p-bio">
        {b.line3Prefix}{' '}
        <a href={links.twitter} target="_blank" rel="noreferrer">
          <IcoX />{b.line3TwitterLabel}
        </a>.
      </p>
      <p className="p-bio p-bio--last">
        {profile.cvPrefix}{' '}
        <a href={profile.cvHref} target="_blank" rel="noreferrer">
          <IcoPdf />{profile.cvLabel}
        </a>.
      </p>

      {/* ── Tech Marquee ── */}
      {(() => {
        const row = tech.map((label, i) => (
          <span className="mq-pill" key={i}>
            <span className="mq-ico">{TECH_ICONS[label]}</span>
            {label}
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

      {/* ── Pengalaman / Experience ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>{t.pengalaman.title}</h2>
        <p className="p-section-sub">{t.pengalaman.sub}</p>
        <div className="p-entries-grid">
          {t.pengalaman.entries.map(e => (
            <div className="p-entry-row" key={e.co}>
              <div className="p-entry-left">
                <span className="p-entry-co">{e.co}</span>
                <span className="p-entry-role">{e.role}</span>
              </div>
              <span className="p-entry-date">{e.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Kontribusi Digital ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>{t.kontribusiDigital.title}</h2>
        <p className="p-section-sub">{t.kontribusiDigital.sub}</p>
        <div className="p-entries-grid">
          {t.kontribusiDigital.entries.map(e => (
            <div className="p-entry-row" key={e.co}>
              <div className="p-entry-left">
                <span className="p-entry-co">{e.co}</span>
                <span className="p-entry-role">{e.role}</span>
              </div>
              <span className="p-entry-date">{e.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pendidikan / Education ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>{t.pendidikan.title}</h2>
        <p className="p-section-sub">{t.pendidikan.sub}</p>
        <div className="p-entries-grid">
          {t.pendidikan.entries.map(e => (
            <div className="p-entry-row" key={e.co}>
              <div className="p-entry-left">
                <span className="p-entry-co">{e.co}</span>
                <span className="p-entry-role">{e.role}</span>
              </div>
              <span className="p-entry-date">{e.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Proyek / Projects ── */}
      <div className="p-section">
        <h2 className="p-section-title"><span className="hash"># </span>{t.proyek.title}</h2>
        <p className="p-section-sub">{t.proyek.sub}</p>

        <div className="p-projects-grid">
          {t.proyek.items.map(item => (
            <div className="p-project" key={item.name}>
              <div className="p-project-name">
                {item.name}
                {item.badge && (
                  <span className="p-badge"><span className="p-badge-dot" />{item.badge}</span>
                )}
              </div>
              <p className="p-project-desc">{item.desc}</p>
              <div className="p-project-links">
                {item.external ? (
                  <a href={item.linkHref} className="p-link" target="_blank" rel="noreferrer">
                    {item.linkIcon === 'github' ? <IcoGitHub size={12} /> : <IcoArrow />}
                    {item.linkLabel}
                  </a>
                ) : (
                  <Link href={item.linkHref} className="p-link">
                    {item.linkIcon === 'github' ? <IcoGitHub size={12} /> : <IcoArrow />}
                    {item.linkLabel}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="p-footer">
        <p>{f.creditPrefix} <strong>{f.creditName}</strong></p>
        <p>{f.copyright}</p>
        <p className="p-footer-stats">
          {f.visitorsLabel} <strong>#{visitors !== null ? visitors.toLocaleString() : '—'}</strong>
        </p>
        <p className="p-footer-loc">{f.location} {time}</p>
      </footer>

      </div>{/* end lang-content */}
    </div>
  );
}
