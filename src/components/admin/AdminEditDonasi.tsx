import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { DonationProgram, BankAccount } from '../../types';
import { ImagePickerField } from './ImagePickerField';
import {
  HeartHandshake,
  Plus,
  Trash2,
  Edit2,
  X,
  ExternalLink,
  Eye,
  Save,
  Building,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Sliders,
  DollarSign,
  Users,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const AdminEditDonasi: React.FC = () => {
  const {
    donationContent,
    updateDonationContent,
    donationPrograms,
    addDonationProgram,
    updateDonationProgram,
    deleteDonationProgram,
    settings,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
    updateSettings,
    showToast,
    setCurrentRoute
  } = usePesantren();

  const [activeSubTab, setActiveSubTab] = useState<'programs' | 'banks' | 'content'>('programs');

  // Program Modal State
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);

  const [progTitle, setProgTitle] = useState('');
  const [progCategory, setProgCategory] = useState('Wakaf Bangunan');
  const [progTarget, setProgTarget] = useState<number>(100000000);
  const [progCollected, setProgCollected] = useState<number>(0);
  const [progDonorsCount, setProgDonorsCount] = useState<number>(0);
  const [progDescription, setProgDescription] = useState('');
  const [progImageUrl, setProgImageUrl] = useState('');
  const [progCustomUrl, setProgCustomUrl] = useState('');
  const [progIsActive, setProgIsActive] = useState(true);

  // Bank Modal State
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [editingBankIndex, setEditingBankIndex] = useState<number | null>(null);
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');

  // Page Content Form State
  const [headerBadge, setHeaderBadge] = useState(donationContent.headerBadge || 'Portal Donasi & Wakaf Umat');
  const [headerPartnerBadge, setHeaderPartnerBadge] = useState(donationContent.headerPartnerBadge || 'Terintegrasi dengan mariberbagi.net');
  const [headerTitle, setHeaderTitle] = useState(donationContent.headerTitle || 'Investasi Abadi untuk Penghafal Al-Qur\'an');
  const [headerQuote, setHeaderQuote] = useState(donationContent.headerQuote || '"Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, dan anak sholeh yang mendoakannya." (HR. Muslim)');
  const [headerButtonText, setHeaderButtonText] = useState(donationContent.headerButtonText || 'Salurkan Donasi Cepat via mariberbagi.net');
  const [portalDonationUrl, setPortalDonationUrl] = useState(donationContent.portalDonationUrl || settings.donationUrl || 'https://mariberbagi.net');
  const [waConfirmNumber, setWaConfirmNumber] = useState(donationContent.waConfirmNumber || settings.waNumber || '6281234567890');

  const [programsSectionBadge, setProgramsSectionBadge] = useState(donationContent.programsSectionBadge || 'Program Penyaluran Amanah');
  const [programsSectionTitle, setProgramsSectionTitle] = useState(donationContent.programsSectionTitle || 'Program Kebutuhan Pesantren yang Sedang Berjalan');
  const [programsSectionDesc, setProgramsSectionDesc] = useState(donationContent.programsSectionDesc || 'Setiap rupiah yang Anda salurkan digunakan secara transparan dengan laporan berkala kepada muhsinin.');

  const [calculatorBadge, setCalculatorBadge] = useState(donationContent.calculatorBadge || 'Kalkulator Sedekah & Infaq');
  const [calculatorTitle, setCalculatorTitle] = useState(donationContent.calculatorTitle || 'Pilih Nominal Donasi');
  const [calculatorDesc, setCalculatorDesc] = useState(donationContent.calculatorDesc || 'Pilih paket donasi atau ketik nominal sukarela yang Anda niatkan.');
  const [presetsInput, setPresetsInput] = useState((donationContent.nominalPresets || [50000, 100000, 250000, 500000, 1000000]).join(', '));

  const [bankSectionBadge, setBankSectionBadge] = useState(donationContent.bankSectionBadge || 'Kanal Alternatif');
  const [bankSectionTitle, setBankSectionTitle] = useState(donationContent.bankSectionTitle || 'Rekening Resmi Yayasan Pesantren');
  const [bankSectionDesc, setBankSectionDesc] = useState(donationContent.bankSectionDesc || 'Anda juga dapat melakukan transfer langsung antar-bank ke rekening yayasan berikut:');

  const [accountabilityTitle, setAccountabilityTitle] = useState(donationContent.accountabilityTitle || 'Akuntabilitas & Jaminan Amanah');
  const [accountabilityDesc, setAccountabilityDesc] = useState(donationContent.accountabilityDesc || 'Yayasan Markaz Hidayah Qur\'an memegang teguh prinsip tata kelola amanah (Good Islamic Governance). Seluruh penerimaan dana wakaf dan infaq dilaporkan secara berkala melalui laman Artikel & Publikasi di website ini serta dapat diaudit oleh lembaga pengawas wakaf independen.');

  // Open Program Modals
  const handleOpenAddProgram = () => {
    setEditingProgramId(null);
    setProgTitle('');
    setProgCategory('Wakaf Bangunan');
    setProgTarget(150000000);
    setProgCollected(15000000);
    setProgDonorsCount(45);
    setProgDescription('Pemberdayaan dan pembangunan sarana prasarana penunjang kenyamanan santri penghafal Al-Qur\'an.');
    setProgImageUrl('https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80');
    setProgCustomUrl('');
    setProgIsActive(true);
    setIsProgramModalOpen(true);
  };

  const handleOpenEditProgram = (prog: DonationProgram) => {
    setEditingProgramId(prog.id);
    setProgTitle(prog.title);
    setProgCategory(prog.category);
    setProgTarget(prog.target);
    setProgCollected(prog.collected);
    setProgDonorsCount(prog.donorsCount);
    setProgDescription(prog.description);
    setProgImageUrl(prog.imageUrl);
    setProgCustomUrl(prog.customDonationUrl || '');
    setProgIsActive(prog.isActive !== false);
    setIsProgramModalOpen(true);
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle.trim()) {
      showToast('Gagal', 'Judul program tidak boleh kosong.', 'error');
      return;
    }

    const progData = {
      title: progTitle.trim(),
      category: progCategory.trim() || 'Infaq & Sedekah',
      target: Number(progTarget) || 0,
      collected: Number(progCollected) || 0,
      donorsCount: Number(progDonorsCount) || 0,
      description: progDescription.trim(),
      imageUrl: progImageUrl.trim() || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
      customDonationUrl: progCustomUrl.trim() || undefined,
      isActive: progIsActive
    };

    if (editingProgramId) {
      updateDonationProgram(editingProgramId, progData);
    } else {
      addDonationProgram(progData);
    }
    setIsProgramModalOpen(false);
  };

  // Open Bank Modals
  const handleOpenAddBank = () => {
    setEditingBankIndex(null);
    setBankName('Bank Syariah Indonesia (BSI)');
    setBankAccountNumber('');
    setBankAccountName(settings.pesantrenName || 'Yayasan Markaz Hidayah Qur\'an');
    setIsBankModalOpen(true);
  };

  const handleOpenEditBank = (acc: BankAccount, index: number) => {
    setEditingBankIndex(index);
    setBankName(acc.bank);
    setBankAccountNumber(acc.accountNumber);
    setBankAccountName(acc.accountName);
    setIsBankModalOpen(true);
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName.trim() || !bankAccountNumber.trim()) {
      showToast('Gagal', 'Nama bank dan nomor rekening harus diisi.', 'error');
      return;
    }

    const account: BankAccount = {
      bank: bankName.trim(),
      accountNumber: bankAccountNumber.trim(),
      accountName: bankAccountName.trim() || settings.pesantrenName
    };

    if (editingBankIndex !== null) {
      updateBankAccount(editingBankIndex, account);
    } else {
      addBankAccount(account);
    }
    setIsBankModalOpen(false);
  };

  // Save Page Content
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedPresets = presetsInput
      .split(',')
      .map(s => parseInt(s.trim().replace(/\D/g, ''), 10))
      .filter(n => !isNaN(n) && n > 0);

    const updatedContent = {
      headerBadge: headerBadge.trim(),
      headerPartnerBadge: headerPartnerBadge.trim(),
      headerTitle: headerTitle.trim(),
      headerQuote: headerQuote.trim(),
      headerButtonText: headerButtonText.trim(),
      portalDonationUrl: portalDonationUrl.trim(),
      waConfirmNumber: waConfirmNumber.trim(),

      programsSectionBadge: programsSectionBadge.trim(),
      programsSectionTitle: programsSectionTitle.trim(),
      programsSectionDesc: programsSectionDesc.trim(),

      calculatorBadge: calculatorBadge.trim(),
      calculatorTitle: calculatorTitle.trim(),
      calculatorDesc: calculatorDesc.trim(),
      nominalPresets: parsedPresets.length > 0 ? parsedPresets : [50000, 100000, 250000, 500000, 1000000],

      bankSectionBadge: bankSectionBadge.trim(),
      bankSectionTitle: bankSectionTitle.trim(),
      bankSectionDesc: bankSectionDesc.trim(),

      accountabilityTitle: accountabilityTitle.trim(),
      accountabilityDesc: accountabilityDesc.trim()
    };

    updateDonationContent(updatedContent);

    // Keep settings.donationUrl in sync as well
    if (portalDonationUrl.trim()) {
      updateSettings({ donationUrl: portalDonationUrl.trim() });
    }
  };

  // Metrics
  const totalPrograms = donationPrograms.length;
  const activeProgramsCount = donationPrograms.filter(p => p.isActive !== false).length;
  const totalTarget = donationPrograms.reduce((acc, curr) => acc + (curr.target || 0), 0);
  const totalCollected = donationPrograms.reduce((acc, curr) => acc + (curr.collected || 0), 0);
  const totalDonors = donationPrograms.reduce((acc, curr) => acc + (curr.donorsCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
              Modul Administrator
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
              Portal Donasi & Rekening
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Pengelolaan Panel Donasi & Wakaf
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Atur program penggalangan dana pesantren, kelola rekening resmi penerima amanah, serta sesuaikan teks, kuota nominal, dan gateway donasi online.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentRoute('donasi')}
          className="px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 flex items-center gap-2 transition-all shrink-0 cursor-pointer shadow-xs"
        >
          <Eye className="w-4 h-4 text-teal-600" />
          <span>Lihat Halaman Donasi Publik</span>
          <ExternalLink className="w-3.5 h-3.5 text-teal-500" />
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Program Aktif</span>
            <HeartHandshake className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {activeProgramsCount} <span className="text-xs font-normal text-slate-400">/ {totalPrograms} prog</span>
          </div>
          <div className="text-[11px] text-teal-600 font-medium">Tampil di portal santri</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Terkumpul</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 truncate">
            Rp {new Intl.NumberFormat('id-ID').format(totalCollected)}
          </div>
          <div className="text-[11px] text-slate-500">
            Target: Rp {new Intl.NumberFormat('id-ID').format(totalTarget)}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Partisipasi Donatur</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {new Intl.NumberFormat('id-ID').format(totalDonors)}
          </div>
          <div className="text-[11px] text-sky-600 font-medium">Muhsinin tercatat</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Rekening Bank</span>
            <CreditCard className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {settings.bankAccounts?.length || 0}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Kanal transfer aktif</span>
          </div>
        </div>
      </div>

      {/* Internal Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveSubTab('programs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'programs'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Program Donasi & Wakaf ({donationPrograms.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('banks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'banks'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Rekening Bank Yayasan ({settings.bankAccounts?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('content')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'content'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Teks & Pengaturan Portal</span>
        </button>
      </div>

      {/* SUB-TAB 1: PROGRAM DONASI & WAKAF */}
      {activeSubTab === 'programs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Daftar Program Kebutuhan Pesantren</h3>
              <p className="text-xs text-slate-500">
                Kelola target, nominal terkumpul, foto, dan status tayang setiap program wakaf/infaq.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddProgram}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Program Baru</span>
            </button>
          </div>

          {donationPrograms.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-dashed border-slate-200 text-center space-y-3">
              <HeartHandshake className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Belum ada program donasi</p>
              <p className="text-xs text-slate-400">Klik tombol "Tambah Program Baru" di atas untuk membuat program pertama.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donationPrograms.map((prog) => {
                const percent = Math.min(100, Math.round(((prog.collected || 0) / (prog.target || 1)) * 100));
                const isActive = prog.isActive !== false;
                return (
                  <div
                    key={prog.id}
                    className={`bg-white rounded-3xl border ${
                      isActive ? 'border-slate-200' : 'border-slate-300 opacity-70 bg-slate-50/50'
                    } overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
                  >
                    <div>
                      {/* Card Media */}
                      <div className="h-44 relative bg-slate-100 overflow-hidden">
                        <img
                          src={prog.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80'}
                          alt={prog.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-teal-700 text-white shadow-xs">
                            {prog.category}
                          </span>
                          {!isActive && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-600 text-white shadow-xs">
                              Non-aktif
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 space-y-3">
                        <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {prog.description}
                        </p>

                        {/* Progress */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-teal-700">
                              Rp {new Intl.NumberFormat('id-ID').format(prog.collected || 0)}
                            </span>
                            <span className="text-slate-400 font-medium">
                              {percent}% ({new Intl.NumberFormat('id-ID').format(prog.target || 0)})
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-0.5">
                            <span>{prog.donorsCount} donatur</span>
                            {prog.customDonationUrl && (
                              <span className="text-sky-600 flex items-center gap-1">
                                <ExternalLink className="w-2.5 h-2.5" /> URL khusus
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => updateDonationProgram(prog.id, { isActive: !isActive })}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {isActive ? 'Aktif Tayang' : 'Disembunyikan'}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditProgram(prog)}
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                          title="Edit Program"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Yakin ingin menghapus program "${prog.title}"?`)) {
                              deleteDonationProgram(prog.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-slate-200 transition-colors cursor-pointer"
                          title="Hapus Program"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: REKENING BANK YAYASAN */}
      {activeSubTab === 'banks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Rekening Resmi Penerimaan Donasi & Wakaf</h3>
              <p className="text-xs text-slate-500">
                Rekening ini muncul di halaman donasi publik serta digunakan santri / donatur untuk konfirmasi via WhatsApp.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddBank}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Rekening Bank</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settings.bankAccounts && settings.bankAccounts.length > 0 ? (
              settings.bankAccounts.map((acc, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                        <Building className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                        Rekening Resmi
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-500">{acc.bank}</div>
                      <div className="font-mono text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                        {acc.accountNumber}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        a.n. <span className="font-bold text-slate-800">{acc.accountName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditBank(acc, index)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Ubah</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus rekening ${acc.bank} (${acc.accountNumber})?`)) {
                          deleteBankAccount(index);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-3xl p-12 border border-dashed border-slate-200 text-center space-y-3">
                <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">Belum ada rekening bank yang tersimpan</p>
                <p className="text-xs text-slate-400">Tambahkan rekening bank untuk memfasilitasi transfer donasi antar-bank.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TEKS & PENGATURAN PORTAL DONASI */}
      {activeSubTab === 'content' && (
        <form onSubmit={handleSaveContent} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Kustomisasi Teks, Tautan & Kuota Portal Donasi</h3>
              <p className="text-xs text-slate-500">
                Ubah judul banner, kutipan hadits, tautan platform gateway MariBerbagi, nomor WhatsApp konfirmasi, serta nominal donasi.
              </p>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>

          {/* Section: Banner Utama */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. Banner Utama Portal Donasi</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Badge Header Kiri
                </label>
                <input
                  type="text"
                  value={headerBadge}
                  onChange={(e) => setHeaderBadge(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Badge Partner / Gateway Kanan
                </label>
                <input
                  type="text"
                  value={headerPartnerBadge}
                  onChange={(e) => setHeaderPartnerBadge(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judul Utama Banner Donasi (H1)
              </label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kutipan / Dalil Hadits Sedekah Jariyah
              </label>
              <textarea
                rows={2}
                value={headerQuote}
                onChange={(e) => setHeaderQuote(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teks Tombol Donasi Cepat
                </label>
                <input
                  type="text"
                  value={headerButtonText}
                  onChange={(e) => setHeaderButtonText(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Portal Gateway (MariBerbagi / Kampanye Resmi)
                </label>
                <input
                  type="url"
                  value={portalDonationUrl}
                  onChange={(e) => setPortalDonationUrl(e.target.value)}
                  placeholder="https://mariberbagi.net/pesantren-markazhidayah"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor WhatsApp Khusus Konfirmasi Donasi
              </label>
              <input
                type="text"
                value={waConfirmNumber}
                onChange={(e) => setWaConfirmNumber(e.target.value)}
                placeholder="6281234567890"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">Gunakan awalan kode negara 62 tanpa spasi atau tanda plus.</p>
            </div>
          </div>

          {/* Section: Bagian Program & Kalkulator */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              <span>2. Teks Bagian Program & Kalkulator Nominal</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Badge Bagian Program
                </label>
                <input
                  type="text"
                  value={programsSectionBadge}
                  onChange={(e) => setProgramsSectionBadge(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Bagian Program
                </label>
                <input
                  type="text"
                  value={programsSectionTitle}
                  onChange={(e) => setProgramsSectionTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deskripsi Bagian Program
              </label>
              <input
                type="text"
                value={programsSectionDesc}
                onChange={(e) => setProgramsSectionDesc(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Kalkulator Infaq
                </label>
                <input
                  type="text"
                  value={calculatorTitle}
                  onChange={(e) => setCalculatorTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilihan Nominal Preset (Pisahkan dengan tanda koma)
                </label>
                <input
                  type="text"
                  value={presetsInput}
                  onChange={(e) => setPresetsInput(e.target.value)}
                  placeholder="50000, 100000, 250000, 500000, 1000000"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">Tombol cepat pilihan nominal donasi pada kartu kalkulator.</p>
              </div>
            </div>
          </div>

          {/* Section: Akuntabilitas & Audit */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>3. Pernyataan Akuntabilitas & Transparansi Amanah</span>
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judul Pernyataan Akuntabilitas
              </label>
              <input
                type="text"
                value={accountabilityTitle}
                onChange={(e) => setAccountabilityTitle(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Isi Penjelasan Tata Kelola & Laporan Donasi
              </label>
              <textarea
                rows={3}
                value={accountabilityDesc}
                onChange={(e) => setAccountabilityDesc(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Portal Donasi</span>
            </button>
          </div>
        </form>
      )}

      {/* MODAL TAMBAH / EDIT PROGRAM DONASI */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-base text-slate-900">
                  {editingProgramId ? 'Ubah Data Program Donasi' : 'Tambah Program Donasi Baru'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProgramModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Program Donasi / Wakaf *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Wakaf Pembangunan Ruang Perpustakaan & Laboratorium Bahasa"
                  value={progTitle}
                  onChange={(e) => setProgTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori Program *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Wakaf Bangunan / Infaq Pendidikan / Wakaf Mushaf"
                    value={progCategory}
                    onChange={(e) => setProgCategory(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {['Wakaf Bangunan', 'Infaq Pendidikan', 'Wakaf Mushaf', 'Operasional Santri'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setProgCategory(cat)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700 font-medium"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Dana (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000000}
                    step={500000}
                    value={progTarget}
                    onChange={(e) => setProgTarget(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Nominal: Rp {new Intl.NumberFormat('id-ID').format(progTarget || 0)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dana Terkumpul Saat Ini (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100000}
                    value={progCollected}
                    onChange={(e) => setProgCollected(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold font-mono"
                  />
                  <p className="text-[11px] text-teal-600 mt-1">
                    Progress: {Math.min(100, Math.round(((progCollected || 0) / (progTarget || 1)) * 100))}% tercapai
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jumlah Donatur Berpartisipasi
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={progDonorsCount}
                    onChange={(e) => setProgDonorsCount(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi Kebutuhan & Peruntukan Dana *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan detail peruntukan dana program ini secara transparan bagi donatur..."
                  value={progDescription}
                  onChange={(e) => setProgDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 leading-relaxed"
                />
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Foto Dokumentasi Program
                </label>
                <ImagePickerField
                  label=""
                  value={progImageUrl}
                  onChange={setProgImageUrl}
                  placeholder="Pilih foto atau masukkan URL gambar..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Donasi Khusus Program Ini (Opsional)
                </label>
                <input
                  type="url"
                  placeholder="Kosongkan jika menggunakan URL gateway donasi utama"
                  value={progCustomUrl}
                  onChange={(e) => setProgCustomUrl(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="progIsActive"
                  checked={progIsActive}
                  onChange={(e) => setProgIsActive(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded-md focus:ring-teal-500"
                />
                <label htmlFor="progIsActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Tampilkan program ini secara aktif di halaman publik
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Program</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT REKENING BANK */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-base text-slate-900">
                  {editingBankIndex !== null ? 'Ubah Data Rekening' : 'Tambah Rekening Bank Resmi'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBankModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBank} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Bank *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Bank Syariah Indonesia (BSI)"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-bold"
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {['Bank Syariah Indonesia (BSI)', 'Bank Muamalat', 'BCA Syariah', 'Bank Mandiri', 'BRI'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBankName(b)}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700 font-medium"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Rekening *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: 719 882 1010"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Atas Nama Rekening (a.n.) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Yayasan Markaz Hidayah Qur'an"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-semibold"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Rekening</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
