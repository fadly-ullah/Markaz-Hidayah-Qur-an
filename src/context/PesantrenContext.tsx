import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  GalleryItem,
  SantriRegistration,
  Announcement,
  SiteSettings,
  RegistrationStatus,
  Program,
  Facility,
  HomeContent,
  ProfilContent,
  PesantrenValue,
  DewanPengasuhMember,
  DailyScheduleItem,
  TargetTimelineItem,
  DonationProgram,
  DonationPageContent,
  BankAccount,
  EducationFeeItem,
  ScholarshipInfo,
  AuthorAccount,
  UserRole
} from '../types';
import {
  INITIAL_ARTICLES,
  INITIAL_GALLERY,
  INITIAL_REGISTRATIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SETTINGS,
  INITIAL_PROGRAMS,
  INITIAL_FACILITIES,
  INITIAL_HOME_CONTENT,
  INITIAL_PROFIL_CONTENT,
  INITIAL_VALUES,
  INITIAL_DEWAN_PENGASUH,
  INITIAL_DAILY_SCHEDULE,
  INITIAL_TARGET_TIMELINE,
  INITIAL_DONATION_PROGRAMS,
  INITIAL_DONATION_CONTENT,
  INITIAL_FEE_ITEMS,
  INITIAL_SCHOLARSHIP_INFO,
  INITIAL_AUTHOR_ACCOUNTS
} from '../data/initialData';

export type NavigationRoute = 
  | 'home'
  | 'profil'
  | 'program'
  | 'fasilitas'
  | 'galeri'
  | 'artikel'
  | 'artikel-detail'
  | 'pendaftaran'
  | 'donasi'
  | 'kontak'
  | 'admin';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface PesantrenContextType {
  // Navigation
  currentRoute: NavigationRoute;
  setCurrentRoute: (route: NavigationRoute) => void;
  selectedArticleSlug: string | null;
  navigateToArticle: (slug: string) => void;

  // Settings & Core Info
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // Beranda Sections Content (Editable)
  homeContent: HomeContent;
  updateHomeContent: (newContent: Partial<HomeContent>) => void;

  // Profil & Tentang Pesantren Content (Editable)
  profilContent: ProfilContent;
  updateProfilContent: (newContent: Partial<ProfilContent>) => void;
  values: PesantrenValue[];
  addValue: (val: Omit<PesantrenValue, 'id'>) => void;
  updateValue: (id: string, val: Partial<PesantrenValue>) => void;
  deleteValue: (id: string) => void;
  dewanPengasuh: DewanPengasuhMember[];
  addDewanPengasuh: (dewan: Omit<DewanPengasuhMember, 'id'>) => void;
  updateDewanPengasuh: (id: string, dewan: Partial<DewanPengasuhMember>) => void;
  deleteDewanPengasuh: (id: string) => void;

  // Program, Jadwal Harian & Target Capaian (Editable)
  programs: Program[];
  addProgram: (program: Omit<Program, 'id'>) => void;
  updateProgram: (id: string, updated: Partial<Program>) => void;
  deleteProgram: (id: string) => void;
  dailySchedule: DailyScheduleItem[];
  addScheduleItem: (item: Omit<DailyScheduleItem, 'id'>) => void;
  updateScheduleItem: (id: string, item: Partial<DailyScheduleItem>) => void;
  deleteScheduleItem: (id: string) => void;
  targetTimeline: TargetTimelineItem[];
  addTargetItem: (item: Omit<TargetTimelineItem, 'id'>) => void;
  updateTargetItem: (id: string, item: Partial<TargetTimelineItem>) => void;
  deleteTargetItem: (id: string) => void;

  // Fasilitas Pesantren (Editable)
  facilities: Facility[];
  addFacility: (facility: Omit<Facility, 'id'>) => void;
  updateFacility: (id: string, updated: Partial<Facility>) => void;
  deleteFacility: (id: string) => void;

  // Donation & Wakaf Management (Editable)
  donationContent: DonationPageContent;
  updateDonationContent: (newContent: Partial<DonationPageContent>) => void;
  donationPrograms: DonationProgram[];
  addDonationProgram: (prog: Omit<DonationProgram, 'id'>) => void;
  updateDonationProgram: (id: string, prog: Partial<DonationProgram>) => void;
  deleteDonationProgram: (id: string) => void;
  addBankAccount: (account: BankAccount) => void;
  updateBankAccount: (index: number, account: BankAccount) => void;
  deleteBankAccount: (index: number) => void;

  // Articles & Gallery & Registrations
  articles: Article[];
  gallery: GalleryItem[];
  registrations: SantriRegistration[];
  announcements: Announcement[];

  // Article Actions
  addArticle: (article: Omit<Article, 'id' | 'viewsCount'>) => Article;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Gallery Actions
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => GalleryItem;
  deleteGalleryItem: (id: string) => void;

  // Registration Actions
  registerNewSantri: (data: Omit<SantriRegistration, 'id' | 'status' | 'registeredAt' | 'waNotificationSent'>) => SantriRegistration;
  updateRegistrationStatus: (id: string, status: RegistrationStatus, notes?: string, testScore?: number) => void;
  updateRegistration: (id: string, updatedData: Partial<SantriRegistration>) => void;
  deleteRegistration: (id: string) => void;
  sendWhatsAppNotification: (registrationId: string, templateType?: 'registration_received' | 'test_schedule' | 'acceptance') => string;

  // Announcement Actions
  toggleAnnouncement: (id: string) => void;

  // Biaya Pendidikan & Beasiswa Actions
  feeItems: EducationFeeItem[];
  scholarshipInfo: ScholarshipInfo;
  updateFeeItem: (id: string, updated: Partial<EducationFeeItem>) => void;
  addFeeItem: (item: Omit<EducationFeeItem, 'id'>) => EducationFeeItem;
  deleteFeeItem: (id: string) => void;
  updateScholarshipInfo: (updated: Partial<ScholarshipInfo>) => void;

  // Author & Role Management
  authorAccounts: AuthorAccount[];
  currentUserRole: UserRole | null;
  loggedInAuthor: AuthorAccount | null;
  addAuthorAccount: (account: Omit<AuthorAccount, 'id' | 'createdAt'>) => AuthorAccount;
  updateAuthorAccount: (id: string, updated: Partial<AuthorAccount>) => void;
  deleteAuthorAccount: (id: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (newUsername: string, newPassword: string) => boolean;

  // Lightbox
  activeLightboxIndex: number | null;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Cloud Database & Hosting Sync (Rumahweb)
  syncApiUrl: string;
  setSyncApiUrl: (url: string) => void;
  autoSyncEnabled: boolean;
  setAutoSyncEnabled: (enabled: boolean) => void;
  isSyncing: boolean;
  lastSyncTime: string | null;
  syncStatus: 'idle' | 'success' | 'error' | 'syncing';
  syncErrorMessage: string | null;
  pullFromHosting: (customUrl?: string, silent?: boolean) => Promise<boolean>;
  pushToHosting: (customUrl?: string, silent?: boolean) => Promise<boolean>;
  pushArticlesToHosting: () => Promise<boolean>;
  testHostingConnection: (url: string) => Promise<{ ok: boolean; message: string }>;
  downloadSyncPhpScript: () => void;
}

const PesantrenContext = createContext<PesantrenContextType | undefined>(undefined);

const DEFAULT_SYNC_API_URL = 'https://api.hidayahquran.id/sync.php';

const STORAGE_KEYS = {
  SETTINGS: 'mhq_settings_v1',
  ARTICLES: 'mhq_articles_v1',
  GALLERY: 'mhq_gallery_v1',
  REGISTRATIONS: 'mhq_registrations_v1',
  ANNOUNCEMENTS: 'mhq_announcements_v1',
  AUTH: 'mhq_admin_auth_v1',
  HOME_CONTENT: 'mhq_home_content_v1',
  PROFIL_CONTENT: 'mhq_profil_content_v1',
  VALUES: 'mhq_values_v1',
  DEWAN_PENGASUH: 'mhq_dewan_v1',
  PROGRAMS: 'mhq_programs_v1',
  SCHEDULE: 'mhq_schedule_v1',
  TARGETS: 'mhq_targets_v1',
  FACILITIES: 'mhq_facilities_v1',
  DONATION_CONTENT: 'mhq_donation_content_v1',
  DONATION_PROGRAMS: 'mhq_donation_programs_v1',
  FEES: 'mhq_fees_v1',
  SCHOLARSHIP: 'mhq_scholarship_v1',
  AUTHORS: 'mhq_authors_v1',
  USER_ROLE: 'mhq_user_role_v1',
  LOGGED_AUTHOR: 'mhq_logged_author_v1'
};

export const PesantrenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State with URL Hash & Query parameter support
  const [currentRoute, setCurrentRouteState] = useState<NavigationRoute>(() => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page')?.toLowerCase() || params.get('route')?.toLowerCase();
      const target = hash || page;
      if (target === 'admin' || target === 'penulis' || target === 'author') return 'admin';
      if (target === 'profil') return 'profil';
      if (target === 'program') return 'program';
      if (target === 'fasilitas') return 'fasilitas';
      if (target === 'galeri') return 'galeri';
      if (target === 'artikel') return 'artikel';
      if (target === 'donasi') return 'donasi';
      if (target === 'pendaftaran') return 'pendaftaran';
      if (target === 'kontak') return 'kontak';
    } catch {
      // fallback
    }
    return 'home';
  });
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Synchronize route with URL hash listener
  useEffect(() => {
    const handleHash = () => {
      try {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        if (hash === 'admin' || hash === 'penulis' || hash === 'author') {
          setCurrentRouteState('admin');
        } else if (['home', 'profil', 'program', 'fasilitas', 'galeri', 'artikel', 'donasi', 'pendaftaran', 'kontak'].includes(hash)) {
          setCurrentRouteState(hash as NavigationRoute);
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Core Data States with LocalStorage fallback
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SETTINGS,
          ...parsed,
          headerDateText: parsed.headerDateText || INITIAL_SETTINGS.headerDateText,
          headerLocation: parsed.headerLocation || INITIAL_SETTINGS.headerLocation,
          headerPsbBannerText: parsed.headerPsbBannerText || INITIAL_SETTINGS.headerPsbBannerText,
          headerPsbBannerTarget: parsed.headerPsbBannerTarget || INITIAL_SETTINGS.headerPsbBannerTarget,
          headerHotlineText: parsed.headerHotlineText || INITIAL_SETTINGS.headerHotlineText,
          footerAboutText: parsed.footerAboutText || INITIAL_SETTINGS.footerAboutText,
          footerBadge1: parsed.footerBadge1 || INITIAL_SETTINGS.footerBadge1,
          footerBadge2: parsed.footerBadge2 || INITIAL_SETTINGS.footerBadge2,
          footerCopyrightText: parsed.footerCopyrightText || INITIAL_SETTINGS.footerCopyrightText,
          adminUsername: parsed.adminUsername || INITIAL_SETTINGS.adminUsername,
          adminPassword: parsed.adminPassword || INITIAL_SETTINGS.adminPassword,
          logoUrl: parsed.logoUrl && parsed.logoUrl.trim() !== '' ? parsed.logoUrl.trim() : undefined,
          donationUrl: parsed.donationUrl?.includes('mariberbagi.com')
            ? parsed.donationUrl.replace('mariberbagi.com', 'mariberbagi.net')
            : (parsed.donationUrl || INITIAL_SETTINGS.donationUrl),
          syncApiUrl: parsed.syncApiUrl || DEFAULT_SYNC_API_URL
        };
      } catch {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [registrations, setRegistrations] = useState<SantriRegistration[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [homeContent, setHomeContent] = useState<HomeContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOME_CONTENT);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          hero: { ...INITIAL_HOME_CONTENT.hero, ...(parsed.hero || {}) },
          about: { ...INITIAL_HOME_CONTENT.about, ...(parsed.about || {}) },
          ctaPsb: { ...INITIAL_HOME_CONTENT.ctaPsb, ...(parsed.ctaPsb || {}) },
          donation: { ...INITIAL_HOME_CONTENT.donation, ...(parsed.donation || {}) }
        };
      } catch {
        return INITIAL_HOME_CONTENT;
      }
    }
    return INITIAL_HOME_CONTENT;
  });

  const [profilContent, setProfilContent] = useState<ProfilContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFIL_CONTENT);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_PROFIL_CONTENT,
          ...parsed,
          misiList: parsed.misiList || INITIAL_PROFIL_CONTENT.misiList
        };
      } catch {
        return INITIAL_PROFIL_CONTENT;
      }
    }
    return INITIAL_PROFIL_CONTENT;
  });

  const [values, setValues] = useState<PesantrenValue[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VALUES);
    return saved ? JSON.parse(saved) : INITIAL_VALUES;
  });

  const [dewanPengasuh, setDewanPengasuh] = useState<DewanPengasuhMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DEWAN_PENGASUH);
    return saved ? JSON.parse(saved) : INITIAL_DEWAN_PENGASUH;
  });

  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
    return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
  });

  const [dailySchedule, setDailySchedule] = useState<DailyScheduleItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    return saved ? JSON.parse(saved) : INITIAL_DAILY_SCHEDULE;
  });

  const [targetTimeline, setTargetTimeline] = useState<TargetTimelineItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TARGETS);
    return saved ? JSON.parse(saved) : INITIAL_TARGET_TIMELINE;
  });

  const [donationContent, setDonationContent] = useState<DonationPageContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATION_CONTENT);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_DONATION_CONTENT,
          ...parsed,
          nominalPresets: Array.isArray(parsed.nominalPresets) && parsed.nominalPresets.length > 0
            ? parsed.nominalPresets
            : INITIAL_DONATION_CONTENT.nominalPresets
        };
      } catch {
        return INITIAL_DONATION_CONTENT;
      }
    }
    return INITIAL_DONATION_CONTENT;
  });

  const [donationPrograms, setDonationPrograms] = useState<DonationProgram[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATION_PROGRAMS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return INITIAL_DONATION_PROGRAMS;
      }
    }
    return INITIAL_DONATION_PROGRAMS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // User Role & Logged-in Author Account State
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(() => {
    const savedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    if (savedRole === 'admin' || savedRole === 'author') return savedRole;
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true' ? 'admin' : null;
  });

  const [loggedInAuthor, setLoggedInAuthor] = useState<AuthorAccount | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGGED_AUTHOR);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Biaya Pendidikan & Beasiswa States
  const [feeItems, setFeeItems] = useState<EducationFeeItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEES);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        return INITIAL_FEE_ITEMS;
      }
    }
    return INITIAL_FEE_ITEMS;
  });

  const [scholarshipInfo, setScholarshipInfo] = useState<ScholarshipInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHOLARSHIP);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_SCHOLARSHIP_INFO, ...parsed };
      } catch {
        return INITIAL_SCHOLARSHIP_INFO;
      }
    }
    return INITIAL_SCHOLARSHIP_INFO;
  });

  // Author Accounts State (dikelola oleh Admin Pusat)
  const [authorAccounts, setAuthorAccounts] = useState<AuthorAccount[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTHORS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        return INITIAL_AUTHOR_ACCOUNTS;
      }
    }
    return INITIAL_AUTHOR_ACCOUNTS;
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cloud Database & Hosting Sync States (Rumahweb)
  const [syncApiUrl, setSyncApiUrlState] = useState<string>(() => {
    return (
      settings.syncApiUrl ||
      localStorage.getItem('mhq_sync_url_v1') ||
      ((import.meta as unknown as { env?: { VITE_SYNC_API_URL?: string } }).env?.VITE_SYNC_API_URL as string) ||
      DEFAULT_SYNC_API_URL
    );
  });
  const [autoSyncEnabled, setAutoSyncEnabledState] = useState<boolean>(() => {
    return settings.autoSyncEnabled ?? true;
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => {
    return localStorage.getItem('mhq_last_sync_time') || null;
  });
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error' | 'syncing'>('idle');
  const [syncErrorMessage, setSyncErrorMessage] = useState<string | null>(null);

  const setSyncApiUrl = (url: string) => {
    const cleanUrl = url.trim();
    setSyncApiUrlState(cleanUrl);
    localStorage.setItem('mhq_sync_url_v1', cleanUrl);
    setSettings((prev) => ({ ...prev, syncApiUrl: cleanUrl }));
  };

  const setAutoSyncEnabled = (enabled: boolean) => {
    setAutoSyncEnabledState(enabled);
    setSettings((prev) => ({ ...prev, autoSyncEnabled: enabled }));
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOME_CONTENT, JSON.stringify(homeContent));
  }, [homeContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFIL_CONTENT, JSON.stringify(profilContent));
  }, [profilContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VALUES, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEWAN_PENGASUH, JSON.stringify(dewanPengasuh));
  }, [dewanPengasuh]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(dailySchedule));
  }, [dailySchedule]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TARGETS, JSON.stringify(targetTimeline));
  }, [targetTimeline]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATION_CONTENT, JSON.stringify(donationContent));
  }, [donationContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATION_PROGRAMS, JSON.stringify(donationPrograms));
  }, [donationPrograms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  useEffect(() => {
    if (currentUserRole) {
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, currentUserRole);
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
  }, [currentUserRole]);

  useEffect(() => {
    if (loggedInAuthor) {
      localStorage.setItem(STORAGE_KEYS.LOGGED_AUTHOR, JSON.stringify(loggedInAuthor));
    } else {
      localStorage.removeItem(STORAGE_KEYS.LOGGED_AUTHOR);
    }
  }, [loggedInAuthor]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(feeItems));
  }, [feeItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIP, JSON.stringify(scholarshipInfo));
  }, [scholarshipInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTHORS, JSON.stringify(authorAccounts));
  }, [authorAccounts]);

  // Toast system
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper untuk membuat snapshot data lengkap
  const buildCompleteDataSnapshot = () => {
    return {
      version: '1.0',
      syncedAt: new Date().toISOString(),
      settings,
      homeContent,
      profilContent,
      values,
      dewanPengasuh,
      programs,
      facilities,
      dailySchedule,
      targetTimeline,
      articles,
      gallery,
      registrations,
      announcements,
      donationContent,
      donationPrograms,
      feeItems,
      scholarshipInfo,
      authorAccounts
    };
  };

  // Download File Script PHP sync.php
  const downloadSyncPhpScript = () => {
    const phpScript = `<?php
/**
 * Script Sinkronisasi Cloud Markaz Hidayah Qur'an
 * Simpan file ini di hosting Rumahweb Anda: public_html/api/sync.php
 */

@ini_set('memory_limit', '256M');
@ini_set('post_max_size', '64M');
@ini_set('upload_max_filesize', '64M');

// Izinkan Cross-Origin Resource Sharing (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Tangani Preflight Request dari browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/pesantren_data.json';

// 1. GET: Ambil Data Pesantren Terbaru
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode([
            "status" => "empty",
            "message" => "Data belum pernah disinkronkan dari Admin. Silakan lakukan sinkronisasi pertama kali.",
            "syncedAt" => date('Y-m-d H:i:s')
        ]);
    }
    exit();
}

// 2. POST: Simpan Data Pesantren Terbaru / Update Artikel Khusus
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);

    if ($decoded && is_array($decoded)) {
        // Cek jika update khusus artikel dari Panel Redaksi / Penulis
        if (isset($decoded['type']) && $decoded['type'] === 'articles' && isset($decoded['articles'])) {
            $currentData = [];
            if (file_exists($dataFile)) {
                $existing = json_decode(file_get_contents($dataFile), true);
                if (is_array($existing)) {
                    $currentData = $existing;
                }
            }
            $currentData['articles'] = $decoded['articles'];
            $currentData['syncedAt'] = date('Y-m-d H:i:s');
            $dataToSave = $currentData;
        } else {
            $dataToSave = $decoded;
        }

        $saved = file_put_contents($dataFile, json_encode($dataToSave, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        if ($saved !== false) {
            echo json_encode([
                "status" => "success",
                "message" => "Data berhasil disimpan di hosting Rumahweb.",
                "syncedAt" => date('Y-m-d H:i:s'),
                "bytes" => $saved
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Gagal menulis file pesantren_data.json. Pastikan folder public_html/api/ memiliki permission 755 atau 777."
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Format data JSON tidak valid."
        ]);
    }
    exit();
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed"]);
`;

    const blob = new Blob([phpScript], { type: 'application/x-httpd-php;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sync.php');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(
      'Script sync.php Diunduh',
      'Upload file sync.php ini ke hosting Rumahweb Anda di dalam folder public_html/api/',
      'info'
    );
  };

  // Uji Koneksi ke URL Hosting
  const testHostingConnection = async (testUrl: string): Promise<{ ok: boolean; message: string }> => {
    const url = (testUrl || syncApiUrl).trim();
    if (!url) {
      return { ok: false, message: 'URL endpoint API Rumahweb belum diisi.' };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        return {
          ok: false,
          message: `Server merespon dengan status HTTP ${res.status} (${res.statusText}). Periksa apakah file sync.php sudah di-upload.`
        };
      }

      const json = await res.json().catch(() => null);
      if (!json) {
        return {
          ok: false,
          message: 'Server terhubung tetapi tidak mengembalikan format JSON yang valid.'
        };
      }

      return {
        ok: true,
        message: 'Koneksi ke hosting Rumahweb BERHASIL! Endpoint siap digunakan untuk sinkronisasi data.'
      };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { ok: false, message: 'Koneksi waktu habis (Timeout 8 detik). Periksa koneksi internet atau server hosting.' };
      }
      return {
        ok: false,
        message: `Gagal menghubungi server: ${err.message || 'CORS ditolak atau URL salah'}. Pastikan URL diawali https://`
      };
    }
  };

  // Tarik Data dari Hosting (Pull)
  const pullFromHosting = async (customUrl?: string, silent: boolean = false): Promise<boolean> => {
    const targetUrl = (customUrl || syncApiUrl).trim();
    if (!targetUrl) {
      if (!silent) {
        showToast('URL Belum Diatur', 'Harap masukkan URL Endpoint API Rumahweb di tab Cloud Sync.', 'error');
      }
      return false;
    }

    setIsSyncing(true);
    setSyncStatus('syncing');
    setSyncErrorMessage(null);

    try {
      const res = await fetch(targetUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      if (data && data.status === 'empty') {
        setSyncStatus('idle');
        setIsSyncing(false);
        if (!silent) {
          showToast('Server Kosong', 'Server hosting terhubung, namun belum ada data tersimpan. Silakan klik tombol Kirim Data.', 'info');
        }
        return true;
      }

      // Jika data valid, perbarui state
      if (data) {
        if (data.settings) setSettings(prev => ({ ...prev, ...data.settings, syncApiUrl: targetUrl }));
        if (data.homeContent) setHomeContent(data.homeContent);
        if (data.profilContent) setProfilContent(data.profilContent);
        if (Array.isArray(data.values)) setValues(data.values);
        if (Array.isArray(data.dewanPengasuh)) setDewanPengasuh(data.dewanPengasuh);
        if (Array.isArray(data.programs)) setPrograms(data.programs);
        if (Array.isArray(data.facilities)) setFacilities(data.facilities);
        if (Array.isArray(data.dailySchedule)) setDailySchedule(data.dailySchedule);
        if (Array.isArray(data.targetTimeline)) setTargetTimeline(data.targetTimeline);
        if (Array.isArray(data.articles)) setArticles(data.articles);
        if (Array.isArray(data.gallery)) setGallery(data.gallery);
        if (Array.isArray(data.registrations)) setRegistrations(data.registrations);
        if (Array.isArray(data.announcements)) setAnnouncements(data.announcements);
        if (data.donationContent) setDonationContent(data.donationContent);
        if (Array.isArray(data.donationPrograms)) setDonationPrograms(data.donationPrograms);
        if (Array.isArray(data.feeItems)) setFeeItems(data.feeItems);
        if (data.scholarshipInfo) setScholarshipInfo(data.scholarshipInfo);
        if (Array.isArray(data.authorAccounts)) setAuthorAccounts(data.authorAccounts);

        const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSyncTime(timeStr);
        localStorage.setItem('mhq_last_sync_time', timeStr);
        setSyncStatus('success');
        setIsSyncing(false);

        if (!silent) {
          showToast(
            'Sinkronisasi Sukses',
            `Data terbaru berhasil ditarik dari hosting Rumahweb (${timeStr} WIB).`,
            'success'
          );
        }
        return true;
      }

      throw new Error('Format data tidak sesuai.');
    } catch (err: any) {
      console.warn('Gagal sinkronisasi data dari hosting:', err);
      setSyncStatus('error');
      setSyncErrorMessage(err.message || 'Gagal memuat data dari hosting');
      setIsSyncing(false);
      if (!silent) {
        showToast(
          'Gagal Tarik Data',
          `Tidak dapat memuat data dari hosting: ${err.message || 'Periksa URL dan koneksi internet'}`,
          'error'
        );
      }
      return false;
    }
  };

  // Kirim / Unggah Data ke Hosting (Push)
  const pushToHosting = async (customUrl?: string, silent: boolean = false): Promise<boolean> => {
    const targetUrl = (customUrl || syncApiUrl).trim();
    if (!targetUrl) {
      if (!silent) {
        showToast('URL Belum Diatur', 'Harap masukkan URL Endpoint API Rumahweb di tab Cloud Sync.', 'error');
      }
      return false;
    }

    setIsSyncing(true);
    setSyncStatus('syncing');
    setSyncErrorMessage(null);

    try {
      const payload = buildCompleteDataSnapshot();
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
      }

      const resData = await res.json().catch(() => ({}));
      if (resData.status === 'error') {
        throw new Error(resData.message || 'Gagal menyimpan data');
      }

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(timeStr);
      localStorage.setItem('mhq_last_sync_time', timeStr);
      setSyncStatus('success');
      setIsSyncing(false);

      if (!silent) {
        showToast(
          'Tersimpan di Hosting',
          `Seluruh artikel, foto, profil, dan data pendaftar berhasil disinkronkan ke server Rumahweb (${timeStr} WIB).`,
          'success'
        );
      }
      return true;
    } catch (err: any) {
      console.warn('Gagal mengirim data ke hosting:', err);
      setSyncStatus('error');
      setSyncErrorMessage(err.message || 'Gagal menyimpan ke hosting');
      setIsSyncing(false);
      if (!silent) {
        showToast(
          'Gagal Sinkronisasi',
          `Gagal mengirim data ke hosting: ${err.message || 'Periksa koneksi internet atau izin file di cPanel.'}`,
          'error'
        );
      }
      return false;
    }
  };

  // Khusus Posting Artikel ke Hosting (Cepat, Ringan & Aman)
  const pushArticlesToHosting = async (): Promise<boolean> => {
    const targetUrl = syncApiUrl.trim();
    if (!targetUrl) {
      showToast('URL Hosting Belum Diatur', 'Harap hubungkan URL Endpoint API Hosting di pengaturan atau hubungi Admin Pusat.', 'error');
      return false;
    }

    setIsSyncing(true);
    setSyncStatus('syncing');
    setSyncErrorMessage(null);

    try {
      const payload = {
        type: 'articles',
        articles: articles,
        syncedAt: new Date().toISOString()
      };

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
      }

      const resData = await res.json().catch(() => ({}));
      if (resData.status === 'error') {
        throw new Error(resData.message || 'Gagal memposting artikel');
      }

      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncTime(timeStr);
      localStorage.setItem('mhq_last_sync_time', timeStr);
      setSyncStatus('success');
      setIsSyncing(false);

      showToast(
        'Artikel Berhasil Diposting!',
        `Seluruh artikel (${articles.length} artikel) telah berhasil diunggah ke server hosting (${timeStr} WIB).`,
        'success'
      );
      return true;
    } catch (err: any) {
      console.warn('Gagal memposting artikel ke hosting:', err);
      // Fallback: mencoba sync full snapshot jika endpoint khusus tidak didukung
      const fallbackSuccess = await pushToHosting(targetUrl, true);
      if (fallbackSuccess) {
        const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        showToast(
          'Artikel Berhasil Diposting!',
          `Artikel berhasil disimpan ke hosting melalui snapshot sinkronisasi (${timeStr} WIB).`,
          'success'
        );
        return true;
      }
      setSyncStatus('error');
      setSyncErrorMessage(err.message || 'Gagal memposting artikel ke hosting');
      setIsSyncing(false);
      showToast(
        'Gagal Posting Artikel',
        `Tidak dapat memposting artikel ke hosting: ${err.message || 'Periksa koneksi internet atau permission file sync.php di cPanel.'}`,
        'error'
      );
      return false;
    }
  };

  // Auto-Pull data pertama kali saat aplikasi dimuat jika URL hosting sudah disetel
  useEffect(() => {
    if (syncApiUrl && syncApiUrl.startsWith('http')) {
      pullFromHosting(syncApiUrl, true);
    }
  }, [syncApiUrl]);

  const setCurrentRoute = (route: NavigationRoute) => {
    setCurrentRouteState(route);
    try {
      if (route === 'admin') {
        window.location.hash = currentUserRole === 'author' ? 'penulis' : 'admin';
      } else if (route === 'home') {
        if (window.location.hash) {
          history.pushState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.location.hash = route;
      }
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentRouteState('artikel-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const sanitized = { ...newSettings };
    if ('logoUrl' in sanitized && (!sanitized.logoUrl || sanitized.logoUrl.trim() === '')) {
      sanitized.logoUrl = undefined;
    }
    setSettings(prev => ({ ...prev, ...sanitized }));
    showToast('Pengaturan Diperbarui', 'Data identitas pesantren telah tersimpan.');
  };

  // Home Content Operations
  const updateHomeContent = (newContent: Partial<HomeContent>) => {
    setHomeContent(prev => ({
      ...prev,
      ...newContent,
      hero: { ...prev.hero, ...(newContent.hero || {}) },
      about: { ...prev.about, ...(newContent.about || {}) },
      ctaPsb: { ...prev.ctaPsb, ...(newContent.ctaPsb || {}) },
      donation: { ...prev.donation, ...(newContent.donation || {}) }
    }));
    showToast('Konten Beranda Diperbarui', 'Perubahan konten beranda berhasil disimpan.');
  };

  // Profil & Sejarah Operations
  const updateProfilContent = (newContent: Partial<ProfilContent>) => {
    setProfilContent(prev => ({ ...prev, ...newContent }));
    showToast('Profil Pesantren Diperbarui', 'Perubahan profil, sejarah, visi, & misi berhasil disimpan.');
  };

  const addValue = (val: Omit<PesantrenValue, 'id'>) => {
    const newVal: PesantrenValue = { ...val, id: `val-${Date.now()}` };
    setValues(prev => [...prev, newVal]);
    showToast('Nilai Pesantren Ditambahkan', `Nilai "${newVal.title}" berhasil ditambahkan.`);
  };

  const updateValue = (id: string, val: Partial<PesantrenValue>) => {
    setValues(prev => prev.map(v => v.id === id ? { ...v, ...val } : v));
    showToast('Nilai Pesantren Diperbarui', 'Perubahan nilai luhur berhasil disimpan.');
  };

  const deleteValue = (id: string) => {
    setValues(prev => prev.filter(v => v.id !== id));
    showToast('Nilai Pesantren Dihapus', 'Nilai luhur berhasil dihapus.', 'info');
  };

  const addDewanPengasuh = (dewan: Omit<DewanPengasuhMember, 'id'>) => {
    const newDewan: DewanPengasuhMember = { ...dewan, id: `dewan-${Date.now()}` };
    setDewanPengasuh(prev => [...prev, newDewan]);
    showToast('Dewan Pengasuh Ditambahkan', `${newDewan.name} berhasil ditambahkan.`);
  };

  const updateDewanPengasuh = (id: string, dewan: Partial<DewanPengasuhMember>) => {
    setDewanPengasuh(prev => prev.map(d => d.id === id ? { ...d, ...dewan } : d));
    showToast('Dewan Pengasuh Diperbarui', 'Data dewan pengasuh berhasil disimpan.');
  };

  const deleteDewanPengasuh = (id: string) => {
    setDewanPengasuh(prev => prev.filter(d => d.id !== id));
    showToast('Dewan Pengasuh Dihapus', 'Data dewan pengasuh berhasil dihapus.', 'info');
  };

  // Program Operations
  const addProgram = (program: Omit<Program, 'id'>) => {
    const newProg: Program = { ...program, id: `prog-${Date.now()}` };
    setPrograms(prev => [...prev, newProg]);
    showToast('Program Ditambahkan', `Program "${newProg.name}" berhasil ditambahkan.`);
  };

  const updateProgram = (id: string, updated: Partial<Program>) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    showToast('Program Diperbarui', 'Perubahan program berhasil disimpan.');
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
    showToast('Program Dihapus', 'Program berhasil dihapus.', 'info');
  };

  // Daily Schedule Operations
  const addScheduleItem = (item: Omit<DailyScheduleItem, 'id'>) => {
    const newItem: DailyScheduleItem = { ...item, id: `sch-${Date.now()}` };
    setDailySchedule(prev => [...prev, newItem]);
    showToast('Jadwal Ditambahkan', 'Item jadwal berhasil ditambahkan.');
  };

  const updateScheduleItem = (id: string, item: Partial<DailyScheduleItem>) => {
    setDailySchedule(prev => prev.map(s => s.id === id ? { ...s, ...item } : s));
    showToast('Jadwal Diperbarui', 'Perubahan jadwal harian berhasil disimpan.');
  };

  const deleteScheduleItem = (id: string) => {
    setDailySchedule(prev => prev.filter(s => s.id !== id));
    showToast('Jadwal Dihapus', 'Item jadwal berhasil dihapus.', 'info');
  };

  // Target Timeline Operations
  const addTargetItem = (item: Omit<TargetTimelineItem, 'id'>) => {
    const newItem: TargetTimelineItem = { ...item, id: `tgt-${Date.now()}` };
    setTargetTimeline(prev => [...prev, newItem]);
    showToast('Target Ditambahkan', 'Target capaian berhasil ditambahkan.');
  };

  const updateTargetItem = (id: string, item: Partial<TargetTimelineItem>) => {
    setTargetTimeline(prev => prev.map(t => t.id === id ? { ...t, ...item } : t));
    showToast('Target Diperbarui', 'Perubahan target capaian berhasil disimpan.');
  };

  const deleteTargetItem = (id: string) => {
    setTargetTimeline(prev => prev.filter(t => t.id !== id));
    showToast('Target Dihapus', 'Target capaian berhasil dihapus.', 'info');
  };

  // Facility Operations
  const addFacility = (facility: Omit<Facility, 'id'>) => {
    const newFac: Facility = { ...facility, id: `fac-${Date.now()}` };
    setFacilities(prev => [...prev, newFac]);
    showToast('Fasilitas Ditambahkan', `Fasilitas "${newFac.name}" berhasil ditambahkan.`);
  };

  const updateFacility = (id: string, updated: Partial<Facility>) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
    showToast('Fasilitas Diperbarui', 'Perubahan fasilitas berhasil disimpan.');
  };

  const deleteFacility = (id: string) => {
    setFacilities(prev => prev.filter(f => f.id !== id));
    showToast('Fasilitas Dihapus', 'Fasilitas berhasil dihapus.', 'info');
  };

  // Donation & Wakaf Operations
  const updateDonationContent = (newContent: Partial<DonationPageContent>) => {
    setDonationContent(prev => ({ ...prev, ...newContent }));
    showToast('Konten Donasi Diperbarui', 'Perubahan informasi portal donasi berhasil disimpan.');
  };

  const addDonationProgram = (prog: Omit<DonationProgram, 'id'>) => {
    const newProg: DonationProgram = {
      ...prog,
      id: `wakaf-${Date.now()}`
    };
    setDonationPrograms(prev => [newProg, ...prev]);
    showToast('Program Donasi Ditambahkan', `Program "${newProg.title}" berhasil dipublikasikan.`);
  };

  const updateDonationProgram = (id: string, prog: Partial<DonationProgram>) => {
    setDonationPrograms(prev => prev.map(p => p.id === id ? { ...p, ...prog } : p));
    showToast('Program Donasi Diperbarui', 'Data program donasi berhasil diperbarui.');
  };

  const deleteDonationProgram = (id: string) => {
    setDonationPrograms(prev => prev.filter(p => p.id !== id));
    showToast('Program Donasi Dihapus', 'Program donasi berhasil dihapus.', 'info');
  };

  const addBankAccount = (account: BankAccount) => {
    setSettings(prev => ({
      ...prev,
      bankAccounts: [...prev.bankAccounts, account]
    }));
    showToast('Rekening Ditambahkan', `Rekening ${account.bank} berhasil ditambahkan.`);
  };

  const updateBankAccount = (index: number, account: BankAccount) => {
    setSettings(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.map((b, i) => (i === index ? account : b))
    }));
    showToast('Rekening Diperbarui', `Rekening ${account.bank} berhasil diperbarui.`);
  };

  const deleteBankAccount = (index: number) => {
    setSettings(prev => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((_, i) => i !== index)
    }));
    showToast('Rekening Dihapus', 'Rekening berhasil dihapus dari daftar kanal donasi.', 'info');
  };

  // Article Operations
  const addArticle = (articleData: Omit<Article, 'id' | 'viewsCount'>): Article => {
    const newArticle: Article = {
      ...articleData,
      id: `art-${Date.now()}`,
      viewsCount: 1
    };
    setArticles(prev => [newArticle, ...prev]);
    showToast('Artikel Berhasil Ditambahkan', `Artikel "${newArticle.title.substring(0, 30)}..." telah ditambahkan.`);
    return newArticle;
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    showToast('Artikel Diperbarui', 'Perubahan konten artikel berhasil disimpan.');
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    showToast('Artikel Dihapus', 'Artikel berhasil dihapus dari daftar publikasi.', 'info');
  };

  // Gallery Operations
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>): GalleryItem => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`
    };
    setGallery(prev => [newItem, ...prev]);
    showToast('Foto Ditambahkan', 'Dokumentasi kegiatan baru berhasil ditambahkan ke galeri.');
    return newItem;
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    showToast('Foto Dihapus', 'Foto berhasil dihapus dari galeri.', 'info');
  };

  // Santri Registration Operations
  const registerNewSantri = (
    data: Omit<SantriRegistration, 'id' | 'status' | 'registeredAt' | 'waNotificationSent'>
  ): SantriRegistration => {
    // Generate Registration Code: MHQ-2026-XXXX
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const id = `MHQ-2026-${randomSeq}`;
    
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newRegistration: SantriRegistration = {
      ...data,
      id,
      status: 'Menunggu Verifikasi',
      registeredAt: dateStr,
      waNotificationSent: true // Initial system triggers notification
    };

    setRegistrations(prev => [newRegistration, ...prev]);
    showToast(
      'Pendaftaran Berhasil!',
      `Nomor registrasi santri: ${id}. Silakan periksa notifikasi WhatsApp otomatis.`,
      'success'
    );
    return newRegistration;
  };

  const updateRegistrationStatus = (
    id: string,
    status: RegistrationStatus,
    notes?: string,
    testScore?: number
  ) => {
    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          return {
            ...reg,
            status,
            notes: notes !== undefined ? notes : reg.notes,
            testScore: testScore !== undefined ? testScore : reg.testScore
          };
        }
        return reg;
      })
    );
    showToast('Status Santri Diperbarui', `Status ${id} kini: ${status}`);
  };

  const updateRegistration = (id: string, updatedData: Partial<SantriRegistration>) => {
    setRegistrations(prev =>
      prev.map(reg => {
        if (reg.id === id) {
          return {
            ...reg,
            ...updatedData
          };
        }
        return reg;
      })
    );
    showToast('Data Pendaftar Diperbarui', `Data pendaftar ${id} berhasil diperbarui.`);
  };

  const deleteRegistration = (id: string) => {
    setRegistrations(prev => prev.filter(reg => reg.id !== id));
    showToast('Data Pendaftar Dihapus', `Data pendaftar ${id} berhasil dihapus dari sistem.`, 'info');
  };

  // WhatsApp automatic messaging engine
  const sendWhatsAppNotification = (
    registrationId: string,
    templateType: 'registration_received' | 'test_schedule' | 'acceptance' = 'registration_received'
  ): string => {
    const reg = registrations.find(r => r.id === registrationId);
    if (!reg) return '';

    // Clean phone number for WhatsApp international format (Indonesia)
    let cleanPhone = reg.parentPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    }

    let message = '';
    const pesantren = settings.pesantrenName;
    const adminHotline = settings.phone;

    if (templateType === 'registration_received') {
      message = 
`*NOTIFIKASI RESMI PENDAFTARAN SANTRI BARU*
*${pesantren}*
---------------------------------------------
Assalamu'alaikum Wr. Wb.
Yth. Bapak/Ibu *${reg.parentName}*, wali dari calon santri:

• *Nama Santri:* ${reg.studentName}
• *No. Registrasi:* ${reg.id}
• *Program Pilihan:* ${reg.programChoice}
• *Status Berkas:* ${reg.status}
• *Tanggal Daftar:* ${reg.registeredAt}

Alhamdulillah, data pendaftaran telah kami terima dalam sistem resmi.

*Langkah Selanjutnya:*
1. Panitia PSB akan memverifikasi berkas dalam 1x24 jam.
2. Konfirmasi & verifikasi berkas: mohon simpan No. Registrasi di atas.
3. Hotline PSB & Layanan Pesantren: ${adminHotline}

Jazakumullahu khairan katsiran atas kepercayaan Bapak/Ibu menyekolahkan putra-putri di ${pesantren}.

Wassalamu'alaikum Wr. Wb.
_Panitia PSB Markaz Hidayah Qur'an_`;
    } else if (templateType === 'test_schedule') {
      message = 
`*PANGGILAN TES SELEKSI & TALAQQI*
*${pesantren}*
---------------------------------------------
Assalamu'alaikum Wr. Wb.
Yth. Bapak/Ibu *${reg.parentName}*,

Calon santri: *${reg.studentName}* (${reg.id}) dinyatakan *LOLOS VERIFIKASI BERKAS*.

*Jadwal Ujian Masuk:*
• Ujian: Tahsin, Kelancaran Menghafal, & Wawancara Keislaman
• Catatan Panitia: ${reg.notes || 'Hadir tepat waktu bersama orang tua/wali'}
• Tempat: Kampus Markaz Hidayah Qur'an, Cisarua, Bogor.

Mohon konfirmasi kehadiran dengan membalas pesan ini. Terima kasih.
Wassalamu'alaikum Wr. Wb.`;
    } else {
      message = 
`*PENGUMUMAN RESMI KELULUSAN SANTRI BARU*
*${pesantren}*
---------------------------------------------
Assalamu'alaikum Wr. Wb.
Alhamdulillah wa syukurillah!

Selamat kepada:
• *Nama Santri:* ${reg.studentName}
• *No. Registrasi:* ${reg.id}
• *Program:* ${reg.programChoice}

Dinyatakan: *DITERIMA SEBAGAI SANTRI BARU* Tahun Ajaran 2026/2027.

Informasi daftar ulang dan perlengkapan asrama dapat diakses melalui sekretariat PSB di ${adminHotline}.

Ahlan wa Sahlan di Markaz Hidayah Qur'an!
Wassalamu'alaikum Wr. Wb.`;
    }

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Mark as sent
    setRegistrations(prev =>
      prev.map(r => r.id === registrationId ? { ...r, waNotificationSent: true } : r)
    );

    return waUrl;
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a)
    );
  };

  // Biaya Pendidikan & Beasiswa Actions
  const updateFeeItem = (id: string, updated: Partial<EducationFeeItem>) => {
    setFeeItems(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
    showToast('Biaya Diperbarui', 'Rincian biaya pendidikan berhasil diperbarui.');
  };

  const addFeeItem = (item: Omit<EducationFeeItem, 'id'>): EducationFeeItem => {
    const newItem: EducationFeeItem = {
      ...item,
      id: `fee-${Date.now()}`
    };
    setFeeItems(prev => [...prev, newItem]);
    showToast('Komponen Biaya Ditambahkan', 'Item biaya baru berhasil ditambahkan.');
    return newItem;
  };

  const deleteFeeItem = (id: string) => {
    setFeeItems(prev => prev.filter(item => item.id !== id));
    showToast('Komponen Biaya Dihapus', 'Item biaya berhasil dihapus.', 'info');
  };

  const updateScholarshipInfo = (updated: Partial<ScholarshipInfo>) => {
    setScholarshipInfo(prev => ({ ...prev, ...updated }));
    showToast('Informasi Beasiswa Diperbarui', 'Data program beasiswa berhasil disimpan.');
  };

  // Author Management Actions
  const addAuthorAccount = (account: Omit<AuthorAccount, 'id' | 'createdAt'>): AuthorAccount => {
    const newAuthor: AuthorAccount = {
      ...account,
      id: `author-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAuthorAccounts(prev => [...prev, newAuthor]);
    showToast('Akun Penulis Dibuat', `Akun penulis ${newAuthor.name} (@${newAuthor.username}) berhasil dibuat.`);
    return newAuthor;
  };

  const updateAuthorAccount = (id: string, updated: Partial<AuthorAccount>) => {
    setAuthorAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, ...updated } : acc));
    showToast('Akun Penulis Diperbarui', 'Data akun penulis berhasil diperbarui.');
  };

  const deleteAuthorAccount = (id: string) => {
    setAuthorAccounts(prev => prev.filter(acc => acc.id !== id));
    showToast('Akun Penulis Dihapus', 'Akun penulis berhasil dihapus.', 'info');
  };

  const loginAdmin = (userInput: string, passInput: string): boolean => {
    const validUsername = settings.adminUsername || 'admin';
    const validPassword = settings.adminPassword || 'admin123';

    // 1. Cek kredensial Admin Pusat
    const isCentralAdmin = userInput.trim() === validUsername.trim() && passInput === validPassword;
    if (isCentralAdmin) {
      setIsAdminLoggedIn(true);
      setCurrentUserRole('admin');
      setLoggedInAuthor(null);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'admin');
      localStorage.removeItem(STORAGE_KEYS.LOGGED_AUTHOR);
      showToast('Login Berhasil', 'Selamat datang di Panel Admin Utama Markaz Hidayah Qur\'an.');
      return true;
    }

    // 2. Cek kredensial Akun Penulis / Redaksi
    const list = Array.isArray(authorAccounts) && authorAccounts.length > 0 ? authorAccounts : INITIAL_AUTHOR_ACCOUNTS;
    const matchedAuthor = list.find(
      acc => acc.isActive && acc.username.trim().toLowerCase() === userInput.trim().toLowerCase() && acc.password === passInput
    );
    if (matchedAuthor) {
      setIsAdminLoggedIn(true);
      setCurrentUserRole('author');
      setLoggedInAuthor(matchedAuthor);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'author');
      localStorage.setItem(STORAGE_KEYS.LOGGED_AUTHOR, JSON.stringify(matchedAuthor));
      showToast('Login Berhasil', `Selamat datang, ${matchedAuthor.name}! Anda berada di Panel Penulis & Redaksi.`);
      return true;
    }

    showToast('Login Gagal', 'Username atau password yang Anda masukkan tidak sesuai.', 'error');
    return false;
  };

  const updateAdminCredentials = (newUsername: string, newPassword: string): boolean => {
    if (!newUsername.trim()) {
      showToast('Gagal', 'Username tidak boleh kosong.', 'error');
      return false;
    }
    if (!newPassword || newPassword.length < 5) {
      showToast('Gagal', 'Password minimal 5 karakter demi keamanan.', 'error');
      return false;
    }

    setSettings(prev => {
      const updated: SiteSettings = {
        ...prev,
        adminUsername: newUsername.trim(),
        adminPassword: newPassword
      };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    });

    showToast('Kredensial Diperbarui', 'Username dan password admin berhasil diubah.');
    return true;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setCurrentUserRole(null);
    setLoggedInAuthor(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem(STORAGE_KEYS.LOGGED_AUTHOR);
    showToast('Logout Berhasil', 'Anda telah keluar dari sesi.', 'info');
    setCurrentRoute('home');
  };

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  return (
    <PesantrenContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedArticleSlug,
        navigateToArticle,
        settings,
        updateSettings,
        homeContent,
        updateHomeContent,
        profilContent,
        updateProfilContent,
        values,
        addValue,
        updateValue,
        deleteValue,
        dewanPengasuh,
        addDewanPengasuh,
        updateDewanPengasuh,
        deleteDewanPengasuh,
        programs,
        addProgram,
        updateProgram,
        deleteProgram,
        dailySchedule,
        addScheduleItem,
        updateScheduleItem,
        deleteScheduleItem,
        targetTimeline,
        addTargetItem,
        updateTargetItem,
        deleteTargetItem,
        facilities,
        addFacility,
        updateFacility,
        deleteFacility,
        donationContent,
        updateDonationContent,
        donationPrograms,
        addDonationProgram,
        updateDonationProgram,
        deleteDonationProgram,
        addBankAccount,
        updateBankAccount,
        deleteBankAccount,
        feeItems,
        scholarshipInfo,
        updateFeeItem,
        addFeeItem,
        deleteFeeItem,
        updateScholarshipInfo,
        authorAccounts,
        currentUserRole,
        loggedInAuthor,
        addAuthorAccount,
        updateAuthorAccount,
        deleteAuthorAccount,
        articles,
        gallery,
        registrations,
        announcements,
        addArticle,
        updateArticle,
        deleteArticle,
        addGalleryItem,
        deleteGalleryItem,
        registerNewSantri,
        updateRegistrationStatus,
        updateRegistration,
        deleteRegistration,
        sendWhatsAppNotification,
        toggleAnnouncement,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        activeLightboxIndex,
        openLightbox,
        closeLightbox,
        toasts,
        showToast,
        removeToast,
        syncApiUrl,
        setSyncApiUrl,
        autoSyncEnabled,
        setAutoSyncEnabled,
        isSyncing,
        lastSyncTime,
        syncStatus,
        syncErrorMessage,
        pullFromHosting,
        pushToHosting,
        pushArticlesToHosting,
        testHostingConnection,
        downloadSyncPhpScript
      }}
    >
      {children}
    </PesantrenContext.Provider>
  );
};

export const usePesantren = (): PesantrenContextType => {
  const context = useContext(PesantrenContext);
  if (!context) {
    throw new Error('usePesantren must be used within a PesantrenProvider');
  }
  return context;
};
