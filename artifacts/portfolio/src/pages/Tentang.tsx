import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  SiReact, SiTypescript, SiNextdotjs, SiVite, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiFigma, SiVercel,
  SiGithub, SiCanva, SiDrizzle,
} from 'react-icons/si';
import { content } from '@/content';
import {
  IcoVerified, IcoEmail, IcoWhatsApp, IcoGitHub,
  IcoX, IcoInstagram, IcoPdf, IcoArrow,
} from '@/components/Icons';

const { profile, bio, bioEN, links, tech, tentang, tentangEN } = content;

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

function genVisitorId() {
  try {
    const k = 'bc-user-id';
    let id = localStorage.getItem(k);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(k, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [online, setOnline] = useState<number | null>(null);
  useEffect(() => {
    const userId = genVisitorId();
    fetch('/api/stats/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then(r => r.json())
      .then(d => setCount(d.visitorsTotal ?? null))
      .catch(() => {});

    const HEARTBEAT_MS = 20 * 1000;
    const heartbeat = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      fetch('/api/stats/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      }).catch(() => {});
    }, HEARTBEAT_MS);

    const REALTIME_MS = 1000;
    const realtime = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      fetch(`/api/stats/today?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' })
        .then(r => r.json())
        .then(d => { setCount(d.visitorsTotal ?? null); setOnline(d.online ?? null); })
        .catch(() => {});
    }, REALTIME_MS);

    function sendLeave() {
      const payload = new Blob([JSON.stringify({ userId })], { type: 'application/json' });
      navigator.sendBeacon?.('/api/stats/leave', payload);
    }
    document.addEventListener('pagehide', sendLeave);

    return () => {
      clearInterval(heartbeat);
      clearInterval(realtime);
      document.removeEventListener('pagehide', sendLeave);
    };
  }, []);
  return { count, online };
}

function useIncreaseFlash(value: number | null) {
  const prevRef = useRef(value);
  const [flashing, setFlashing] = useState(false);
  useEffect(() => {
    const prev = prevRef.current;
    if (value !== null && prev !== null && value > prev) {
      setFlashing(true);
      const t = setTimeout(() => setFlashing(false), 700);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
    prevRef.current = value;
    return undefined;
  }, [value]);
  return flashing;
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

/* ─────────── Role cycler ─────────── */

function useRoleCycle(roles: { label: string; duration: number }[]) {
  const [idx, setIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const stay = setTimeout(() => {
      setExiting(true);
      const exit = setTimeout(() => {
        setIdx(i => (i + 1) % roles.length);
        setExiting(false);
      }, 280);
      return () => clearTimeout(exit);
    }, roles[idx].duration);
    return () => clearTimeout(stay);
  }, [idx]);

  return { label: roles[idx].label, key: idx, exiting };
}

/* ─────────── Component ─────────── */

export default function Tentang() {
  const time = useCianjurClock();
  const { count: visitors, online } = useVisitorCount();
  const visitorsFlash = useIncreaseFlash(visitors);
  const onlineFlash = useIncreaseFlash(online);
  const role = useRoleCycle(profile.roles);
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

      {/* ── Lang toggle — top-right of page ── */}
      <button
        className="lang-toggle"
        onClick={toggleLang}
        aria-label="Toggle language"
      >
        <span className={lang === 'id' ? 'lang-active' : ''}>ID</span>
        <span className="lang-sep">|</span>
        <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
      </button>

      {/* ── Profile ── */}
      <div className="p-profile">
        <div className="p-avatar" role="img" aria-label={profile.ariaLabel} />
        <div>
          <div className="p-name">
            {profile.name}
            <IcoVerified />
          </div>
          <div className="p-role-wrap">
            <div key={role.key} className={`p-role${role.exiting ? ' p-role--exit' : ''}`}>
              {role.label}
            </div>
          </div>
        </div>
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
        </a>{', '}
        <a href={links.twitter} target="_blank" rel="noreferrer">
          <IcoX />{b.line2TwitterLabel}
        </a>{', '}
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
      <p className="p-bio p-bio--last">
        {b.cvPrefix}{' '}
        <a href={profile.cvHref} target="_blank" rel="noreferrer">
          <IcoPdf />{b.cvLabel}
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
        <div className="p-footer-left">
          <p>{f.creditPrefix} <strong>{f.creditName}</strong></p>
          <p>{f.copyright}</p>
        </div>
        <div className="p-footer-right">
          <p className="p-footer-stats">
            {f.visitorsLabel} <strong className={visitorsFlash ? 'stat-flash' : undefined}>#{visitors !== null ? (1000 + visitors).toLocaleString() : '—'}</strong>
            {' | '}{f.onlineLabel} <strong className={onlineFlash ? 'stat-flash' : undefined}>#{online !== null ? online.toLocaleString() : '—'}</strong>
          </p>
          <p className="p-footer-loc">{f.location} {time}</p>
        </div>
      </footer>

      </div>{/* end lang-content */}
    </div>
  );
}
