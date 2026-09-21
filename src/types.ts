export type RegistrationStatus = 
  | 'Menunggu Verifikasi'
  | 'Lolos Berkas'
  | 'Jadwal Tes Seleksi'
  | 'Diterima'
  | 'Ditolak';

export type ProgramChoice = 
  | 'Tahfidz 30 Juz Reguler'
  | 'Tahfidz & Diniyah Terpadu'
  | 'Program Takhassus Al-Qur\'an'
  | 'Karantina Tahfidz Liburan';

export interface SantriRegistration {
  id: string; // e.g. MHQ-2026-0142
  studentName: string;
  nisn: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  previousSchool: string;
  programChoice: ProgramChoice;
  parentName: string;
  parentRelation: 'Ayah' | 'Ibu' | 'Wali';
  parentPhone: string; // WhatsApp number
  parentJob: string;
  parentAddress: string;
  status: RegistrationStatus;
  registeredAt: string;
  notes?: string;
  testScore?: number;
  waNotificationSent: boolean;
}

export type ArticleCategory = 
  | 'Berita Pesantren'
  | 'Kegiatan Santri'
  | 'Artikel Keislaman'
  | 'Pendidikan'
  | 'Pengumuman'
  | 'Laporan';

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  thumbnail: string;
  author: string;
  date: string;
  status: 'Published' | 'Draft';
  readTime: string;
  tags: string[];
  seoKeywords: string;
  seoDescription: string;
  seoTitle?: string;
  viewsCount?: number;
}

export type GalleryCategory = 
  | 'Kegiatan Santri'
  | 'Pendidikan'
  | 'Tahfidz'
  | 'Sosial & Dakwah'
  | 'Fasilitas'
  | 'Event';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isActive: boolean;
  isUrgent: boolean;
  targetUrl?: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  features: string[];
  capacity?: string;
}

export interface Program {
  id: string;
  name: string;
  target: string;
  duration: string;
  method: string;
  description: string;
  highlights: string[];
  imageUrl: string;
}

export interface DailyScheduleItem {
  id: string;
  time: string;
  activity: string;
  category: 'Tahfidz' | 'Ibadah' | 'Akademik' | 'Kemandirian' | 'Kebugaran' | 'Istirahat';
}

export interface TargetTimelineItem {
  id: string;
  year: string;
  juz: string;
  focus: string;
}

export interface PesantrenValue {
  id: string;
  title: string;
  desc: string;
  iconName?: string;
}

export interface DewanPengasuhMember {
  id: string;
  name: string;
  role: string;
  credential: string;
  photo: string;
}

export interface HomeHeroContent {
  bismillahText: string;
  badgeText: string;
  titlePrefix: string;
  titleHighlight1: string;
  titleMiddle: string;
  titleHighlight2: string;
  description: string;
  imageUrl: string;
  floatCardTitle: string;
  floatCardLocation: string;
  floatCardDesc: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
}

export interface HomeAboutPreview {
  badgeText: string;
  title: string;
  description: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;
  card4Title?: string;
  card4Desc?: string;
}

export interface HomeCtaPsb {
  badgeText: string;
  title: string;
  description: string;
  feature1: string;
  feature2: string;
  feature3: string;
}

export interface HomeDonationCta {
  badgeText: string;
  title: string;
  description: string;
  tagline1: string;
  tagline2: string;
  tagline3: string;
}

export interface HomeContent {
  hero: HomeHeroContent;
  about: HomeAboutPreview;
  ctaPsb: HomeCtaPsb;
  donation: HomeDonationCta;
}

export interface ProfilContent {
  headerBadge: string;
  headerTitle: string;
  headerDesc: string;
  historyBadge: string;
  historyTitle: string;
  historyPara1: string;
  historyPara2: string;
  historyImageUrl: string;
  historyImageCaption: string;
  statYear: string;
  statYearLabel: string;
  statSantri: string;
  statSantriLabel: string;
  statAlumni: string;
  statAlumniLabel: string;
  visiTitle: string;
  visiText: string;
  misiTitle: string;
  misiList: string[];
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
  logoColor?: string;
}

export interface SiteSettings {
  pesantrenName: string;
  subtitle: string;
  tagline: string;
  logoUrl?: string;
  phone: string;
  waNumber: string; // for direct WhatsApp integration
  email: string;
  address: string;
  registrationStatus: 'Buka' | 'Tutup' | 'Segera Dibuka';
  registrationWave: string;
  registrationQuota: number;
  donationUrl: string; // default https://mariberbagi.net/pesantren-markazhidayah
  bankAccounts: BankAccount[];

  // Top Header Banner Info (Editable)
  headerDateText: string;
  headerLocation: string;
  headerPsbBannerText: string;
  headerPsbBannerTarget: string;
  headerHotlineText: string;

  // Footer Information (Editable)
  footerAboutText: string;
  footerBadge1: string;
  footerBadge2: string;
  footerCopyrightText: string;

  // Admin Account Credentials (Editable)
  adminUsername: string;
  adminPassword: string;

  // Cloud Database & Hosting Sync (Rumahweb / Shared Hosting)
  syncApiUrl?: string;
  autoSyncEnabled?: boolean;
}

export interface DonationProgram {
  id: string;
  title: string;
  target: number;
  collected: number;
  donorsCount: number;
  category: string;
  description: string;
  imageUrl: string;
  directDonationUrl?: string;
  customDonationUrl?: string;
  isActive?: boolean;
}

export interface DonationPageContent {
  headerBadge: string;
  headerPartnerBadge: string;
  headerTitle: string;
  headerQuote: string;
  headerButtonText: string;
  portalDonationUrl: string;
  waConfirmNumber?: string;

  programsSectionBadge: string;
  programsSectionTitle: string;
  programsSectionDesc: string;

  calculatorBadge: string;
  calculatorTitle: string;
  calculatorDesc: string;
  nominalPresets: number[];

  bankSectionBadge: string;
  bankSectionTitle: string;
  bankSectionDesc: string;

  accountabilityTitle: string;
  accountabilityDesc: string;
}

export interface EducationFeeItem {
  id: string;
  name: string;
  amount: string;
  description: string;
  category: string;
}

export interface ScholarshipInfo {
  title: string;
  badge: string;
  description: string;
  requirements: string;
  partnerInfo?: string;
  isActive: boolean;
}

export interface AuthorAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  email?: string;
  role: 'author';
  isActive: boolean;
  createdAt?: string;
}

export type UserRole = 'admin' | 'author';

