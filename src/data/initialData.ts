import {
  Article,
  GalleryItem,
  Facility,
  Program,
  SantriRegistration,
  Announcement,
  SiteSettings,
  HomeContent,
  ProfilContent,
  PesantrenValue,
  DewanPengasuhMember,
  DailyScheduleItem,
  TargetTimelineItem
} from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  pesantrenName: "Markaz Hidayah Qur'an",
  subtitle: "Pesantren Tahfidz & Keislaman Modern",
  tagline: "Mencetak Generasi Qur'ani yang Mandiri, Berilmu, dan Berakhlakul Karimah",
  logoUrl: "",
  phone: "+62 251 8329 101",
  waNumber: "6281234567890",
  email: "info@markazhidayah.sch.id",
  address: "Jl. Pesantren Al-Hidayah No. 99, Cisarua, Megamendung, Bogor, Jawa Barat 16750",
  registrationStatus: 'Buka',
  registrationWave: 'Gelombang I (Tahun Ajaran 2026/2027)',
  registrationQuota: 60,
  donationUrl: 'https://mariberbagi.net/pesantren-markazhidayah',
  bankAccounts: [
    {
      bank: 'Bank Syariah Indonesia (BSI)',
      accountNumber: '7188 099 214',
      accountName: 'Yayasan Markaz Hidayah Quran',
      logoColor: '#00a39d'
    },
    {
      bank: 'Bank Muamalat',
      accountNumber: '124 000 8899',
      accountName: 'Markaz Hidayah Quran Wakaf',
      logoColor: '#6a1b9a'
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '133 00 98765 210',
      accountName: 'Markaz Hidayah Quran Operasional',
      logoColor: '#003366'
    }
  ],
  headerDateText: "Rabi'ul Awwal 1448 H / September 2026",
  headerLocation: "Cisarua, Megamendung - Bogor",
  headerPsbBannerText: "Pendaftaran Santri Baru (PSB) 2026/2027 Telah Dibuka!",
  headerPsbBannerTarget: "pendaftaran",
  headerHotlineText: "Hotline: +62 251 8329 101",
  footerAboutText: "Berdedikasi melahirkan huffadz 30 juz mutqin, berwawasan luas, mandiri, serta berpegang teguh pada Al-Qur'an dan Sunnah.",
  footerBadge1: "Terakreditasi Kemenag RI",
  footerBadge2: "Sanad Qira'at Mutashil",
  footerCopyrightText: "Hak Cipta Dilindungi.",
  adminUsername: "admin",
  adminPassword: "admin123",
  syncApiUrl: "",
  autoSyncEnabled: true
};

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    name: 'Tahfidz 30 Juz Mutqin',
    target: 'Hafal 30 Juz Al-Qur\'an dengan Itqon & Sanad',
    duration: '3 Tahun (Tingkat MTs/SMP & MA/SMA)',
    method: 'Sabaq, Sabqi, Manzil & Talaqqi Bersanad',
    description: 'Program unggulan akselerasi tahfidz berstandar internasional yang memadukan hafalan mutqin, pemahaman tajwid Al-Jazari, serta setoran harian intensif bersama masyayikh bersanad.',
    highlights: [
      'Target hafalan 10 juz per tahun (1 juz per bulan)',
      'Talaqqi sanad riwayat Hafsh \'an \'Ashim',
      'Karantina muroja\'ah tasmi\' sekali duduk 5-30 juz',
      'Ijazah formal kemenag terakreditasi A'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'prog-2',
    name: 'Tahfidz & Diniyah Terpadu',
    target: 'Hafal 15-30 Juz & Penguasaan Turats (Kitab Kuning)',
    duration: '3 - 6 Tahun',
    method: 'Sorogan, Bandongan & Diskusi Bahtsul Masail',
    description: 'Pendidikan komprehensif mengintegrasikan Al-Qur\'an dan kurikulum pesantren salaf-modern: Nahwu, Sharaf, Fiqih Syafi\'i, Aqidah Ahlussunnah, dan Hadits Riyadhus Shalihin.',
    highlights: [
      'Kajian kitab Al-Ajurrumiyyah, Safinatun Najah, Fathul Qorib',
      'Penguasaan Bahasa Arab aktif (Muhadatsah & Nahwu-Shorof)',
      'Pembinaan adab thalabul ilmi dan akhlaqul karimah',
      'Praktik dakwah & kepemimpinan santri'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'prog-3',
    name: 'Program Takhassus Al-Qur\'an',
    target: 'Pendalaman Qira\'at, Ulumul Qur\'an & Sanad Syathibiyyah',
    duration: '1 - 2 Tahun (Pasca SMA/Aliyah)',
    method: 'Mulazamah Khusus Bersama Asatidz Senior',
    description: 'Program akselerasi khusus bagi lulusan yang ingin memperdalam kaidah qira\'at sab\'ah, tafsir tematik, dan melahirkan kader da\'i serta imam masjid terkemuka.',
    highlights: [
      'Fokus 100% pada Al-Qur\'an & Bahasa Arab',
      'Beasiswa penuh bagi santri berprestasi',
      'Pengabdian dakwah ke daerah pedalaman nusantara',
      'Peluang beasiswa kuliah ke Timur Tengah (Al-Azhar & Madinah)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'prog-4',
    name: 'Karantina Tahfidz Liburan',
    target: 'Pencapaian 3-5 Juz dalam 30 Hari',
    duration: '1 Bulan (Liburan Sekolah)',
    method: 'Metode Karantina Qur\'an 24 Jam Non-Stop Gadget',
    description: 'Program intensif saat liburan sekolah untuk mengupgrade hafalan dan tahsin anak dengan bimbingan ustadz pembina dalam suasana sejuk pegunungan Cisarua Bogor.',
    highlights: [
      'Lingkungan kondusif asri & udara sejuk',
      'Bimbingan one-on-one intensif',
      'Olahraga sunnah: berkuda, memanah, & renang',
      'Terbuka untuk pelajar SD, SMP, SMA seluruh Indonesia'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=900&q=80'
  }
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Masjid Jami\' Baitul Qur\'an',
    category: 'Ibadah & Pusat Kegiatan',
    description: 'Masjid megah dua lantai berarsitektur Timur Tengah modern dengan kapasitas 1.200 jamaah, dilengkapi pendingin udara, karpet empuk, dan sound system berkualitas tinggi.',
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80',
    features: ['Kapasitas 1.200 Jamaah', 'Area Halaqah Tahfidz', 'AC & Karpet Turki', 'Perpustakaan Mini']
  },
  {
    id: 'fac-2',
    name: 'Asrama Santri Sehat & Terpisah',
    category: 'Hunian Santri',
    description: 'Gedung asrama terpisah putra dan putri dengan ventilasi udara pegunungan alami, ranjang bertingkat kokoh, lemari individu, dan pendampingan 24 jam oleh musyrif/musyrifah.',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80',
    features: ['Pendampingan 24 Jam', 'Kamar Mandi Bersih Higienis', 'Loker Pribadi', 'Ruang Santai & Laundry']
  },
  {
    id: 'fac-3',
    name: 'Ruang Halaqah Tahfidz Multimedia',
    category: 'Pusat Pembelajaran',
    description: 'Ruang belajar berpendingin ruangan dengan meja lesehan ergonomis (rehal jati), proyektor digital untuk kajian makharijul huruf, dan audio visual murattal Syaikh bersanad.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    features: ['Rasio 1 Musyrif : 12 Santri', 'Proyektor Interaktif', 'Meja Rehal Jati', 'Koleksi Audio Murottal']
  },
  {
    id: 'fac-4',
    name: 'Ruang Makan & Dapur Higienis',
    category: 'Gizi & Nutrisi',
    description: 'Dapur pesantren yang diawasi ahli nutrisi, menyajikan makanan 3 kali sehari dengan menu 4 sehat 5 sempurna seimbang untuk menjaga kebugaran para penghafal Al-Qur\'an.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=900&q=80',
    features: ['Menu 4 Sehat 5 Sempurna', 'Kantin Halal & Higienis', 'Air Minum Ro Berkualitas', 'Area Makan Bersih']
  },
  {
    id: 'fac-5',
    name: 'Area Olahraga Sunnah (Panahan & Futsal)',
    category: 'Kebugaran Santri',
    description: 'Fasilitas lapangan terbuka dan tertutup untuk kegiatan fisik santri: lapangan panahan standar Perpani, lapangan futsal rumput sintetis, serta arena tenis meja.',
    imageUrl: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=900&q=80',
    features: ['Lapangan Panahan Standar', 'Futsal Sintetis', 'Tenis Meja', 'Peralatan Olahraga Lengkap']
  },
  {
    id: 'fac-6',
    name: 'Klinik Kesehatan Santri (Poskestren)',
    category: 'Layanan Medis',
    description: 'Pos Kesehatan Pesantren yang bermitra dengan dokter umum dan tenaga medis profesional, melayani pertolongan pertama, pemeriksaan berkala, dan obat-obatan gratis.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    features: ['Perawat Standby', 'Ambulans Siaga', 'Pemeriksaan Kesehatan Rutin', 'P3K & Obat Standar BPOM']
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'penerimaan-santri-baru-2026-2027-tahfidz-markaz-hidayah',
    title: "Penerimaan Santri Baru (PSB) Tahun Ajaran 2026/2027 Resmi Dibuka",
    summary: "Markaz Hidayah Qur'an membuka kesempatan bagi generasi penerus bangsa untuk menimba ilmu Al-Qur'an dan keislaman dengan kuota terbatas dan beasiswa prestasi.",
    content: `
Markaz Hidayah Qur'an secara resmi mengumumkan pembukaan Penerimaan Santri Baru (PSB) untuk Tahun Ajaran 2026/2027. Pada gelombang pertama ini, kami menerima pendaftaran santriwan dan santriwati untuk jenjang pendidikan setingkat SMP/MTs dan SMA/MA dengan program utama Tahfidz 30 Juz Mutqin dan Diniyah Terpadu.

Pimpinan Pondok Pesantren, Dr. KH. Muhammad Faiz Hidayatullah, M.A., menyampaikan bahwa pendidikan Al-Qur'an bukan sekadar menghafal lafadz, melainkan menanamkan akhlaq mulia dan adab islami di kehidupan modern.

### Program yang Dibuka:
1. **Tahfidz 30 Juz Reguler**: Dikhususkan bagi lulusan SD/MI dan SMP/MTs dengan komitmen menghafal Al-Qur'an secara mutqin.
2. **Tahfidz & Diniyah Terpadu**: Kombinasi kurikulum formal Kemenag dan pengkajian kitab kuning (Turats).
3. **Program Takhassus (Qira'at & Sanad)**: Untuk santri lulusan Aliyah yang siap mendalami ilmu qira'at sab'ah.

### Fasilitas Beasiswa:
Tersedia beasiswa penuh bagi calon santri yatim dhuafa berprestasi serta potongan biaya pendidikan untuk anak berprestasi hafalan minimal 5 juz saat seleksi masuk.

Pendaftaran dapat dilakukan secara online melalui website resmi ini atau datang langsung ke sekretariat PSB di Cisarua, Bogor. Segera daftarkan putra-putri Anda sebelum kuota terpenuhi!
    `,
    category: 'Pengumuman',
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
    author: 'Panitia PSB Markaz',
    date: '15 September 2026',
    status: 'Published',
    readTime: '3 menit',
    tags: ['PSB 2026', 'Pendaftaran Santri', 'Tahfidz Quran', 'Beasiswa Santri'],
    seoKeywords: 'pendaftaran santri baru 2026, psb markaz hidayah quran, beasiswa santri tahfidz bogor, ponpes quran cisarua',
    seoDescription: 'Daftarkan putra-putri Anda di Markaz Hidayah Qur\'an untuk Tahun Ajaran 2026/2027. Program Tahfidz 30 Juz bersanad dan Diniyah Terpadu kuota terbatas.',
    viewsCount: 1420
  },
  {
    id: 'art-2',
    slug: 'keutamaan-menghafal-alquran-dan-menjaganya-dengan-mutqin',
    title: "Keutamaan Menghafal Al-Qur'an dan Menjaganya dengan Mutqin di Zaman Modern",
    summary: "Menghafal Al-Qur'an adalah karunia agung yang Allah berikan kepada hamba-hamba pilihan-Nya. Bagaimana cara menjaga hafalan tetap kokoh dan berfaedah nyata?",
    content: `
Al-Qur'an al-Karim merupakan mukjizat abadi Nabi Muhammad SAW yang dijamin kemurniannya oleh Allah Ta'ala. Di era pesatnya perkembangan teknologi informasi, menjaga Al-Qur'an di dalam dada menjadi benteng spiritual paling kokoh bagi generasi muda muslim.

Rasulullah ﷺ bersabda:
> *"Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya."* (HR. Bukhari)

### Tiga Pilar Menjaga Hafalan Mutqin:
1. **Ikhlas Niat Karena Allah**: Hafalan Al-Qur'an tidak ditujukan untuk pujian manusia, gelar duniawi, atau perlombaan, melainkan mencari ridho Allah SWT.
2. **Keteraturan Sabqi dan Muroja'ah Harian**: Menambah hafalan baru (ziyadah) harus diiringi dengan mengulang hafalan lama secara proporsional. Santri Markaz Hidayah Qur'an dibiasakan muroja'ah minimal 1-2 juz setiap harinya.
3. **Mengamalkan Isi Al-Qur'an**: Sebagaimana yang dituturkan oleh Ummul Mu'minin Aisyah RA bahwa akhlak Rasulullah ﷺ adalah Al-Qur'an.

Mari kita jadikan Al-Qur'an sebagai pedoman hidup harian kita. Semoga Allah mudahkan langkah kita dan anak-anak kita menjadi ahlul Qur'an, keluarga Allah di muka bumi.
    `,
    category: 'Artikel Keislaman',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=900&q=80',
    author: 'Ustadz Ahmad Rasyid, Lc., M.Ag.',
    date: '10 September 2026',
    status: 'Published',
    readTime: '5 menit',
    tags: ['Tahfidz', 'Keislaman', 'Tadabbur Quran', 'Akhlak Santri'],
    seoKeywords: 'keutamaan menghafal quran, tips murojaah mutqin, adab penghafal quran, faedah tahfidz',
    seoDescription: 'Pelajari keutamaan agung menghafal Al-Qur\'an serta 3 pilar utama menjaga hafalan tetap mutqin dan berfaedah di tengah tantangan zaman modern.',
    viewsCount: 2150
  },
  {
    id: 'art-3',
    slug: 'wisuda-akbar-tahfidz-30-juz-angkatan-ke-iv',
    title: "Wisuda Akbar Tahfidz 30 Juz Angkatan IV: Meluluskan 45 Hafidz dan Hafidzah Bersanad",
    summary: "Suasana haru dan khidmat menyelimuti Aula Utama Markaz Hidayah Qur'an saat 45 santri menyelesaikan setoran tasmi' 30 juz sekali duduk di hadapan dewan penguji.",
    content: `
Pondok Pesantren Markaz Hidayah Qur'an sukses menggelar Wisuda Akbar Tahfidz 30 Juz Angkatan IV pada hari Sabtu lalu. Sebanyak 45 santriwan dan santriwati secara resmi dikukuhkan sebagai hafidz dan hafidzah setelah dinyatakan lulus tasmi' 30 juz sekali duduk dan lulus ujian tahsin Al-Jazari.

Acara wisuda dihadiri oleh tokoh ulama Jawa Barat, perwakilan Kementerian Agama Kabupaten Bogor, serta seluruh wali santri yang hadir dengan penuh rasa syukur dan linangan air mata haru.

Puncak acara ditandai dengan prosesi penyematan mahkota kemuliaan oleh para santri kepada kedua orang tua mereka di atas panggung kehormatan, melambangkan hadits Nabi ﷺ tentang kemuliaan orang tua para penghafal Al-Qur'an di hari kiamat.

Selamat kepada para santri wisudawan. Semoga hafalan yang telah terpatri senantiasa dijaga dan diamalkan bagi kemaslahatan umat Islam di seluruh pelosok negeri.
    `,
    category: 'Berita Pesantren',
    thumbnail: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=900&q=80',
    author: 'Humas Markaz Hidayah',
    date: '02 September 2026',
    status: 'Published',
    readTime: '4 menit',
    tags: ['Wisuda Tahfidz', 'Hafidz 30 Juz', 'Prestasi Santri', 'Kegiatan Ponpes'],
    seoKeywords: 'wisuda tahfidz 30 juz markaz hidayah, kelulusan santri hafidz bogor, pesantren tahfidz terbaik',
    seoDescription: 'Liputan haru wisuda akbar tahfidz 30 juz angkatan IV Markaz Hidayah Qur\'an. Sebanyak 45 santri berhasil mengkhatamkan hafalan bersanad.',
    viewsCount: 3890
  },
  {
    id: 'art-4',
    slug: 'penyaluran-donasi-wakaf-asrama-santri-tahfidz-mariberbagi',
    title: "Laporan Penyaluran Donasi Wakaf Pembangunan Asrama Santri via MariBerbagi.net",
    summary: "Transparansi amanah umat: Donasi wakaf yang terkumpul melalui platform donasi mariberbagi.net telah dialokasikan untuk pengecoran lantai 3 asrama santri.",
    content: `
Sebagai bentuk pertanggungjawaban dan transparansi kepada para muhsinin dan donatur, Yayasan Markaz Hidayah Qur'an merilis laporan progres pembangunan Gedung Asrama Santri Tahfidz Tahap II.

Berkat sinergi kemitraan bersama platform donasi resmi **mariberbagi.net**, dana wakaf terkumpul sebesar Rp 385.000.000 dari 2.450 donatur terverifikasi per akhir Agustus 2026.

Dana tersebut telah direalisasikan untuk:
1. Pengecoran dak lantai 3 asrama santri putri
2. Pengadaan 30 set ranjang tidur besi dan kasur ramah kesehatan tulang belakang
3. Instalasi sistem sanitasi ramah lingkungan dan instalasi air bersih pegunungan

Kami haturkan jazakumullah khairan katsiran kepada seluruh kaum muslimin yang telah menyisihkan hartanya di jalan Allah. Semoga menjadi amal jariyah yang pahalanya terus mengalir tanpa henti.
    `,
    category: 'Laporan',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=900&q=80',
    author: 'Divisi Wakaf & Donasi',
    date: '28 Agustus 2026',
    status: 'Published',
    readTime: '3 menit',
    tags: ['Donasi Mariberbagi', 'Wakaf Asrama', 'Laporan Donasi', 'Transparansi Ponpes'],
    seoKeywords: 'donasi mariberbagi markaz hidayah, wakaf asrama santri, laporan keuangan pesantren, transparansi donasi',
    seoDescription: 'Laporan transparan alokasi dana wakaf pembangunan asrama santri Markaz Hidayah Qur\'an melalui integrasi platform donasi resmi mariberbagi.net.',
    viewsCount: 1670
  },
  {
    id: 'art-5',
    slug: 'program-rihlah-alam-dan-tadabbur-santri-gunung-gede',
    title: "Membangun Karakter Qur'ani Melalui Rihlah Alam dan Tadabbur Ciptaan Allah",
    summary: "Santri Markaz Hidayah Qur'an mengikuti agenda tahunan Rihlah Tadabbur Alam di kaki Gunung Gede Pangrango untuk menumbuhkan rasa cinta alam dan kebersamaan.",
    content: `
Menghafal Al-Qur'an membutuhkan keseimbangan fisik, mental, dan ruhiyah. Untuk menyegarkan kembali semangat santri setelah ujian semester, Markaz Hidayah Qur'an menyelenggarakan kegiatan Rihlah dan Tadabbur Alam di kawasan lereng Gunung Gede Pangrango.

Kegiatan yang berlangsung selama 3 hari ini diisi dengan:
- Muroja'ah Al-Qur'an di alam terbuka dengan gemercik air sungai dan udara sejuk pegunungan
- Pelatihan kemandirian pramuka santri dan survival dasar
- Lomba panahan sunnah antarkonsulat daerah santri
- Qiyamullail bersama di bawah langit malam bertabur bintang

Dengan kegiatan ini, para santri diajak menghayati ayat-ayat kauniyah Allah yang terbentang di alam semesta, sehingga semakin mengagumi kebesaran sang Khaliq.
    `,
    category: 'Kegiatan Santri',
    thumbnail: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=900&q=80',
    author: 'Bagian Kesiswaan & Pengasuhan',
    date: '18 Agustus 2026',
    status: 'Published',
    readTime: '3 menit',
    tags: ['Kegiatan Santri', 'Rihlah Alam', 'Karakter Santri', 'Tadabbur Quran'],
    seoKeywords: 'kegiatan santri markaz hidayah, rihlah tadabbur alam, pembinaan karakter santri bogor',
    seoDescription: 'Dokumentasi kegiatan seru santri Markaz Hidayah Qur\'an menjelajahi alam terbuka untuk mentadabburi ciptaan Allah dan memperkuat ukhuwah.',
    viewsCount: 1980
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Halaqah Al-Qur\'an Ba\'da Shubuh di Masjid Jami\'',
    category: 'Tahfidz',
    description: 'Suasana khusyuk para santri menyetorkan hafalan Al-Qur\'an kepada musyrif halaqah masing-masing di waktu fajar yang penuh berkah.',
    imageUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80',
    date: '12 September 2026',
    location: 'Masjid Jami\' Baitul Qur\'an'
  },
  {
    id: 'gal-2',
    title: 'Kajian Kitab Kuning Turats Bersama Pimpinan Pesantren',
    category: 'Pendidikan',
    description: 'Santri tingkat aliyah mendalami kitab Fathul Qorib dan Nahwu dengan metode sorogan interaktif langsung dipandu KH. Muhammad Faiz.',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    date: '08 September 2026',
    location: 'Ruang Diniyah As-Syafi\'i'
  },
  {
    id: 'gal-3',
    title: 'Latihan Memanah Sunnah Santri Putra',
    category: 'Kegiatan Santri',
    description: 'Kegiatan ekstrakurikuler memanah melatih fokus, kesabaran, ketenangan batin, serta kekuatan fisik para santri.',
    imageUrl: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=1200&q=80',
    date: '05 September 2026',
    location: 'Lapangan Panahan Kampus Putra'
  },
  {
    id: 'gal-4',
    title: 'Bakti Sosial & Santunan Yatim Dhuafa Warga Sekitar',
    category: 'Sosial & Dakwah',
    description: 'Santri dan asatidz menyalurkan paket sembako serta santunan berkah kepada warga dhuafa di Desa Cisarua Megamendung.',
    imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=1200&q=80',
    date: '25 Agustus 2026',
    location: 'Desa Binaan Cisarua'
  },
  {
    id: 'gal-5',
    title: 'Kompleks Pesantren Markaz Hidayah yang Sejuk & Asri',
    category: 'Fasilitas',
    description: 'Pemandangan panorama lingkungan pesantren di kaki pegunungan dengan pepohonan hijau rindang dan udara sejuk pegunungan.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    date: '20 Agustus 2026',
    location: 'Kawasan Kampus Markaz Hidayah'
  },
  {
    id: 'gal-6',
    title: 'Setoran Muroja\'ah Santriwati di Gazebo Taman Asrama',
    category: 'Tahfidz',
    description: 'Santriwati saling menyimak hafalan (tasmi\' berpasangan) dengan tertib dan suasana yang tenang di taman asrama putri.',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
    date: '15 Agustus 2026',
    location: 'Taman Gazebo Kampus Putri'
  },
  {
    id: 'gal-7',
    title: 'Pemeriksaan Kesehatan Berkala Santri oleh Tim Medis',
    category: 'Fasilitas',
    description: 'Tim dokter Poskestren melakukan pemeriksaan berkala untuk memastikan kesehatan gigi, fisik, dan kebugaran seluruh santri.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    date: '10 Agustus 2026',
    location: 'Poskestren Markaz Hidayah'
  },
  {
    id: 'gal-8',
    title: 'Wisuda Akbar & Tasmi\' 30 Juz Sekali Duduk',
    category: 'Event',
    description: 'Momen penganugerahan selempang dan sanad tahfidz Al-Qur\'an kepada para wisudawan di depan dewan penguji masyayikh.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    date: '02 September 2026',
    location: 'Auditorium Utama'
  }
];

export const INITIAL_REGISTRATIONS: SantriRegistration[] = [
  {
    id: 'MHQ-2026-0012',
    studentName: 'Muhammad Zaidan Al-Fatih',
    nisn: '0089123456',
    gender: 'Laki-laki',
    birthPlace: 'Jakarta',
    birthDate: '2013-05-14',
    previousSchool: 'SDIT Nurul Fikri Jakarta',
    programChoice: 'Tahfidz 30 Juz Reguler',
    parentName: 'H. Hendra Gunawan, S.T.',
    parentRelation: 'Ayah',
    parentPhone: '081298765432',
    parentJob: 'Wiraswasta',
    parentAddress: 'Jl. Tebet Barat Dalam No. 15, Jakarta Selatan',
    status: 'Lolos Berkas',
    registeredAt: '2026-09-02 10:15',
    notes: 'Memiliki hafalan dasar 3 juz (Juz 30, 29, 28). Tajwid lancar.',
    testScore: 88,
    waNotificationSent: true
  },
  {
    id: 'MHQ-2026-0013',
    studentName: 'Fatimah Az-Zahra Ramadhani',
    nisn: '0091234876',
    gender: 'Perempuan',
    birthPlace: 'Bandung',
    birthDate: '2013-08-20',
    previousSchool: 'MI Persis Bandung',
    programChoice: 'Tahfidz & Diniyah Terpadu',
    parentName: 'Dra. Hj. Siti Nurjanah',
    parentRelation: 'Ibu',
    parentPhone: '081321456789',
    parentJob: 'Guru',
    parentAddress: 'Komp. Margahayu Raya Blok F No. 8, Bandung',
    status: 'Diterima',
    registeredAt: '2026-09-05 14:30',
    notes: 'Lulus tes baca Qur\'an & wawancara wali santri nilai A+.',
    testScore: 94,
    waNotificationSent: true
  },
  {
    id: 'MHQ-2026-0014',
    studentName: 'Ahmad Rayhan Al-Habsyi',
    nisn: '0076543210',
    gender: 'Laki-laki',
    birthPlace: 'Bogor',
    birthDate: '2012-11-03',
    previousSchool: 'SMPIT Al-Kautsar Sukabumi',
    programChoice: 'Program Takhassus Al-Qur\'an',
    parentName: 'Ustadz Salman Al-Habsyi',
    parentRelation: 'Ayah',
    parentPhone: '085712349988',
    parentJob: 'Pengajar Agama',
    parentAddress: 'Jl. Surya Kencana No. 45, Bogor',
    status: 'Jadwal Tes Seleksi',
    registeredAt: '2026-09-10 09:20',
    notes: 'Jadwal tes tahfidz hari Ahad, 20 September 2026 pukul 08.30 WIB.',
    waNotificationSent: true
  },
  {
    id: 'MHQ-2026-0015',
    studentName: 'Bilqis Naura Syahira',
    nisn: '0109876543',
    gender: 'Perempuan',
    birthPlace: 'Depok',
    birthDate: '2014-01-25',
    previousSchool: 'SDN Beji 1 Depok',
    programChoice: 'Tahfidz 30 Juz Reguler',
    parentName: 'Ir. Bambang Trihatmojo',
    parentRelation: 'Ayah',
    parentPhone: '081588776655',
    parentJob: 'Karyawan BUMN',
    parentAddress: 'Pesona Depok Estate Blok B2 No. 11, Depok',
    status: 'Menunggu Verifikasi',
    registeredAt: '2026-09-16 11:45',
    notes: 'Pendaftaran baru masuk. Berkas raport dan KK lengkap.',
    waNotificationSent: false
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Penerimaan Santri Baru TA 2026/2027 Gelombang I Telah Dibuka!',
    content: 'Kuota terbatas hanya untuk 60 santriwan dan santriwati. Manfaatkan beasiswa prestasi hafalan & dhuafa.',
    date: '15 September 2026',
    isActive: true,
    isUrgent: true,
    targetUrl: '/pendaftaran'
  },
  {
    id: 'ann-2',
    title: 'Program Wakaf Pembangunan Asrama Santri Tahfidz',
    content: 'Peluang amal jariyah abadi melalui program kemitraan resmi mariberbagi.net.',
    date: '10 September 2026',
    isActive: true,
    isUrgent: false,
    targetUrl: '/donasi'
  }
];

export const INITIAL_HOME_CONTENT: HomeContent = {
  hero: {
    bismillahText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    badgeText: "Dibuka!",
    titlePrefix: "Mencetak Generasi",
    titleHighlight1: "Qur'ani",
    titleMiddle: ", Berakhlak Mulia &",
    titleHighlight2: "Mandiri",
    description: "Pondok Pesantren Markaz Hidayah Qur'an memadukan kurikulum Tahfidz 30 Juz bersanad, pendalaman kitab turats keislaman, dan pembinaan karakter santri tangguh di lingkungan sejuk Cisarua Bogor.",
    imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=80",
    floatCardTitle: "Lingkungan Asri & Nyaman",
    floatCardLocation: "Puncak Bogor",
    floatCardDesc: "Suasana tenang khas lereng pegunungan bebas polusi dan gadget, sangat kondusif untuk akselerasi menghafal Al-Qur'an.",
    stat1Value: "30 Juz",
    stat1Label: "Target Mutqin & Sanad",
    stat2Value: "1 : 12",
    stat2Label: "Rasio Santri & Musyrif",
    stat3Value: "100%",
    stat3Label: "Asatidz Berijazah",
    stat4Value: "A+",
    stat4Label: "Akreditasi Formal"
  },
  about: {
    badgeText: "Tentang Pesantren",
    title: "Membangun Peradaban dari Kalamullah",
    description: "Markaz Hidayah Qur'an didirikan sebagai ikhtiar menyatukan kemurnian tradisi pesantren tahfidz salaf dengan manajemen tata kelola pendidikan modern yang profesional.",
    card1Title: "Tahfidz Bersanad",
    card1Desc: "Bimbingan intensif talaqqi Al-Jazari bersama asatidz yang memiliki sanad muttashil sampai ke Rasulullah ﷺ.",
    card2Title: "Penguasaan Bahasa & Turats",
    card2Desc: "Santri dibekali kecakapan Bahasa Arab aktif dan pengkajian kitab kuning dasar sebagai pemahaman hukum syar'i.",
    card3Title: "Kemandirian & Adab",
    card3Desc: "Pendidikan kepemimpinan, kedisiplinan hidup mandiri, serta pembentukan adab sopan santun kepada orang tua & guru."
  },
  ctaPsb: {
    badgeText: "Penerimaan Santri Baru TA 2026/2027",
    title: "Mari Bergabung Bersama Keluarga Ahlul Qur'an",
    description: "Kuota pendaftaran terbatas untuk 60 santri setiap gelombang demi menjaga rasio pembinaan halaqah yang optimal dan perhatian penuh pada perkembangan setiap santri.",
    feature1: "Notifikasi WhatsApp Otomatis",
    feature2: "Jalur Beasiswa Yatim & Dhuafa",
    feature3: "Tes Seleksi Tahsin & Wawancara"
  },
  donation: {
    badgeText: "Gateway Donasi & Wakaf Umat",
    title: "Alirkan Pahala Jariyah Bersama Penghafal Al-Qur'an",
    description: "Dukung pembangunan asrama santri tahfidz dan beasiswa pendidikan santri yatim dhuafa melalui kanal donasi resmi kami di platform mariberbagi.net atau rekening langsung yayasan.",
    tagline1: "Laporan Transparan",
    tagline2: "100% Tersalurkan",
    tagline3: "Konfirmasi Otomatis via WA"
  }
};

export const INITIAL_PROFIL_CONTENT: ProfilContent = {
  headerBadge: "Profil Resmi Pesantren",
  headerTitle: "Tentang Markaz Hidayah Qur'an",
  headerDesc: "Meneguhkan tekad menjadi kawah candradimuka para penghafal Al-Qur'an yang mutqin, kokoh dalam aqidah salafus shalih, dan berkontribusi nyata bagi peradaban umat.",
  historyBadge: "Sejarah Singkat",
  historyTitle: "Bermula dari Wakaf Cinta Al-Qur'an",
  historyPara1: "Markaz Hidayah Qur'an dirintis pada tahun 2018 berawal dari majelis halaqah tahsin dan tahfidz kecil di Cisarua, Bogor. Didorong oleh kerinduan para wali santri akan tempat pendidikan yang benar-benar fokus pada hafalan Al-Qur'an mutqin tanpa mengesampingkan adab dan ilmu syar'i, diikrarkanlah wakaf tanah seluas 1,5 hektar oleh keluarga pewakaf.",
  historyPara2: "Kini, pesantren telah berkembang menjadi kompleks pendidikan tahfidz terpadu yang menampung ratusan santri dari berbagai penjuru nusantara, dilengkapi masjid jami', gedung asrama putra-putri terpisah, serta dewan asatidz yang berijazah sanad resmi.",
  historyImageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
  historyImageCaption: "Kawasan Pesantren Markaz Hidayah Qur'an berlatar pemandangan pegunungan Cisarua Bogor.",
  statYear: "2018",
  statYearLabel: "Tahun Berdiri",
  statSantri: "180+",
  statSantriLabel: "Santri Aktif",
  statAlumni: "120+",
  statAlumniLabel: "Alumni 30 Juz",
  visiTitle: "Visi Utama",
  visiText: "\"Menjadi lembaga pendidikan Al-Qur'an rujukan nasional yang unggul dalam melahirkan huffadz 30 juz mutqin, berakhlak mulia, berwawasan luas, dan berjiwa kepemimpinan islami pada tahun 2030.\"",
  misiTitle: "Misi Pesantren",
  misiList: [
    "Menyelenggarakan metode talaqqi tahfidz Al-Qur'an bersanad yang terstruktur dan mutqin.",
    "Menanamkan aqidah ahlussunnah wal jama'ah dan ibadah sesuai tuntunan Rasulullah ﷺ.",
    "Membekali santri kemampuan Bahasa Arab aktif dan pemahaman kitab kuning dasar.",
    "Membina kemandirian, ketrampilan hidup (life skills), dan kebugaran jasmani."
  ]
};

export const INITIAL_VALUES: PesantrenValue[] = [
  {
    id: "val-1",
    title: "Al-Ikhlas (Keikhlasan)",
    desc: "Menjadikan segenap ibadah, hafalan, dan amal semata-mata mencari keridhoan Allah Ta'ala.",
    iconName: "Heart"
  },
  {
    id: "val-2",
    title: "Al-Itqan (Kualitas & Mutqin)",
    desc: "Menjaga hafalan dengan standar tajwid sempurna dan kelancaran yang teruji.",
    iconName: "Award"
  },
  {
    id: "val-3",
    title: "Al-Istiqomah (Konsistensi)",
    desc: "Membiasakan muroja'ah harian berkesinambungan hingga akhir hayat.",
    iconName: "Compass"
  },
  {
    id: "val-4",
    title: "Al-Adab (Akhlakul Karimah)",
    desc: "Mendahulukan adab di atas ilmu, berbakti kepada orang tua, dan menghormati guru.",
    iconName: "ShieldCheck"
  },
  {
    id: "val-5",
    title: "Al-Istiqlal (Kemandirian)",
    desc: "Melatih santri bertanggung jawab atas diri sendiri, tangguh, dan tidak bergantung.",
    iconName: "Target"
  },
  {
    id: "val-6",
    title: "Al-Ukhuwah (Persaudaraan)",
    desc: "Menjalin persaudaraan mukmin yang erat di atas pondasi cinta kepada Al-Qur'an.",
    iconName: "Users"
  }
];

export const INITIAL_DEWAN_PENGASUH: DewanPengasuhMember[] = [
  {
    id: "dewan-1",
    name: "Dr. KH. Muhammad Faiz Hidayatullah, M.A.",
    role: "Pengasuh & Pimpinan Pondok Pesantren",
    credential: "Alumni Univ. Al-Azhar Kairo & Pemegang Sanad Qira'at 'Asyrah",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dewan-2",
    name: "Ustadz Ahmad Rasyid, Lc., M.Ag.",
    role: "Kepala Bidang Tahfidz & Al-Qur'an",
    credential: "Hafidz 30 Juz Bersanad Jazariyyah, Lulusan LIPIA Jakarta",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dewan-3",
    name: "Ustadzah Siti Fatimah, S.Pd.I., Al-Hafidzah",
    role: "Ketua Pengasuhan Santriwati",
    credential: "Khatimat 30 Juz Mutqin, Pengampu Sanad Hafsh 'an 'Ashim",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  }
];

export const INITIAL_DAILY_SCHEDULE: DailyScheduleItem[] = [
  { id: "sch-1", time: "03.30 - 04.30", activity: "Qiyamullail & Muroja'ah Pribadi", category: "Ibadah" },
  { id: "sch-2", time: "04.30 - 05.30", activity: "Shalat Shubuh Berjama'ah & Dzikir Pagi", category: "Ibadah" },
  { id: "sch-3", time: "05.30 - 07.00", activity: "Halaqah Tahfidz I: Setoran Ziyadah (Hafalan Baru)", category: "Tahfidz" },
  { id: "sch-4", time: "07.00 - 08.00", activity: "Mandi, Sarapan Pagi Bersama & Piket Mandiri", category: "Kemandirian" },
  { id: "sch-5", time: "08.00 - 11.30", activity: "Kajian Diniyah / Kurikulum Formal & Bahasa Arab", category: "Akademik" },
  { id: "sch-6", time: "11.30 - 13.00", activity: "Shalat Zhuhur, Makan Siang & Qailulah (Tidur Siang)", category: "Istirahat" },
  { id: "sch-7", time: "13.00 - 15.00", activity: "Halaqah Tahfidz II: Sabqi (Penguatan Hafalan Dekat)", category: "Tahfidz" },
  { id: "sch-8", time: "15.00 - 16.00", activity: "Shalat Ashar Berjama'ah & Al-Ma'tsurat", category: "Ibadah" },
  { id: "sch-9", time: "16.00 - 17.30", activity: "Olahraga Sunnah (Panahan, Futsal) & Mandi Sore", category: "Kebugaran" },
  { id: "sch-10", time: "17.30 - 19.30", activity: "Shalat Maghrib Berjama'ah & Halaqah III (Tasmi' Muroja'ah)", category: "Tahfidz" },
  { id: "sch-11", time: "19.30 - 20.30", activity: "Shalat Isya' Berjama'ah & Makan Malam", category: "Ibadah" },
  { id: "sch-12", time: "20.30 - 21.30", activity: "Belajar Mandiri, Mufradat Bahasa & Persiapan Sabaq Esok", category: "Akademik" },
  { id: "sch-13", time: "21.30 - 03.30", activity: "Istirahat Tidur Malam (Lampu Padam)", category: "Istirahat" }
];

export const INITIAL_TARGET_TIMELINE: TargetTimelineItem[] = [
  { id: "tgt-1", year: "Tahun ke-1", juz: "Juz 1 – 10", focus: "Tahsin Al-Jazari, Tajwid Praktis, Itqon Juz 30-28, Setoran 10 Juz pertama" },
  { id: "tgt-2", year: "Tahun ke-2", juz: "Juz 11 – 20", focus: "Akselerasi Sabaq, Muroja'ah Manzil harian, Bahasa Arab Muhadatsah" },
  { id: "tgt-3", year: "Tahun ke-3", juz: "Juz 21 – 30", focus: "Khatam 30 Juz, Karantina Tasmi' sekali duduk 30 Juz, Pengambilan Sanad" }
];
