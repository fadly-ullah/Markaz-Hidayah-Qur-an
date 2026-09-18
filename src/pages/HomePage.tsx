import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  UserPlus,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Award,
  Users,
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { setCurrentRoute, programs, facilities, articles, gallery, openLightbox, navigateToArticle, settings, homeContent } = usePesantren();

  const recentArticles = articles.filter(a => a.status === 'Published').slice(0, 3);
  const previewGallery = gallery.slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-teal-50/70 via-sky-50/40 to-white">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Islamic Calligraphy Accent & Badge */}
              <div className="space-y-3">
                <div className="text-teal-800 font-serif italic text-lg sm:text-xl tracking-wider select-none">
                  {homeContent.hero.bismillahText}
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 border border-teal-200 text-teal-800 text-xs font-semibold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>{homeContent.hero.badgeText}</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {homeContent.hero.titlePrefix} <span className="text-teal-700">{homeContent.hero.titleHighlight1}</span>{homeContent.hero.titleMiddle} <span className="text-sky-700">{homeContent.hero.titleHighlight2}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {homeContent.hero.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentRoute('pendaftaran')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 hover:from-teal-700 hover:to-sky-800 transition-all shadow-md shadow-teal-700/20 flex items-center gap-2 group cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar Santri Baru (PSB)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentRoute('profil')}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all shadow-2xs flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Lihat Profil Pesantren</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
                <div className="space-y-0.5">
                  <div className="text-2xl font-black text-teal-800">{homeContent.hero.stat1Value}</div>
                  <div className="text-xs text-slate-600">{homeContent.hero.stat1Label}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-black text-sky-800">{homeContent.hero.stat2Value}</div>
                  <div className="text-xs text-slate-600">{homeContent.hero.stat2Label}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-black text-teal-800">{homeContent.hero.stat3Value}</div>
                  <div className="text-xs text-slate-600">{homeContent.hero.stat3Label}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl font-black text-sky-800">{homeContent.hero.stat4Value}</div>
                  <div className="text-xs text-slate-600">{homeContent.hero.stat4Label}</div>
                </div>
              </div>
            </motion.div>

            {/* Right Card / Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={homeContent.hero.imageUrl}
                  alt="Aktivitas Tahfidz Markaz Hidayah Qur'an"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-teal-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wide">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      {homeContent.hero.floatCardTitle}
                    </span>
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {homeContent.hero.floatCardLocation}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {homeContent.hero.floatCardDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG SINGKAT & VISI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                {homeContent.about.badgeText}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {homeContent.about.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {homeContent.about.description}
              </p>
              <button
                onClick={() => setCurrentRoute('profil')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 group pt-2"
              >
                <span>Pelajari Sejarah & Visi Misi</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-100 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-sm text-slate-900">{homeContent.about.card1Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {homeContent.about.card1Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-sm text-slate-900">{homeContent.about.card2Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {homeContent.about.card2Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-sm text-slate-900">{homeContent.about.card3Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {homeContent.about.card3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM PENDIDIKAN UNGGULAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Pilihan Jenjang & Kurikulum
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Program Pendidikan Unggulan
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Kurikulum dirancang bertahap dan terukur agar santri dapat menuntaskan hafalan dengan hafalan yang kuat (mutqin).
            </p>
          </div>
          <button
            onClick={() => setCurrentRoute('program')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <span>Lihat Semua Program</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all group"
            >
              <div className="h-44 overflow-hidden relative bg-slate-100">
                <img
                  src={program.imageUrl}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-600 text-white">
                  {program.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-xs font-medium text-teal-700 line-clamp-1">
                    🎯 {program.target}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentRoute('program')}
                  className="w-full py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Detail Kurikulum</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FASILITAS PREVIEW */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Lingkungan Pembelajaran
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Fasilitas Pesantren Modern
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Sarana dan prasarana lengkap didesain untuk menunjang kenyamanan ibadah, belajar, gizi seimbang, dan kesehatan santri.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('fasilitas')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              <span>Selengkapnya di Fasilitas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.slice(0, 3).map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img
                    src={fac.imageUrl}
                    alt={fac.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-slate-800">
                    {fac.category}
                  </span>
                </div>
                <div className="p-5 space-y-2.5">
                  <h3 className="font-bold text-base text-slate-900">{fac.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {fac.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {fac.features.slice(0, 2).map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3 text-teal-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA PENDAFTARAN SANTRI BARU (PSB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{homeContent.ctaPsb.badgeText}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {homeContent.ctaPsb.title}
              </h2>
              <p className="text-sm sm:text-base text-teal-100 leading-relaxed max-w-2xl">
                {homeContent.ctaPsb.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-teal-100">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{homeContent.ctaPsb.feature1}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-teal-100">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{homeContent.ctaPsb.feature2}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-teal-100">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{homeContent.ctaPsb.feature3}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => setCurrentRoute('pendaftaran')}
                className="w-full py-4 px-6 rounded-2xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <UserPlus className="w-4 h-4 text-teal-700" />
                <span>Isi Formulir Pendaftaran Sekarang</span>
              </button>

              <a
                href={`https://wa.me/${settings.waNumber}?text=${encodeURIComponent("Assalamu'alaikum, saya ingin konsultasi persyaratan PSB Markaz Hidayah Qur'an")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-2xl bg-teal-900/50 hover:bg-teal-900/70 text-white font-medium text-xs flex items-center justify-center gap-2 border border-teal-600/50 transition-colors"
              >
                <span>Konsultasi Panitia PSB via WA</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BERITA & ARTIKEL TERBARU (DENGAN DUKUNGAN SEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Kabar & Wawasan Islami
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Artikel, Berita & Laporan Kegiatan
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Informasi terkini kegiatan pesantren, mutiara hikmah keislaman, serta laporan transparansi amanah umat.
            </p>
          </div>
          <button
            onClick={() => setCurrentRoute('artikel')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <span>Semua Artikel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => navigateToArticle(art.slug)}
              className="cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src={art.thumbnail}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-teal-600 text-white">
                  {art.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {art.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-teal-700">
                  <span>Baca Selengkapnya</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. GALERI INTERAKTIF PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Dokumentasi Visual
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Galeri Kegiatan Santri
            </h2>
            <p className="text-sm text-slate-600">
              Klik foto untuk membuka lightbox interaktif beresolusi penuh.
            </p>
          </div>
          <button
            onClick={() => setCurrentRoute('galeri')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <span>Kunjungi Galeri Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {previewGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="cursor-pointer group relative aspect-square rounded-xl overflow-hidden bg-slate-200 border border-slate-200 shadow-2xs hover:shadow-md transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                <p className="text-white text-[11px] font-bold line-clamp-2 leading-tight">
                  {item.title}
                </p>
                <span className="text-teal-300 text-[9px] font-medium">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INTEGRASI DONASI & WAKAF (MARIBERBAGI.COM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-sky-50 via-teal-50/50 to-white border border-sky-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
                <HeartHandshake className="w-3.5 h-3.5 text-sky-600" />
                <span>{homeContent.donation.badgeText}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {homeContent.donation.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                {homeContent.donation.description}
              </p>
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
                <span>✓ {homeContent.donation.tagline1}</span>
                <span>✓ {homeContent.donation.tagline2}</span>
                <span>✓ {homeContent.donation.tagline3}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={settings.donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-600/20"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Donasi via mariberbagi.net</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setCurrentRoute('donasi')}
                className="w-full py-3 px-6 rounded-xl font-semibold text-xs text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Lihat Rekening Langsung & Kalkulator Infaq</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. KONTAK & LOKASI SINGKAT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Alamat Pesantren</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {settings.address}
            </p>
            <button
              onClick={() => setCurrentRoute('kontak')}
              className="text-xs font-semibold text-teal-700 hover:underline pt-1 block"
            >
              Buka Peta & Petunjuk Arah →
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Layanan & Konsultasi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Telepon: {settings.phone}<br />
              WhatsApp Hotline: +{settings.waNumber}<br />
              Email: {settings.email}
            </p>
            <a
              href={`https://wa.me/${settings.waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-sky-700 hover:underline pt-1 block"
            >
              Hubungi via WhatsApp →
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Jam Kunjungan / Silaturahmi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Senin – Sabtu: 08.00 – 16.30 WIB<br />
              Ahad: 08.00 – 14.00 WIB (Khusus Wali Santri)<br />
              Harap konfirmasi kedatangan H-1 via WA.
            </p>
            <button
              onClick={() => setCurrentRoute('kontak')}
              className="text-xs font-semibold text-teal-700 hover:underline pt-1 block"
            >
              Kirim Pesan / Janji Temu →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
