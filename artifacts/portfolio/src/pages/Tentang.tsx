import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE, delay } },
});
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
import {
  SiReact, SiTypescript, SiNextdotjs, SiVite, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiFigma, SiVercel,
  SiGithub, SiCanvas, SiDrizzle,
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
    function handleVisibility() {
      if (document.visibilityState === 'hidden') sendLeave();
    }
    document.addEventListener('pagehide', sendLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', sendLeave);

    return () => {
      clearInterval(heartbeat);
      clearInterval(realtime);
      document.removeEventListener('pagehide', sendLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeunload', sendLeave);
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
  'Canva':        <SiCanvas />,
};

/* ─────────── Role cycler ─────────── */

function useRoleCycle(roles: { label: string; duration: number }[]) {
  const [idx, setIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let exit: ReturnType<typeof setTimeout> | undefined;
    const stay = setTimeout(() => {
      setExiting(true);
      exit = setTimeout(() => {
        setIdx(i => (i + 1) % roles.length);
        setExiting(false);
      }, 280);
    }, roles[idx].duration);
    return () => {
      clearTimeout(stay);
      if (exit) clearTimeout(exit);
    };
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

      {/* ── Profile ── */}
      <motion.div className="p-profile" initial="hidden" animate="show" variants={container}>
        <motion.div variants={fadeUp} className="p-avatar" role="img" aria-label={profile.ariaLabel} />
        <motion.div variants={fadeUp}>
          <div className="p-name">{profile.name}<IcoVerified /></div>
          <div className="p-role-wrap">
            <div key={role.key} className={`p-role${role.exiting ? ' p-role--exit' : ''}`}>{role.label}</div>
          </div>
        </motion.div>
        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          <span className={`lang-pill${isEN ? ' lang-pill--en' : ''}`} />
          <span className={lang === 'id' ? 'lang-active' : ''}>ID</span>
          <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
        </button>
      </motion.div>

      {/* ── Translatable content ── */}
      <div className={`lang-content${switching ? ' lang-content--blur' : ''}`}>

      {/* ── Bio ── */}
      <motion.div initial="hidden" animate="show" variants={container}>
        <motion.p variants={stagger(0.05)} className="p-bio">
          {b.line1Prefix}{' '}
          <a href={links.github} target="_blank" rel="noreferrer" className="p-sketch-link">{b.line1LinkLabel}</a>
          {' '}{b.line1Suffix}
        </motion.p>
        <motion.p variants={stagger(0.1)} className="p-bio">
          {b.line2Prefix}{' '}
          <a href={links.instagram} target="_blank" rel="noreferrer"><IcoInstagram />{b.line2IgLabel}</a>{', '}
          <a href={links.twitter} target="_blank" rel="noreferrer"><IcoX />{b.line2TwitterLabel}</a>{', '}
          <a href={links.whatsapp} target="_blank" rel="noreferrer"><IcoWhatsApp />WhatsApp</a>
          {' '}{b.line2Or}{' '}
          <a href={`mailto:${links.email}`}><IcoEmail />{b.line2EmailLabel}</a>
          {b.line2GitPrefix}{' '}
          <a href={links.github} target="_blank" rel="noreferrer"><IcoGitHub />{b.line2GitLabel}</a>.
        </motion.p>
        <motion.p variants={stagger(0.15)} className="p-bio p-bio--last">
          {b.cvPrefix}<a href={profile.cvHref} target="_blank" rel="noreferrer"><IcoPdf />{b.cvLabel}</a>{b.cvSuffix}.
        </motion.p>
      </motion.div>

      {/* ── Tech Marquee ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        {(() => {
          const row = tech.map((label, i) => (
            <span className="mq-pill" key={i}><span className="mq-ico">{TECH_ICONS[label]}</span>{label}</span>
          ));
          return <div className="mq-wrap"><div className="mq-track">{row}{row}</div></div>;
        })()}
      </motion.div>

      {/* ── Pengalaman / Experience ── */}
      <motion.div className="p-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={container}>
        <motion.h2 variants={fadeUp} className="p-section-title">{t.pengalaman.title}</motion.h2>
        <motion.p variants={fadeUp} className="p-section-sub">{t.pengalaman.sub}</motion.p>
        <div className="p-entries-grid">
          {t.pengalaman.entries.map((e, i) => (
            <motion.div variants={stagger(i * 0.05)} className="p-entry-row" key={e.co}>
              <div className="p-entry-left">
                <span className="p-entry-co">{e.co}</span>
                <span className="p-entry-role">{e.role}</span>
              </div>
              <span className="p-entry-date">{e.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Kontribusi Digital ── */}
      <motion.div className="p-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={container}>
        <motion.h2 variants={fadeUp} className="p-section-title">{t.kontribusiDigital.title}</motion.h2>
        <motion.p variants={fadeUp} className="p-section-sub">{t.kontribusiDigital.sub}</motion.p>
        <div className="p-kontribusi-grid">
          {t.kontribusiDigital.entries.map((e, i) => (
            <motion.div variants={stagger(i * 0.05)} key={e.co} className="p-kontribusi-item">
              <div className="p-kontribusi-top">
                <span className="p-entry-co">{e.co}</span>
                <span className="p-entry-date">{e.date}</span>
              </div>
              <span className="p-entry-role" style={{ display: 'block' }}>{e.role}</span>
              <div className="p-project-links" style={{ marginTop: 6 }}>
                <a href={e.href} className="p-link" target="_blank" rel="noreferrer">
                  <IcoArrow />buka
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Pendidikan / Education ── */}
      <motion.div className="p-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={container}>
        <motion.h2 variants={fadeUp} className="p-section-title">{t.pendidikan.title}</motion.h2>
        <motion.p variants={fadeUp} className="p-section-sub">{t.pendidikan.sub}</motion.p>
        <div className="p-entries-grid">
          {t.pendidikan.entries.map((e, i) => (
            <motion.div variants={stagger(i * 0.05)} className="p-entry-row" key={e.co}>
              <div className="p-entry-left">
                <span className="p-entry-co">{e.co}</span>
                <span className="p-entry-role">{e.role}</span>
              </div>
              <span className="p-entry-date">{e.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Proyek / Projects ── */}
      <motion.div className="p-section" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={container}>
        <motion.h2 variants={fadeUp} className="p-section-title">{t.proyek.title}</motion.h2>
        <motion.p variants={fadeUp} className="p-section-sub">{t.proyek.sub}</motion.p>
        <div className="p-projects-grid">
          {t.proyek.items.map((item, i) => (
            <motion.div
              className="p-project"
              key={item.name}
              variants={stagger(i * 0.06)}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="p-project-name">
                {item.name}
                {item.badge && <span className="p-badge"><span className="p-badge-dot" />{item.badge}</span>}
              </div>
              <p className="p-project-desc">{item.desc}</p>
              <div className="p-project-links">
                {item.external ? (
                  <a href={item.linkHref} className="p-link" target="_blank" rel="noreferrer">
                    {item.linkIcon === 'github' ? <IcoGitHub size={12} /> : <IcoArrow />}{item.linkLabel}
                  </a>
                ) : (
                  <Link href={item.linkHref} className="p-link">
                    {item.linkIcon === 'github' ? <IcoGitHub size={12} /> : <IcoArrow />}{item.linkLabel}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Footer ── */}
      <motion.footer className="p-footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <div className="p-footer-left">
          <p>{f.creditPrefix} <strong>{f.creditName}</strong></p>
          <p>{f.copyright}</p>
        </div>
        <div className="p-footer-right">
          <p className="p-footer-stats">
            {f.visitorsLabel} <strong className={visitorsFlash ? 'stat-flash' : undefined}>#{visitors !== null ? (1000 + visitors).toLocaleString() : '—'}</strong>
            {' | '}{f.onlineLabel} <strong className={onlineFlash ? 'stat-flash' : undefined}>{online !== null ? online.toLocaleString() : '—'}</strong>
          </p>
          <p className="p-footer-loc">{f.location} {time}</p>
        </div>
      </motion.footer>

      </div>{/* end lang-content */}
    </div>
  );
}
