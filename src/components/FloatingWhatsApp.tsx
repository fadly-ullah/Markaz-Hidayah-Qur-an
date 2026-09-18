import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { MessageCircle, X, Send, Sparkles, Phone, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = usePesantren();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<'psb' | 'program' | 'donasi' | 'umum'>('psb');
  const [customNote, setCustomNote] = useState('');

  const topics = [
    {
      id: 'psb' as const,
      title: 'Pendaftaran Santri Baru',
      desc: 'Info jadwal seleksi, kuota & biaya',
      defaultMsg: "Assalamu'alaikum Admin Markaz Hidayah Qur'an, saya ingin menanyakan informasi pendaftaran santri baru (PSB 2026)."
    },
    {
      id: 'program' as const,
      title: 'Program & Kurikulum',
      desc: 'Tahfidz 30 juz, sanad & diniyah',
      defaultMsg: "Assalamu'alaikum, mohon informasi mengenai metode tahfidz dan kurikulum pembelajaran di Markaz Hidayah Qur'an."
    },
    {
      id: 'donasi' as const,
      title: 'Donasi & Wakaf',
      desc: 'Konfirmasi donasi mariberbagi / wakaf',
      defaultMsg: "Assalamu'alaikum, saya ingin berdonasi / konfirmasi wakaf pembangunan asrama santri."
    },
    {
      id: 'umum' as const,
      title: 'Kunjungan & Informasi Umum',
      desc: 'Jadwal silaturahmi & lokasi',
      defaultMsg: "Assalamu'alaikum, kami berencana berkunjung dan bersilaturahmi ke Markaz Hidayah Qur'an di Cisarua."
    }
  ];

  const handleSendWhatsApp = () => {
    const chosenTopic = topics.find(t => t.id === selectedTopic);
    let finalMessage = chosenTopic ? chosenTopic.defaultMsg : "Assalamu'alaikum Admin,";
    if (customNote.trim()) {
      finalMessage += `\n\nCatatan tambahan: "${customNote.trim()}"`;
    }

    const cleanPhone = settings.waNumber.replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(waUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-teal-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-sky-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xs">
                    <MessageCircle className="w-5 h-5 text-teal-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight">Hotline WhatsApp Resmi</h3>
                    <p className="text-[11px] text-teal-100/90 flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      Admin Siaga Melayani
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Tutup Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 bg-slate-50/50">
              <p className="text-xs text-slate-600 font-medium">
                Pilih topik percakapan Anda untuk respon lebih cepat:
              </p>

              <div className="space-y-1.5">
                {topics.map((item) => {
                  const isSelected = selectedTopic === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedTopic(item.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-2xs font-medium'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-[11px] text-slate-500">{item.desc}</div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Pesan tambahan (opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Apakah masih ada kuota beasiswa?"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-slate-800"
                />
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Buka WhatsApp Sekarang</span>
              </button>

              <div className="text-center">
                <span className="text-[10px] text-slate-400">
                  Nomor: +{settings.waNumber} • Jam Operasional 08.00 - 17.00 WIB
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-700/30 transition-all font-semibold text-sm group"
        aria-label="Chat WhatsApp Admin"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-600" />
        </div>
        <span className="hidden sm:inline text-xs font-semibold">Tanya Admin WA</span>
      </motion.button>
    </div>
  );
};
