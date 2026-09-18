import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import {
  SantriRegistration,
  RegistrationStatus,
  ProgramChoice
} from '../../types';
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  MessageCircle,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  User,
  Phone,
  Calendar,
  GraduationCap,
  Home,
  Briefcase,
  Award,
  FileText,
  X,
  Save,
  Filter
} from 'lucide-react';

const PROGRAM_OPTIONS: ProgramChoice[] = [
  'Tahfidz 30 Juz Reguler',
  'Tahfidz & Diniyah Terpadu',
  'Program Takhassus Al-Qur\'an',
  'Karantina Tahfidz Liburan'
];

const STATUS_OPTIONS: RegistrationStatus[] = [
  'Menunggu Verifikasi',
  'Lolos Berkas',
  'Jadwal Tes Seleksi',
  'Diterima',
  'Ditolak'
];

export const AdminRegistrations: React.FC = () => {
  const {
    registrations,
    updateRegistration,
    updateRegistrationStatus,
    deleteRegistration,
    registerNewSantri,
    sendWhatsAppNotification,
    showToast
  } = usePesantren();

  // Filter & Search
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [filterProgram, setFilterProgram] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [editingSantri, setEditingSantri] = useState<SantriRegistration | null>(null);
  const [deletingSantri, setDeletingSantri] = useState<SantriRegistration | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form State (Shared for Add / Edit)
  const [formStudentName, setFormStudentName] = useState('');
  const [formNisn, setFormNisn] = useState('');
  const [formGender, setFormGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [formBirthPlace, setFormBirthPlace] = useState('');
  const [formBirthDate, setFormBirthDate] = useState('');
  const [formPreviousSchool, setFormPreviousSchool] = useState('');
  const [formProgram, setFormProgram] = useState<ProgramChoice>('Tahfidz 30 Juz Reguler');
  const [formParentName, setFormParentName] = useState('');
  const [formParentRelation, setFormParentRelation] = useState<'Ayah' | 'Ibu' | 'Wali'>('Ayah');
  const [formParentPhone, setFormParentPhone] = useState('');
  const [formParentJob, setFormParentJob] = useState('');
  const [formParentAddress, setFormParentAddress] = useState('');
  const [formStatus, setFormStatus] = useState<RegistrationStatus>('Menunggu Verifikasi');
  const [formTestScore, setFormTestScore] = useState<string>('');
  const [formNotes, setFormNotes] = useState('');

  // Filter logic
  const filteredRegistrations = registrations.filter((santri) => {
    const matchStatus = filterStatus === 'Semua' || santri.status === filterStatus;
    const matchProgram = filterProgram === 'Semua' || santri.programChoice === filterProgram;
    const query = searchQuery.toLowerCase();
    const matchSearch =
      !query ||
      santri.studentName.toLowerCase().includes(query) ||
      santri.id.toLowerCase().includes(query) ||
      santri.parentPhone.includes(query) ||
      santri.parentName.toLowerCase().includes(query) ||
      santri.previousSchool.toLowerCase().includes(query) ||
      santri.nisn.toLowerCase().includes(query);

    return matchStatus && matchProgram && matchSearch;
  });

  // Open Edit Modal
  const handleOpenEdit = (santri: SantriRegistration) => {
    setEditingSantri(santri);
    setFormStudentName(santri.studentName);
    setFormNisn(santri.nisn || '');
    setFormGender(santri.gender);
    setFormBirthPlace(santri.birthPlace || '');
    setFormBirthDate(santri.birthDate || '');
    setFormPreviousSchool(santri.previousSchool || '');
    setFormProgram(santri.programChoice);
    setFormParentName(santri.parentName);
    setFormParentRelation(santri.parentRelation);
    setFormParentPhone(santri.parentPhone);
    setFormParentJob(santri.parentJob || '');
    setFormParentAddress(santri.parentAddress || '');
    setFormStatus(santri.status);
    setFormTestScore(santri.testScore !== undefined ? String(santri.testScore) : '');
    setFormNotes(santri.notes || '');
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setIsAddModalOpen(true);
    setFormStudentName('');
    setFormNisn('');
    setFormGender('Laki-laki');
    setFormBirthPlace('');
    setFormBirthDate('');
    setFormPreviousSchool('');
    setFormProgram('Tahfidz 30 Juz Reguler');
    setFormParentName('');
    setFormParentRelation('Ayah');
    setFormParentPhone('');
    setFormParentJob('');
    setFormParentAddress('');
    setFormStatus('Menunggu Verifikasi');
    setFormTestScore('');
    setFormNotes('');
  };

  // Save Edit Submit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSantri) return;

    if (!formStudentName.trim() || !formParentName.trim() || !formParentPhone.trim()) {
      showToast('Data Kurang Lengkap', 'Nama santri, nama wali, dan nomor WhatsApp wajib diisi.', 'error');
      return;
    }

    const testScoreNum = formTestScore.trim() !== '' ? Number(formTestScore) : undefined;

    updateRegistration(editingSantri.id, {
      studentName: formStudentName.trim(),
      nisn: formNisn.trim(),
      gender: formGender,
      birthPlace: formBirthPlace.trim(),
      birthDate: formBirthDate,
      previousSchool: formPreviousSchool.trim(),
      programChoice: formProgram,
      parentName: formParentName.trim(),
      parentRelation: formParentRelation,
      parentPhone: formParentPhone.trim(),
      parentJob: formParentJob.trim(),
      parentAddress: formParentAddress.trim(),
      status: formStatus,
      testScore: testScoreNum,
      notes: formNotes.trim()
    });

    setEditingSantri(null);
  };

  // Save Add Submit
  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStudentName.trim() || !formParentName.trim() || !formParentPhone.trim()) {
      showToast('Data Kurang Lengkap', 'Nama santri, nama wali, dan nomor WhatsApp wajib diisi.', 'error');
      return;
    }

    registerNewSantri({
      studentName: formStudentName.trim(),
      nisn: formNisn.trim() || '-',
      gender: formGender,
      birthPlace: formBirthPlace.trim() || '-',
      birthDate: formBirthDate || new Date().toISOString().split('T')[0],
      previousSchool: formPreviousSchool.trim() || '-',
      programChoice: formProgram,
      parentName: formParentName.trim(),
      parentRelation: formParentRelation,
      parentPhone: formParentPhone.trim(),
      parentJob: formParentJob.trim() || '-',
      parentAddress: formParentAddress.trim() || '-',
      notes: formNotes.trim()
    });

    setIsAddModalOpen(false);
  };

  // Delete Confirm
  const handleConfirmDelete = () => {
    if (!deletingSantri) return;
    deleteRegistration(deletingSantri.id);
    setDeletingSantri(null);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      showToast('Data Kosong', 'Belum ada data pendaftar untuk diekspor.', 'info');
      return;
    }

    const headers = [
      'No Registrasi',
      'Nama Santri',
      'NISN',
      'Jenis Kelamin',
      'Tempat Lahir',
      'Tanggal Lahir',
      'Asal Sekolah',
      'Pilihan Program',
      'Nama Wali',
      'Hubungan',
      'No WhatsApp',
      'Pekerjaan Wali',
      'Alamat',
      'Status Pendaftaran',
      'Nilai Tes',
      'Catatan',
      'Tanggal Mendaftar'
    ];

    const rows = registrations.map((s) => [
      `"${s.id}"`,
      `"${s.studentName.replace(/"/g, '""')}"`,
      `"${s.nisn || ''}"`,
      `"${s.gender}"`,
      `"${s.birthPlace || ''}"`,
      `"${s.birthDate || ''}"`,
      `"${(s.previousSchool || '').replace(/"/g, '""')}"`,
      `"${s.programChoice}"`,
      `"${s.parentName.replace(/"/g, '""')}"`,
      `"${s.parentRelation}"`,
      `"${s.parentPhone}"`,
      `"${(s.parentJob || '').replace(/"/g, '""')}"`,
      `"${(s.parentAddress || '').replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${s.testScore !== undefined ? s.testScore : ''}"`,
      `"${(s.notes || '').replace(/"/g, '""')}"`,
      `"${s.registeredAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data-pendaftar-mhq-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Ekspor Berhasil', 'Data pendaftar berhasil diunduh dalam format CSV.');
  };

  // Status Badge Helper
  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'Diterima':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Jadwal Tes Seleksi':
        return 'bg-sky-50 text-sky-800 border-sky-300';
      case 'Lolos Berkas':
        return 'bg-teal-50 text-teal-800 border-teal-300';
      case 'Ditolak':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-amber-50 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
      {/* Top Header & Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-slate-900">Manajemen Data Pendaftar Santri</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold text-xs">
              {registrations.length} Pendaftar
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Admin memiliki akses penuh untuk mengubah, menghapus, menambah data pendaftar, memperbarui status seleksi, dan mengirim notifikasi WhatsApp.
          </p>
        </div>

        {/* Action Buttons: Add Santri & Export CSV */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            title="Unduh data pendaftar ke file Excel/CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ekspor CSV</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pendaftar</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="text-[11px] font-semibold text-slate-500">Total Pendaftar</div>
          <div className="text-lg font-bold text-slate-900 mt-0.5">{registrations.length}</div>
        </div>
        <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
          <div className="text-[11px] font-semibold text-amber-700">Menunggu Verif</div>
          <div className="text-lg font-bold text-amber-900 mt-0.5">
            {registrations.filter(r => r.status === 'Menunggu Verifikasi').length}
          </div>
        </div>
        <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-200">
          <div className="text-[11px] font-semibold text-sky-700">Jadwal Tes</div>
          <div className="text-lg font-bold text-sky-900 mt-0.5">
            {registrations.filter(r => r.status === 'Jadwal Tes Seleksi').length}
          </div>
        </div>
        <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
          <div className="text-[11px] font-semibold text-emerald-700">Diterima</div>
          <div className="text-lg font-bold text-emerald-900 mt-0.5">
            {registrations.filter(r => r.status === 'Diterima').length}
          </div>
        </div>
        <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold text-rose-700">Ditolak</div>
          <div className="text-lg font-bold text-rose-900 mt-0.5">
            {registrations.filter(r => r.status === 'Ditolak').length}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama santri, no registrasi, wali, no WA, NISN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-medium text-slate-700 cursor-pointer"
            >
              <option value="Semua">Semua Status ({registrations.length})</option>
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st} ({registrations.filter(r => r.status === st).length})
                </option>
              ))}
            </select>
          </div>

          {/* Program Filter */}
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-medium text-slate-700 cursor-pointer"
          >
            <option value="Semua">Semua Program</option>
            {PROGRAM_OPTIONS.map((pr) => (
              <option key={pr} value={pr}>{pr}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Registrations Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
              <th className="p-3.5">No. Reg & Tgl</th>
              <th className="p-3.5">Nama Santri & Biodata</th>
              <th className="p-3.5">Pilihan Program</th>
              <th className="p-3.5">Wali & WhatsApp</th>
              <th className="p-3.5">Status & Nilai</th>
              <th className="p-3.5 text-center">Kelola Data</th>
              <th className="p-3.5 text-right">Notif WA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRegistrations.map((santri) => (
              <tr key={santri.id} className="hover:bg-slate-50/70 transition-colors">
                {/* No Reg & Date */}
                <td className="p-3.5 align-top">
                  <div className="font-mono font-bold text-teal-800 text-xs">
                    {santri.id}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {santri.registeredAt}
                  </div>
                </td>

                {/* Santri Biodata */}
                <td className="p-3.5 align-top max-w-xs">
                  <div className="font-bold text-slate-900 text-sm">{santri.studentName}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {santri.gender} • NISN: {santri.nisn || '-'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Asal: {santri.previousSchool || '-'}
                  </div>
                  {santri.notes && (
                    <div className="mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md inline-block max-w-[200px] truncate" title={santri.notes}>
                      Catatan: {santri.notes}
                    </div>
                  )}
                </td>

                {/* Program */}
                <td className="p-3.5 align-top">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 text-[11px] font-semibold border border-teal-200/60 inline-block">
                    {santri.programChoice}
                  </span>
                </td>

                {/* Parent & Phone */}
                <td className="p-3.5 align-top">
                  <div className="font-medium text-slate-800">
                    {santri.parentName} <span className="text-[11px] text-slate-400">({santri.parentRelation})</span>
                  </div>
                  <div className="font-mono text-teal-700 font-semibold text-xs mt-0.5">
                    {santri.parentPhone}
                  </div>
                  {santri.parentJob && (
                    <div className="text-[10px] text-slate-400 mt-0.5">{santri.parentJob}</div>
                  )}
                </td>

                {/* Status Quick Dropdown */}
                <td className="p-3.5 align-top">
                  <select
                    value={santri.status}
                    onChange={(e) => {
                      updateRegistrationStatus(santri.id, e.target.value as RegistrationStatus);
                      showToast('Status Diperbarui', `Status ${santri.studentName} diubah menjadi "${e.target.value}".`);
                    }}
                    className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${getStatusBadge(santri.status)}`}
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {santri.testScore !== undefined && (
                    <div className="text-[11px] text-slate-600 mt-1 font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-500" />
                      <span>Nilai: {santri.testScore}</span>
                    </div>
                  )}
                </td>

                {/* Action Buttons: UBAH (Edit) & HAPUS (Delete) */}
                <td className="p-3.5 align-top text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(santri)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px] border border-amber-200 transition-colors cursor-pointer"
                      title="Ubah / Edit seluruh data pendaftar ini"
                    >
                      <Edit3 className="w-3 h-3 text-amber-600" />
                      <span>Ubah</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingSantri(santri)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-[11px] border border-rose-200 transition-colors cursor-pointer"
                      title="Hapus data pendaftar ini secara permanen"
                    >
                      <Trash2 className="w-3 h-3 text-rose-600" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </td>

                {/* WhatsApp Notification Action */}
                <td className="p-3.5 align-top text-right">
                  {santri.status === 'Jadwal Tes Seleksi' ? (
                    <button
                      type="button"
                      onClick={() => {
                        const url = sendWhatsAppNotification(santri.id, 'test_schedule');
                        window.open(url, '_blank');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-[11px] border border-sky-200 transition-colors cursor-pointer"
                      title="Kirim Undangan Jadwal Tes Seleksi via WA"
                    >
                      <MessageCircle className="w-3 h-3 text-sky-600" />
                      <span>Undangan Tes</span>
                    </button>
                  ) : santri.status === 'Diterima' ? (
                    <button
                      type="button"
                      onClick={() => {
                        const url = sendWhatsAppNotification(santri.id, 'acceptance');
                        window.open(url, '_blank');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 transition-colors cursor-pointer"
                      title="Kirim Pengumuman Diterima via WA"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-600" />
                      <span>Notif Diterima</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const url = sendWhatsAppNotification(santri.id, 'registration_received');
                        window.open(url, '_blank');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] border border-teal-200 transition-colors cursor-pointer"
                      title="Kirim Bukti Registrasi via WA"
                    >
                      <MessageCircle className="w-3 h-3 text-teal-600" />
                      <span>Kirim Bukti</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRegistrations.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <User className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-500">
            Tidak ada data pendaftar yang cocok dengan filter atau pencarian.
          </p>
          {(searchQuery || filterStatus !== 'Semua' || filterProgram !== 'Semua') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('Semua');
                setFilterProgram('Semua');
              }}
              className="mt-2 text-xs font-bold text-teal-700 hover:text-teal-800 underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL UBAH / EDIT DATA PENDAFTAR                                         */}
      {/* ========================================================================= */}
      {editingSantri && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Ubah Data Pendaftar: {editingSantri.studentName}
                  </h3>
                  <p className="text-xs font-mono text-teal-700">
                    ID Registrasi: {editingSantri.id} • Terdaftar: {editingSantri.registeredAt}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingSantri(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              {/* SECTION 1: DATA CALON SANTRI */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-700" />
                  <span>1. Identitas Calon Santri</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Lengkap Santri <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formStudentName}
                      onChange={(e) => setFormStudentName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      NISN (Nomor Induk Siswa Nasional)
                    </label>
                    <input
                      type="text"
                      value={formNisn}
                      onChange={(e) => setFormNisn(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Jenis Kelamin
                    </label>
                    <select
                      value={formGender}
                      onChange={(e) => setFormGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Pilihan Program <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formProgram}
                      onChange={(e) => setFormProgram(e.target.value as ProgramChoice)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    >
                      {PROGRAM_OPTIONS.map((pr) => (
                        <option key={pr} value={pr}>{pr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      value={formBirthPlace}
                      onChange={(e) => setFormBirthPlace(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      value={formBirthDate}
                      onChange={(e) => setFormBirthDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Asal Sekolah Sebelumnya
                    </label>
                    <input
                      type="text"
                      value={formPreviousSchool}
                      onChange={(e) => setFormPreviousSchool(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: DATA ORANG TUA / WALI */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-teal-700" />
                  <span>2. Data Orang Tua / Wali Santri</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Orang Tua / Wali <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formParentName}
                      onChange={(e) => setFormParentName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hubungan Keluarga
                    </label>
                    <select
                      value={formParentRelation}
                      onChange={(e) => setFormParentRelation(e.target.value as 'Ayah' | 'Ibu' | 'Wali')}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    >
                      <option value="Ayah">Ayah</option>
                      <option value="Ibu">Ibu</option>
                      <option value="Wali">Wali</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      No. WhatsApp Wali <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formParentPhone}
                      onChange={(e) => setFormParentPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Pekerjaan Orang Tua / Wali
                    </label>
                    <input
                      type="text"
                      value={formParentJob}
                      onChange={(e) => setFormParentJob(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Alamat Lengkap Domisili
                    </label>
                    <textarea
                      rows={2}
                      value={formParentAddress}
                      onChange={(e) => setFormParentAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: STATUS SELEKSI & PENILAIAN */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-teal-700" />
                  <span>3. Status Pendaftaran & Penilaian Seleksi</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Status Pendaftaran Saat Ini
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as RegistrationStatus)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nilai Tes Seleksi (Skala 0 - 100)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Contoh: 85"
                      value={formTestScore}
                      onChange={(e) => setFormTestScore(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Catatan Internal Admin / Hasil Wawancara & Talaqqi
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Catatan hafalan surat, hasil wawancara orang tua, riwayat penyakit santri, dll."
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingSantri(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL TAMBAH PENDAFTAR BARU (MANUAL INPUT OLEH ADMIN)                     */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Tambah Pendaftar Santri Baru (Manual)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Input pendaftar langsung oleh admin sekretariat pesantren.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-700" />
                  <span>Identitas Calon Santri</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Lengkap Santri <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap santri"
                      value={formStudentName}
                      onChange={(e) => setFormStudentName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      NISN
                    </label>
                    <input
                      type="text"
                      placeholder="Nomor Induk Siswa Nasional"
                      value={formNisn}
                      onChange={(e) => setFormNisn(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Jenis Kelamin
                    </label>
                    <select
                      value={formGender}
                      onChange={(e) => setFormGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Pilihan Program <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formProgram}
                      onChange={(e) => setFormProgram(e.target.value as ProgramChoice)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    >
                      {PROGRAM_OPTIONS.map((pr) => (
                        <option key={pr} value={pr}>{pr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      placeholder="Kota kelahiran"
                      value={formBirthPlace}
                      onChange={(e) => setFormBirthPlace(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      value={formBirthDate}
                      onChange={(e) => setFormBirthDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Asal Sekolah Sebelumnya
                    </label>
                    <input
                      type="text"
                      placeholder="SD/MI/SMP/MTs Asal"
                      value={formPreviousSchool}
                      onChange={(e) => setFormPreviousSchool(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-teal-700" />
                  <span>Data Orang Tua / Wali</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Orang Tua / Wali <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama ayah / ibu / wali"
                      value={formParentName}
                      onChange={(e) => setFormParentName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hubungan
                    </label>
                    <select
                      value={formParentRelation}
                      onChange={(e) => setFormParentRelation(e.target.value as 'Ayah' | 'Ibu' | 'Wali')}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                    >
                      <option value="Ayah">Ayah</option>
                      <option value="Ibu">Ibu</option>
                      <option value="Wali">Wali</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      No. WhatsApp Wali <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="081234567890"
                      value={formParentPhone}
                      onChange={(e) => setFormParentPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Pekerjaan
                    </label>
                    <input
                      type="text"
                      placeholder="PNS / Swasta / Wiraswasta"
                      value={formParentJob}
                      onChange={(e) => setFormParentJob(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">
                      Alamat Domisili
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Alamat lengkap keluarga santri"
                      value={formParentAddress}
                      onChange={(e) => setFormParentAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Daftarkan Santri</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL KONFIRMASI HAPUS PENDAFTAR (DELETE CONFIRMATION)                    */}
      {/* ========================================================================= */}
      {deletingSantri && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-bold text-base text-slate-900">
                Hapus Data Pendaftar?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Apakah Anda yakin ingin menghapus data calon santri{' '}
                <strong className="text-slate-900">{deletingSantri.studentName}</strong> (No. Reg:{' '}
                <span className="font-mono font-bold text-teal-800">{deletingSantri.id}</span>)?
              </p>
              <p className="text-[11px] text-rose-600 font-semibold bg-rose-50 p-2 rounded-xl border border-rose-200 mt-2">
                Tindakan ini permanen dan data pendaftar akan dihapus dari sistem.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingSantri(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Ya, Hapus Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
