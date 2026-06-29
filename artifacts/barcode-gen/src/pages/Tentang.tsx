import { useEffect } from 'react';

export default function Tentang() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Scroll reveal
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

  // Magnetic hover handlers
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
    <>
      <div className="container">
        <div className="cv-wrap">

          {/* ── Hero ── */}
          <div className="cv-hero reveal">
            <div className="cv-avatar" role="img" aria-label="avatar" />
            <div className="cv-hero-info">
              <div className="cv-name">yoga aprilliansyan n</div>
              <div className="cv-role">front-end developer</div>
              <div className="cv-meta">
                <span>26 tahun</span>
                <span className="cv-meta-dot">·</span>
                <span>cianjur</span>
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
          </div>

          {/* ── Spotify ── */}
          <a
            className="spotify-card reveal"
            href="https://open.spotify.com/track/38u55vfPVcVYoqcbuQzpyu?si=I-YjAcsxQaO9cGh6AAL_hA"
            target="_blank"
            rel="noreferrer"
          >
            <img className="spotify-art" src="/spotify-like-i-do.png" alt="like i do" />
            <div className="spotify-info">
              <div className="spotify-label">recently played</div>
              <div className="spotify-track">like i do</div>
              <div className="spotify-artist">andy arysh</div>
            </div>
            <svg className="spotify-logo" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.297a.748.748 0 01-1.03.25c-2.819-1.723-6.365-2.112-10.542-1.157a.748.748 0 01-.353-1.452c4.573-1.045 8.492-.594 11.675 1.338.354.216.466.68.25 1.021zm1.472-3.276a.936.936 0 01-1.288.308c-3.226-1.983-8.145-2.557-11.967-1.399a.937.937 0 01-.577-1.787c4.363-1.323 9.786-.682 13.525 1.59.44.27.578.845.307 1.288zm.126-3.41c-3.868-2.297-10.243-2.508-13.933-1.388a1.122 1.122 0 01-.651-2.146c4.243-1.287 11.29-1.038 15.738 1.607a1.122 1.122 0 01-1.154 1.927z"/>
            </svg>
          </a>

          {/* ── Tentang saya ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              tentang saya
            </div>
            <p className="cv-about">
              ketertarikan saya terhadap teknologi dimulai dari warnet sekitar 2010 — dari sana saya mulai bereksperimen sendiri,
              hingga pada 2012 mengelola blog di blogspot dan berhasil bermitra dengan google adsense. perjalanan formal saya
              berlanjut ke dunia administrasi sebagai admin perpustakaan di universitas suryakancana, lalu berkembang ke
              pemasaran digital: menjalankan iklan facebook ads, menulis konten, dan mengelola media sosial. saya terus belajar
              secara mandiri — membangun dan mendeploy website dengan next.js dan vercel, serta membuat bot telegram untuk
              otomasi pemasaran. saya memiliki kepekaan terhadap tampilan digital: saya tahu bagaimana sebuah desain bisa
              terlihat rapi, terstruktur, dan elegan. pengalaman saya di komunitas web3 melengkapi kemampuan saya dalam
              membangun keterlibatan audiens secara online.
            </p>
          </div>

          {/* ── Kompetensi utama ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              kompetensi utama
            </div>
            <div className="cv-competency-list">
              <div className="cv-competency-item">
                <span className="cv-competency-num">01</span>
                <p className="cv-competency-text">kepekaan tinggi terhadap estetika visual — mampu menilai apakah sebuah tampilan terlihat rapi, terstruktur, dan elegan; memahami prinsip tata letak yang membuat desain terasa profesional</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">02</span>
                <p className="cv-competency-text">perhatian terhadap detail — mampu mendeteksi inkonsistensi visual dan teks sekecil tanda baca, ukuran elemen, dan perbedaan warna antar komponen</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">03</span>
                <p className="cv-competency-text">pemahaman pemasaran digital — berpengalaman menjalankan iklan facebook ads, menulis konten untuk konversi, serta memahami dasar-dasar seo untuk meningkatkan visibilitas digital</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">04</span>
                <p className="cv-competency-text">kemampuan teknis yang fungsional — dapat membangun dan mendeploy website, membuat bot telegram untuk otomasi pemasaran, serta mengonfigurasi domain dan hosting secara mandiri</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">05</span>
                <p className="cv-competency-text">pengalaman administrasi dan pelayanan — terlatih mengelola data, melayani kebutuhan pengguna secara langsung, dan menjaga keakuratan pencatatan dalam lingkungan kerja formal</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">06</span>
                <p className="cv-competency-text">komunikasi yang efisien — mampu menyampaikan kebutuhan secara singkat dan jelas, baik dalam tim maupun kepada audiens digital, meminimalkan miskomunikasi</p>
              </div>
            </div>
          </div>

          {/* ── Pengalaman (formal + digital, merged) ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              pengalaman
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">admin intern</span>
                  <span className="cv-entry-company">universitas suryakancana</span>
                </div>
                <span className="cv-entry-period">agu – nov 2017</span>
              </div>
              <ul className="cv-list">
                <li>mengelola operasional harian perpustakaan, melayani pengunjung secara langsung, serta menginput dan memelihara data koleksi buku ke dalam sistem database universitas</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">digital marketing</span>
                  <span className="cv-entry-company">zenius store</span>
                </div>
                <span className="cv-entry-period">mar – sep 2021</span>
              </div>
              <ul className="cv-list">
                <li>melayani pelanggan dan memproses pesanan melalui whatsapp, mulai dari konsultasi produk hingga konfirmasi order</li>
                <li>menyiapkan, mengemas, dan mengelola pengiriman pesanan serta memastikan pesanan terkirim dengan baik</li>
              </ul>
            </div>

            <div className="cv-group-label">kontribusi digital</div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">blogger</span>
                  <span className="cv-entry-company">blog independen</span>
                </div>
                <span className="cv-entry-period">2012</span>
              </div>
              <ul className="cv-list">
                <li>mengelola blog pribadi di platform blogspot dan berhasil bermitra dengan google adsense — pencapaian pertama dalam memonetisasi konten digital secara mandiri</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">community manager</span>
                  <span className="cv-entry-company">verso</span>
                </div>
                <span className="cv-entry-period">mar 2018 – des 2019</span>
              </div>
              <ul className="cv-list">
                <li>merancang dan mengelola program keterlibatan komunitas, membangun pengalaman pengguna yang positif, serta menjaga konsistensi komunikasi antara tim proyek dan anggota komunitas</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">brand ambassador</span>
                  <span className="cv-entry-company">injective</span>
                </div>
                <span className="cv-entry-period">jan 2024 – mar 2025</span>
              </div>
              <ul className="cv-list">
                <li>memperkuat citra merek melalui produksi konten tertulis, desain grafis, dan strategi media sosial yang ditargetkan kepada komunitas digital di platform twitter/x</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">brand ambassador</span>
                  <span className="cv-entry-company">nesa</span>
                </div>
                <span className="cv-entry-period">mar 2024 – mei 2025</span>
              </div>
              <ul className="cv-list">
                <li>membangun kesadaran merek dan mendorong keterlibatan audiens melalui konten yang estetis dan konsisten secara visual — mulai dari copywriting hingga aset grafis</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">content writer</span>
                  <span className="cv-entry-company">mitosis</span>
                </div>
                <span className="cv-entry-period">jul 2024 – apr 2025</span>
              </div>
              <ul className="cv-list">
                <li>memproduksi konten edukatif dan kreatif untuk mendukung pertumbuhan komunitas serta meningkatkan keterlibatan pengguna di ekosistem proyek</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">content writer</span>
                  <span className="cv-entry-company">story protocol</span>
                </div>
                <span className="cv-entry-period">jul 2024 – apr 2025</span>
              </div>
              <ul className="cv-list">
                <li>menghasilkan konten informatif dan menarik yang mendukung komunikasi proyek kepada audiens komunitas secara konsisten</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">content writer</span>
                  <span className="cv-entry-company">union</span>
                </div>
                <span className="cv-entry-period">jul 2024 – apr 2025</span>
              </div>
              <ul className="cv-list">
                <li>berkontribusi aktif dalam ekosistem komunitas melalui produksi konten digital yang memperkuat visibilitas dan relevansi proyek</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">brand ambassador</span>
                  <span className="cv-entry-company">swisstronik</span>
                </div>
                <span className="cv-entry-period">sep 2024 – jan 2025</span>
              </div>
              <ul className="cv-list">
                <li>merepresentasikan merek secara daring melalui konten media sosial rutin, copywriting kampanye, dan pengelolaan interaksi dengan komunitas untuk memperluas jangkauan proyek</li>
              </ul>
            </div>
          </div>

          {/* ── Pendidikan ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              pendidikan
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">teknik komputer &amp; jaringan</span>
                  <span className="cv-entry-company">smk pasundan 1 cianjur</span>
                </div>
                <span className="cv-entry-period">2015 – 2018</span>
              </div>
              <ul className="cv-list">
                <li>mendalami perancangan, pembangunan, dan pemeliharaan jaringan komputer</li>
                <li>dasar pemrograman dan sistem operasi sebagai fondasi karier di bidang teknologi dan digital</li>
              </ul>
            </div>
          </div>

          {/* ── Proyek ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              proyek
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">llian portfolio</span>
                  <svg className="cv-entry-link--dead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <span className="cv-entry-period">2025 – skrg</span>
              </div>
              <p className="cv-about" style={{ marginTop: 2 }}>situs portfolio pribadi yang menampilkan keahlian teknis, riwayat karier, dan proyek pilihan — dibangun dengan react, vite, dan typescript.</p>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">jobstreet scraper</span>
                  <svg className="cv-entry-link--dead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <span className="cv-entry-period">2024</span>
              </div>
              <p className="cv-about" style={{ marginTop: 2 }}>perkakas open source untuk mengotomatisasi pengambilan data lowongan kerja dari platform jobstreet secara terstruktur dan efisien.</p>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">admob auto impression</span>
                  <svg className="cv-entry-link--dead" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11, flexShrink: 0 }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <span className="cv-entry-period">2024</span>
              </div>
              <p className="cv-about" style={{ marginTop: 2 }}>perkakas open source berbasis otomasi untuk meningkatkan volume tayangan admob, dirancang untuk efisiensi operasional tanpa intervensi manual.</p>
            </div>
          </div>

          {/* ── Keahlian ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              keahlian
            </div>
            <div className="cv-info-grid">
              {([
                { key: 'web dev', tags: ['next.js','react','vite','typescript','tailwind css','express.js','drizzle orm','tanstack query','wouter','zod','vercel','telegram bot','ui/web design'] },
                { key: 'marketing', tags: ['facebook ads','seo dasar','social media management','content planning'] },
                { key: 'konten', tags: ['community management','content writing','copywriting'] },
                { key: 'desain', tags: ['adobe photoshop','canva','figma','graphic design','ui/web design'] },
                { key: 'administrasi', tags: ['microsoft office','google workspace','data entry'] },
                { key: 'soft skills', tags: ['komunikasi','kerja tim','problem solving','manajemen waktu'] },
                { key: 'bahasa', tags: ['indonesia','inggris'] },
                { key: 'sertifikasi', tags: ['sertifikasi komputer','microsoft office'] },
              ] as { key: string; tags: string[] }[]).map(({ key, tags }) => (
                <div key={key} className="cv-info-row">
                  <span className="cv-info-key">{key}</span>
                  <div className="cv-tags">
                    {tags.map(t => <span key={t} className="cv-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Temukan saya ── */}
          <div className="cv-section cv-links-section">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              temukan saya
            </div>
            <div className="cv-links">
              <a className="cv-link" href="https://twitter.com/llianified" target="_blank" rel="noreferrer">
                <div className="cv-link-left">
                  <svg className="cv-link-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.847L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="cv-link-handle">@llianified</span>
                </div>
                <span className="cv-link-arrow">↗</span>
              </a>
              <a className="cv-link" href="https://instagram.com/lli.__.an" target="_blank" rel="noreferrer">
                <div className="cv-link-left">
                  <svg className="cv-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span className="cv-link-handle">@lli.__.an</span>
                </div>
                <span className="cv-link-arrow">↗</span>
              </a>
              <a className="cv-link" href="https://github.com/zkllian" target="_blank" rel="noreferrer">
                <div className="cv-link-left">
                  <svg className="cv-link-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span className="cv-link-handle">github.com/zkllian</span>
                </div>
                <span className="cv-link-arrow">↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
