import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { ProfilContent, PesantrenValue, DewanPengasuhMember } from '../../types';
import { ImagePickerField } from './ImagePickerField';
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Eye,
  RotateCcw,
  Users,
  Award,
  Heart,
  Target,
  Compass,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const AdminEditProfil: React.FC = () => {
  const {
    profilContent,
    updateProfilContent,
    values,
    addValue,
    updateValue,
    deleteValue,
    dewanPengasuh,
    addDewanPengasuh,
    updateDewanPengasuh,
    deleteDewanPengasuh,
    showToast,
    setCurrentRoute
  } = usePesantren();

  const [profilForm, setProfilForm] = useState<ProfilContent>(JSON.parse(JSON.stringify(profilContent)));

  // Misi local state
  const [newMisiText, setNewMisiText] = useState('');

  // Value Edit / Add Modal state
  const [editingValue, setEditingValue] = useState<PesantrenValue | null>(null);
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [valTitle, setValTitle] = useState('');
  const [valDesc, setValDesc] = useState('');
  const [valIcon, setValIcon] = useState('Award');

  // Dewan Pengasuh Modal state
  const [editingDewan, setEditingDewan] = useState<DewanPengasuhMember | null>(null);
  const [isDewanModalOpen, setIsDewanModalOpen] = useState(false);
  const [dewanName, setDewanName] = useState('');
  const [dewanRole, setDewanRole] = useState('');
  const [dewanCredential, setDewanCredential] = useState('');
  const [dewanPhoto, setDewanPhoto] = useState('');

  const handleFieldChange = (field: keyof ProfilContent, value: any) => {
    setProfilForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfil = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfilContent(profilForm);
    showToast('Profil Disimpan', 'Informasi profil, sejarah, visi dan misi berhasil diperbarui!');
  };

  const handleAddMisi = () => {
    if (!newMisiText.trim()) return;
    const updated = [...profilForm.misiList, newMisiText.trim()];
    setProfilForm(prev => ({ ...prev, misiList: updated }));
    setNewMisiText('');
  };

  const handleRemoveMisi = (index: number) => {
    const updated = profilForm.misiList.filter((_, i) => i !== index);
    setProfilForm(prev => ({ ...prev, misiList: updated }));
  };

  const handleMisiTextChange = (index: number, val: string) => {
    const updated = [...profilForm.misiList];
    updated[index] = val;
    setProfilForm(prev => ({ ...prev, misiList: updated }));
  };

  // Values handlers
  const openAddValue = () => {
    setEditingValue(null);
    setValTitle('');
    setValDesc('');
    setValIcon('Award');
    setIsValueModalOpen(true);
  };

  const openEditValue = (v: PesantrenValue) => {
    setEditingValue(v);
    setValTitle(v.title);
    setValDesc(v.desc);
    setValIcon(v.iconName || 'Award');
    setIsValueModalOpen(true);
  };

  const handleSaveValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valTitle.trim()) return;
    if (editingValue) {
      updateValue(editingValue.id, {
        title: valTitle,
        desc: valDesc,
        iconName: valIcon
      });
      showToast('Nilai Diperbarui', `Nilai "${valTitle}" berhasil diubah.`);
    } else {
      addValue({
        title: valTitle,
        desc: valDesc,
        iconName: valIcon
      });
      showToast('Nilai Ditambahkan', `Nilai baru "${valTitle}" berhasil disimpan.`);
    }
    setIsValueModalOpen(false);
  };

  // Dewan Pengasuh handlers
  const openAddDewan = () => {
    setEditingDewan(null);
    setDewanName('');
    setDewanRole('');
    setDewanCredential('');
    setDewanPhoto('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80');
    setIsDewanModalOpen(true);
  };

  const openEditDewan = (d: DewanPengasuhMember) => {
    setEditingDewan(d);
    setDewanName(d.name);
    setDewanRole(d.role);
    setDewanCredential(d.credential);
    setDewanPhoto(d.photo);
    setIsDewanModalOpen(true);
  };

  const handleSaveDewan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dewanName.trim()) return;
    if (editingDewan) {
      updateDewanPengasuh(editingDewan.id, {
        name: dewanName,
        role: dewanRole,
        credential: dewanCredential,
        photo: dewanPhoto
      });
      showToast('Dewan Pengasuh Diperbarui', `Data ${dewanName} berhasil diubah.`);
    } else {
      addDewanPengasuh({
        name: dewanName,
        role: dewanRole,
        credential: dewanCredential,
        photo: dewanPhoto
      });
      showToast('Dewan Pengasuh Ditambahkan', `Data ${dewanName} berhasil disimpan.`);
    }
    setIsDewanModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Profil, Visi, Misi & Dewan Pengasuh</h2>
          <p className="text-xs text-slate-500">
            Edit sejarah, visi, misi, nilai luhur pesantren, dan daftar masyayikh dewan pengasuh.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentRoute('profil')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat di Halaman Profil</span>
          </button>
        </div>
      </div>

      {/* Profil Banner & Sejarah Form */}
      <form onSubmit={handleSaveProfil} className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">1. Banner & Pengantar Profil</h3>
              <p className="text-xs text-slate-500">Teks banner utama di bagian paling atas halaman Profil</p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Profil & Visi Misi</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Banner</label>
              <input
                type="text"
                value={profilForm.headerBadge}
                onChange={e => handleFieldChange('headerBadge', e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Banner Profil</label>
              <input
                type="text"
                value={profilForm.headerTitle}
                onChange={e => handleFieldChange('headerTitle', e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Subjudul / Deskripsi Banner</label>
            <textarea
              rows={2}
              value={profilForm.headerDesc}
              onChange={e => handleFieldChange('headerDesc', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-bold text-sm text-slate-900">Sejarah & Latar Belakang</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Sejarah</label>
                <input
                  type="text"
                  value={profilForm.historyBadge}
                  onChange={e => handleFieldChange('historyBadge', e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Sejarah</label>
                <input
                  type="text"
                  value={profilForm.historyTitle}
                  onChange={e => handleFieldChange('historyTitle', e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraf Sejarah 1</label>
              <textarea
                rows={3}
                value={profilForm.historyPara1}
                onChange={e => handleFieldChange('historyPara1', e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Paragraf Sejarah 2</label>
              <textarea
                rows={3}
                value={profilForm.historyPara2}
                onChange={e => handleFieldChange('historyPara2', e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600">Statistik 1</label>
                <input
                  type="text"
                  placeholder="2018"
                  value={profilForm.statYear}
                  onChange={e => handleFieldChange('statYear', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  placeholder="Tahun Berdiri"
                  value={profilForm.statYearLabel}
                  onChange={e => handleFieldChange('statYearLabel', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600">Statistik 2</label>
                <input
                  type="text"
                  placeholder="180+"
                  value={profilForm.statSantri}
                  onChange={e => handleFieldChange('statSantri', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  placeholder="Santri Aktif"
                  value={profilForm.statSantriLabel}
                  onChange={e => handleFieldChange('statSantriLabel', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-600">Statistik 3</label>
                <input
                  type="text"
                  placeholder="120+"
                  value={profilForm.statAlumni}
                  onChange={e => handleFieldChange('statAlumni', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
                />
                <input
                  type="text"
                  placeholder="Alumni 30 Juz"
                  value={profilForm.statAlumniLabel}
                  onChange={e => handleFieldChange('statAlumniLabel', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-2 space-y-4">
              <ImagePickerField
                label="Foto Dokumentasi Kompleks Pesantren / Sejarah"
                value={profilForm.historyImageUrl}
                onChange={(url) => handleFieldChange('historyImageUrl', url)}
                helperText="Foto ini tampil di samping narasi sejarah. Anda bisa unggah langsung dari HP/Laptop atau memilih dari Galeri Pesantren."
                aspectRatio="video"
              />
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keterangan Foto (Caption)</label>
                <input
                  type="text"
                  value={profilForm.historyImageCaption}
                  onChange={e => handleFieldChange('historyImageCaption', e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Visi & Misi */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-bold text-sm text-slate-900">2. Landasan Filosofis: Visi & Misi</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Bagian Visi</label>
                <input
                  type="text"
                  value={profilForm.visiTitle || 'Visi Utama'}
                  onChange={e => handleFieldChange('visiTitle', e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Bagian Misi</label>
                <input
                  type="text"
                  value={profilForm.misiTitle || 'Misi Pesantren'}
                  onChange={e => handleFieldChange('misiTitle', e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pernyataan Visi Utama</label>
              <textarea
                rows={3}
                value={profilForm.visiText}
                onChange={e => handleFieldChange('visiText', e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">Daftar Poin Misi Pesantren</label>
              <div className="space-y-2">
                {profilForm.misiList.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 text-xs font-bold text-teal-700 text-center">{idx + 1}.</span>
                    <input
                      type="text"
                      value={m}
                      onChange={e => handleMisiTextChange(idx, e.target.value)}
                      className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMisi(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Hapus Misi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Ketik butir misi baru..."
                  value={newMisiText}
                  onChange={e => setNewMisiText(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2 bg-white border border-slate-200 rounded-xl"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMisi();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddMisi}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Misi</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Banner, Sejarah & Visi Misi</span>
            </button>
          </div>
        </div>
      </form>

      {/* 3. NILAI-NILAI PESANTREN */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">3. Nilai-Nilai Luhur Karakter Pesantren</h3>
            <p className="text-xs text-slate-500">Nilai karakter santri yang ditampilkan pada halaman Profil ({values.length} nilai aktif)</p>
          </div>
          <button
            type="button"
            onClick={openAddValue}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Nilai Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map(v => (
            <div
              key={v.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
                    {v.iconName || 'Award'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditValue(v)}
                      className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                      title="Edit Nilai"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus nilai "${v.title}"?`)) {
                          deleteValue(v.id);
                          showToast('Dihapus', `Nilai "${v.title}" telah dihapus.`);
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                      title="Hapus Nilai"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-xs text-slate-900">{v.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DEWAN PENGASUH & MASYAYIKH */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">4. Profil Dewan Pengasuh & Masyayikh</h3>
            <p className="text-xs text-slate-500">Pimpinan pesantren, ketua tahfidz, dan pengasuhan santri ({dewanPengasuh.length} pengasuh)</p>
          </div>
          <button
            type="button"
            onClick={openAddDewan}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Asatidz / Dewan Pengasuh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dewanPengasuh.map(d => (
            <div
              key={d.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-slate-200 overflow-hidden relative">
                  <img
                    src={d.photo}
                    alt={d.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 flex gap-1 bg-slate-900/70 p-1 rounded-xl backdrop-blur-xs">
                    <button
                      onClick={() => openEditDewan(d)}
                      className="p-1.5 text-white hover:text-teal-300 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus dewan pengasuh "${d.name}"?`)) {
                          deleteDewanPengasuh(d.id);
                          showToast('Dihapus', `Data ${d.name} telah dihapus.`);
                        }
                      }}
                      className="p-1.5 text-white hover:text-rose-300 transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-bold text-xs text-slate-900">{d.name}</h4>
                  <div className="text-[11px] font-semibold text-teal-700">{d.role}</div>
                  <p className="text-[10px] text-slate-500 pt-1 leading-relaxed">{d.credential}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL VALUE */}
      {isValueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingValue ? 'Edit Nilai Karakter' : 'Tambah Nilai Karakter Baru'}
              </h4>
              <button
                onClick={() => setIsValueModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveValue} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Nilai / Karakter</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Al-Ikhlas (Keikhlasan)"
                  value={valTitle}
                  onChange={e => setValTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Nilai</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Penjelasan ringkas makna nilai ini bagi santri..."
                  value={valDesc}
                  onChange={e => setValDesc(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ikon Tampilan</label>
                <select
                  value={valIcon}
                  onChange={e => setValIcon(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Heart">Heart (Keikhlasan & Hati)</option>
                  <option value="Award">Award (Kualitas & Prestasi)</option>
                  <option value="Compass">Compass (Istiqomah & Arah)</option>
                  <option value="ShieldCheck">ShieldCheck (Adab & Integritas)</option>
                  <option value="Target">Target (Kemandirian & Sasaran)</option>
                  <option value="Users">Users (Ukhuwah & Kebersamaan)</option>
                  <option value="BookOpen">BookOpen (Ilmu & Hafalan)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsValueModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm cursor-pointer"
                >
                  Simpan Nilai
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DEWAN PENGASUH */}
      {isDewanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingDewan ? 'Edit Data Dewan Pengasuh' : 'Tambah Dewan Pengasuh Baru'}
              </h4>
              <button
                onClick={() => setIsDewanModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDewan} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dr. KH. Muhammad Faiz Hidayatullah, M.A."
                  value={dewanName}
                  onChange={e => setDewanName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Jabatan / Peran</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pengasuh & Pimpinan Pondok Pesantren"
                  value={dewanRole}
                  onChange={e => setDewanRole(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kredensial / Sanad / Lulusan</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Contoh: Alumni Univ. Al-Azhar Kairo & Pemegang Sanad Qira'at 'Asyrah"
                  value={dewanCredential}
                  onChange={e => setDewanCredential(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <ImagePickerField
                label="Foto Profil Dewan Pengasuh / Asatidz"
                value={dewanPhoto}
                onChange={(url) => setDewanPhoto(url)}
                helperText="Bisa diunggah langsung dari perangkat (HP/Laptop) atau dipilih dari Galeri."
                aspectRatio="square"
                required
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDewanModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm cursor-pointer"
                >
                  Simpan Dewan Pengasuh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
