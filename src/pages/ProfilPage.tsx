import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  Award,
  Target,
  Compass,
  CheckCircle2,
  Users,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Heart,
  Sparkles,
  BookMarked
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Award,
  Compass,
  ShieldCheck,
  Target,
  Users,
  BookOpen,
  Sparkles,
  BookMarked
};

export const ProfilPage: React.FC = () => {
  const { setCurrentRoute, profilContent, values, dewanPengasuh } = usePesantren();

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
            {profilContent.headerBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            {profilContent.headerTitle}
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            {profilContent.headerDesc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Sejarah & Latar Belakang */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              {profilContent.historyBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {profilContent.historyTitle}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {profilContent.historyPara1}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {profilContent.historyPara2}
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div>
                <div className="text-2xl font-black text-teal-700">{profilContent.statYear}</div>
                <div className="text-xs text-slate-500">{profilContent.statYearLabel}</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <div className="text-2xl font-black text-sky-700">{profilContent.statSantri}</div>
                <div className="text-xs text-slate-500">{profilContent.statSantriLabel}</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <div className="text-2xl font-black text-teal-700">{profilContent.statAlumni}</div>
                <div className="text-xs text-slate-500">{profilContent.statAlumniLabel}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src={profilContent.historyImageUrl || null}
                alt="Lingkungan Pesantren Cisarua"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-slate-900 text-white text-xs">
                {profilContent.historyImageCaption}
              </div>
            </div>
          </div>
        </section>

        {/* Visi, Misi & Tujuan Pendidikan */}
        <section className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Landasan Filosofis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Visi, Misi & Tujuan Pendidikan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{profilContent.visiTitle || 'Visi Utama'}</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {profilContent.visiText}
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{profilContent.misiTitle || 'Misi Pesantren'}</h3>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                {profilContent.misiList.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Nilai-Nilai Pesantren */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Karakter Dasar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Nilai-Nilai Luhur Pesantren
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pilar utama yang senantiasa dihidupkan dalam keseharian setiap santri, asatidz, dan pengelola.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => {
              const IconComp = iconMap[v.iconName || 'Award'] || Award;
              return (
                <div
                  key={v.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-teal-300 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dewan Pengasuh & Asatidz */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Keteladanan & Keilmuan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Profil Dewan Pengasuh & Masyayikh
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dewanPengasuh.map((ust) => (
              <div
                key={ust.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4"
              >
                <div className="h-64 overflow-hidden bg-slate-100">
                  <img
                    src={ust.photo || null}
                    alt={ust.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 pt-0 space-y-1.5">
                  <h3 className="font-bold text-base text-slate-900">{ust.name}</h3>
                  <div className="text-xs font-semibold text-teal-700">{ust.role}</div>
                  <p className="text-xs text-slate-500 pt-1 leading-relaxed">
                    {ust.credential}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-teal-700 to-sky-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Tertarik Bergabung dengan Markaz Hidayah?</h3>
            <p className="text-xs sm:text-sm text-teal-100">
              Pelajari kurikulum program atau daftarkan putra-putri Anda pada gelombang penerimaan aktif.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentRoute('program')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors"
            >
              Lihat Program
            </button>
            <button
              onClick={() => setCurrentRoute('pendaftaran')}
              className="px-5 py-3 rounded-xl bg-white text-teal-900 hover:bg-teal-50 text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Santri Baru</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
