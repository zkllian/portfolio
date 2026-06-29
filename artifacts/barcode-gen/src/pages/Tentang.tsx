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
