import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useCredit } from '@/hooks/useCredit';

export default function Tentang() {
  const [, navigate] = useLocation();
  const { secretClick, dotColor, modal: creditModal } = useCredit();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  function openMenu() {
    setMenuOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setMenuVisible(true)));
  }

  function closeMenu() {
    setMenuVisible(false);
    setTimeout(() => setMenuOpen(false), 180);
  }

  function toggleMenu() {
    if (menuOpen) closeMenu(); else openMenu();
  }

  return (
    <>
      <div className="logo-wrap" ref={menuRef}>
        <div className="logo-row">
          <div className="logo-icon-wrap" onClick={secretClick}>
            <div className="logo-icon-ring logo-icon-ring--1"></div>
            <div className="logo-icon-ring logo-icon-ring--2"></div>
            <div className="logo-icon" style={{ background: dotColor, transition: 'background 0.2s ease' }}></div>
          </div>
          <div className="logo-label">
            <button className="logo-menu-btn" onClick={toggleMenu}>
              <span className="logo-root">llian</span>
              <span className={`logo-menu-arrow${menuOpen ? ' open' : ''}`}>▾</span>
            </button>
            <span className="logo-sep"> / </span>
            <span className="logo-crumb">tentang</span>
          </div>
        </div>

        {menuOpen && (
          <div className={`nav-menu${menuVisible ? ' visible' : ''}`}>
            <button className="nav-menu-item nav-menu-item--active" onClick={closeMenu}>
              tentang
            </button>
            <div className="nav-menu-sub-wrap">
              <span className="nav-menu-item nav-menu-item--parent">projects</span>
              <div className="nav-menu-sub">
                <button className="nav-menu-item nav-menu-item--child" onClick={() => { closeMenu(); navigate('/projects/imei/barcode-gen'); }}>
                  imei / barcode-gen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container">
        <div className="cv-wrap">

          <div className="cv-hero">
            <img className="cv-avatar" src="/avatar.png" alt="avatar" />
            <div className="cv-hero-info">
              <div className="cv-name">yoga aprilliansyah n</div>
              <div className="cv-meta">
                <span>26 tahun</span>
                <span className="cv-meta-dot">·</span>
                <span>cianjur</span>
              </div>
              <div className="cv-contacts">
                <a className="cv-contact-link" href="tel:08950895110">0895-0895-1100</a>
                <a className="cv-contact-link" href="mailto:llianified@gmail.com">llianified@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="cv-section">
            <div className="cv-section-label">// tentang saya</div>
            <p className="cv-about">
              lulusan teknik komputer &amp; jaringan berusia 26 tahun dengan pengalaman di bidang administrasi,
              dan pemasaran digital. menyukai kerja sama dalam tim dan terbiasa menyelesaikan pekerjaan dengan
              rapi dan tepat waktu.
            </p>
          </div>

          <div className="cv-section">
            <div className="cv-section-label">// pengalaman</div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">digital marketing</span>
                <span className="cv-entry-company">zenius store</span>
              </div>
              <div className="cv-entry-period">maret 2021 – september 2021</div>
              <ul className="cv-list">
                <li>melayani pelanggan dan memproses pesanan melalui whatsapp, mulai dari konsultasi produk hingga konfirmasi order</li>
                <li>menyiapkan, mengemas, dan mengelola pengiriman pesanan serta memastikan pesanan terkirim dengan baik</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">admin perpustakaan</span>
                <span className="cv-entry-company">universitas suryakancana</span>
              </div>
              <div className="cv-entry-period">agustus 2017 – november 2017</div>
              <ul className="cv-list">
                <li>mengawasi operasional harian perpustakaan dan memastikan alur layanan berjalan efisien untuk ratusan pengunjung per hari</li>
                <li>membantu pengunjung menemukan referensi yang dibutuhkan dengan cepat, meningkatkan kepuasan layanan secara konsisten</li>
                <li>melakukan pembaruan dan pengorganisasian koleksi buku secara berkala agar tetap relevan dan mudah diakses</li>
              </ul>
            </div>
          </div>

          <div className="cv-section">
            <div className="cv-section-label">// pendidikan</div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">teknik komputer &amp; jaringan</span>
                <span className="cv-entry-company">smk pasundan 1 cianjur</span>
              </div>
              <div className="cv-entry-period">juli 2015 – mei 2018</div>
              <ul className="cv-list">
                <li>mendalami perancangan, pembangunan, dan pemeliharaan jaringan komputer</li>
                <li>dasar pemrograman dan sistem operasi sebagai fondasi karier di bidang teknologi dan digital</li>
              </ul>
            </div>
          </div>

          <div className="cv-section">
            <div className="cv-section-label">// informasi tambahan</div>
            <div className="cv-info-grid">
              <div className="cv-info-row">
                <span className="cv-info-key">hard skills</span>
                <span className="cv-info-val">administrasi data · adobe photoshop · canva · content planning · figma · google workspace · manajemen media sosial · microsoft office</span>
              </div>
              <div className="cv-info-row">
                <span className="cv-info-key">soft skills</span>
                <span className="cv-info-val">komunikasi · kerja tim · problem solving · manajemen waktu</span>
              </div>
              <div className="cv-info-row">
                <span className="cv-info-key">bahasa</span>
                <span className="cv-info-val">inggris · indonesia</span>
              </div>
              <div className="cv-info-row">
                <span className="cv-info-key">sertifikasi</span>
                <span className="cv-info-val">komputer · microsoft office</span>
              </div>
            </div>
          </div>

          <div className="cv-section">
            <div className="cv-section-label">// recently played</div>
            <a
              className="spotify-card"
              href="https://open.spotify.com/track/38u55vfPVcVYoqcbuQzpyu?si=I-YjAcsxQaO9cGh6AAL_hA"
              target="_blank"
              rel="noreferrer"
            >
              <img className="spotify-art" src="/spotify-like-i-do.png" alt="Like I Do" />
              <div className="spotify-info">
                <div className="spotify-track">like i do</div>
                <div className="spotify-artist">andy arysh</div>
              </div>
              <svg className="spotify-logo" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.297a.748.748 0 01-1.03.25c-2.819-1.723-6.365-2.112-10.542-1.157a.748.748 0 01-.353-1.452c4.573-1.045 8.492-.594 11.675 1.338.354.216.466.68.25 1.021zm1.472-3.276a.936.936 0 01-1.288.308c-3.226-1.983-8.145-2.557-11.967-1.399a.937.937 0 01-.577-1.787c4.363-1.323 9.786-.682 13.525 1.59.44.27.578.845.307 1.288zm.126-3.41c-3.868-2.297-10.243-2.508-13.933-1.388a1.122 1.122 0 01-.651-2.146c4.243-1.287 11.29-1.038 15.738 1.607a1.122 1.122 0 01-1.154 1.927z"/>
              </svg>
            </a>
          </div>

          <div className="cv-section cv-links-section">
            <div className="cv-section-label">// temukan saya</div>
            <div className="cv-links">
              <a className="cv-link" href="https://instagram.com/llianified" target="_blank" rel="noreferrer">
                <span className="cv-link-handle">@llianified</span>
                <span className="cv-link-arrow">↗</span>
              </a>
              <a className="cv-link" href="https://instagram.com/lli.__.an" target="_blank" rel="noreferrer">
                <span className="cv-link-handle">@lli.__.an</span>
                <span className="cv-link-arrow">↗</span>
              </a>
              <a className="cv-link" href="https://zkllian.vercel.app" target="_blank" rel="noreferrer">
                <span className="cv-link-handle">zkllian.vercel.app</span>
                <span className="cv-link-arrow">↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {creditModal}
    </>
  );
}
