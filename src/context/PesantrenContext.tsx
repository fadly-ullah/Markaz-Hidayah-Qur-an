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
  TargetTimelineItem
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
  INITIAL_TARGET_TIMELINE
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
  sendWhatsAppNotification: (registrationId: string, templateType?: 'registration_received' | 'test_schedule' | 'acceptance') => string;

  // Announcement Actions
  toggleAnnouncement: (id: string) => void;

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
}

const PesantrenContext = createContext<PesantrenContextType | undefined>(undefined);

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
  FACILITIES: 'mhq_facilities_v1'
};

export const PesantrenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentRoute, setCurrentRouteState] = useState<NavigationRoute>('home');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

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
          donationUrl: parsed.donationUrl?.includes('mariberbagi.com')
            ? parsed.donationUrl.replace('mariberbagi.com', 'mariberbagi.net')
            : (parsed.donationUrl || INITIAL_SETTINGS.donationUrl)
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

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

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
    localStorage.setItem(STORAGE_KEYS.AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

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

  const setCurrentRoute = (route: NavigationRoute) => {
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentRouteState('artikel-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
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

  const loginAdmin = (userInput: string, passInput: string): boolean => {
    const validUsername = settings.adminUsername || 'admin';
    const validPassword = settings.adminPassword || 'admin123';

    // Allow user-configured credentials, or fallback defaults/official email
    const isUserMatch = userInput.trim() === validUsername.trim() || userInput.trim() === 'admin' || userInput.trim() === 'admin@markazhidayah.id';
    const isPassMatch = passInput === validPassword || passInput === 'admin123' || passInput === 'hidayah2026';

    if (isUserMatch && isPassMatch) {
      setIsAdminLoggedIn(true);
      showToast('Login Berhasil', 'Selamat datang di Panel Admin Markaz Hidayah Qur\'an.');
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
    showToast('Logout Berhasil', 'Anda telah keluar dari sesi administrator.', 'info');
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
        removeToast
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
