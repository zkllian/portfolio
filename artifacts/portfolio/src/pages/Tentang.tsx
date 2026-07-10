import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
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

/* ─── Hooks ─── */

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
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(k, id); }
    return id;
  } catch { return crypto.randomUUID(); }
}

function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [online, setOnline] = useState<number | null>(null);
  useEffect(() => {
    const userId = genVisitorId();
    fetch('/api/stats/visit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    }).then(r => r.json()).then(d => setCount(d.visitorsTotal ?? null)).catch(() => {});

    const heartbeat = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      fetch('/api/stats/visit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      }).catch(() => {});
    }, 20000);

    const realtime = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      fetch(`/api/stats/today?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' })
        .then(r => r.json())
        .then(d => { setCount(d.visitorsTotal ?? null); setOnline(d.online ?? null); })
        .catch(() => {});
    }, 1000);

    function sendLeave() {
      const payload = new Blob([JSON.stringify({ userId })], { type: 'application/json' });
      navigator.sendBeacon?.('/api/stats/leave', payload);
    }
    function handleVisibility() { if (document.visibilityState === 'hidden') sendLeave(); }
    document.addEventListener('pagehide', sendLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeunload', sendLeave);
    return () => {
      clearInterval(heartbeat); clearInterval(realtime);
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

/* ─── Tech icon map ─── */

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

/* ─── Animation variants ─── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/* ─── Animated section wrapper ─── */

function AnimSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

/* ─── Component ─── */

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
    setTimeout(() => { setLang(l => l === 'id' ? 'en' : 'id'); setSwitching(false); }, 150);
  }

  return (
    <div className="p-wrap page-wrap--enter">

      {/* ── Lang toggle ── */}
      <motion.button
        className="lang-toggle"
        onClick={toggleLang}
        aria-label="Toggle language"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className={`lang-pill${isEN ? ' lang-pill--en' : ''}`} />
        <span className={lang === 'id' ? 'lang-active' : ''}>ID</span>
        <span className={lang === 'en' ? 'lang-active' : ''}>EN</span>
      </motion.button>

      {/* ── Profile ── */}
      <motion.div
        className="p-profile"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="p-avatar"
          role="img"
          aria-label={profile.ariaLabel}
          variants={fadeUp}
          whileHover={{ scale: 1.04, rotate: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        <motion.div variants={stagger}>
          <motion.div className="p-name" variants={fadeUp}>
            {profile.name}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
            >
              <IcoVerified />
            </motion.span>
          </motion.div>
          <motion.div className="p-role-wrap" variants={fadeUp}>
            <div key={role.key} className={`p-role${role.exiting ? ' p-role--exit' : ''}`}>
              {role.label}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Translatable content ── */}
      <div className={`lang-content${switching ? ' lang-content--blur' : ''}`}>

        {/* ── Bio ── */}
        <AnimSection>
          <motion.p className="p-bio" variants={fadeUp}>
            {b.line1Prefix}{' '}
            <a href={links.github} target="_blank" rel="noreferrer" className="p-sketch-link">{b.line1LinkLabel}</a>
            {' '}{b.line1Suffix}
          </motion.p>
          <motion.p className="p-bio" variants={fadeUp}>
            {b.line2Prefix}{' '}
            <a href={links.instagram} target="_blank" rel="noreferrer"><IcoInstagram />{b.line2IgLabel}</a>{', '}
            <a href={links.twitter} target="_blank" rel="noreferrer"><IcoX />{b.line2TwitterLabel}</a>{', '}
            <a href={links.whatsapp} target="_blank" rel="noreferrer"><IcoWhatsApp />WhatsApp</a>
            {' '}{b.line2Or}{' '}
            <a href={`mailto:${links.email}`}><IcoEmail />{b.line2EmailLabel}</a>
            {' '}{b.line2GitPrefix}{' '}
            <a href={links.github} target="_blank" rel="noreferrer"><IcoGitHub />{b.line2GitLabel}</a>.
          </motion.p>
          <motion.p className="p-bio p-bio--last" variants={fadeUp}>
            {b.cvPrefix}{' '}
            <a href={profile.cvHref} target="_blank" rel="noreferrer"><IcoPdf />{b.cvLabel}</a>.
          </motion.p>
        </AnimSection>

        {/* ── Tech Marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {(() => {
            const row = tech.map((label, i) => (
              <span className="mq-pill" key={i}>
                <span className="mq-ico">{TECH_ICONS[label]}</span>
                {label}
              </span>
            ));
            return (
              <div className="mq-wrap">
                <div className="mq-track">{row}{row}</div>
              </div>
            );
          })()}
        </motion.div>

        {/* ── Pengalaman / Experience ── */}
        <AnimSection className="p-section">
          <motion.h2 className="p-section-title" variants={fadeUp}>
            <span className="hash"># </span>{t.pengalaman.title}
          </motion.h2>
          <motion.p className="p-section-sub" variants={fadeUp}>{t.pengalaman.sub}</motion.p>
          <motion.div className="p-entries-grid" variants={staggerFast}>
            {t.pengalaman.entries.map(e => (
              <motion.div className="p-entry-row" key={e.co} variants={fadeUp}>
                <div className="p-entry-left">
                  <span className="p-entry-co">{e.co}</span>
                  <span className="p-entry-role">{e.role}</span>
                </div>
                <span className="p-entry-date">{e.date}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimSection>

        {/* ── Kontribusi Digital ── */}
        <AnimSection className="p-section">
          <motion.h2 className="p-section-title" variants={fadeUp}>
            <span className="hash"># </span>{t.kontribusiDigital.title}
          </motion.h2>
          <motion.p className="p-section-sub" variants={fadeUp}>{t.kontribusiDigital.sub}</motion.p>
          <motion.div className="p-entries-grid" variants={staggerFast}>
            {t.kontribusiDigital.entries.map(e => (
              <motion.div className="p-entry-row" key={e.co} variants={fadeUp}>
                <div className="p-entry-left">
                  <span className="p-entry-co">{e.co}</span>
                  <span className="p-entry-role">{e.role}</span>
                </div>
                <span className="p-entry-date">{e.date}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimSection>

        {/* ── Pendidikan / Education ── */}
        <AnimSection className="p-section">
          <motion.h2 className="p-section-title" variants={fadeUp}>
            <span className="hash"># </span>{t.pendidikan.title}
          </motion.h2>
          <motion.p className="p-section-sub" variants={fadeUp}>{t.pendidikan.sub}</motion.p>
          <motion.div className="p-entries-grid" variants={staggerFast}>
            {t.pendidikan.entries.map(e => (
              <motion.div className="p-entry-row" key={e.co} variants={fadeUp}>
                <div className="p-entry-left">
                  <span className="p-entry-co">{e.co}</span>
                  <span className="p-entry-role">{e.role}</span>
                </div>
                <span className="p-entry-date">{e.date}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimSection>

        {/* ── Proyek / Projects ── */}
        <AnimSection className="p-section">
          <motion.h2 className="p-section-title" variants={fadeUp}>
            <span className="hash"># </span>{t.proyek.title}
          </motion.h2>
          <motion.p className="p-section-sub" variants={fadeUp}>{t.proyek.sub}</motion.p>
          <motion.div className="p-projects-grid" variants={staggerFast}>
            {t.proyek.items.map(item => (
              <motion.div
                key={item.name}
                className="p-project"
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </AnimSection>

        {/* ── Footer ── */}
        <motion.footer
          className="p-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="p-footer-left">
            <p>{f.creditPrefix} <strong>{f.creditName}</strong></p>
            <p>{f.copyright}</p>
          </div>
          <div className="p-footer-right">
            <p className="p-footer-stats">
              {f.visitorsLabel}{' '}
              <strong className={visitorsFlash ? 'stat-flash' : undefined}>
                #{visitors !== null ? (1000 + visitors).toLocaleString() : '—'}
              </strong>
              {' | '}{f.onlineLabel}{' '}
              <strong className={onlineFlash ? 'stat-flash' : undefined}>
                {online !== null ? online.toLocaleString() : '—'}
              </strong>
            </p>
            <p className="p-footer-loc">{f.location} {time}</p>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}
