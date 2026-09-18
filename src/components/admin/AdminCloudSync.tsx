import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import {
  Cloud,
  CloudUpload,
  CloudDownload,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  Server,
  Key,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Laptop,
  Smartphone,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

export const AdminCloudSync: React.FC = () => {
  const {
    syncApiUrl,
    setSyncApiUrl,
    autoSyncEnabled,
    setAutoSyncEnabled,
    isSyncing,
    lastSyncTime,
    syncStatus,
    syncErrorMessage,
    pullFromHosting,
    pushToHosting,
    testHostingConnection,
    downloadSyncPhpScript,
    showToast
  } = usePesantren();

  const [inputUrl, setInputUrl] = useState(syncApiUrl);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setSyncApiUrl(inputUrl);
    setTestResult(null);
    showToast('Pengaturan Disimpan', 'URL Endpoint API Hosting berhasil diperbarui.', 'success');
  };

  const handleTest = async () => {
    const urlToTest = inputUrl.trim();
    if (!urlToTest) {
      showToast('URL Kosong', 'Masukkan URL endpoint API terlebih dahulu.', 'error');
      return;
    }

    setTestingConnection(true);
    setTestResult(null);
    const res = await testHostingConnection(urlToTest);
    setTestResult(res);
    setTestingConnection(false);

    if (res.ok) {
      setSyncApiUrl(urlToTest);
      showToast('Koneksi Berhasil', 'Server hosting Rumahweb terhubung dengan baik!', 'success');
    } else {
      showToast('Gagal Terhubung', res.message, 'error');
    }
  };

  const handleCopy = (text: string, stepNum: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNum);
    setTimeout(() => setCopiedStep(null), 2500);
    showToast('Tersalin', 'Teks berhasil disalin ke clipboard.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-teal-900 via-teal-800 to-emerald-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Cloud className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                  Shared Hosting & Cloud Sync
                </span>
                <h2 className="text-xl md:text-2xl font-bold font-serif text-white">
                  Sinkronisasi Data Hosting Rumahweb
                </h2>
              </div>
            </div>

            {/* Status Pill */}
            <div className="flex items-center gap-2">
              {syncStatus === 'syncing' || isSyncing ? (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Sedang Menyinkronkan...</span>
                </div>
              ) : syncApiUrl ? (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Hosting Terhubung</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-500/30 text-slate-300 border border-white/10 text-xs font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Belum Terhubung</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-teal-100/90 text-sm max-w-2xl leading-relaxed">
            Gunakan shared hosting Rumahweb Anda sebagai penyimpanan terpusat gratis. Dengan fitur ini, setiap artikel, foto, pengumuman, dan data pendaftar yang Anda ubah di <strong>MacBook</strong> akan otomatis tersinkron ke <strong>HP</strong> dan perangkat pengunjung di seluruh dunia.
          </p>

          {lastSyncTime && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-teal-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sinkronisasi terakhir berhasil pada: <strong>{lastSyncTime} WIB</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Multi-Device Synchronous Illustration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">1. Edit di MacBook / Laptop</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Anda menulis artikel atau upload foto galeri baru di MacBook.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">2. Tersimpan di Rumahweb</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Data otomatis terkirim dan tersimpan aman di server hosting Rumahweb Anda.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">3. Langsung Tampil di HP</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Saat dibuka di HP wali santri atau admin lain, data langsung tampil sinkron.
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel: Tombol Aksi Manual */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CloudUpload className="w-5 h-5 text-teal-700" />
            Tombol Aksi Sinkronisasi Data
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Gunakan tombol berikut untuk memicu pengiriman atau penarikan data secara instan antar perangkat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Tombol Push */}
          <button
            type="button"
            onClick={() => pushToHosting(inputUrl)}
            disabled={isSyncing || !inputUrl}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs shadow-md shadow-teal-900/10 transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CloudUpload className={`w-4 h-4 ${isSyncing ? 'animate-bounce' : ''}`} />
            <span>Kirim Data ke Hosting (Push)</span>
          </button>

          {/* Tombol Pull */}
          <button
            type="button"
            onClick={() => pullFromHosting(inputUrl)}
            disabled={isSyncing || !inputUrl}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CloudDownload className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Tarik Data Terbaru (Pull)</span>
          </button>

          {/* Tombol Download Script */}
          <button
            type="button"
            onClick={downloadSyncPhpScript}
            className="flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-all active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Script sync.php</span>
          </button>
        </div>

        {syncErrorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{syncErrorMessage}</span>
          </div>
        )}
      </div>

      {/* Form Konfigurasi URL Hosting */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-teal-700" />
            Pengaturan URL Endpoint Rumahweb
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Tentukan alamat file <code>sync.php</code> yang sudah Anda pasang di cPanel Rumahweb.
          </p>
        </div>

        <form onSubmit={handleSaveUrl} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              URL Endpoint API (sync.php) <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                required
                placeholder="https://namadomainanda.com/api/sync.php"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-1 text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-900 font-mono"
              />
              <button
                type="button"
                onClick={handleTest}
                disabled={testingConnection || !inputUrl}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
                <span>Uji Koneksi</span>
              </button>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors"
              >
                Simpan URL
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Contoh format: <code>https://namapesantren.com/api/sync.php</code> (Pastikan diawali dengan <code>https://</code>).
            </p>
          </div>

          {testResult && (
            <div
              className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                testResult.ok
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {testResult.ok ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <strong className="font-semibold block">
                  {testResult.ok ? 'Sukses Terhubung ke Rumahweb!' : 'Pengecekan Gagal'}
                </strong>
                <p className="text-[11px] leading-relaxed opacity-90">{testResult.message}</p>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                id="autoSyncToggle"
                type="checkbox"
                checked={autoSyncEnabled}
                onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                className="w-4 h-4 rounded-sm text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
              />
              <label htmlFor="autoSyncToggle" className="text-xs font-medium text-slate-700 cursor-pointer">
                Otomatis kirim data ke hosting saat saya mengedit artikel / foto / profil di panel ini
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Panduan 3 Langkah Pemasangan di cPanel Rumahweb */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2.5 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileCode className="w-4 h-4" />
            <span>Petunjuk Praktis untuk MacBook & cPanel</span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white">
            Cara Pasang Script sync.php di Rumahweb (Hanya 3 Menit)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Ikuti 3 langkah mudah ini di cPanel Rumahweb untuk menghubungkan database:
          </p>
        </div>

        <div className="space-y-4">
          {/* Langkah 1 */}
          <div className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[11px]">
                  1
                </span>
                Unduh Berkas sync.php
              </span>
              <button
                type="button"
                onClick={downloadSyncPhpScript}
                className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-600 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Klik untuk Unduh</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Klik tombol di atas untuk mengunduh file <code>sync.php</code> langsung ke folder <strong>Downloads</strong> di MacBook Anda.
            </p>
          </div>

          {/* Langkah 2 */}
          <div className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[11px]">
                2
              </span>
              Buka cPanel Rumahweb & Buat Folder api
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Login ke <strong>cPanel Rumahweb</strong> &gt; buka <strong>File Manager</strong>.</li>
              <li>Buka folder <strong>public_html</strong>.</li>
              <li>Klik tombol <strong>+ Folder</strong> di atas &gt; beri nama folder: <code className="bg-slate-950 px-1.5 py-0.5 rounded-sm text-amber-300">api</code>.</li>
              <li>Buka folder <code>public_html/api/</code> tersebut, lalu klik <strong>Upload</strong> dan unggah file <code>sync.php</code> yang tadi diunduh.</li>
            </ul>
          </div>

          {/* Langkah 3 */}
          <div className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-teal-300">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-[11px]">
                3
              </span>
              Masukkan Alamat URL &amp; Klik Uji Koneksi
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Masukkan alamat file tersebut pada kolom di atas (misalnya: <code>https://namadomainanda.com/api/sync.php</code>), lalu klik tombol <strong>Uji Koneksi</strong> dan klik <strong>Kirim Data ke Hosting</strong>.
            </p>
            <div className="pt-2">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-teal-200 flex items-center justify-between">
                <span className="font-mono">https://namadomainanda.com/api/sync.php</span>
                <button
                  type="button"
                  onClick={() => handleCopy('https://namadomainanda.com/api/sync.php', 3)}
                  className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
                >
                  {copiedStep === 3 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedStep === 3 ? 'Tersalin' : 'Salin Contoh'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
