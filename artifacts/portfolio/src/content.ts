/**
 * ─────────────────────────────────────────────────────────────────
 *  CONTENT — semua teks UI ada di sini, edit seperlunya.
 * ─────────────────────────────────────────────────────────────────
 */

export const content = {

  /* ── Navigasi ─────────────────────────────────────────────────── */
  nav: {
    brand: 'llian',
    pages: [
      { label: 'Tentang', path: '/tentang' },
      { label: 'Kontak',  path: '/kontak'  },
      { label: 'Proyek',  path: '/proyek'  },
    ],
  },

  /* ── Profil ───────────────────────────────────────────────────── */
  profile: {
    name:      'Yoga Aprilliansyah N',
    ariaLabel: 'Yoga Aprilliansyah N',
    cvPrefix:  'Lihat CV saya',
    cvLabel:   'disini',
    cvHref:    '/cv.pdf',
    roles: [
      { label: 'Front-End Developer', duration: 5000 },
      { label: 'Community Manager',   duration: 3000 },
      { label: 'Digital Marketer',    duration: 3000 },
      { label: 'Content Writer',      duration: 3000 },
    ],
  },

  /* ── Bio ─────────────────────────────────────────────────────── */
  bio: {
    line1LinkLabel: 'Front-End Developer',
    line1Suffix:    'berusia 26 tahun berasal dari Bandung, Indonesia.',
    line2Prefix:      'Hubungi saya lewat',
    line2IgLabel:     'Instagram',
    line2TwitterLabel:'Twitter / X',
    line2Or:          'atau',
    line2EmailLabel:  'Email',
    line2GitPrefix:   '| lihat semua proyek saya di',
    line2GitLabel:    'GitHub',
  },

  /* ── URL & kontak ─────────────────────────────────────────────── */
  links: {
    whatsapp:    'https://wa.me/6285199273883',
    email:       'llianified@gmail.com',
    github:      'https://github.com/zkllian',
    twitter:     'https://x.com/llianified',
    instagram:   'https://instagram.com/llianified',
    portfolio:   'https://llian.vercel.app',
    barcodeApp:  '/projects/imei/barcode-gen',
  },

  /* ── Marquee teknologi ────────────────────────────────────────── */
  tech: [
    'React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS',
    'Node.js', 'Express.js', 'Drizzle ORM', 'PostgreSQL',
    'Vercel', 'Figma', 'GitHub', 'Canva',
  ],

  /* ── Halaman Tentang ──────────────────────────────────────────── */
  tentang: {

    pengalaman: {
      title: 'pengalaman',
      sub:   'Tempat saya kirim hal nyata.',
      entries: [
        { co: 'Universitas Suryakancana', date: 'agu – nov 2017', role: 'Admin Intern'      },
        { co: 'Zenius Store',             date: 'mar – sep 2021', role: 'Digital Marketing' },
      ],
    },

    kontribusiDigital: {
      title: 'kontribusi digital',
      sub:   'Hal yang saya bangun di komunitas dan media.',
      entries: [
        { co: 'Blog Independen', date: '2012',                role: 'Blogger · Google AdSense' },
        { co: 'Verso',           date: 'mar 2018 – des 2019', role: 'Community Manager'        },
        { co: 'Injective',       date: 'jan 2024 – mar 2025', role: 'Brand Ambassador'         },
        { co: 'Nesa',            date: 'mar 2024 – mei 2025', role: 'Brand Ambassador'         },
        { co: 'Story Protocol',  date: 'jul 2024 – apr 2025', role: 'Content Writer'           },
        { co: 'Union',           date: 'jul 2024 – apr 2025', role: 'Content Writer'           },
        { co: 'Mitosis',         date: 'jul 2024 – apr 2025', role: 'Content Writer'           },
        { co: 'Swisstronik',     date: 'sep 2024 – jan 2025', role: 'Brand Ambassador'         },
      ],
    },

    pendidikan: {
      title: 'pendidikan',
      sub:   'Dari mana saya mulai.',
      entries: [
        { co: 'SMK Pasundan 1 Cianjur', date: '2015 – 2018', role: 'Teknik Komputer & Jaringan' },
      ],
    },

    proyek: {
      title: 'proyek',
      sub:   'Yang sudah dan sedang saya bangun.',
      items: [
        {
          name:       'portfolio',
          badge:      'live' as string | null,
          desc:       'Situs portfolio pribadi ini — dibangun sendiri pakai React, Vite, dan TypeScript dari nol sampai online.',
          linkLabel:  'kunjungi',
          linkHref:   'https://llian.vercel.app',
          linkIcon:   'arrow' as 'arrow' | 'github',
          external:   true,
        },
        {
          name:       'barcode-gen',
          badge:      'live' as string | null,
          desc:       'Generator barcode massal — layout adjustable, export langsung.',
          linkLabel:  'buka',
          linkHref:   '/projects/imei/barcode-gen',
          linkIcon:   'arrow' as 'arrow' | 'github',
          external:   false,
        },
        {
          name:       'jobstreet-scraper',
          badge:      null,
          desc:       'Tool open source buat scraping data lowongan dari Jobstreet — otomatis sekaligus.',
          linkLabel:  'github',
          linkHref:   'https://github.com/zkllian',
          linkIcon:   'github' as 'arrow' | 'github',
          external:   true,
        },
        {
          name:       'admob-auto-impression',
          badge:      null,
          desc:       'Tool open source berbasis otomasi untuk naikin volume tayangan AdMob tanpa intervensi manual.',
          linkLabel:  'github',
          linkHref:   'https://github.com/zkllian',
          linkIcon:   'github' as 'arrow' | 'github',
          external:   true,
        },
      ],
    },

    footer: {
      creditPrefix: 'Designed & Developed by',
      creditName:   'Yoga',
      copyright:    '© 2026 All rights reserved.',
      visitorsLabel: 'Visitors',
      location:      'Cianjur, Indonesia',
    },
  },

  /* ── Bio (EN) ────────────────────────────────────────────────── */
  bioEN: {
    line1Prefix:    "I'm a",
    line1LinkLabel: 'Front-End Developer',
    line1Suffix:    '26 years old, based in Cianjur, Indonesia.',
    line2Prefix:    'Reach me via',
    line2Or:        'or',
    line2EmailLabel:'email',
    line2GitPrefix: '| see my code on',
    line2GitLabel:  'GitHub',
    line3Prefix:    'Find me on',
    line3TwitterLabel: 'Twitter / X',
  },

  /* ── Halaman Tentang (EN) ─────────────────────────────────────── */
  tentangEN: {

    pengalaman: {
      title: 'experience',
      sub:   'Where I shipped real things.',
      entries: [
        { co: 'Universitas Suryakancana', date: 'aug – nov 2017', role: 'Admin Intern'      },
        { co: 'Zenius Store',             date: 'mar – sep 2021', role: 'Digital Marketing' },
      ],
    },

    kontribusiDigital: {
      title: 'digital contributions',
      sub:   'Things I built in communities and media.',
      entries: [
        { co: 'Independent Blog', date: '2012',                role: 'Blogger · Google AdSense' },
        { co: 'Verso',            date: 'mar 2018 – dec 2019', role: 'Community Manager'        },
        { co: 'Injective',        date: 'jan 2024 – mar 2025', role: 'Brand Ambassador'         },
        { co: 'Nesa',             date: 'mar 2024 – may 2025', role: 'Brand Ambassador'         },
        { co: 'Story Protocol',   date: 'jul 2024 – apr 2025', role: 'Content Writer'           },
        { co: 'Union',            date: 'jul 2024 – apr 2025', role: 'Content Writer'           },
        { co: 'Mitosis',          date: 'jul 2024 – apr 2025', role: 'Content Writer'           },
        { co: 'Swisstronik',      date: 'sep 2024 – jan 2025', role: 'Brand Ambassador'         },
      ],
    },

    pendidikan: {
      title: 'education',
      sub:   'Where I started.',
      entries: [
        { co: 'SMK Pasundan 1 Cianjur', date: '2015 – 2018', role: 'Computer & Network Engineering' },
      ],
    },

    proyek: {
      title: 'projects',
      sub:   "What I've built and am building.",
      items: [
        {
          name:       'portfolio',
          badge:      'live' as string | null,
          desc:       'This personal portfolio site — built from scratch using React, Vite, and TypeScript, all the way to production.',
          linkLabel:  'visit',
          linkHref:   'https://llian.vercel.app',
          linkIcon:   'arrow' as 'arrow' | 'github',
          external:   true,
        },
        {
          name:       'barcode-gen',
          badge:      'live' as string | null,
          desc:       'Bulk barcode generator — adjustable layout, direct export.',
          linkLabel:  'open',
          linkHref:   '/projects/imei/barcode-gen',
          linkIcon:   'arrow' as 'arrow' | 'github',
          external:   false,
        },
        {
          name:       'jobstreet-scraper',
          badge:      null,
          desc:       'Open source tool for scraping job listings from Jobstreet — fully automated.',
          linkLabel:  'github',
          linkHref:   'https://github.com/zkllian',
          linkIcon:   'github' as 'arrow' | 'github',
          external:   true,
        },
        {
          name:       'admob-auto-impression',
          badge:      null,
          desc:       'Automation-based open source tool to increase AdMob impression volume without manual intervention.',
          linkLabel:  'github',
          linkHref:   'https://github.com/zkllian',
          linkIcon:   'github' as 'arrow' | 'github',
          external:   true,
        },
      ],
    },

    footer: {
      creditPrefix:  'Designed & Developed by',
      creditName:    'Yoga',
      copyright:     '© 2026 All rights reserved.',
      visitorsLabel: 'Visitors',
      location:      'Cianjur, Indonesia',
    },
  },

  /* ── Halaman Home (barcode generator) ────────────────────────── */
  home: {
    pageTitle:           'barcode-gen',
    pageSub:             'Generator barcode.',
    injectTitle:         'Inject',
    barcodeCardTitle:    'Total Barcode',
    barcodeTodayLabel:   'Hari Ini',
    coordsTitle:         'Posisi',
    saveBtn:             'Save',
    executeBtn:          'Execute',
    resetBtn:            'Reset',
    backBtn:             'Kembali',
    confirmResetPrompt:  'Yakin?',
    confirmYes:          'Ya',
    confirmNo:           'Batal',
    loadingText:         'Compiling barcode...',
    livePreviewLabel:    'Live Preview',
    statusReady:         'Siap',
    downloadLabel:       'Unduh',
    shareLabel:          'Bagikan',
    toastCounterReset:   'Counter direset',
    toastSaved:          'Tersimpan sebagai default',
    toastShareUnsupported: 'Browser tidak mendukung share',
    toastShareFailed:    'Gagal share',
    stats: {
      title:              'global stats',
      todayLabel:         'Hari Ini',
      totalLabel:         'Total Keseluruhan',
      mineLabel:          'Saya',
      othersLabel:        'Orang Lain',
      serverUnavailable:  'Server tidak tersedia',
      resetGlobalBtn:     'Reset Global',
      resetConfirmPrompt: 'Reset semua data?',
      resetYes:           'Ya',
      resetNo:            'Batal',
      toastResetSuccess:  'Global stats direset',
      toastResetFailed:   'Gagal reset',
      footerNote:         'barcode-gen · semua pengguna · WIB',
    },
  },

  /* ── Halaman Kontak ───────────────────────────────────────────── */
  kontak: {
    contactTitle:         'Kontak',
    email:                'llianified@gmail.com',
    phone:                '085199273883',
    twitterHandle:        '@llianified',
    githubHandle:         'github.com/zkllian',
    availabilityTitle:    'Ketersediaan',
    availabilityStatus:   'Terbuka untuk kerja remote & freelance',
    availabilityNote:     'Biasanya balas pesan dalam 1x24 jam. Untuk respon paling cepat, hubungi lewat email atau WhatsApp.',
    workPrefTitle:        'Preferensi Kerja',
    workPrefTypeKey:      'Tipe',
    workPrefTypes:        ['Full-time', 'Freelance', 'Kontrak'],
    workPrefLocationKey:  'Lokasi',
    workPrefLocations:    ['Remote', 'Cianjur & sekitarnya'],
  },

  /* ── Halaman Proyek ───────────────────────────────────────────── */
  proyek: {
    sectionTitle: 'Proyek',
    items: [
      {
        title:  'Llian Portfolio',
        period: '2025 – Skrg',
        desc:   'Situs portfolio pribadi ini — yang sekarang lagi kamu baca. Dibangun sendiri pakai React, Vite, dan TypeScript, karena saya mau buktiin bahwa saya bisa bikin sesuatu dari nol sampai online.',
      },
      {
        title:  'Jobstreet Scraper',
        period: '2024',
        desc:   'Tool open source buat scraping data lowongan dari Jobstreet — dibuat karena capek cari loker satu-satu, jadi langsung otomatis sekaligus.',
      },
      {
        title:  'AdMob Auto Impression',
        period: '2024',
        desc:   'Tool open source berbasis otomasi untuk naikin volume tayangan AdMob tanpa harus intervensi manual — biar kerja di background sendiri.',
      },
    ],
  },

};
