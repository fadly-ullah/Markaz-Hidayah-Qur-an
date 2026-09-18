import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { Facility } from '../../types';
import { ImagePickerField } from './ImagePickerField';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Eye,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const AdminEditFasilitas: React.FC = () => {
  const {
    facilities,
    addFacility,
    updateFacility,
    deleteFacility,
    showToast,
    setCurrentRoute
  } = usePesantren();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<Facility['category']>('Ibadah');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [capacity, setCapacity] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  const openAdd = () => {
    setEditingFacility(null);
    setName('');
    setCategory('Ibadah');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80');
    setCapacity('Kapasitas 100 Santri');
    setFeaturesText('Ruang ber-AC\nAudio sistem jernih\nKarpet bersih standar internasional');
    setIsModalOpen(true);
  };

  const openEdit = (f: Facility) => {
    setEditingFacility(f);
    setName(f.name);
    setCategory(f.category);
    setDescription(f.description);
    setImageUrl(f.imageUrl);
    setCapacity(f.capacity);
    setFeaturesText(f.features.join('\n'));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const features = featuresText.split('\n').map(ft => ft.trim()).filter(Boolean);

    if (editingFacility) {
      updateFacility(editingFacility.id, {
        name,
        category,
        description,
        imageUrl,
        capacity,
        features
      });
      showToast('Fasilitas Diperbarui', `Fasilitas "${name}" berhasil diubah.`);
    } else {
      addFacility({
        name,
        category,
        description,
        imageUrl,
        capacity,
        features
      });
      showToast('Fasilitas Ditambahkan', `Fasilitas baru "${name}" berhasil disimpan.`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Fasilitas & Sarana Prasarana</h2>
          <p className="text-xs text-slate-500">
            Tambah, ubah, atau hapus fasilitas asrama, masjid, kelas halaqah, lab, dan sarana olahraga ({facilities.length} fasilitas terdaftar).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentRoute('fasilitas')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat di Halaman Fasilitas</span>
          </button>
          <button
            type="button"
            onClick={openAdd}
            className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Fasilitas Baru</span>
          </button>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map(fac => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <img
                  src={fac.imageUrl}
                  alt={fac.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs">
                  {fac.category}
                </span>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-teal-900/90 text-teal-100 text-[10px] font-bold backdrop-blur-xs">
                  {fac.capacity}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-slate-900 leading-snug">{fac.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{fac.description}</p>
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fitur & Kelengkapan:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.features.map((feat, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-teal-600" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEdit(fac)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (confirm(`Hapus fasilitas "${fac.name}"?`)) {
                    deleteFacility(fac.id);
                  }
                }}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Facility */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingFacility ? 'Edit Fasilitas Pesantren' : 'Tambah Fasilitas Baru'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Fasilitas</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Masjid Jami' Al-Ikhlas"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Ibadah">Ibadah</option>
                    <option value="Asrama">Asrama</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Olahraga">Olahraga</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Penunjang">Penunjang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kapasitas / Daya Tampung</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kapasitas 500 Jamaah"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <ImagePickerField
                label="Foto Fasilitas Pesantren"
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                helperText="Bisa diunggah langsung dari perangkat (HP/Laptop) atau dipilih dari galeri pesantren."
                aspectRatio="video"
                required
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Fasilitas</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Penjelasan fungsi, kenyamanan, dan kebersihan fasilitas..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fitur & Kelengkapan (Pisahkan per baris)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="AC & Kipas Angin&#10;Sound System Digital&#10;Kamar Mandi Bersih"
                  value={featuresText}
                  onChange={e => setFeaturesText(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm cursor-pointer"
                >
                  Simpan Fasilitas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
