import React, { useState, useRef, useEffect } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  Menu,
  X,
  HeartHandshake,
  UserPlus,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Info,
  GraduationCap,
  Building2,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { currentRoute, setCurrentRoute, settings, announcements } = usePesantren();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [logoImgError, setLogoImgError] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeAnnouncement = announcements.find(a => a.isActive);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (route: Parameters<typeof setCurrentRoute>[0]) => {
    setCurrentRoute(route);
    setAboutDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isAboutActive = currentRoute === 'profil' || currentRoute === 'program' || currentRoute === 'fasilitas';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner: Hijri Date, Lokasi, Pengumuman PSB & Hotline */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-teal-100 font-medium">
              <Calendar className="w-3.5 h-3.5 text-teal-300" />
              {settings.headerDateText || "Rabi'ul Awwal 1448 H / September 2026"}
            </span>
            <span className="hidden md:inline text-teal-300/60">•</span>
            <span className="hidden md:inline text-teal-100 text-[11px]">
              {settings.headerLocation || "Cisarua, Megamendung - Bogor"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {(settings.headerPsbBannerText || activeAnnouncement) && (
              <button
                onClick={() => {
                  const target = settings.headerPsbBannerTarget || (activeAnnouncement?.targetUrl === '/donasi' ? 'donasi' : 'pendaftaran');
                  handleNavigate(target === 'donasi' ? 'donasi' : 'pendaftaran');
                }}
                className="cursor-pointer group flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors px-2.5 py-0.5 rounded-full text-white text-[11px]"
              >
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-[320px]">
                  {settings.headerPsbBannerText || activeAnnouncement?.title}
                </span>
                <ChevronRight className="w-3 h-3 text-teal-200 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )}

            <div className="hidden lg:flex items-center gap-2">
              <a
                href={`https://wa.me/${settings.waNumber}?text=${encodeURIComponent(`Assalamu'alaikum, saya ingin konsultasi mengenai ${settings.pesantrenName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-teal-100 hover:text-white transition-colors text-[11px]"
              >
                <PhoneCall className="w-3 h-3 text-teal-300" />
                <span>{settings.headerHotlineText || `Hotline: ${settings.phone}`}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Pesantren Name (Admin Customizable + Logo Image Support) */}
          <div
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none py-1"
          >
            {settings.logoUrl && !logoImgError ? (
              <img
                src={settings.logoUrl}
                alt={settings.pesantrenName}
                onError={() => setLogoImgError(true)}
                className="w-11 h-11 rounded-xl object-cover border border-teal-200/80 shadow-xs group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-sky-600 text-white flex items-center justify-center shadow-md shadow-teal-700/10 group-hover:scale-105 transition-transform shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            )}

            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg lg:text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors leading-tight line-clamp-1">
                {settings.pesantrenName}
              </span>
              <span className="text-[11px] font-medium text-teal-700 tracking-wide line-clamp-1">
                {settings.subtitle || "Pesantren Tahfidz & Keislaman Modern"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* 1. Beranda */}
            <button
              onClick={() => handleNavigate('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                currentRoute === 'home'
                  ? 'text-teal-700 font-semibold bg-teal-50/90'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Beranda
            </button>

            {/* 2. Dropdown: Profil, Program & Kurikulum, Fasilitas */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAboutDropdownOpen(prev => !prev)}
                onMouseEnter={() => setAboutDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isAboutActive || aboutDropdownOpen
                    ? 'text-teal-700 font-semibold bg-teal-50/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>Tentang Pesantren</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    aboutDropdownOpen ? 'rotate-180 text-teal-700' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu Popup */}
              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                    className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 divide-y divide-slate-100"
                  >
                    <div className="p-1 space-y-1">
                      {/* Sub-item: Profil */}
                      <button
                        onClick={() => handleNavigate('profil')}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                          currentRoute === 'profil'
                            ? 'bg-teal-50 text-teal-800'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-teal-100/60 text-teal-700 shrink-0 mt-0.5">
                          <Info className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight text-slate-900">
                            Profil & Visi Misi
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Sejarah, pimpinan, & legalitas
                          </div>
                        </div>
                      </button>

                      {/* Sub-item: Program & Kurikulum */}
                      <button
                        onClick={() => handleNavigate('program')}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                          currentRoute === 'program'
                            ? 'bg-teal-50 text-teal-800'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-sky-100/60 text-sky-700 shrink-0 mt-0.5">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight text-slate-900">
                            Program & Kurikulum
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Tahfidz 30 Juz, Kitab & Formal
                          </div>
                        </div>
                      </button>

                      {/* Sub-item: Fasilitas */}
                      <button
                        onClick={() => handleNavigate('fasilitas')}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                          currentRoute === 'fasilitas'
                            ? 'bg-teal-50 text-teal-800'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-emerald-100/60 text-emerald-700 shrink-0 mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-tight text-slate-900">
                            Fasilitas Pesantren
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Masjid, asrama, & sarana santri
                          </div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Galeri */}
            <button
              onClick={() => handleNavigate('galeri')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                currentRoute === 'galeri'
                  ? 'text-teal-700 font-semibold bg-teal-50/90'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Galeri
            </button>

            {/* 4. Artikel & Berita */}
            <button
              onClick={() => handleNavigate('artikel')}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                currentRoute === 'artikel' || currentRoute === 'artikel-detail'
                  ? 'text-teal-700 font-semibold bg-teal-50/90'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Artikel & Berita
            </button>
          </nav>

          {/* Right Action Buttons: Single Donasi Button & Single PSB Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Single Donasi Button */}
            <button
              onClick={() => handleNavigate('donasi')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border shadow-2xs ${
                currentRoute === 'donasi'
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'text-teal-800 bg-teal-50/90 hover:bg-teal-100 border-teal-200/90'
              }`}
            >
              <HeartHandshake className={`w-4 h-4 ${currentRoute === 'donasi' ? 'text-white' : 'text-teal-600'}`} />
              <span>Donasi</span>
            </button>

            {/* Single Unified PSB / Daftar Santri Button */}
            <button
              onClick={() => handleNavigate('pendaftaran')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm transition-all ${
                currentRoute === 'pendaftaran'
                  ? 'bg-teal-900 ring-2 ring-teal-500'
                  : 'bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 shadow-teal-600/20 hover:shadow-md'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Santri (PSB)</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavigate('pendaftaran')}
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-sky-600"
            >
              PSB Online
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {/* Beranda */}
              <button
                onClick={() => handleNavigate('home')}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentRoute === 'home' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Beranda</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Accordion: Tentang Pesantren (Profil, Program, Fasilitas) */}
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen(prev => !prev)}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isAboutActive ? 'bg-teal-50/80 text-teal-800 font-semibold' : 'text-slate-700 bg-slate-50/60'
                  }`}
                >
                  <span>Tentang Pesantren</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform text-slate-400 ${
                      mobileAboutOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>

                {mobileAboutOpen && (
                  <div className="px-2 py-1 bg-white space-y-1">
                    <button
                      onClick={() => handleNavigate('profil')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                        currentRoute === 'profil' ? 'bg-teal-100/60 text-teal-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Info className="w-3.5 h-3.5 text-teal-600" />
                      <span>Profil & Visi Misi</span>
                    </button>
                    <button
                      onClick={() => handleNavigate('program')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                        currentRoute === 'program' ? 'bg-teal-100/60 text-teal-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                      <span>Program & Kurikulum</span>
                    </button>
                    <button
                      onClick={() => handleNavigate('fasilitas')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left ${
                        currentRoute === 'fasilitas' ? 'bg-teal-100/60 text-teal-800 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Fasilitas Pesantren</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Galeri */}
              <button
                onClick={() => handleNavigate('galeri')}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentRoute === 'galeri' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Galeri Kegiatan</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Artikel & Berita */}
              <button
                onClick={() => handleNavigate('artikel')}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentRoute === 'artikel' || currentRoute === 'artikel-detail'
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Artikel & Berita</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Action Buttons for Mobile */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              {/* Single PSB Button */}
              <button
                onClick={() => handleNavigate('pendaftaran')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-sky-600 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Santri (PSB Online)</span>
              </button>

              {/* Single Donasi Button */}
              <button
                onClick={() => handleNavigate('donasi')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-teal-800 bg-teal-50 border border-teal-200"
              >
                <HeartHandshake className="w-4 h-4 text-teal-600" />
                <span>Infaq & Donasi Santri</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
