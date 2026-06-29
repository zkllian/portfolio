import { useEffect } from 'react';

export default function Tentang() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container">
        <div className="cv-wrap">

          <div className="cv-hero">
            <img className="cv-avatar" src="/avatar.png" alt="avatar" />
            <div className="cv-hero-info">
              <div className="cv-name">yoga aprilliansyan n</div>
              <div className="cv-role">front-end developer</div>
              <div className="cv-meta">
                <span>26 tahun</span>
                <span className="cv-meta-dot">·</span>
                <span>cianjur</span>
              </div>
              <div className="cv-contacts">
                <a className="cv-contact-link" href="mailto:llianified@gmail.com">llianified@gmail.com</a>
                <a className="cv-contact-link" href="https://twitter.com/llianified" target="_blank" rel="noreferrer">@llianified</a>
                <a className="cv-contact-link" href="https://github.com/zkllian" target="_blank" rel="noreferrer">github.com/zkllian</a>
              </div>
            </div>
          </div>

          <a
            className="spotify-card"
            href="https://open.spotify.com/track/38u55vfPVcVYoqcbuQzpyu?si=I-YjAcsxQaO9cGh6AAL_hA"
            target="_blank"
            rel="noreferrer"
          >
            <img className="spotify-art" src="/spotify-like-i-do.png" alt="like i do" />
            <div className="spotify-info">
              <div className="spotify-track">like i do</div>
              <div className="spotify-artist">andy arysh</div>
            </div>
            <svg className="spotify-logo" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.297a.748.748 0 01-1.03.25c-2.819-1.723-6.365-2.112-10.542-1.157a.748.748 0 01-.353-1.452c4.573-1.045 8.492-.594 11.675 1.338.354.216.466.68.25 1.021zm1.472-3.276a.936.936 0 01-1.288.308c-3.226-1.983-8.145-2.557-11.967-1.399a.937.937 0 01-.577-1.787c4.363-1.323 9.786-.682 13.525 1.59.44.27.578.845.307 1.288zm.126-3.41c-3.868-2.297-10.243-2.508-13.933-1.388a1.122 1.122 0 01-.651-2.146c4.243-1.287 11.29-1.038 15.738 1.607a1.122 1.122 0 01-1.154 1.927z"/>
            </svg>
          </a>

          <div className="cv-section">
            <div className="cv-section-label">// tentang saya</div>
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

          <div className="cv-section">
            <div className="cv-section-label">// kompetensi utama</div>
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

          <div className="cv-section">
            <div className="cv-section-label">// pengalaman</div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">administrator intern</span>
                <span className="cv-entry-company">universitas suryakancana</span>
              </div>
              <div className="cv-entry-period">agustus 2017 – november 2017</div>
              <ul className="cv-list">
                <li>mengelola operasional harian perpustakaan, melayani pengunjung secara langsung, serta menginput dan memelihara data koleksi buku ke dalam sistem database universitas</li>
              </ul>
            </div>
          </div>

          <div className="cv-section">
            <div className="cv-section-label">// kontribusi digital</div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">blogger</span>
                <span className="cv-entry-company">blog independen</span>
              </div>
              <div className="cv-entry-period">2012</div>
              <ul className="cv-list">
                <li>mengelola blog pribadi di platform blogspot dan berhasil bermitra dengan google adsense — pencapaian pertama dalam memonetisasi konten digital secara mandiri</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">community manager</span>
                <span className="cv-entry-company">verso</span>
              </div>
              <div className="cv-entry-period">maret 2018 – desember 2019</div>
              <ul className="cv-list">
                <li>merancang dan mengelola program keterlibatan komunitas, membangun pengalaman pengguna yang positif, serta menjaga konsistensi komunikasi antara tim proyek dan anggota komunitas</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">brand ambassador</span>
                <span className="cv-entry-company">injective</span>
              </div>
              <div className="cv-entry-period">januari 2024 – maret 2025</div>
              <ul className="cv-list">
                <li>memperkuat citra merek melalui produksi konten tertulis, desain grafis, dan strategi media sosial yang ditargetkan kepada komunitas digital di platform twitter/x</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">brand ambassador</span>
                <span className="cv-entry-company">nesa</span>
              </div>
              <div className="cv-entry-period">maret 2024 – mei 2025</div>
              <ul className="cv-list">
                <li>membangun kesadaran merek dan mendorong keterlibatan audiens melalui konten yang estetis dan konsisten secara visual — mulai dari copywriting hingga aset grafis</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">content writer</span>
                <span className="cv-entry-company">mitosis</span>
              </div>
              <div className="cv-entry-period">juli 2024 – april 2025</div>
              <ul className="cv-list">
                <li>memproduksi konten edukatif dan kreatif untuk mendukung pertumbuhan komunitas serta meningkatkan keterlibatan pengguna di ekosistem proyek</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">content writer</span>
                <span className="cv-entry-company">story protocol</span>
              </div>
              <div className="cv-entry-period">juli 2024 – april 2025</div>
              <ul className="cv-list">
                <li>menghasilkan konten informatif dan menarik yang mendukung komunikasi proyek kepada audiens komunitas secara konsisten</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">content writer</span>
                <span className="cv-entry-company">union</span>
              </div>
              <div className="cv-entry-period">juli 2024 – april 2025</div>
              <ul className="cv-list">
                <li>berkontribusi aktif dalam ekosistem komunitas melalui produksi konten digital yang memperkuat visibilitas dan relevansi proyek</li>
              </ul>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">brand ambassador</span>
                <span className="cv-entry-company">swisstronik</span>
              </div>
              <div className="cv-entry-period">september 2024 – januari 2025</div>
              <ul className="cv-list">
                <li>merepresentasikan merek secara daring melalui konten media sosial rutin, copywriting kampanye, dan pengelolaan interaksi dengan komunitas untuk memperluas jangkauan proyek</li>
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
            <div className="cv-section-label">// proyek</div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">zkllian</span>
                <span className="cv-entry-period" style={{ marginLeft: 0 }}>2024</span>
              </div>
              <p className="cv-about" style={{ marginTop: 2 }}>situs portofolio profesional yang dirancang untuk menampilkan keahlian teknis, proyek pilihan, dan riwayat karier sebagai referensi bagi rekruter maupun klien.</p>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">jobstreet scraper</span>
                <span className="cv-entry-period" style={{ marginLeft: 0 }}>2024</span>
              </div>
              <p className="cv-about" style={{ marginTop: 2 }}>perkakas open source untuk mengotomatisasi pengambilan data lowongan kerja dari platform jobstreet secara terstruktur dan efisien.</p>
            </div>

            <div className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-role">admob auto impression</span>
                <span className="cv-entry-period" style={{ marginLeft: 0 }}>2024</span>
              </div>
              <p className="cv-about" style={{ marginTop: 2 }}>perkakas open source berbasis otomasi untuk meningkatkan volume tayangan admob, dirancang untuk efisiensi operasional tanpa intervensi manual.</p>
            </div>
          </div>

          <div className="cv-section">
            <div className="cv-section-label">// keahlian</div>
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

          <div className="cv-section cv-links-section">
            <div className="cv-section-label">// temukan saya</div>
            <div className="cv-links">
              <a className="cv-link" href="https://twitter.com/llianified" target="_blank" rel="noreferrer">
                <span className="cv-link-handle">@llianified</span>
                <span className="cv-link-arrow">↗</span>
              </a>
              <a className="cv-link" href="https://instagram.com/lli.__.an" target="_blank" rel="noreferrer">
                <span className="cv-link-handle">@lli.__.an</span>
                <span className="cv-link-arrow">↗</span>
              </a>
              <a className="cv-link" href="https://github.com/zkllian" target="_blank" rel="noreferrer">
                <span className="cv-link-handle">github.com/zkllian</span>
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
    </>
  );
}
