import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { ProgramChoice, SantriRegistration } from '../types';
import {
  UserPlus,
  CheckCircle2,
  Calendar,
  DollarSign,
  FileText,
  Search,
  MessageCircle,
  Clock,
  Sparkles,
  AlertCircle,
  Printer,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PendaftaranPage: React.FC = () => {
  const {
    settings,
    registerNewSantri,
    registrations,
    sendWhatsAppNotification
  } = usePesantren();

  const [activeTab, setActiveTab] = useState<'form' | 'info' | 'biaya' | 'status'>('form');

  // Form States
  const [studentName, setStudentName] = useState('');
  const [nisn, setNisn] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [programChoice, setProgramChoice] = useState<ProgramChoice>('Tahfidz 30 Juz Reguler');
  const [parentName, setParentName] = useState('');
  const [parentRelation, setParentRelation] = useState<'Ayah' | 'Ibu' | 'Wali'>('Ayah');
  const [parentPhone, setParentPhone] = useState('');
  const [parentJob, setParentJob] = useState('');
  const [parentAddress, setParentAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Post Submission Modal
  const [submittedData, setSubmittedData] = useState<SantriRegistration | null>(null);

  // Status Search
  const [searchCode, setSearchCode] = useState('');
  const [statusResult, setStatusResult] = useState<SantriRegistration | null | 'not_found'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim() || !parentName.trim()) {
      return;
    }

    const reg = registerNewSantri({
      studentName: studentName.trim(),
      nisn: nisn.trim() || '-',
      gender,
      birthPlace: birthPlace.trim() || 'Bogor',
      birthDate: birthDate || '2013-01-01',
      previousSchool: previousSchool.trim() || 'SD/MI',
      programChoice,
      parentName: parentName.trim(),
      parentRelation,
      parentPhone: parentPhone.trim(),
      parentJob: parentJob.trim() || 'Wiraswasta',
      parentAddress: parentAddress.trim() || 'Bogor',
      notes: notes.trim()
    });

    setSubmittedData(reg);

    // Reset Form
    setStudentName('');
    setNisn('');
    setBirthPlace('');
    setBirthDate('');
    setPreviousSchool('');
    setParentName('');
    setParentPhone('');
    setParentJob('');
    setParentAddress('');
    setNotes('');
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const query = searchCode.trim().toLowerCase();
    const found = registrations.find(
      r => r.id.toLowerCase() === query || r.parentPhone.includes(query) || r.studentName.toLowerCase().includes(query)
    );

    if (found) {
      setStatusResult(found);
    } else {
      setStatusResult('not_found');
    }
  };

  const openWhatsAppConfirmation = (reg: SantriRegistration) => {
    const url = sendWhatsAppNotification(reg.id, 'registration_received');
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold border border-teal-400/30">
              Penerimaan Santri Baru (PSB)
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Status: Pendaftaran Dibuka
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Pendaftaran Santri Baru TA 2026/2027
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            Selamat datang di portal pendaftaran online Markaz Hidayah Qur'an. Lengkapi formulir pendaftaran di bawah ini untuk mendapatkan nomor registrasi resmi dan notifikasi WhatsApp otomatis.
          </p>

          {/* Navigation Pill Tabs */}
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'form'
                  ? 'bg-white text-teal-900 shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              📝 Formulir Pendaftaran Online
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'status'
                  ? 'bg-white text-teal-900 shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              🔍 Cek Status Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'info'
                  ? 'bg-white text-teal-900 shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              ℹ️ Syarat & Tahapan Seleksi
            </button>
            <button
              onClick={() => setActiveTab('biaya')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'biaya'
                  ? 'bg-white text-teal-900 shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              💰 Rincian Biaya & Beasiswa
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TAB 1: FORMULIR PENDAFTARAN */}
        {activeTab === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Formulir Pendaftaran Santri Baru
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Harap mengisi data diri santri dan orang tua/wali dengan sebenar-benarnya.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bagian 1: Data Santri */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-teal-800 uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-100">
                    <UserPlus className="w-4 h-4 text-teal-600" />
                    1. Identitas Calon Santri
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Lengkap Calon Santri <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Muhammad Zaidan Al-Fatih"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        NISN (Nomor Induk Siswa Nasional)
                      </label>
                      <input
                        type="text"
                        placeholder="10 digit angka NISN (opsional)"
                        value={nisn}
                        onChange={(e) => setNisn(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Jenis Kelamin <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      >
                        <option value="Laki-laki">Laki-laki (Santriwan)</option>
                        <option value="Perempuan">Perempuan (Santriwati)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Pilihan Program Pendidikan <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={programChoice}
                        onChange={(e) => setProgramChoice(e.target.value as ProgramChoice)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      >
                        <option value="Tahfidz 30 Juz Reguler">Tahfidz 30 Juz Reguler (3 Tahun)</option>
                        <option value="Tahfidz & Diniyah Terpadu">Tahfidz & Diniyah Terpadu (Kitab Kuning)</option>
                        <option value="Program Takhassus Al-Qur'an">Program Takhassus Al-Qur'an (Qira'at & Sanad)</option>
                        <option value="Karantina Tahfidz Liburan">Karantina Tahfidz Liburan (1 Bulan)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Jakarta"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tanggal Lahir
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Asal Sekolah / Madrasah Terakhir
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: SDIT Al-Ihsan Bogor / MI Nurul Huda"
                        value={previousSchool}
                        onChange={(e) => setPreviousSchool(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Bagian 2: Data Orang Tua / Wali */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-sky-800 uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-100">
                    <FileText className="w-4 h-4 text-sky-600" />
                    2. Identitas Orang Tua / Wali
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Lengkap Orang Tua / Wali <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: H. Hendra Gunawan, S.T."
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Hubungan dengan Santri
                      </label>
                      <select
                        value={parentRelation}
                        onChange={(e) => setParentRelation(e.target.value as 'Ayah' | 'Ibu' | 'Wali')}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      >
                        <option value="Ayah">Ayah Kandung</option>
                        <option value="Ibu">Ibu Kandung</option>
                        <option value="Wali">Wali / Kerabat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nomor WhatsApp Wali (Aktif) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                      <p className="text-[10px] text-teal-700 mt-1 font-medium">
                        ✓ Nomor ini akan menerima notifikasi pendaftaran otomatis via WhatsApp.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Pekerjaan Orang Tua
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Wiraswasta / Guru / Karyawan"
                        value={parentJob}
                        onChange={(e) => setParentJob(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Alamat Domisili Lengkap
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Jl. Nama Jalan, No Rumah, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                        value={parentAddress}
                        onChange={(e) => setParentAddress(e.target.value)}
                        className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Catatan Prestasi / Hafalan Sebelumnya (Bila ada)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Sudah hafal juz 30 dan 29, juara tahfidz tingkat kecamatan"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500">
                    Dengan menekan tombol kirim, data pendaftaran akan diproses ke panitia PSB Markaz Hidayah Qur'an.
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white rounded-xl font-bold text-xs shadow-md shadow-teal-700/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pendaftaran & Dapatkan No Registrasi</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Information */}
            <div className="lg:col-span-4 space-y-6">
              {/* Card Kuota & Periode */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    Info Periode PSB
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                    Aktif
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-base text-slate-900">
                    {settings.registrationWave}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Penerimaan dibuka hingga kuota <strong>{settings.registrationQuota} santri</strong> terpenuhi. Seleksi berbasis tes talaqqi bacaan Al-Qur'an dan wawancara komitmen.
                  </p>
                </div>

                <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-100 text-xs text-teal-900 space-y-1.5">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    Jadwal Tes Seleksi Berkala:
                  </div>
                  <p className="text-[11px] text-teal-800">
                    Setiap hari Sabtu & Ahad pekan ke-2 dan ke-4 setiap bulannya secara hybrid (offline di pesantren atau online via Zoom).
                  </p>
                </div>
              </div>

              {/* Card WA Assistant */}
              <div className="bg-gradient-to-br from-teal-700 to-sky-800 text-white rounded-3xl p-6 shadow-md space-y-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-teal-200" />
                </div>
                <h4 className="font-bold text-base">Butuh Bantuan Pendaftaran?</h4>
                <p className="text-xs text-teal-100 leading-relaxed">
                  Tim panitia PSB Markaz Hidayah siap membantu panduan pengisian formulir, konsultasi program beasiswa, serta jadwal kunjungan.
                </p>
                <a
                  href={`https://wa.me/${settings.waNumber}?text=${encodeURIComponent("Assalamu'alaikum Admin PSB, saya mengalami kendala dalam pengisian formulir pendaftaran santri baru.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-teal-900 rounded-xl font-bold text-xs hover:bg-teal-50 transition-colors mt-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat Panitia PSB</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CEK STATUS PENDAFTARAN */}
        {activeTab === 'status' && (
          <div className="max-w-2xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Cek Status Pendaftaran Santri</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Masukkan <strong>Nomor Registrasi</strong> (contoh: <code>MHQ-2026-0012</code>) atau <strong>Nomor WhatsApp</strong> yang didaftarkan.
              </p>
            </div>

            <form onSubmit={handleSearchStatus} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Contoh: MHQ-2026-0012 atau 081298765432"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="flex-1 text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Cari Data</span>
              </button>
            </form>

            {/* Result Display */}
            {statusResult === 'not_found' && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Data tidak ditemukan. Pastikan Nomor Registrasi atau Nomor WhatsApp yang dimasukkan sudah benar.</span>
              </div>
            )}

            {statusResult && statusResult !== 'not_found' && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 font-mono">No. Registrasi:</span>
                    <h3 className="text-base font-bold text-teal-800 font-mono">{statusResult.id}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    statusResult.status === 'Diterima'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : statusResult.status === 'Jadwal Tes Seleksi'
                      ? 'bg-sky-100 text-sky-800 border border-sky-300'
                      : statusResult.status === 'Lolos Berkas'
                      ? 'bg-teal-100 text-teal-800 border border-teal-300'
                      : statusResult.status === 'Ditolak'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {statusResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Nama Calon Santri:</span>
                    <div className="font-bold text-slate-900">{statusResult.studentName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Pilihan Program:</span>
                    <div className="font-bold text-slate-900">{statusResult.programChoice}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Orang Tua / Wali:</span>
                    <div className="font-bold text-slate-900">{statusResult.parentName} ({statusResult.parentRelation})</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Tanggal Daftar:</span>
                    <div className="font-bold text-slate-900">{statusResult.registeredAt}</div>
                  </div>
                </div>

                {statusResult.notes && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900">Catatan Panitia PSB: </span>
                    {statusResult.notes}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => openWhatsAppConfirmation(statusResult)}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Ulang Notifikasi WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SYARAT & TAHAPAN PENDAFTARAN */}
        {activeTab === 'info' && (
          <div className="space-y-10">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Tahapan Seleksi Pendaftaran Santri
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-700 text-white font-bold text-sm flex items-center justify-center">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Pendaftaran Online</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mengisi formulir PSB melalui website dan menerima nomor registrasi via WhatsApp.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-700 text-white font-bold text-sm flex items-center justify-center">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Verifikasi Berkas</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Panitia memverifikasi kelengkapan KK, Akta Kelahiran, dan Raport dalam 1x24 jam.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-700 text-white font-bold text-sm flex items-center justify-center">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Tes Seleksi & Talaqqi</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ujian kemampuan baca Al-Qur'an (makhraj & tajwid), daya ingat hafalan, dan wawancara wali.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm flex items-center justify-center">
                    4
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Pengumuman & Daftar Ulang</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pengumuman kelulusan resmi dan pembagian nomor kamar asrama santri baru.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider text-teal-700">
                  Persyaratan Dokumen:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Pasfoto terbaru ukuran 3x4 (3 lembar, latar biru/merah)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Fotokopi Kartu Keluarga (KK) & Akta Kelahiran</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Fotokopi Rapor 2 semester terakhir</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Surat Keterangan Sehat dari Puskesmas / Dokter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BIAYA PENDIDIKAN & BEASISWA */}
        {activeTab === 'biaya' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Rincian Biaya Pendidikan Terbuka & Transparan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Seluruh pembiayaan dialokasikan untuk sarana hunian, konsumsi gizi 3x sehari, honorarium asatidz, dan operasional santri.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Infaq Formulir & Seleksi
                  </span>
                  <div className="text-2xl font-black text-slate-900">Rp 250.000</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dibayarkan satu kali saat pendaftaran untuk biaya tes talaqqi, wawancara, dan sertifikat hasil seleksi.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Uang Pangkal / Sarana
                  </span>
                  <div className="text-2xl font-black text-slate-900">Rp 8.500.000</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Termasuk kasur asrama, lemari pribadi, 4 stel seragam, kitab kurikulum, dan wakaf pengembangan sarana.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-3">
                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                    SPP Bulanan (All-in)
                  </span>
                  <div className="text-2xl font-black text-slate-900">Rp 1.450.000 / bln</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Sudah mencakup makan bergizi 3x sehari, laundry asrama, bimbingan halaqah 24 jam, dan klinik kesehatan.
                  </p>
                </div>
              </div>

              {/* Beasiswa Section */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-800 to-sky-800 text-white space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <h4 className="font-bold text-base">Program Beasiswa Yatim & Dhuafa Berprestasi</h4>
                </div>
                <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                  Markaz Hidayah Qur'an menyediakan beasiswa bebas uang pangkal dan subsidi SPP 100% bagi santri penghafal Al-Qur'an minimal 5 juz berstatus yatim atau keluarga pra-sejahtera, didukung oleh donatur via kemitraan <strong>mariberbagi.net</strong>.
                </p>
                <div className="text-xs font-semibold text-teal-200">
                  Untuk mengajukan jalur beasiswa, lampirkan SKTM (Surat Keterangan Tidak Mampu) dan sertifikat hafalan saat tes seleksi.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* POPUP NOTIFIKASI REGISTRASI SUKSES DENGAN TRIGGER WHATSAPP OTOMATIS */}
      <AnimatePresence>
        {submittedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-teal-200 space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Alhamdulillah! Pendaftaran Berhasil
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Nomor Registrasi Resmi:
                </h3>
                <div className="text-2xl font-black text-teal-800 font-mono tracking-wider py-1">
                  {submittedData.id}
                </div>
                <p className="text-xs text-slate-600">
                  Calon Santri: <strong>{submittedData.studentName}</strong> • {submittedData.programChoice}
                </p>
              </div>

              {/* Automatic WhatsApp Engine Prompt */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Sistem Notifikasi Otomatis WhatsApp Calon Pendaftar</span>
                </div>
                <p className="leading-relaxed text-[11px] text-emerald-900">
                  Sistem telah menyiapkan format resmi notifikasi pendaftaran dengan rincian identitas dan instruksi verifikasi berkas ke nomor WhatsApp: <strong>{submittedData.parentPhone}</strong>.
                </p>
                <button
                  onClick={() => openWhatsAppConfirmation(submittedData)}
                  className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan Konfirmasi via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Bukti Registrasi</span>
                </button>

                <button
                  onClick={() => setSubmittedData(null)}
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Tutup & Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
