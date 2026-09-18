import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { Program, DailyScheduleItem, TargetTimelineItem } from '../../types';
import { ImagePickerField } from './ImagePickerField';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Eye,
  BookOpen,
  Clock,
  Target,
  CheckCircle2
} from 'lucide-react';

export const AdminEditProgram: React.FC = () => {
  const {
    programs,
    addProgram,
    updateProgram,
    deleteProgram,
    dailySchedule,
    addScheduleItem,
    updateScheduleItem,
    deleteScheduleItem,
    targetTimeline,
    addTargetItem,
    updateTargetItem,
    deleteTargetItem,
    showToast,
    setCurrentRoute
  } = usePesantren();

  const [activeSubTab, setActiveSubTab] = useState<'programs' | 'schedule' | 'target'>('programs');

  // Program Modal State
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [progName, setProgName] = useState('');
  const [progTarget, setProgTarget] = useState('');
  const [progDuration, setProgDuration] = useState('3 Tahun');
  const [progMethod, setProgMethod] = useState('Talaqqi & Takrar');
  const [progDesc, setProgDesc] = useState('');
  const [progImage, setProgImage] = useState('');
  const [progHighlightsText, setProgHighlightsText] = useState('');

  // Schedule Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DailyScheduleItem | null>(null);
  const [schTime, setSchTime] = useState('');
  const [schActivity, setSchActivity] = useState('');
  const [schCategory, setSchCategory] = useState<DailyScheduleItem['category']>('Tahfidz');

  // Target Modal State
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);
  const [editingTarget, setEditingTarget] = useState<TargetTimelineItem | null>(null);
  const [tgtYear, setTgtYear] = useState('');
  const [tgtJuz, setTgtJuz] = useState('');
  const [tgtFocus, setTgtFocus] = useState('');

  // Program handlers
  const openAddProgram = () => {
    setEditingProgram(null);
    setProgName('');
    setProgTarget('Mutqin 30 Juz & Ijazah Sanad Resmi');
    setProgDuration('3 Tahun (SMP / SMA)');
    setProgMethod('Talaqqi & Takrar Mandiri');
    setProgDesc('');
    setProgImage('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80');
    setProgHighlightsText('Halaqah talaqqi bersanad\nMuroja\'ah harian terjadwal\nBimbingan intensif asatidz');
    setIsProgramModalOpen(true);
  };

  const openEditProgram = (p: Program) => {
    setEditingProgram(p);
    setProgName(p.name);
    setProgTarget(p.target);
    setProgDuration(p.duration || '3 Tahun');
    setProgMethod(p.method || 'Talaqqi & Takrar');
    setProgDesc(p.description);
    setProgImage(p.imageUrl);
    setProgHighlightsText(p.highlights.join('\n'));
    setIsProgramModalOpen(true);
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progName.trim()) return;
    const highlights = progHighlightsText.split('\n').map(h => h.trim()).filter(Boolean);

    if (editingProgram) {
      updateProgram(editingProgram.id, {
        name: progName,
        target: progTarget,
        duration: progDuration,
        method: progMethod,
        description: progDesc,
        imageUrl: progImage,
        highlights
      });
      showToast('Program Diperbarui', `Program "${progName}" berhasil diubah.`);
    } else {
      addProgram({
        name: progName,
        target: progTarget,
        duration: progDuration,
        method: progMethod,
        description: progDesc,
        imageUrl: progImage,
        highlights
      });
      showToast('Program Ditambahkan', `Program baru "${progName}" berhasil disimpan.`);
    }
    setIsProgramModalOpen(false);
  };

  // Schedule handlers
  const openAddSchedule = () => {
    setEditingSchedule(null);
    setSchTime('05.00 - 06.00');
    setSchActivity('');
    setSchCategory('Tahfidz');
    setIsScheduleModalOpen(true);
  };

  const openEditSchedule = (s: DailyScheduleItem) => {
    setEditingSchedule(s);
    setSchTime(s.time);
    setSchActivity(s.activity);
    setSchCategory(s.category);
    setIsScheduleModalOpen(true);
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schActivity.trim()) return;

    if (editingSchedule) {
      updateScheduleItem(editingSchedule.id, {
        time: schTime,
        activity: schActivity,
        category: schCategory
      });
      showToast('Jadwal Diperbarui', 'Item jadwal berhasil diperbarui.');
    } else {
      addScheduleItem({
        time: schTime,
        activity: schActivity,
        category: schCategory
      });
      showToast('Jadwal Ditambahkan', 'Item jadwal baru berhasil ditambahkan.');
    }
    setIsScheduleModalOpen(false);
  };

  // Target handlers
  const openAddTarget = () => {
    setEditingTarget(null);
    setTgtYear('Tahun ke-1');
    setTgtJuz('Juz 1 – 10');
    setTgtFocus('');
    setIsTargetModalOpen(true);
  };

  const openEditTarget = (t: TargetTimelineItem) => {
    setEditingTarget(t);
    setTgtYear(t.year);
    setTgtJuz(t.juz);
    setTgtFocus(t.focus);
    setIsTargetModalOpen(true);
  };

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tgtFocus.trim()) return;

    if (editingTarget) {
      updateTargetItem(editingTarget.id, {
        year: tgtYear,
        juz: tgtJuz,
        focus: tgtFocus
      });
      showToast('Target Diperbarui', 'Target capaian berhasil diperbarui.');
    } else {
      addTargetItem({
        year: tgtYear,
        juz: tgtJuz,
        focus: tgtFocus
      });
      showToast('Target Ditambahkan', 'Target capaian baru berhasil ditambahkan.');
    }
    setIsTargetModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kelola Program Pendidikan, Jadwal & Target 30 Juz</h2>
          <p className="text-xs text-slate-500">
            Atur kurikulum, jadwal 24 jam keseharian santri, dan tahapan peta jalan target hafalan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentRoute('program')}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat di Halaman Program</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab('programs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'programs'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Program Pendidikan ({programs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('schedule')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'schedule'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Jadwal Harian 24 Jam ({dailySchedule.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('target')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'target'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Target Capaian 30 Juz ({targetTimeline.length})</span>
        </button>
      </div>

      {/* 1. PROGRAM LIST */}
      {activeSubTab === 'programs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Daftar Program Pendidikan</h3>
              <p className="text-xs text-slate-500">Program utama yang ditampilkan di beranda dan halaman program</p>
            </div>
            <button
              onClick={openAddProgram}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Program Baru</span>
            </button>
          </div>

          <div className="space-y-4">
            {programs.map((prog, idx) => (
              <div
                key={prog.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-5 items-start justify-between"
              >
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src={prog.imageUrl}
                    alt={prog.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">
                      Program {idx + 1}
                    </span>
                    <h4 className="font-bold text-base text-slate-900">{prog.name}</h4>
                  </div>
                  <div className="text-xs font-semibold text-teal-700">🎯 Target: {prog.target}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {prog.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700"
                      >
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                  <button
                    onClick={() => openEditProgram(prog)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus program "${prog.name}"?`)) {
                        deleteProgram(prog.id);
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. DAILY SCHEDULE */}
      {activeSubTab === 'schedule' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Jadwal Rutin Keseharian Santri (24 Jam)</h3>
              <p className="text-xs text-slate-500">Jadwal kegiatan dari bangun tidur hingga istirahat malam</p>
            </div>
            <button
              onClick={openAddSchedule}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Item Jadwal</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {dailySchedule.map(item => (
              <div
                key={item.id}
                className="py-3 px-3 hover:bg-slate-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-700 w-28 shrink-0">
                    {item.time}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-900">
                    {item.activity}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.category === 'Tahfidz'
                      ? 'bg-teal-100 text-teal-800'
                      : item.category === 'Ibadah'
                      ? 'bg-sky-100 text-sky-800'
                      : item.category === 'Akademik'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.category}
                  </span>
                  <button
                    onClick={() => openEditSchedule(item)}
                    className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus jadwal "${item.activity}"?`)) {
                        deleteScheduleItem(item.id);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TARGET TIMELINE */}
      {activeSubTab === 'target' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Target Capaian 30 Juz Bersanad</h3>
              <p className="text-xs text-slate-500">Tahapan pencapaian hafalan per tahun bagi santri</p>
            </div>
            <button
              onClick={openAddTarget}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Target Capaian</span>
            </button>
          </div>

          <div className="space-y-4">
            {targetTimeline.map(tgt => (
              <div
                key={tgt.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-teal-700 text-white text-xs font-bold">
                      {tgt.year}
                    </span>
                    <span className="text-xs font-bold text-teal-900 bg-teal-100 px-2 py-0.5 rounded-md">
                      {tgt.juz}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 pt-1 leading-relaxed">{tgt.focus}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => openEditTarget(tgt)}
                    className="p-2 text-slate-600 hover:text-teal-700 hover:bg-white rounded-xl border border-slate-200 transition-colors cursor-pointer"
                    title="Edit Target"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Hapus target "${tgt.year}"?`)) {
                        deleteTargetItem(tgt.id);
                      }
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                    title="Hapus Target"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL PROGRAM */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingProgram ? 'Edit Program Pendidikan' : 'Tambah Program Pendidikan Baru'}
              </h4>
              <button
                onClick={() => setIsProgramModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Program</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tahfidz 30 Juz Reguler"
                  value={progName}
                  onChange={e => setProgName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Utama</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Mutqin 30 Juz & Sanad Jazariyyah"
                  value={progTarget}
                  onChange={e => setProgTarget(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Masa Pendidikan (Durasi)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 3 Tahun / 6 Semester"
                    value={progDuration}
                    onChange={e => setProgDuration(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Pembelajaran</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Talaqqi Bersanad & Takrar"
                    value={progMethod}
                    onChange={e => setProgMethod(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Lengkap Program</label>
                <textarea
                  rows={3}
                  required
                  value={progDesc}
                  onChange={e => setProgDesc(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <ImagePickerField
                label="Foto Program Pendidikan / Tahfidz"
                value={progImage}
                onChange={(url) => setProgImage(url)}
                helperText="Foto ini tampil pada kartu program. Bisa diunggah dari HP/Laptop atau dipilih dari galeri pesantren."
                aspectRatio="video"
                required
              />

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keunggulan Program (Pisahkan per baris)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Talaqqi intensif&#10;Sanad bersambung ke Rasulullah&#10;Kajian kitab dasar"
                  value={progHighlightsText}
                  onChange={e => setProgHighlightsText(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm cursor-pointer"
                >
                  Simpan Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL JADWAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingSchedule ? 'Edit Item Jadwal Harian' : 'Tambah Item Jadwal Harian'}
              </h4>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rentang Waktu</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 05.30 - 07.00"
                  value={schTime}
                  onChange={e => setSchTime(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Aktivitas / Kegiatan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Halaqah Tahfidz I: Setoran Ziyadah"
                  value={schActivity}
                  onChange={e => setSchActivity(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori Aktivitas</label>
                <select
                  value={schCategory}
                  onChange={e => setSchCategory(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Tahfidz">Tahfidz</option>
                  <option value="Ibadah">Ibadah</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Kemandirian">Kemandirian</option>
                  <option value="Kebugaran">Kebugaran</option>
                  <option value="Istirahat">Istirahat</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm cursor-pointer"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TARGET */}
      {isTargetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-sm text-slate-900">
                {editingTarget ? 'Edit Target Capaian' : 'Tambah Target Capaian Baru'}
              </h4>
              <button
                onClick={() => setIsTargetModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTarget} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Periode / Tahun</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tahun ke-1"
                  value={tgtYear}
                  onChange={e => setTgtYear(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Juz</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Juz 1 – 10"
                  value={tgtJuz}
                  onChange={e => setTgtJuz(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fokus & Metodologi Pembelajaran</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Tahsin Al-Jazari, Tajwid Praktis, Itqon Juz 30-28..."
                  value={tgtFocus}
                  onChange={e => setTgtFocus(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTargetModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm cursor-pointer"
                >
                  Simpan Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
