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
              <div className="cv-name">Yoga Aprilliansyan N</div>
              <div className="cv-role">Front-End Developer</div>
              <div className="cv-meta">
                <span>26 Tahun</span>
                <span className="cv-meta-dot">·</span>
                <span>Cianjur</span>
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
              <div className="spotify-label">Recently Played</div>
              <div className="spotify-track">Like I Do</div>
              <div className="spotify-artist">Andy Arysh</div>
            </div>
            <svg className="spotify-logo" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.297a.748.748 0 01-1.03.25c-2.819-1.723-6.365-2.112-10.542-1.157a.748.748 0 01-.353-1.452c4.573-1.045 8.492-.594 11.675 1.338.354.216.466.68.25 1.021zm1.472-3.276a.936.936 0 01-1.288.308c-3.226-1.983-8.145-2.557-11.967-1.399a.937.937 0 01-.577-1.787c4.363-1.323 9.786-.682 13.525 1.59.44.27.578.845.307 1.288zm.126-3.41c-3.868-2.297-10.243-2.508-13.933-1.388a1.122 1.122 0 01-.651-2.146c4.243-1.287 11.29-1.038 15.738 1.607a1.122 1.122 0 01-1.154 1.927z"/>
            </svg>
          </a>

          {/* ── Tentang saya + Kompetensi utama (2-col on desktop) ── */}
          <div className="cv-row-2col">
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              Tentang Saya
            </div>
            <p className="cv-about">
              Saya mulai kenal internet dari warnet di 2010, dan sejak itu nggak pernah berhenti ngoprek hal baru.
              Setelah sempat kerja di perpustakaan kampus, toko online, dan dunia pemasaran digital — nulis konten,
              urus media sosial, jalanin Facebook Ads — saya makin tertarik ke sisi teknis dan mulai belajar web
              development secara serius. Sekarang saya bisa bikin dan deploy website sendiri dari nol.
              Saya tipe orang yang cukup teliti soal tampilan dan detail: kalau ada yang nggak simetris atau
              warnanya nggak konsisten, saya langsung nyadar — dan biasanya langsung pengen benerin.
            </p>
          </div>

          {/* ── Kompetensi utama ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Kompetensi Utama
            </div>
            <div className="cv-competency-list">
              <div className="cv-competency-item">
                <span className="cv-competency-num">01</span>
                <p className="cv-competency-text">Peka soal tampilan — langsung nyadar kalau spasi nggak pas, warna nggak konsisten, atau layout yang berantakan</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">02</span>
                <p className="cv-competency-text">Teliti dan nggak setengah-setengah — selalu periksa ulang sebelum kirim, termasuk hal kecil sekalipun</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">03</span>
                <p className="cv-competency-text">Ngerti pemasaran digital secara praktikal — pernah jalanin Facebook Ads, nulis konten, dan optimasi SEO</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">04</span>
                <p className="cv-competency-text">Bisa bikin dan deploy website sendiri — dari setup sampai live, termasuk bot Telegram untuk otomasi</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">05</span>
                <p className="cv-competency-text">Terbiasa kelola data secara rapi dan terstruktur — pengalaman langsung di lingkungan kerja formal</p>
              </div>
              <div className="cv-competency-item">
                <span className="cv-competency-num">06</span>
                <p className="cv-competency-text">Komunikasi langsung dan ringkas — nggak suka berputar-putar, baik ke tim maupun ke audiens</p>
              </div>
            </div>
          </div>
          </div>{/* end cv-row-2col */}

          {/* ── Pendidikan ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Pendidikan
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Teknik Komputer &amp; Jaringan</span>
                  <span className="cv-entry-company">SMK Pasundan 1 Cianjur</span>
                </div>
                <span className="cv-entry-period">2015 – 2018</span>
              </div>
              <ul className="cv-list">
                <li>Belajar cara pasang, konfigurasi, dan rawat jaringan komputer dari nol — ini yang pertama kali bikin saya ngerti gimana internet bekerja di balik layar</li>
                <li>Dapet dasar pemrograman dan sistem operasi yang jadi modal awal untuk terus belajar hal teknis secara mandiri setelah lulus</li>
              </ul>
            </div>
          </div>

          {/* ── Pengalaman ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              Pengalaman
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Admin Intern</span>
                  <span className="cv-entry-company">Universitas Suryakancana</span>
                </div>
                <span className="cv-entry-period">Agu – Nov 2017</span>
              </div>
              <ul className="cv-list">
                <li>Bantu operasional harian perpustakaan — layani pengunjung langsung, input data koleksi buku ke sistem, dan pastikan catatan tetap akurat dan rapi</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Digital Marketing</span>
                  <span className="cv-entry-company">Zenius Store</span>
                </div>
                <span className="cv-entry-period">Mar – Sep 2021</span>
              </div>
              <ul className="cv-list">
                <li>Layani pelanggan via WhatsApp — mulai bantu pilih produk, proses order, sampai konfirmasi pembayaran</li>
                <li>Siapkan dan kemas pesanan, koordinasi pengiriman, dan pastiin barang nyampe ke tangan pembeli dengan baik</li>
              </ul>
            </div>
          </div>

          {/* ── Kontribusi Digital ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Kontribusi Digital
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Blogger</span>
                  <span className="cv-entry-company">Blog Independen</span>
                </div>
                <span className="cv-entry-period">2012</span>
              </div>
              <ul className="cv-list">
                <li>Bikin blog pribadi di Blogspot, nulis sendiri, sampai akhirnya diterima Google AdSense — pertama kali saya ngerasain bisa menghasilkan dari internet secara mandiri</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Community Manager</span>
                  <span className="cv-entry-company">Verso</span>
                </div>
                <span className="cv-entry-period">Mar 2018 – Des 2019</span>
              </div>
              <ul className="cv-list">
                <li>Urus komunitas proyek — buat program biar anggota aktif, jaga komunikasi antara tim dan member tetap jelas, dan pastiin pengalaman di komunitas terasa menyenangkan</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Brand Ambassador</span>
                  <span className="cv-entry-company">Injective</span>
                </div>
                <span className="cv-entry-period">Jan 2024 – Mar 2025</span>
              </div>
              <ul className="cv-list">
                <li>Promosiin brand di Twitter/X lewat konten tulisan, grafis, dan strategi posting yang disesuaikan sama karakter komunitas digital yang ada di platform itu</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Brand Ambassador</span>
                  <span className="cv-entry-company">Nesa</span>
                </div>
                <span className="cv-entry-period">Mar 2024 – Mei 2025</span>
              </div>
              <ul className="cv-list">
                <li>Bangun awareness brand lewat konten yang secara visual konsisten — nulis copy, bikin aset grafis, dan pastiin posting rutin biar audiens terus engaged</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Content Writer</span>
                  <span className="cv-entry-company">Mitosis</span>
                </div>
                <span className="cv-entry-period">Jul 2024 – Apr 2025</span>
              </div>
              <ul className="cv-list">
                <li>Bikin konten edukatif dan cerita seputar proyek yang cukup menarik buat dibaca dan dishare — fokusnya bikin komunitas paham tanpa harus baca whitepaper panjang</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Content Writer</span>
                  <span className="cv-entry-company">Story Protocol</span>
                </div>
                <span className="cv-entry-period">Jul 2024 – Apr 2025</span>
              </div>
              <ul className="cv-list">
                <li>Tulis konten yang informatif dan cukup menarik buat orang yang baru kenal proyek — dijaga konsisten supaya audiens nggak kehilangan konteks</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Content Writer</span>
                  <span className="cv-entry-company">Union</span>
                </div>
                <span className="cv-entry-period">Jul 2024 – Apr 2025</span>
              </div>
              <ul className="cv-list">
                <li>Aktif di ekosistem komunitas — bikin konten digital yang bikin proyek lebih mudah ditemukan dan relevan buat audiensnya</li>
              </ul>
            </div>
            <div className="cv-entry">
              <div className="cv-entry-header">
                <div className="cv-entry-header-left">
                  <span className="cv-entry-role">Brand Ambassador</span>
                  <span className="cv-entry-company">Swisstronik</span>
                </div>
                <span className="cv-entry-period">Sep 2024 – Jan 2025</span>
              </div>
              <ul className="cv-list">
                <li>Jadi wajah brand di media sosial — posting rutin, nulis copy kampanye, dan balas interaksi komunitas supaya jangkauan proyek makin luas</li>
              </ul>
            </div>
          </div>

          {/* ── Keahlian ── */}
          <div className="cv-section reveal">
            <div className="cv-section-label">
              <svg className="cv-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              Keahlian
            </div>
            <div className="cv-info-grid">
              {([
                { key: 'Web Dev', tags: ['Next.js','React','Vite','TypeScript','Tailwind CSS','Express.js','Drizzle ORM','TanStack Query','Wouter','Zod','Vercel','Telegram Bot','UI/Web Design'] },
                { key: 'Marketing', tags: ['Facebook Ads','SEO Dasar','Social Media Management','Content Planning'] },
                { key: 'Konten', tags: ['Community Management','Content Writing','Copywriting'] },
                { key: 'Desain', tags: ['Adobe Photoshop','Canva','Figma','Graphic Design','UI/Web Design'] },
                { key: 'Administrasi', tags: ['Microsoft Office','Google Workspace','Data Entry'] },
                { key: 'Soft Skills', tags: ['Komunikasi','Kerja Tim','Problem Solving','Manajemen Waktu'] },
                { key: 'Bahasa', tags: ['Indonesia','Inggris'] },
                { key: 'Sertifikasi', tags: ['Sertifikasi Komputer','Microsoft Office'] },
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


        </div>
      </div>
    </>
  );
}
