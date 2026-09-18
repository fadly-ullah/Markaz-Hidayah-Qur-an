import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const KontakPage: React.FC = () => {
  const { settings, showToast } = usePesantren();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Informasi Pendaftaran Santri Baru');
  const [message, setMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Kapan periode pendaftaran santri baru dibuka?",
      a: "Pendaftaran santri baru (PSB) Tahun Ajaran 2026/2027 Gelombang I dibuka mulai September hingga Desember 2026 atau sampai kuota 60 santri terpenuhi."
    },
    {
      q: "Apakah calon santri wajib sudah hafal Al-Qur'an sebelum mendaftar?",
      a: "Tidak wajib. Yang diutamakan pada saat seleksi adalah kelancaran membaca Al-Qur'an dengan kaidah tajwid dasar, kesiapan mental hidup mandiri di asrama, dan komitmen orang tua."
    },
    {
      q: "Bagaimana sistem perizinan dan jadwal kunjungan orang tua?",
      a: "Orang tua/wali dapat mengunjungi santri pada pekan ke-2 dan pekan ke-4 setiap bulannya di hari Ahad. Santri tidak diperkenankan membawa smartphone selama masa belajar di pesantren."
    },
    {
      q: "Bagaimana cara menyalurkan wakaf dan donasi secara resmi?",
      a: "Donasi dapat disalurkan melalui platform mitra resmi mariberbagi.net (tab Donasi) atau transfer langsung ke rekening Yayasan Markaz Hidayah Qur'an pada Bank Syariah Indonesia (BSI)."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    // Direct WhatsApp Message trigger
    const waText = `*PESAN KONSULTASI WEBSITE PESANTREN*\n\n• Nama: ${name}\n• No Kontak: ${phone}\n• Perihal: ${subject}\n• Pesan: ${message}`;
    const cleanPhone = settings.waNumber.replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

    window.open(waUrl, '_blank');
    showToast('Pesan Disiapkan', 'Mengarahkan ke WhatsApp resmi Markaz Hidayah Qur\'an.');

    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
            Pusat Informasi & Silaturahmi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Hubungi Markaz Hidayah Qur'an
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            Pintu sekretariat kami senantiasa terbuka untuk silaturahmi, konsultasi pendidikan calon santri, maupun koordinasi program wakaf dakwah.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Grid Kontak & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                Informasi Kontak & Sekretariat
              </h2>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Alamat Kampus:</span>
                    <span className="leading-relaxed">{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Telepon & Hotline:</span>
                    <span>{settings.phone} / +{settings.waNumber}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Email Resmi:</span>
                    <span>{settings.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Jam Pelayanan Kantor:</span>
                    <span>Senin – Sabtu: 08.00 – 16.30 WIB<br />Ahad: 08.00 – 14.00 WIB (Kunjungan Wali Santri)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/${settings.waNumber}?text=${encodeURIComponent("Assalamu'alaikum Admin Markaz Hidayah Qur'an, saya ingin bertanya...")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Langsung via WhatsApp Panitia</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Kirim Pesan */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Kirim Pesan / Konsultasi
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Isi form berikut, pesan Anda akan diteruskan langsung ke WhatsApp petugas kami.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Anda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bapak Ahmad Fauzi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Perihal / Topik Konsultasi
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                >
                  <option value="Informasi Pendaftaran Santri Baru">Informasi Pendaftaran Santri Baru (PSB)</option>
                  <option value="Konsultasi Kurikulum & Program Tahfidz">Konsultasi Kurikulum & Program Tahfidz</option>
                  <option value="Janji Temu Kunjungan Pesantren">Janji Temu Kunjungan Pesantren</option>
                  <option value="Konfirmasi Donasi & Wakaf">Konfirmasi Donasi & Wakaf</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Isi Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan atau rencana silaturahmi Anda di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white rounded-xl font-bold text-xs shadow-md shadow-teal-700/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Pesan ke WhatsApp Pesantren</span>
              </button>
            </form>
          </div>
        </div>

        {/* Peta Lokasi / Map Visualizer */}
        <section className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs space-y-4">
          <div className="p-6 sm:p-8 pb-0">
            <h3 className="text-xl font-bold text-slate-900">Peta & Petunjuk Menuju Lokasi</h3>
            <p className="text-xs text-slate-500">
              Kawasan Pesantren Markaz Hidayah Qur'an berjarak ±45 menit dari Gerbang Tol Ciawi arah Puncak Cisarua.
            </p>
          </div>

          <div className="w-full h-80 bg-slate-100 relative flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
              alt="Peta Lokasi Pesantren Markaz Hidayah"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-teal-200 max-w-sm text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Markaz Hidayah Qur'an</h4>
                <p className="text-xs text-slate-600">
                  {settings.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent("Cisarua Megamendung Bogor")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <span>Buka di Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Tanya Jawab
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
