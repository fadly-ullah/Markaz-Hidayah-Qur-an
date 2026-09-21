import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { EducationFeeItem, ScholarshipInfo } from '../../types';
import {
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  Sparkles,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

export const AdminEditBiaya: React.FC = () => {
  const {
    feeItems,
    updateFeeItem,
    addFeeItem,
    deleteFeeItem,
    scholarshipInfo,
    updateScholarshipInfo,
    showToast,
    pushToHosting,
    syncApiUrl
  } = usePesantren();

  // Local state for scholarship info
  const [scholarshipForm, setScholarshipForm] = useState<ScholarshipInfo>({ ...scholarshipInfo });

  // State for adding a new fee item
  const [isAddingFee, setIsAddingFee] = useState(false);
  const [newFeeName, setNewFeeName] = useState('');
  const [newFeeAmount, setNewFeeAmount] = useState('');
  const [newFeeCategory, setNewFeeCategory] = useState('Satu Kali');
  const [newFeeDesc, setNewFeeDesc] = useState('');

  // Editing state for fee item
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [editFeeName, setEditFeeName] = useState('');
  const [editFeeAmount, setEditFeeAmount] = useState('');
  const [editFeeCategory, setEditFeeCategory] = useState('');
  const [editFeeDesc, setEditFeeDesc] = useState('');

  const startEditFee = (item: EducationFeeItem) => {
    setEditingFeeId(item.id);
    setEditFeeName(item.name);
    setEditFeeAmount(item.amount);
    setEditFeeCategory(item.category || 'Satu Kali');
    setEditFeeDesc(item.description);
  };

  const handleSaveFeeEdit = (id: string) => {
    if (!editFeeName.trim() || !editFeeAmount.trim()) {
      showToast('Gagal', 'Nama dan nominal biaya wajib diisi.', 'error');
      return;
    }
    updateFeeItem(id, {
      name: editFeeName.trim(),
      amount: editFeeAmount.trim(),
      category: editFeeCategory.trim(),
      description: editFeeDesc.trim()
    });
    setEditingFeeId(null);
  };

  const handleCreateFeeItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeeName.trim() || !newFeeAmount.trim()) {
      showToast('Gagal', 'Nama dan nominal biaya wajib diisi.', 'error');
      return;
    }
    addFeeItem({
      name: newFeeName.trim(),
      amount: newFeeAmount.trim(),
      category: newFeeCategory.trim(),
      description: newFeeDesc.trim()
    });
    setNewFeeName('');
    setNewFeeAmount('');
    setNewFeeDesc('');
    setIsAddingFee(false);
  };

  const handleSaveScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    updateScholarshipInfo(scholarshipForm);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: RINCIAN BIAYA PENDIDIKAN */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Pengaturan Rincian Biaya Pendidikan</h3>
              <p className="text-xs text-slate-500">
                Atur komponen biaya yang tampil di Halaman Pendaftaran santri baru (PSB).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingFee(!isAddingFee)}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Komponen Biaya</span>
          </button>
        </div>

        {/* Add New Fee Form */}
        {isAddingFee && (
          <form
            onSubmit={handleCreateFeeItem}
            className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-4"
          >
            <h4 className="font-bold text-xs uppercase tracking-wider text-teal-800">
              Form Tambah Komponen Biaya Baru
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Komponen Biaya *
                </label>
                <input
                  type="text"
                  required
                  placeholder="cth: Infaq Formulir & Seleksi"
                  value={newFeeName}
                  onChange={(e) => setNewFeeName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nominal Biaya *
                </label>
                <input
                  type="text"
                  required
                  placeholder="cth: Rp 250.000 atau Rp 1.450.000 / bln"
                  value={newFeeAmount}
                  onChange={(e) => setNewFeeAmount(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Pembayaran
                </label>
                <select
                  value={newFeeCategory}
                  onChange={(e) => setNewFeeCategory(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Satu Kali">Satu Kali (Awal Pendaftaran)</option>
                  <option value="Bulanan">Bulanan (SPP Rutin)</option>
                  <option value="Tahunan">Tahunan / Semester</option>
                  <option value="Opsional">Opsional / Sukarela</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Keterangan / Rincian Cakupan Biaya
              </label>
              <textarea
                rows={2}
                placeholder="Rincian fasilitas, konsumsi, atau perlengkapan yang didapatkan santri..."
                value={newFeeDesc}
                onChange={(e) => setNewFeeDesc(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingFee(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs"
              >
                Simpan Komponen Biaya
              </button>
            </div>
          </form>
        )}

        {/* Existing Fee Items List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {feeItems.map((item) => {
            const isEditing = editingFeeId === item.id;
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-teal-300 transition-all"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Nama Komponen
                      </label>
                      <input
                        type="text"
                        value={editFeeName}
                        onChange={(e) => setEditFeeName(e.target.value)}
                        className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Nominal Biaya
                      </label>
                      <input
                        type="text"
                        value={editFeeAmount}
                        onChange={(e) => setEditFeeAmount(e.target.value)}
                        className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-teal-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Kategori
                      </label>
                      <input
                        type="text"
                        value={editFeeCategory}
                        onChange={(e) => setEditFeeCategory(e.target.value)}
                        className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Keterangan
                      </label>
                      <textarea
                        rows={2}
                        value={editFeeDesc}
                        onChange={(e) => setEditFeeDesc(e.target.value)}
                        className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingFeeId(null)}
                        className="px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-200"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveFeeEdit(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Simpan</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                          {item.name}
                        </span>
                        {item.category && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-semibold">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-black text-slate-900">{item.amount}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEditFee(item)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-300 transition-colors"
                        title="Edit Komponen Biaya"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Hapus komponen biaya "${item.name}"?`)) {
                            deleteFeeItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
                        title="Hapus Komponen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: PENGATURAN PROGRAM BEASISWA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Pengaturan Informasi Beasiswa Santri</h3>
            <p className="text-xs text-slate-500">
              Ubah deskripsi, persyaratan, dan kemitraan beasiswa yang tampil di website.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveScholarship} className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-bold text-xs text-slate-900">Status Penayangan Beasiswa</div>
              <p className="text-[11px] text-slate-500">
                Aktifkan jika pesantren sedang membuka atau menerima pengajuan beasiswa santri.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={scholarshipForm.isActive}
                onChange={(e) =>
                  setScholarshipForm(prev => ({ ...prev, isActive: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judul Program Beasiswa
              </label>
              <input
                type="text"
                value={scholarshipForm.title}
                onChange={(e) =>
                  setScholarshipForm(prev => ({ ...prev, title: e.target.value }))
                }
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Badge / Sorotan Program
              </label>
              <input
                type="text"
                placeholder="cth: Kuota Terbatas atau Bebas SPP 100%"
                value={scholarshipForm.badge || ''}
                onChange={(e) =>
                  setScholarshipForm(prev => ({ ...prev, badge: e.target.value }))
                }
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Deskripsi Program Beasiswa
            </label>
            <textarea
              rows={3}
              value={scholarshipForm.description}
              onChange={(e) =>
                setScholarshipForm(prev => ({ ...prev, description: e.target.value }))
              }
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Syarat & Prosedur Pengajuan Beasiswa
            </label>
            <textarea
              rows={2}
              value={scholarshipForm.requirements || ''}
              onChange={(e) =>
                setScholarshipForm(prev => ({ ...prev, requirements: e.target.value }))
              }
              placeholder="cth: Melampirkan SKTM dari kelurahan dan sertifikat hafalan minimal 5 juz..."
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Informasi Kemitraan Donatur / Penyalur
            </label>
            <input
              type="text"
              value={scholarshipForm.partnerInfo || ''}
              onChange={(e) =>
                setScholarshipForm(prev => ({ ...prev, partnerInfo: e.target.value }))
              }
              placeholder="cth: Didukung penuh oleh donatur via kemitraan mariberbagi.net"
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Perubahan akan langsung terlihat di Halaman Pendaftaran santri baru.</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Informasi Beasiswa</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
