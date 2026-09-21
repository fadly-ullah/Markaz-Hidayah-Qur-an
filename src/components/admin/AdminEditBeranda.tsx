import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { HomeContent } from '../../types';
import { Save, Sparkles, Eye, CheckCircle2, RotateCcw } from 'lucide-react';
import { ImagePickerField } from './ImagePickerField';

export const AdminEditBeranda: React.FC = () => {
  const { homeContent, updateHomeContent, showToast, setCurrentRoute } = usePesantren();

  const [formData, setFormData] = useState<HomeContent>(JSON.parse(JSON.stringify(homeContent)));

  const handleHeroChange = (field: keyof HomeContent['hero'], value: string) => {
    setFormData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value
      }
    }));
  };

  const handleAboutChange = (field: keyof HomeContent['about'], value: string) => {
    setFormData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value
      }
    }));
  };

  const handleCtaPsbChange = (field: keyof HomeContent['ctaPsb'], value: string) => {
    setFormData(prev => ({
      ...prev,
      ctaPsb: {
        ...prev.ctaPsb,
        [field]: value
      }
    }));
  };

  const handleDonationChange = (field: keyof HomeContent['donation'], value: string) => {
    setFormData(prev => ({
      ...prev,
      donation: {
        ...prev.donation,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomeContent(formData);
    showToast('Berhasil Disimpan', 'Seluruh konten bagian Beranda telah berhasil diperbarui!');
  };

  const handleReset = () => {
    setFormData(JSON.parse(JSON.stringify(homeContent)));
    showToast('Direset', 'Formulir dikembalikan ke data tersimpan saat ini.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kelola & Edit Konten Halaman Beranda</h2>
          <p className="text-xs text-slate-500">
            Perubahan teks, judul hero, statistik, pilar keunggulan, banner PSB, dan CTA donasi langsung tampil di halaman depan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentRoute('home')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat di Beranda</span>
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Perubahan</span>
          </button>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Bagian Hero Utama (Header Depan)</h3>
            <p className="text-xs text-slate-500">Judul utama, bismillah, deskripsi, gambar hero, dan 4 angka statistik</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Teks Bismillah / Sambutan Arab</label>
            <input
              type="text"
              value={formData.hero.bismillahText}
              onChange={e => handleHeroChange('bismillahText', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Atas Judul</label>
            <input
              type="text"
              value={formData.hero.badgeText}
              onChange={e => handleHeroChange('badgeText', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Awalan Judul (Prefix)</label>
            <input
              type="text"
              value={formData.hero.titlePrefix}
              onChange={e => handleHeroChange('titlePrefix', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sorotan Judul 1 (Warna Hijau/Teal)</label>
            <input
              type="text"
              value={formData.hero.titleHighlight1}
              onChange={e => handleHeroChange('titleHighlight1', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Teks Tengah Judul</label>
            <input
              type="text"
              value={formData.hero.titleMiddle}
              onChange={e => handleHeroChange('titleMiddle', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sorotan Judul 2 (Warna Biru/Sky)</label>
            <input
              type="text"
              value={formData.hero.titleHighlight2}
              onChange={e => handleHeroChange('titleHighlight2', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Hero</label>
          <textarea
            rows={3}
            value={formData.hero.description}
            onChange={e => handleHeroChange('description', e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Image Picker for Hero Section */}
        <div className="pt-2">
          <ImagePickerField
            label="Foto Visual Showcase Hero Utama (Beranda)"
            value={formData.hero.imageUrl}
            onChange={(url) => handleHeroChange('imageUrl', url)}
            helperText="Foto ini tampil besar di samping judul beranda. Anda bisa upload langsung dari HP/Laptop atau memilih dari Galeri Pesantren."
            aspectRatio="video"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Kartu Mengambang (Floating Card)</label>
            <input
              type="text"
              value={formData.hero.floatCardTitle}
              onChange={e => handleHeroChange('floatCardTitle', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasi Kartu Mengambang</label>
            <input
              type="text"
              value={formData.hero.floatCardLocation}
              onChange={e => handleHeroChange('floatCardLocation', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Singkat Kartu Mengambang</label>
            <input
              type="text"
              value={formData.hero.floatCardDesc}
              onChange={e => handleHeroChange('floatCardDesc', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* 4 Trust Stats */}
        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-3">
            4 Angka Statistik Utama (Hero Trust Stats)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">Statistik 1</label>
              <input
                type="text"
                placeholder="Angka/Nilai"
                value={formData.hero.stat1Value}
                onChange={e => handleHeroChange('stat1Value', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
              />
              <input
                type="text"
                placeholder="Label"
                value={formData.hero.stat1Label}
                onChange={e => handleHeroChange('stat1Label', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">Statistik 2</label>
              <input
                type="text"
                placeholder="Angka/Nilai"
                value={formData.hero.stat2Value}
                onChange={e => handleHeroChange('stat2Value', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
              />
              <input
                type="text"
                placeholder="Label"
                value={formData.hero.stat2Label}
                onChange={e => handleHeroChange('stat2Label', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">Statistik 3</label>
              <input
                type="text"
                placeholder="Angka/Nilai"
                value={formData.hero.stat3Value}
                onChange={e => handleHeroChange('stat3Value', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
              />
              <input
                type="text"
                placeholder="Label"
                value={formData.hero.stat3Label}
                onChange={e => handleHeroChange('stat3Label', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">Statistik 4</label>
              <input
                type="text"
                placeholder="Angka/Nilai"
                value={formData.hero.stat4Value}
                onChange={e => handleHeroChange('stat4Value', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
              />
              <input
                type="text"
                placeholder="Label"
                value={formData.hero.stat4Label}
                onChange={e => handleHeroChange('stat4Label', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. ABOUT PREVIEW SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Bagian Sekilas Tentang Pesantren (Beranda)</h3>
            <p className="text-xs text-slate-500">Pengantar profil singkat dan 4 pilar keunggulan kurikulum utama</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Tentang</label>
            <input
              type="text"
              value={formData.about.badgeText}
              onChange={e => handleAboutChange('badgeText', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Sekilas Tentang</label>
            <input
              type="text"
              value={formData.about.title}
              onChange={e => handleAboutChange('title', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Singkat Tentang</label>
          <textarea
            rows={2}
            value={formData.about.description}
            onChange={e => handleAboutChange('description', e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Pilar 1 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h5 className="text-xs font-bold text-teal-800">Pilar Keunggulan 1</h5>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Judul Kartu</label>
              <input
                type="text"
                value={formData.about.card1Title}
                onChange={e => handleAboutChange('card1Title', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Deskripsi</label>
              <textarea
                rows={3}
                value={formData.about.card1Desc}
                onChange={e => handleAboutChange('card1Desc', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h5 className="text-xs font-bold text-teal-800">Pilar Keunggulan 2</h5>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Judul Kartu</label>
              <input
                type="text"
                value={formData.about.card2Title}
                onChange={e => handleAboutChange('card2Title', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Deskripsi</label>
              <textarea
                rows={3}
                value={formData.about.card2Desc}
                onChange={e => handleAboutChange('card2Desc', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h5 className="text-xs font-bold text-teal-800">Pilar Keunggulan 3</h5>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Judul Kartu</label>
              <input
                type="text"
                value={formData.about.card3Title}
                onChange={e => handleAboutChange('card3Title', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Deskripsi</label>
              <textarea
                rows={3}
                value={formData.about.card3Desc}
                onChange={e => handleAboutChange('card3Desc', e.target.value)}
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h5 className="text-xs font-bold text-teal-800">Pilar Keunggulan 4</h5>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Judul Kartu</label>
              <input
                type="text"
                value={formData.about.card4Title || ''}
                onChange={e => handleAboutChange('card4Title', e.target.value)}
                placeholder="cth: Karakter & Kemandirian Santri"
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 mb-0.5">Deskripsi</label>
              <textarea
                rows={3}
                value={formData.about.card4Desc || ''}
                onChange={e => handleAboutChange('card4Desc', e.target.value)}
                placeholder="Pendidikan kepemimpinan, kedisiplinan hidup mandiri..."
                className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. CTA PENDAFTARAN SANTRI BARU (PSB) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Banner Ajakan Pendaftaran Santri (CTA PSB)</h3>
            <p className="text-xs text-slate-500">Banner besar yang mengarahkan calon wali santri untuk mendaftar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge CTA PSB</label>
            <input
              type="text"
              value={formData.ctaPsb.badgeText}
              onChange={e => handleCtaPsbChange('badgeText', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Banner PSB</label>
            <input
              type="text"
              value={formData.ctaPsb.title}
              onChange={e => handleCtaPsbChange('title', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Banner PSB</label>
          <textarea
            rows={2}
            value={formData.ctaPsb.description}
            onChange={e => handleCtaPsbChange('description', e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Keunggulan 1</label>
            <input
              type="text"
              value={formData.ctaPsb.feature1}
              onChange={e => handleCtaPsbChange('feature1', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Keunggulan 2</label>
            <input
              type="text"
              value={formData.ctaPsb.feature2}
              onChange={e => handleCtaPsbChange('feature2', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Keunggulan 3</label>
            <input
              type="text"
              value={formData.ctaPsb.feature3}
              onChange={e => handleCtaPsbChange('feature3', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* 4. DONATION SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Bagian Donasi & Wakaf (Beranda)</h3>
            <p className="text-xs text-slate-500">Ajakan amal jariyah dan keterhubungan dengan platform donasi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Donasi</label>
            <input
              type="text"
              value={formData.donation.badgeText}
              onChange={e => handleDonationChange('badgeText', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Donasi</label>
            <input
              type="text"
              value={formData.donation.title}
              onChange={e => handleDonationChange('title', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Donasi</label>
          <textarea
            rows={2}
            value={formData.donation.description}
            onChange={e => handleDonationChange('description', e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Poin Jaminan 1</label>
            <input
              type="text"
              value={formData.donation.tagline1}
              onChange={e => handleDonationChange('tagline1', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Poin Jaminan 2</label>
            <input
              type="text"
              value={formData.donation.tagline2}
              onChange={e => handleDonationChange('tagline2', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Poin Jaminan 3</label>
            <input
              type="text"
              value={formData.donation.tagline3}
              onChange={e => handleDonationChange('tagline3', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom Floating Save Bar */}
      <div className="sticky bottom-4 z-20 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-xl flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <Save className="w-5 h-5" />
          <span>Simpan Perubahan Beranda</span>
        </button>
      </div>
    </form>
  );
};
