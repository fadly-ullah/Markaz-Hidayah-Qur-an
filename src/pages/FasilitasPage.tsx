import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { CheckCircle2, ShieldCheck, Sparkles, Building2, MapPin } from 'lucide-react';

export const FasilitasPage: React.FC = () => {
  const { facilities, settings } = usePesantren();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Ibadah & Pusat Kegiatan', 'Hunian Santri', 'Pusat Pembelajaran', 'Kebugaran Santri', 'Gizi & Nutrisi', 'Layanan Medis'];

  const filteredFacilities = selectedCategory === 'Semua'
    ? facilities
    : facilities.filter(f => f.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
            Sarana & Prasarana
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Fasilitas Pesantren Modern
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            Didesain khusus untuk menghadirkan kenyamanan, higienitas, dan ketenangan bagi santri dalam menghafal Al-Qur'an dan menuntut ilmu syar'i.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative bg-slate-100">
                <img
                  src={fac.imageUrl || null}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold rounded-lg">
                  {fac.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Fasilitas & Layanan:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {fac.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Atmosphere Box */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Ingin Meninjau Fasilitas Secara Langsung?</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Kami menyambut hangat kunjungan silaturahmi orang tua dan calon santri. Silakan konfirmasi jadwal temu terlebih dahulu via WhatsApp.
            </p>
          </div>
          <a
            href={`https://wa.me/${settings.waNumber}?text=${encodeURIComponent("Assalamu'alaikum Admin, kami ingin menjadwalkan kunjungan survei fasilitas Markaz Hidayah Qur'an.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shrink-0 transition-colors"
          >
            Jadwalkan Kunjungan Survei
          </a>
        </div>
      </div>
    </div>
  );
};
