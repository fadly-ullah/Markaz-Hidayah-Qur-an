import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { GalleryCategory } from '../types';
import { Camera, Calendar, MapPin, Maximize2, Sparkles } from 'lucide-react';

export const GaleriPage: React.FC = () => {
  const { gallery, openLightbox } = usePesantren();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories: (string | GalleryCategory)[] = [
    'Semua',
    'Tahfidz',
    'Kegiatan Santri',
    'Pendidikan',
    'Sosial & Dakwah',
    'Fasilitas',
    'Event'
  ];

  const filteredItems = selectedCategory === 'Semua'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
            Dokumentasi & Aktivitas
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Galeri Kegiatan Interaktif
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            Menyaksikan dinamika kehidupan santri: lantunan ayat suci Al-Qur'an, pembinaan karakter, olahraga sunnah, hingga bakti sosial bagi masyarakat.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Menampilkan {filteredItems.length} dokumentasi
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            // Find global index for lightbox
            const globalIndex = gallery.findIndex(g => g.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(globalIndex >= 0 ? globalIndex : index)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-teal-300 transition-all flex flex-col"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                      <Maximize2 className="w-5 h-5 text-teal-700" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-slate-800">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[120px]">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
            <Camera className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-700">Belum ada foto untuk kategori ini</h3>
            <p className="text-xs text-slate-500">Pilih kategori lain atau kembali ke "Semua".</p>
          </div>
        )}
      </div>
    </div>
  );
};
