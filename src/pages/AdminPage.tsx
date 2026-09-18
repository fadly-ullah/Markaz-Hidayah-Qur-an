import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  SantriRegistration,
  Article,
  GalleryItem,
  RegistrationStatus,
  ArticleCategory,
  GalleryCategory
} from '../types';
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  MessageCircle,
  Globe,
  Sparkles,
  Lock,
  LogOut,
  Save,
  CheckCircle2,
  Clock,
  HeartHandshake,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Key,
  Shield,
  Award,
  Eye,
  EyeOff,
  PhoneCall,
  Home,
  Compass,
  Building2
} from 'lucide-react';
import { SeoPreviewModal } from '../components/SeoPreviewModal';
import { AdminEditBeranda } from '../components/admin/AdminEditBeranda';
import { AdminEditProfil } from '../components/admin/AdminEditProfil';
import { AdminEditProgram } from '../components/admin/AdminEditProgram';
import { AdminEditFasilitas } from '../components/admin/AdminEditFasilitas';
import { ImagePickerField } from '../components/admin/ImagePickerField';

export const AdminPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    registrations,
    updateRegistrationStatus,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    settings,
    updateSettings,
    updateAdminCredentials,
    sendWhatsAppNotification,
    showToast
  } = usePesantren();

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState<
    'dashboard' | 'edit-beranda' | 'edit-profil' | 'edit-program' | 'edit-fasilitas' | 'santri' | 'articles' | 'gallery' | 'settings'
  >('dashboard');

  // Santri Management Filter
  const [santriFilter, setSantriFilter] = useState<string>('Semua');
  const [santriSearch, setSantriSearch] = useState<string>('');

  // Article Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artSlug, setArtSlug] = useState('');
  const [artCategory, setArtCategory] = useState<ArticleCategory>('Berita Pesantren');
  const [artAuthor, setArtAuthor] = useState('Redaksi Markaz Hidayah');
  const [artReadTime, setArtReadTime] = useState('4 menit');
  const [artThumbnail, setArtThumbnail] = useState('');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artTags, setArtTags] = useState('pesantren, tahfidz, hidayah quran');
  const [artSeoTitle, setArtSeoTitle] = useState('');
  const [artSeoDesc, setArtSeoDesc] = useState('');
  const [artSeoKeywords, setArtSeoKeywords] = useState('');

  // Gallery Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState<GalleryCategory>('Kegiatan Santri');
  const [galImageUrl, setGalImageUrl] = useState('');
  const [galDate, setGalDate] = useState(new Date().toISOString().split('T')[0]);
  const [galLocation, setGalLocation] = useState('Pesantren Cisarua Bogor');
  const [galDescription, setGalDescription] = useState('');

  // Settings state: Identitas & PSB
  const [editPesantrenName, setEditPesantrenName] = useState(settings.pesantrenName);
  const [editSubtitle, setEditSubtitle] = useState(settings.subtitle || 'Pesantren Tahfidz & Keislaman Modern');
  const [editTagline, setEditTagline] = useState(settings.tagline || "Mencetak Generasi Qur'ani yang Mandiri, Berilmu, dan Berakhlakul Karimah");
  const [editLogoUrl, setEditLogoUrl] = useState(settings.logoUrl || '');
  const [editWaNumber, setEditWaNumber] = useState(settings.waNumber);
  const [editRegistrationWave, setEditRegistrationWave] = useState(settings.registrationWave);
  const [editRegistrationQuota, setEditRegistrationQuota] = useState(settings.registrationQuota);
  const [editDonationUrl, setEditDonationUrl] = useState(settings.donationUrl);

  // Header Settings State (Top bar)
  const [editHeaderDate, setEditHeaderDate] = useState(settings.headerDateText || "Rabi'ul Awwal 1448 H / September 2026");
  const [editHeaderLocation, setEditHeaderLocation] = useState(settings.headerLocation || "Cisarua, Megamendung - Bogor");
  const [editHeaderPsbBanner, setEditHeaderPsbBanner] = useState(settings.headerPsbBannerText || "Pendaftaran Santri Baru (PSB) 2026/2027 Telah Dibuka!");
  const [editHeaderPsbTarget, setEditHeaderPsbTarget] = useState(settings.headerPsbBannerTarget || "pendaftaran");
  const [editHeaderHotline, setEditHeaderHotline] = useState(settings.headerHotlineText || `Hotline: ${settings.phone}`);

  // Footer & Kontak Settings State
  const [editFooterAbout, setEditFooterAbout] = useState(settings.footerAboutText || "Berdedikasi melahirkan huffadz 30 juz mutqin, berwawasan luas, mandiri, serta berpegang teguh pada Al-Qur'an dan Sunnah.");
  const [editFooterBadge1, setEditFooterBadge1] = useState(settings.footerBadge1 || "Terakreditasi Kemenag RI");
  const [editFooterBadge2, setEditFooterBadge2] = useState(settings.footerBadge2 || "Sanad Qira'at Mutashil");
  const [editAddress, setEditAddress] = useState(settings.address || "Jl. Pesantren Al-Hidayah No. 99, Cisarua, Megamendung, Bogor, Jawa Barat 16750");
  const [editPhone, setEditPhone] = useState(settings.phone || "+62 251 8329 101");
  const [editEmail, setEditEmail] = useState(settings.email || "info@markazhidayah.sch.id");
  const [editFooterCopyright, setEditFooterCopyright] = useState(settings.footerCopyrightText || "Hak Cipta Dilindungi.");

  // Admin Account Credentials State
  const [editAdminUser, setEditAdminUser] = useState(settings.adminUsername || 'admin');
  const [editAdminNewPass, setEditAdminNewPass] = useState('');
  const [editAdminConfirmPass, setEditAdminConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // SEO Preview Inspection
  const [previewSeoArticle, setPreviewSeoArticle] = useState<Article | null>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (success) {
      showToast('Login Berhasil', 'Selamat datang di Panel Admin Markaz Hidayah Qur\'an.');
    } else {
      showToast('Login Gagal', 'Username atau password tidak sesuai.');
    }
  };

  // Open Article Form
  const openNewArticleForm = () => {
    setEditingArticleId(null);
    setArtTitle('');
    setArtSlug('');
    setArtCategory('Berita Pesantren');
    setArtAuthor('Redaksi Markaz Hidayah');
    setArtReadTime('4 menit');
    setArtThumbnail('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80');
    setArtSummary('');
    setArtContent('');
    setArtTags('pesantren, tahfidz, markaz hidayah');
    setArtSeoTitle('');
    setArtSeoDesc('');
    setArtSeoKeywords('pondok pesantren, tahfidz quran bogor');
    setIsArticleModalOpen(true);
  };

  const openEditArticleForm = (art: Article) => {
    setEditingArticleId(art.id);
    setArtTitle(art.title);
    setArtSlug(art.slug);
    setArtCategory(art.category);
    setArtAuthor(art.author);
    setArtReadTime(art.readTime);
    setArtThumbnail(art.thumbnail);
    setArtSummary(art.summary);
    setArtContent(art.content);
    setArtTags(art.tags.join(', '));
    setArtSeoTitle(art.seoTitle || '');
    setArtSeoDesc(art.seoDescription || '');
    setArtSeoKeywords(art.seoKeywords || '');
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const slugCalculated = artSlug.trim() || artTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tagsArray = artTags.split(',').map(t => t.trim()).filter(Boolean);

    const articleData = {
      title: artTitle,
      slug: slugCalculated,
      category: artCategory,
      author: artAuthor,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: artReadTime,
      thumbnail: artThumbnail,
      summary: artSummary,
      content: artContent,
      tags: tagsArray,
      status: 'Published' as const,
      seoTitle: artSeoTitle || artTitle,
      seoDescription: artSeoDesc || artSummary,
      seoKeywords: artSeoKeywords || artTags
    };

    if (editingArticleId) {
      updateArticle(editingArticleId, articleData);
      showToast('Artikel Diperbarui', 'Perubahan artikel dan konfigurasi SEO berhasil disimpan.');
    } else {
      addArticle(articleData);
      showToast('Artikel Diterbitkan', 'Artikel baru telah berhasil ditambahkan dan siap diindeks mesin pencari.');
    }

    setIsArticleModalOpen(false);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle.trim() || !galImageUrl.trim()) return;

    addGalleryItem({
      title: galTitle,
      category: galCategory,
      imageUrl: galImageUrl,
      date: galDate,
      location: galLocation,
      description: galDescription
    });

    showToast('Foto Ditambahkan', 'Dokumentasi kegiatan baru telah dimasukkan ke galeri.');
    setIsGalleryModalOpen(false);
    setGalTitle('');
    setGalImageUrl('');
    setGalDescription('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      pesantrenName: editPesantrenName,
      subtitle: editSubtitle,
      tagline: editTagline,
      logoUrl: editLogoUrl,
      waNumber: editWaNumber,
      registrationWave: editRegistrationWave,
      registrationQuota: editRegistrationQuota,
      donationUrl: editDonationUrl,
      headerDateText: editHeaderDate,
      headerLocation: editHeaderLocation,
      headerPsbBannerText: editHeaderPsbBanner,
      headerPsbBannerTarget: editHeaderPsbTarget,
      headerHotlineText: editHeaderHotline,
      footerAboutText: editFooterAbout,
      footerBadge1: editFooterBadge1,
      footerBadge2: editFooterBadge2,
      address: editAddress,
      phone: editPhone,
      email: editEmail,
      footerCopyrightText: editFooterCopyright
    });
    showToast('Pengaturan Disimpan', 'Identitas, informasi header, footer, kontak dan PSB berhasil diperbarui.');
  };

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editAdminUser.trim()) {
      showToast('Gagal', 'Nama pengguna admin tidak boleh kosong.', 'error');
      return;
    }
    if (!editAdminNewPass) {
      showToast('Gagal', 'Silakan masukkan kata sandi baru.', 'error');
      return;
    }
    if (editAdminNewPass.length < 5) {
      showToast('Gagal', 'Kata sandi minimal 5 karakter demi keamanan.', 'error');
      return;
    }
    if (editAdminNewPass !== editAdminConfirmPass) {
      showToast('Gagal', 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru.', 'error');
      return;
    }

    const success = updateAdminCredentials(editAdminUser, editAdminNewPass);
    if (success) {
      setEditAdminNewPass('');
      setEditAdminConfirmPass('');
    }
  };

  // Filtered Santri
  const filteredSantri = registrations.filter(s => {
    const matchStatus = santriFilter === 'Semua' || s.status === santriFilter;
    const matchSearch =
      s.studentName.toLowerCase().includes(santriSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(santriSearch.toLowerCase()) ||
      s.parentPhone.includes(santriSearch);
    return matchStatus && matchSearch;
  });

  // Not Logged In View
  if (!isAdminLoggedIn) {
    return (
      <div className="py-20 px-4 flex items-center justify-center min-h-[70vh]">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl max-w-md w-full space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Panel Pengelola Pesantren</h2>
            <p className="text-xs text-slate-500">
              Masuk untuk mengelola santri baru, konten header/footer, artikel SEO, pengumuman, dan sistem.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Pengguna (Username)
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kata Sandi (Password)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Masuk ke Dashboard Admin</span>
            </button>

            {/* Info Kredensial Admin Aktif & Bantuan */}
            <div className="p-3.5 bg-teal-50/80 border border-teal-200 rounded-xl space-y-1 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                <Key className="w-3.5 h-3.5 text-teal-600" />
                <span>Kredensial Akses Administrator</span>
              </div>
              <div className="text-[11px] text-teal-800 space-y-0.5 pt-0.5">
                <div>Username aktif: <code className="bg-teal-100 font-mono font-bold px-1.5 py-0.5 rounded text-teal-900">{settings.adminUsername || 'admin'}</code></div>
                <div>Password aktif: <code className="bg-teal-100 font-mono font-bold px-1.5 py-0.5 rounded text-teal-900">{settings.adminPassword || 'admin123'}</code></div>
              </div>
              <p className="text-[10px] text-teal-700/80 pt-1">
                * Username dan password dapat diubah kapan saja di menu Pengaturan setelah Anda masuk.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Logged In Admin Dashboard
  return (
    <div className="space-y-8 pb-24">
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold">
              HQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">Admin Central Markaz Hidayah</h1>
                <span className="px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-[10px] font-bold border border-teal-400/30">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Sistem Manajemen Santri, Artikel SEO, Pengumuman & Integrasi Donasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setAdminTab('dashboard')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'dashboard'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setAdminTab('edit-beranda')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'edit-beranda'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Edit Beranda</span>
          </button>

          <button
            onClick={() => setAdminTab('edit-profil')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'edit-profil'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Profil & Visi Misi</span>
          </button>

          <button
            onClick={() => setAdminTab('edit-program')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'edit-program'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Program & Jadwal</span>
          </button>

          <button
            onClick={() => setAdminTab('edit-fasilitas')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'edit-fasilitas'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Fasilitas Pesantren</span>
          </button>

          <button
            onClick={() => setAdminTab('santri')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'santri'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pendaftar ({registrations.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('articles')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'articles'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Artikel ({articles.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('gallery')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'gallery'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Galeri ({gallery.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              adminTab === 'settings'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Header, Footer & Akun</span>
          </button>
        </div>

        {/* 1. DASHBOARD VIEW */}
        {adminTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Pendaftar Santri Baru</span>
                  <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">{registrations.length}</div>
                <div className="text-[11px] text-teal-700 font-medium">
                  {registrations.filter(r => r.status === 'Diterima').length} santri dinyatakan Diterima
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Artikel & Publikasi SEO</span>
                  <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">{articles.length}</div>
                <div className="text-[11px] text-sky-700 font-medium">
                  100% didukung OpenGraph & Schema.org
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Koleksi Foto Galeri</span>
                  <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">{gallery.length}</div>
                <div className="text-[11px] text-teal-700 font-medium">
                  Dilengkapi Lightbox Interaktif
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Integrasi Donasi</span>
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-base font-bold text-slate-900 truncate">mariberbagi.net</div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Status Gateway: Terhubung Aktif
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Registrations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-base text-slate-900">
                    Pendaftar Santri Terbaru
                  </h3>
                  <button
                    onClick={() => setAdminTab('santri')}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800"
                  >
                    Lihat Semua ({registrations.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {registrations.slice(0, 4).map((s) => (
                    <div key={s.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{s.studentName}</span>
                          <span className="font-mono text-[10px] text-teal-700 font-bold bg-teal-50 px-1.5 py-0.5 rounded-sm">
                            {s.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {s.programChoice} • Wali: {s.parentName} ({s.parentPhone})
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.status === 'Diterima'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'Jadwal Tes Seleksi'
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {s.status}
                        </span>
                        <button
                          onClick={() => {
                            const url = sendWhatsAppNotification(s.id, 'registration_received');
                            window.open(url, '_blank');
                          }}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="Kirim Pesan WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="bg-gradient-to-br from-teal-800 to-sky-800 text-white p-6 rounded-3xl shadow-sm space-y-4">
                  <h4 className="font-bold text-base">Aksi Cepat Admin</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setAdminTab('edit-beranda')}
                      className="w-full py-2.5 px-3 rounded-xl bg-white text-teal-900 font-bold text-xs flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors cursor-pointer"
                    >
                      <Home className="w-4 h-4 text-teal-700" />
                      <span>Edit Konten Beranda</span>
                    </button>
                    <button
                      onClick={() => setAdminTab('edit-profil')}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/25 transition-colors cursor-pointer"
                    >
                      <Compass className="w-4 h-4 text-teal-200" />
                      <span>Edit Profil & Visi Misi</span>
                    </button>
                    <button
                      onClick={() => setAdminTab('edit-program')}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/25 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-teal-200" />
                      <span>Edit Program & Jadwal</span>
                    </button>
                    <button
                      onClick={() => setAdminTab('edit-fasilitas')}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/25 transition-colors cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-teal-200" />
                      <span>Edit Fasilitas Pesantren</span>
                    </button>
                    <button
                      onClick={openNewArticleForm}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/25 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-teal-200" />
                      <span>Buat Artikel Baru (SEO Ready)</span>
                    </button>
                    <button
                      onClick={() => {
                        setAdminTab('gallery');
                        setIsGalleryModalOpen(true);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/25 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-teal-200" />
                      <span>Upload Foto Galeri</span>
                    </button>
                    <button
                      onClick={() => setAdminTab('settings')}
                      className="w-full py-2.5 px-3 rounded-xl bg-teal-900/60 border border-teal-400/30 text-teal-100 font-bold text-xs flex items-center justify-center gap-2 hover:bg-teal-900 transition-colors cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5 text-teal-300" />
                      <span>Ganti Username / Password Admin</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2 text-xs text-slate-600">
                  <span className="font-bold text-slate-900 block text-xs">Pusat Sinkronisasi Data:</span>
                  <p>
                    Setiap teks, angka statistik, visi-misi, jadwal, dan fasilitas yang diedit di panel ini langsung tersimpan dan otomatis tampil secara konsisten di seluruh bagian website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. EDIT KONTEN BERANDA */}
        {adminTab === 'edit-beranda' && <AdminEditBeranda />}

        {/* 3. EDIT KONTEN PROFIL, VISI MISI & DEWAN PENGASUH */}
        {adminTab === 'edit-profil' && <AdminEditProfil />}

        {/* 4. EDIT PROGRAM PENDIDIKAN, JADWAL & TARGET */}
        {adminTab === 'edit-program' && <AdminEditProgram />}

        {/* 5. EDIT FASILITAS PESANTREN */}
        {adminTab === 'edit-fasilitas' && <AdminEditFasilitas />}

        {/* 6. DATA PENDAFTAR SANTRI BARU */}
        {adminTab === 'santri' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Manajemen Data Pendaftar Santri</h2>
                <p className="text-xs text-slate-500">
                  Verifikasi berkas, tentukan jadwal tes talaqqi, ubah status penerimaan, dan kirim notifikasi otomatis WhatsApp.
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama / no reg / WA..."
                    value={santriSearch}
                    onChange={(e) => setSantriSearch(e.target.value)}
                    className="text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <select
                  value={santriFilter}
                  onChange={(e) => setSantriFilter(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-medium text-slate-700"
                >
                  <option value="Semua">Semua Status ({registrations.length})</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Lolos Berkas">Lolos Berkas</option>
                  <option value="Jadwal Tes Seleksi">Jadwal Tes Seleksi</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
                    <th className="p-3">No. Reg</th>
                    <th className="p-3">Nama Santri</th>
                    <th className="p-3">Program</th>
                    <th className="p-3">Wali & WhatsApp</th>
                    <th className="p-3">Tgl Daftar</th>
                    <th className="p-3">Status Saat Ini</th>
                    <th className="p-3 text-right">Aksi Notifikasi WA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSantri.map((santri) => (
                    <tr key={santri.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-teal-800">
                        {santri.id}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{santri.studentName}</div>
                        <div className="text-[11px] text-slate-400">{santri.gender} • Asal: {santri.previousSchool}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {santri.programChoice}
                        </span>
                      </td>
                      <td className="p-3">
                        <div>{santri.parentName} ({santri.parentRelation})</div>
                        <div className="font-mono text-teal-700 font-semibold">{santri.parentPhone}</div>
                      </td>
                      <td className="p-3 text-slate-500 whitespace-nowrap">
                        {santri.registeredAt}
                      </td>
                      <td className="p-3">
                        <select
                          value={santri.status}
                          onChange={(e) => {
                            updateRegistrationStatus(santri.id, e.target.value as RegistrationStatus);
                            showToast('Status Diperbarui', `Status ${santri.studentName} diubah menjadi "${e.target.value}".`);
                          }}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all ${
                            santri.status === 'Diterima'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : santri.status === 'Jadwal Tes Seleksi'
                              ? 'bg-sky-50 text-sky-800 border-sky-300'
                              : santri.status === 'Lolos Berkas'
                              ? 'bg-teal-50 text-teal-800 border-teal-300'
                              : santri.status === 'Ditolak'
                              ? 'bg-rose-50 text-rose-800 border-rose-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                          <option value="Lolos Berkas">Lolos Berkas</option>
                          <option value="Jadwal Tes Seleksi">Jadwal Tes Seleksi</option>
                          <option value="Diterima">Diterima</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {santri.status === 'Jadwal Tes Seleksi' ? (
                            <button
                              onClick={() => {
                                const url = sendWhatsAppNotification(santri.id, 'test_schedule');
                                window.open(url, '_blank');
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-[11px] border border-sky-200 transition-colors"
                              title="Kirim Undangan Jadwal Tes Seleksi via WA"
                            >
                              <MessageCircle className="w-3 h-3 text-sky-600" />
                              <span>Undangan Tes</span>
                            </button>
                          ) : santri.status === 'Diterima' ? (
                            <button
                              onClick={() => {
                                const url = sendWhatsAppNotification(santri.id, 'acceptance');
                                window.open(url, '_blank');
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 transition-colors"
                              title="Kirim Pengumuman Diterima via WA"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-600" />
                              <span>Notif Diterima</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                const url = sendWhatsAppNotification(santri.id, 'registration_received');
                                window.open(url, '_blank');
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] border border-teal-200 transition-colors"
                              title="Kirim Bukti Registrasi via WA"
                            >
                              <MessageCircle className="w-3 h-3 text-teal-600" />
                              <span>Kirim Bukti</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSantri.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                Tidak ada data pendaftar yang sesuai kriteria pencarian.
              </div>
            )}
          </div>
        )}

        {/* 3. MANAJEMEN ARTIKEL & SEO (User requirement: "artikelnya juga dapat ditambahkan oleh admin dan artikel ini nantinya akan mendukung SEO website ini") */}
        {adminTab === 'articles' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Manajemen Artikel & Optimasi Mesin Pencari (SEO)
                </h2>
                <p className="text-xs text-slate-500">
                  Kelola publikasi warta pesantren, panduan tahfidz, dan optimalkan tag Meta Title, Deskripsi, serta Schema.org untuk meningkatkan ranking Google.
                </p>
              </div>

              <button
                onClick={openNewArticleForm}
                className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Artikel Baru</span>
              </button>
            </div>

            {/* Articles Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
                    <th className="p-3">Thumbnail</th>
                    <th className="p-3">Judul Artikel</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Status SEO</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 w-16">
                        <img
                          src={art.thumbnail}
                          alt={art.title}
                          className="w-12 h-10 object-cover rounded-lg bg-slate-100"
                          referrerPolicy="no-referrer"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{art.title}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-sm">
                          Slug: <code>/artikel/{art.slug}</code>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-medium text-[11px]">
                          {art.category}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 whitespace-nowrap">
                        {art.date}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => setPreviewSeoArticle(art)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-semibold border border-sky-200 transition-colors"
                        >
                          <Globe className="w-3 h-3 text-sky-600" />
                          <span>Inspeksi SEO</span>
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditArticleForm(art)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Edit Artikel & SEO"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus artikel "${art.title}"?`)) {
                                deleteArticle(art.id);
                                showToast('Artikel Dihapus', 'Artikel telah dihapus dari sistem.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                            title="Hapus Artikel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. MANAJEMEN GALERI FOTO */}
        {adminTab === 'gallery' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Manajemen Galeri Kegiatan Interaktif
                </h2>
                <p className="text-xs text-slate-500">
                  Kelola koleksi foto dokumentasi harian santri, event wisuda tahfidz, dan fasilitas pesantren.
                </p>
              </div>

              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Foto Galeri</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden group flex flex-col justify-between"
                >
                  <div className="h-40 overflow-hidden relative bg-slate-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/90 text-slate-900">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3 space-y-2">
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="text-[10px] text-slate-400">{item.date} • {item.location}</div>
                  </div>

                  <div className="p-3 pt-0 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus foto "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                          showToast('Foto Dihapus', 'Item galeri telah dihapus.');
                        }
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Hapus Foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PENGATURAN IDENTITAS, HEADER, FOOTER, SISTEM & KREDENSIAL ADMIN */}
        {adminTab === 'settings' && (
          <div className="space-y-8 max-w-4xl">
            {/* Header Pengaturan */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-teal-700" />
                    <span>Pusat Kendali & Pengaturan Website</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Kelola identitas pesantren, teks header atas, informasi lengkap footer, pendaftaran PSB, integrasi donasi mariberbagi.net, serta kredensial akun administrator.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
                  <Shield className="w-4 h-4 text-teal-600" />
                  <span>Admin: {settings.adminUsername || 'admin'}</span>
                </div>
              </div>
            </div>

            {/* FORM 1: IDENTITAS, HEADER ATAS, FOOTER LENGKAP & SISTEM */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-700" />
                  <span>Konten Website, Header, Footer & Layanan</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Perubahan akan langsung diterapkan secara visual ke seluruh halaman pengunjung.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* 1. Bagian Identitas & Branding */}
                <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    <span>Identitas & Logo Pesantren</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Resmi Pesantren
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Markaz Hidayah Qur'an"
                        value={editPesantrenName}
                        onChange={(e) => setEditPesantrenName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subjudul di Bawah Nama
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Pesantren Tahfidz & Keislaman Modern"
                        value={editSubtitle}
                        onChange={(e) => setEditSubtitle(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Slogan / Visi Singkat (Tagline)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mencetak Generasi Qur'ani yang Mandiri, Berilmu, dan Berakhlakul Karimah"
                      value={editTagline}
                      onChange={(e) => setEditTagline(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  {/* Pengaturan Logo */}
                  <div className="space-y-2">
                    <ImagePickerField
                      label="Logo Pesantren (Tampil di Header & Brand)"
                      value={editLogoUrl}
                      onChange={(url) => setEditLogoUrl(url)}
                      helperText="Unggah file logo dari HP/Laptop atau pilih dari galeri. Kosongkan jika ingin memakai lambang emblem bawaan."
                      aspectRatio="square"
                    />

                    {/* Preset Logo Cepat */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-slate-500">Preset Cepat:</span>
                      <button
                        type="button"
                        onClick={() => setEditLogoUrl('https://images.unsplash.com/photo-1597935258735-e254c183921e?auto=format&fit=crop&w=200&q=80')}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-teal-100/70 hover:bg-teal-200 text-teal-800 transition-colors"
                      >
                        Emblem Kubah Emas
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditLogoUrl('https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=200&q=80')}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-100/70 hover:bg-sky-200 text-sky-800 transition-colors"
                      >
                        Kaligrafi Geometris
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditLogoUrl('')}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
                      >
                        Reset ke Lambang Bawaan
                      </button>
                    </div>

                    {/* Live Preview Logo & Nama */}
                    <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                      <span className="text-[11px] font-bold text-slate-400">Live Preview:</span>
                      <div className="flex items-center gap-2.5">
                        {editLogoUrl ? (
                          <img
                            src={editLogoUrl}
                            alt="Logo Preview"
                            className="w-9 h-9 rounded-lg object-cover border border-teal-200 shadow-2xs"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-600 to-sky-600 text-white flex items-center justify-center shadow-xs">
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-bold text-slate-900 leading-tight">
                            {editPesantrenName || "Markaz Hidayah Qur'an"}
                          </div>
                          <div className="text-[10px] text-teal-700 font-medium">
                            {editSubtitle || "Pesantren Tahfidz & Keislaman Modern"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Bagian Pengaturan Header Atas (Top Banner) */}
                <div className="p-4 sm:p-5 bg-teal-50/50 rounded-2xl border border-teal-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>Pengaturan Header Atas (Top Banner)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Atur penanggalan, informasi lokasi, pengumuman/PSB dan hotline telepon yang terpajang di pita paling atas website.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Teks Penanggalan Kalender (Kiri Atas)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Rabi'ul Awwal 1448 H / September 2026"
                        value={editHeaderDate}
                        onChange={(e) => setEditHeaderDate(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Informasi Lokasi di Atas Header
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Cisarua, Megamendung - Bogor"
                        value={editHeaderLocation}
                        onChange={(e) => setEditHeaderLocation(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Teks Pengumuman / Banner PSB di Header
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Pendaftaran Santri Baru (PSB) 2026/2027 Telah Dibuka!"
                        value={editHeaderPsbBanner}
                        onChange={(e) => setEditHeaderPsbBanner(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tujuan Klik Banner PSB
                      </label>
                      <select
                        value={editHeaderPsbTarget}
                        onChange={(e) => setEditHeaderPsbTarget(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                      >
                        <option value="pendaftaran">Halaman Formulir PSB</option>
                        <option value="donasi">Halaman Donasi & Wakaf</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teks Hotline di Atas Header (Kanan Atas)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Hotline: +62 251 8329 101"
                      value={editHeaderHotline}
                      onChange={(e) => setEditHeaderHotline(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  {/* Preview Top Banner */}
                  <div className="p-3 bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 rounded-xl text-white text-xs shadow-xs space-y-1">
                    <span className="text-[10px] text-teal-200 uppercase font-bold tracking-wider">Preview Top Banner Header:</span>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-teal-100">
                          <Calendar className="w-3 h-3 text-teal-300" />
                          {editHeaderDate}
                        </span>
                        <span>•</span>
                        <span className="text-teal-200">{editHeaderLocation}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px] text-teal-100 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                          {editHeaderPsbBanner}
                        </span>
                        <span className="text-teal-100 text-[10px]">{editHeaderHotline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Bagian Pengaturan Footer Lengkap */}
                <div className="p-4 sm:p-5 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span>Pengaturan Informasi Footer Lengkap</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Seluruh teks deskripsi, sertifikasi/badge, alamat fisik, nomor telepon kantor, email dan copyright footer dapat disesuaikan di sini.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Deskripsi Tentang Pesantren di Footer
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editFooterAbout}
                      onChange={(e) => setEditFooterAbout(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Label Badge Akreditasi 1 (Hijau)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Terakreditasi Kemenag RI"
                        value={editFooterBadge1}
                        onChange={(e) => setEditFooterBadge1(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Label Badge Keunggulan 2 (Biru)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Sanad Qira'at Mutashil"
                        value={editFooterBadge2}
                        onChange={(e) => setEditFooterBadge2(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Alamat Lengkap Sekretariat Pesantren
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Telepon Kantor / Sekretariat
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+62 251 8329 101"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Resmi Pesantren
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="info@markazhidayah.sch.id"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Teks Hak Cipta / Copyright Footer
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Hak Cipta Dilindungi."
                      value={editFooterCopyright}
                      onChange={(e) => setEditFooterCopyright(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-100"
                    />
                  </div>

                  {/* Preview Footer */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-[10px] text-teal-400 uppercase font-bold tracking-wider">Live Preview Footer:</span>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {editFooterAbout}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-950 border border-teal-800 text-teal-300">
                        {editFooterBadge1}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-sky-300">
                        {editFooterBadge2}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      Sekretariat: {editAddress} • Telp: {editPhone} • Email: {editEmail}
                    </div>
                  </div>
                </div>

                {/* 4. Bagian PSB, WhatsApp & Donasi */}
                <div className="p-4 sm:p-5 bg-sky-50/50 rounded-2xl border border-sky-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-900 uppercase tracking-wider">
                    <HeartHandshake className="w-4 h-4 text-sky-700" />
                    <span>Layanan PSB & Integrasi Donasi</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nomor WhatsApp Resmi (Format Internasional)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="6281234567890"
                        value={editWaNumber}
                        onChange={(e) => setEditWaNumber(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        Nomor tujuan untuk tombol chat WhatsApp dan konfirmasi pendaftaran santri baru.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        URL Integrasi Donasi (mariberbagi.net)
                      </label>
                      <input
                        type="url"
                        required
                        value={editDonationUrl}
                        onChange={(e) => setEditDonationUrl(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        Tautan resmi portal crowdfunding mitra di mariberbagi.net.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Label Gelombang Pendaftaran (PSB)
                      </label>
                      <input
                        type="text"
                        required
                        value={editRegistrationWave}
                        onChange={(e) => setEditRegistrationWave(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Kuota Santri Baru
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={editRegistrationQuota}
                        onChange={(e) => setEditRegistrationQuota(parseInt(e.target.value, 10) || 60)}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Tombol Simpan Konten & Pengaturan */}
                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    Perubahan disimpan ke penyimpanan lokal sistem secara persisten.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Seluruh Pengaturan Website</span>
                  </button>
                </div>
              </form>
            </div>

            {/* FORM 2: KEAMANAN & PENGATURAN KATA SANDI / USERNAME ADMIN */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Ubah Username & Password Admin
                    </h3>
                    <p className="text-xs text-slate-500">
                      Kelola kredensial keamanan untuk masuk ke Panel Administrator Markaz Hidayah.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Kredensial Aktif */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Username Aktif Saat Ini:</span>
                  <div className="font-mono font-bold text-teal-900 text-sm">{settings.adminUsername || 'admin'}</div>
                </div>
                <div>
                  <span className="text-slate-500">Password Aktif:</span>
                  <div className="font-mono font-bold text-teal-900 text-sm">
                    {showPassword ? (settings.adminPassword || 'admin123') : '••••••••'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-center cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? 'Sembunyikan' : 'Perlihatkan'}</span>
                </button>
              </div>

              <form onSubmit={handleChangeCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Pengguna Baru (Username) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan username baru"
                    value={editAdminUser}
                    onChange={(e) => setEditAdminUser(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kata Sandi Baru (Password) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={5}
                      placeholder="Minimal 5 karakter"
                      value={editAdminNewPass}
                      onChange={(e) => setEditAdminNewPass(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Konfirmasi Kata Sandi Baru <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={5}
                      placeholder="Ketik ulang kata sandi baru"
                      value={editAdminConfirmPass}
                      onChange={(e) => setEditAdminConfirmPass(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-500">
                    Pastikan Anda mengingat username dan kata sandi baru untuk login berikutnya.
                  </p>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5 text-teal-400" />
                    <span>Perbarui Kredensial Administrator</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH / EDIT ARTIKEL DENGAN DUKUNGAN LENGKAP SEO */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-lg text-slate-900">
                {editingArticleId ? 'Edit Artikel & Optimasi SEO' : 'Tambah Artikel Baru (SEO Ready)'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Artikel <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Penerimaan Santri Baru TA 2026/2027 Resmi Dibuka"
                  value={artTitle}
                  onChange={(e) => {
                    setArtTitle(e.target.value);
                    if (!artSeoTitle) setArtSeoTitle(e.target.value);
                  }}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori Artikel
                  </label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value as ArticleCategory)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                  >
                    <option value="Berita Pesantren">Berita Pesantren</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Artikel Keislaman">Artikel Keislaman</option>
                    <option value="Kegiatan Santri">Kegiatan Santri</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Laporan">Laporan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    value={artAuthor}
                    onChange={(e) => setArtAuthor(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                  />
                </div>
              </div>

              <ImagePickerField
                label="Foto Sampul / Gambar Unggulan Artikel (Thumbnail)"
                value={artThumbnail}
                onChange={(url) => setArtThumbnail(url)}
                helperText="Bisa diunggah langsung dari perangkat (HP/Laptop) atau dipilih dari dokumentasi galeri santri."
                aspectRatio="video"
                required
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ringkasan Artikel (Excerpt) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Deskripsi singkat untuk cuplikan daftar artikel dan meta deskripsi..."
                  value={artSummary}
                  onChange={(e) => {
                    setArtSummary(e.target.value);
                    if (!artSeoDesc) setArtSeoDesc(e.target.value);
                  }}
                  className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Konten Lengkap Artikel (Format Teks/Markdown) <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Tuliskan isi artikel selengkapnya..."
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-sans"
                />
              </div>

              {/* SEKSI KHUSUS SEO OPTIMIZATION */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs text-teal-900">
                  <Globe className="w-4 h-4 text-teal-700" />
                  <span>Pengaturan Metadata SEO & OpenGraph</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Meta Title (Tag Judul Mesin Pencari)
                    </label>
                    <input
                      type="text"
                      placeholder="Judul SEO optimal max 60 karakter"
                      value={artSeoTitle}
                      onChange={(e) => setArtSeoTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Meta Description (Deskripsi SERP Google)
                    </label>
                    <input
                      type="text"
                      placeholder="Ringkasan SEO optimal 140-160 karakter"
                      value={artSeoDesc}
                      onChange={(e) => setArtSeoDesc(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Kata Kunci SEO (Keywords, dipisah koma)
                    </label>
                    <input
                      type="text"
                      placeholder="pesantren bogor, pendaftaran santri baru, markaz hidayah quran"
                      value={artSeoKeywords}
                      onChange={(e) => setArtSeoKeywords(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  {editingArticleId ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM TAMBAH GALERI */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Tambah Foto Galeri Kegiatan</h3>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Foto Kegiatan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembagian Sertifikat Tahfidz"
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori
                </label>
                <select
                  value={galCategory}
                  onChange={(e) => setGalCategory(e.target.value as GalleryCategory)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                >
                  <option value="Tahfidz">Tahfidz</option>
                  <option value="Kegiatan Santri">Kegiatan Santri</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Sosial & Dakwah">Sosial & Dakwah</option>
                  <option value="Fasilitas">Fasilitas</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <ImagePickerField
                label="File Foto Dokumentasi Kegiatan"
                value={galImageUrl}
                onChange={(url) => setGalImageUrl(url)}
                helperText="Upload langsung dari kamera / galeri HP atau laptop Anda."
                aspectRatio="video"
                required
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokasi Pengambilan
                </label>
                <input
                  type="text"
                  value={galLocation}
                  onChange={(e) => setGalLocation(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO Preview Modal for Article Inspector */}
      {previewSeoArticle && (
        <SeoPreviewModal
          article={previewSeoArticle}
          onClose={() => setPreviewSeoArticle(null)}
        />
      )}
    </div>
  );
};
