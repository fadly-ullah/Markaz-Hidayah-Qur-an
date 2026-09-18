import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  HeartHandshake,
  ExternalLink,
  Copy,
  Check,
  Building2,
  BookOpen,
  Users,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export const DonasiPage: React.FC = () => {
  const { settings } = usePesantren();
  const [selectedNominal, setSelectedNominal] = useState<number>(100000);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const donationPrograms = [
    {
      id: 'wakaf-asrama',
      title: 'Wakaf Pembangunan Asrama Santri Putri Tahfidz (Tahap 2)',
      target: 500000000,
      collected: 385000000,
      donorsCount: 2450,
      category: 'Wakaf Bangunan',
      description: 'Pembangunan 12 kamar asrama baru, instalasi sanitasi ramah lingkungan, dan ranjang santriwati.',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'beasiswa-yatim',
      title: 'Beasiswa Pendidikan Santri Yatim & Dhuafa Penghafal Qur\'an',
      target: 200000000,
      collected: 138000000,
      donorsCount: 1120,
      category: 'Infaq Pendidikan',
      description: 'Menjamin biaya SPP, asrama, dan makanan bergizi bagi 25 santri berprestasi dari keluarga dhuafa.',
      imageUrl: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'mushaf-alquran',
      title: 'Wakaf Pengadaan Mushaf Al-Qur\'an Standar Pojok & Kitab Turats',
      target: 60000000,
      collected: 49200000,
      donorsCount: 480,
      category: 'Wakaf Mushaf',
      description: 'Pemberian Al-Qur\'an rasm utsmani standar hafalan dan kitab matan Al-Jazari bagi santri baru.',
      imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const nominalOptions = [50000, 100000, 250000, 500000, 1000000];

  const handleCopyAccount = (bankName: string, accNumber: string) => {
    navigator.clipboard.writeText(accNumber.replace(/\s/g, ''));
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const getEffectiveNominal = () => {
    if (customNominal) {
      const num = parseInt(customNominal.replace(/\D/g, ''), 10);
      return isNaN(num) ? 0 : num;
    }
    return selectedNominal;
  };

  const handleWhatsAppConfirm = (bankName: string) => {
    const nominalFormatted = new Intl.NumberFormat('id-ID').format(getEffectiveNominal());
    const msg = `Assalamu'alaikum Admin Markaz Hidayah Qur'an, saya telah melakukan transfer donasi / wakaf sebesar Rp ${nominalFormatted} melalui rekening ${bankName}. Mohon dicatat untuk keberkahan para penghafal Al-Qur'an.`;
    window.open(`https://wa.me/${settings.waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
              Portal Donasi & Wakaf Umat
            </span>
            <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 text-xs font-semibold">
              Terintegrasi dengan mariberbagi.net
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Investasi Abadi untuk Penghafal Al-Qur'an
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            "Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, dan anak sholeh yang mendoakannya." (HR. Muslim)
          </p>

          <div className="pt-2">
            <a
              href={settings.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-teal-900 font-bold text-xs hover:bg-teal-50 shadow-md transition-all cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-teal-700" />
              <span>Salurkan Donasi Cepat via mariberbagi.net</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Program Donasi Unggulan */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Program Penyaluran Amanah
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Program Kebutuhan Pesantren yang Sedang Berjalan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Setiap rupiah yang Anda salurkan digunakan secara transparan dengan laporan berkala kepada muhsinin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donationPrograms.map((prog) => {
              const percent = Math.min(100, Math.round((prog.collected / prog.target) * 100));
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="h-48 overflow-hidden relative bg-slate-100">
                      <img
                        src={prog.imageUrl}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-teal-600 text-white">
                        {prog.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {prog.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-teal-700">
                            Rp {new Intl.NumberFormat('id-ID').format(prog.collected)}
                          </span>
                          <span className="text-slate-500 font-medium">
                            {percent}% dari Rp {new Intl.NumberFormat('id-ID').format(prog.target)}
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-slate-400 text-right">
                          {prog.donorsCount} donatur berpartisipasi
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <a
                      href={settings.donationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-teal-200 transition-colors"
                    >
                      <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
                      <span>Donasi Program Ini via MariBerbagi</span>
                      <ExternalLink className="w-3 h-3 text-teal-500" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Kalkulator & Rekening Langsung Yayasan */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Col Left: Infaq Nominal Picker */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Kalkulator Sedekah & Infaq
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Pilih Nominal Donasi
              </h3>
              <p className="text-xs text-slate-500">
                Pilih paket donasi atau ketik nominal sukarela yang Anda niatkan.
              </p>
            </div>

            {/* Nominal Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {nominalOptions.map((nom) => (
                <button
                  key={nom}
                  onClick={() => {
                    setSelectedNominal(nom);
                    setCustomNominal('');
                  }}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedNominal === nom && !customNominal
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  Rp {new Intl.NumberFormat('id-ID').format(nom)}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Atau masukkan nominal lainnya (Rp):
              </label>
              <input
                type="text"
                placeholder="Contoh: 750.000"
                value={customNominal}
                onChange={(e) => setCustomNominal(e.target.value)}
                className="w-full text-sm font-semibold px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
            </div>

            {/* Action Direct to Mariberbagi Gateway */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Nominal Donasi Terpilih:</span>
                <span className="font-extrabold text-teal-900 text-sm">
                  Rp {new Intl.NumberFormat('id-ID').format(getEffectiveNominal())}
                </span>
              </div>
              <a
                href={`${settings.donationUrl}?amount=${getEffectiveNominal()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Salurkan via Platform MariBerbagi.com (Tab Baru)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[10px] text-slate-500 text-center">
                Mendukung QRIS (GoPay, OVO, Dana, ShopeePay), Virtual Account & Kartu Debit.
              </p>
            </div>
          </div>

          {/* Col Right: Transfer Bank Langsung */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Kanal Alternatif
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Rekening Resmi Yayasan Pesantren
              </h3>
              <p className="text-xs text-slate-500">
                Anda juga dapat melakukan transfer langsung antar-bank ke rekening yayasan berikut:
              </p>
            </div>

            <div className="space-y-4">
              {settings.bankAccounts.map((acc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">{acc.bank}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                      Rekening Resmi
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                    <div>
                      <div className="font-mono font-bold text-base text-slate-900">
                        {acc.accountNumber}
                      </div>
                      <div className="text-[11px] text-slate-500">a.n. {acc.accountName}</div>
                    </div>

                    <button
                      onClick={() => handleCopyAccount(acc.bank, acc.accountNumber)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      {copiedBank === acc.bank ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleWhatsAppConfirm(acc.bank)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 pt-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Konfirmasi Transfer ke WhatsApp Panitia →</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparansi & Akuntabilitas */}
        <section className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-teal-600" />
            <h3 className="font-bold text-lg text-slate-900">
              Akuntabilitas & Jaminan Amanah
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            Yayasan Markaz Hidayah Qur'an memegang teguh prinsip tata kelola amanah (Good Islamic Governance). Seluruh penerimaan dana wakaf dan infaq dilaporkan secara berkala melalui laman Artikel & Publikasi di website ini serta dapat diaudit oleh lembaga pengawas wakaf independen.
          </p>
        </section>
      </div>
    </div>
  );
};
