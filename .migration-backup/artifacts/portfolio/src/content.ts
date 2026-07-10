/**
 * ─────────────────────────────────────────────────────────────────
 *  CONTENT — semua teks UI ada di sini, edit seperlunya.
 * ─────────────────────────────────────────────────────────────────
 */

export const content = {

  /* ── Profil ───────────────────────────────────────────────────── */
  profile: {
    name:      'Yoga Aprilliansyah N',
    ariaLabel: 'Yoga Aprilliansyah N',
    cvHref:    '/cv.pdf',
    roles: [
      { label: 'Front-End Developer', duration: 3000 },
      { label: 'Community Manager',   duration: 3000 },
      { label: 'Digital Marketer',    duration: 3000 },
      { label: 'Content Writer',      duration: 3000 },
    ],
  },

  /* ── Bio ─────────────────────────────────────────────────────── */
  bio: {
    line1LinkLabel: 'Front-End Developer',
    line1Suffix:    'berusia 26 tahun berasal dari Bandung, Indonesia.',
    line2Prefix:      'Hubungi saya melalui',
    line2IgLabel:     'Instagram',
    line2TwitterLabel:'Twitter / X',
    line2Or:          'atau',
    line2EmailLabel:  'email',
    line2GitPrefix:   '. Lihat semua proyek saya di',
    line2GitLabel:    'GitHub',
    cvPrefix:         'Lihat CV saya',
    cvLabel:          'disini',
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
        { co: 'Universitas Suryakancana', date: 'agu – nov 2017', role: 'Admin Magang'      },
        { co: 'Zenius Store',             date: 'mar – sep 2021', role: 'Digital Marketing' },
      ],
    },

    kontribusiDigital: {
      title: 'kontribusi digital',
      sub:   'Hal yang saya bangun di komunitas Blockchain/Web3.',
      entries: [
        { co: 'Verso',           date: 'mar 2018 – des 2019', role: 'Community Manager', href: 'https://verso.network'          },
        { co: 'Injective',       date: 'jan 2024 – mar 2025', role: 'Brand Ambassador',  href: 'https://injective.com'          },
        { co: 'Nesa',            date: 'mar 2024 – mei 2025', role: 'Brand Ambassador',  href: 'https://nesa.ai'                },
        { co: 'Story Protocol',  date: 'jul 2024 – apr 2025', role: 'Content Writer',    href: 'https://storyprotocol.xyz'      },
        { co: 'Union',           date: 'jul 2024 – apr 2025', role: 'Content Writer',    href: 'https://union.build'            },
        { co: 'Mitosis',         date: 'jul 2024 – apr 2025', role: 'Content Writer',    href: 'https://mitosis.org'            },
        { co: 'Swisstronik',     date: 'sep 2024 – jan 2025', role: 'Brand Ambassador',  href: 'https://swisstronik.com'        },
      ],
    },

    pendidikan: {
      title: 'pendidikan',
      sub:   'Dari mana saya mulai.',
      entries: [
        { co: 'SMK Pasundan 1 Cianjur', date: 'juli 2015 – mei 2018', role: 'Teknik Komputer & Jaringan' },
      ],
    },

    proyek: {
      title: 'proyek',
      sub:   'Yang sudah saya bangun dan sedang saya kerjakan.',
      items: [
        {
          name:       'portfolio',
          badge:      'live' as string | null,
          desc:       'Situs portfolio pribadi ini yang dibangun sendiri memakai React, Vite, dan TypeScript.',
          linkLabel:  'buka',
          linkHref:   'https://llian.vercel.app',
          linkIcon:   'arrow' as 'arrow' | 'github',
          external:   true,
        },
        {
          name:       'barcode-gen',
          badge:      'live' as string | null,
          desc:       'Generator barcode massal layout adjustable, batch export.',
          linkLabel:  'buka',
          linkHref:   '/projects/imei/barcode-gen',
          linkIcon:   'arrow' as 'arrow' | 'github',
          external:   false,
        },
        {
          name:       'jobstreet-scraper',
          badge:      null,
          desc:       'Tool open source buat scraping data lowongan dari Jobstreet.',
          linkLabel:  'github',
          linkHref:   'https://github.com/zkllian',
          linkIcon:   'github' as 'arrow' | 'github',
          external:   true,
        },
        {
          name:       'admob-auto-impression',
          badge:      null,
          desc:       'Tool open source berbasis otomasi untuk menaikan volume tayangan AdMob tanpa intervensi manual.',
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
      visitorsLabel: 'Visitor',
      onlineLabel:  'Online',
      location:      'Cianjur, Indonesia',
    },
  },

  /* ── Bio (EN) ────────────────────────────────────────────────── */
  bioEN: {
    line1Prefix:      "I'm a",
    line1LinkLabel:   'Front-End Developer',
    line1Suffix:      '26 years old, based in Bandung, Indonesia.',
    line2Prefix:      'Reach me via',
    line2IgLabel:     'Instagram',
    line2TwitterLabel:'Twitter / X',
    line2Or:          'or',
    line2EmailLabel:  'email',
    line2GitPrefix:   '. See all my projects on',
    line2GitLabel:    'GitHub',
    cvPrefix:         'View my CV',
    cvLabel:          'here',
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
        { co: 'Verso',            date: 'mar 2018 – dec 2019', role: 'Community Manager', href: 'https://verso.network'     },
        { co: 'Injective',        date: 'jan 2024 – mar 2025', role: 'Brand Ambassador',  href: 'https://injective.com'     },
        { co: 'Nesa',             date: 'mar 2024 – may 2025', role: 'Brand Ambassador',  href: 'https://nesa.ai'           },
        { co: 'Story Protocol',   date: 'jul 2024 – apr 2025', role: 'Content Writer',    href: 'https://storyprotocol.xyz' },
        { co: 'Union',            date: 'jul 2024 – apr 2025', role: 'Content Writer',    href: 'https://union.build'       },
        { co: 'Mitosis',          date: 'jul 2024 – apr 2025', role: 'Content Writer',    href: 'https://mitosis.org'       },
        { co: 'Swisstronik',      date: 'sep 2024 – jan 2025', role: 'Brand Ambassador',  href: 'https://swisstronik.com'   },
      ],
    },

    pendidikan: {
      title: 'education',
      sub:   'Where I started.',
      entries: [
        { co: 'SMK Pasundan 1 Cianjur', date: 'july 2015 – may 2018', role: 'Computer & Network Engineering' },
      ],
    },

    proyek: {
      title: 'projects',
      sub:   "What I've built and am building right now.",
      items: [
        {
          name:       'portfolio',
          badge:      'live' as string | null,
          desc:       'This personal portfolio site built from scratch using React, Vite, and TypeScript, all the way to production.',
          linkLabel:  'visit',
          linkHref:   'https://llian.vercel.app',
          linkIcon:   'arrow' as 'arrow' | 'github',
          external:   true,
        },
        {
          name:       'barcode-gen',
          badge:      'live' as string | null,
          desc:       'Bulk barcode generator with adjustable layout, direct export.',
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
      onlineLabel:   'Online',
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
      onlineLabel:        'Online Sekarang',
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

};
