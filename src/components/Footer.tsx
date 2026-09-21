import React from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setCurrentRoute, isAdminLoggedIn } = usePesantren();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Branding & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {settings.logoUrl && settings.logoUrl.trim() !== '' ? (
                <img
                  src={settings.logoUrl.trim() || null}
                  alt={settings.pesantrenName}
                  className="w-11 h-11 rounded-xl object-cover border border-teal-500/40 shadow-md bg-white/10"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
              )}
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">
                  {settings.pesantrenName}
                </h3>
                <p className="text-teal-400 text-xs font-medium">
                  {settings.subtitle || "Pesantren Tahfidz & Keislaman Modern"}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              {settings.footerAboutText || `${settings.tagline}. Berdedikasi melahirkan huffadz 30 juz mutqin, berwawasan luas, mandiri, serta berpegang teguh pada Al-Qur'an dan Sunnah.`}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {settings.footerBadge1 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-800 text-teal-300 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  {settings.footerBadge1}
                </span>
              )}
              {settings.footerBadge2 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800 text-sky-300 text-xs font-medium">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  {settings.footerBadge2}
                </span>
              )}
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase text-teal-400">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentRoute('profil')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Profil & Visi Misi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('program')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Program & Kurikulum
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('fasilitas')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Fasilitas Pesantren
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('galeri')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Galeri Kegiatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('artikel')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Artikel & Berita
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('kontak')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Pusat Bantuan & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: PSB & Donasi */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase text-teal-400">
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentRoute('pendaftaran')}
                  className="hover:text-teal-300 font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Pendaftaran Santri Baru (PSB)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentRoute('donasi')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Wakaf & Donasi Santri
                </button>
              </li>
              <li>
                <a
                  href={settings.donationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium text-xs bg-sky-950/80 px-2.5 py-1.5 rounded-lg border border-sky-800/80 mt-1"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Portal mariberbagi.net</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${settings.waNumber}?text=${encodeURIComponent("Assalamu'alaikum Admin Markaz Hidayah Qur'an, saya ingin bertanya...")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  Chat WhatsApp Panitia PSB
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontak & Alamat */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase text-teal-400">
              Sekretariat
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Panel Entrance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.pesantrenName}. {settings.footerCopyrightText || "Hak Cipta Dilindungi."}</p>

          {/* Dedicated Admin Panel Access in Footer */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentRoute('admin')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-all font-medium cursor-pointer"
              title="Akses Panel Administrator CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Panel Administrator</span>
              {isAdminLoggedIn ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Sesi Login Aktif" />
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
