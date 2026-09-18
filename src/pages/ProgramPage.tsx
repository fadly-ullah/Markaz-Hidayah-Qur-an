import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  UserPlus,
  Sparkles
} from 'lucide-react';

export const ProgramPage: React.FC = () => {
  const { programs, dailySchedule, targetTimeline, setCurrentRoute } = usePesantren();
  const [activeTab, setActiveTab] = useState<'programs' | 'schedule' | 'target'>('programs');

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
            Pendidikan & Kurikulum
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Program & Kurikulum Terpadu
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            Kurikulum komprehensif yang memadukan Al-Qur'an 30 Juz mutqin, dasar-dasar ilmu syar'i kitab turats, dan pembinaan karakter qur'ani.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'programs'
                  ? 'bg-white text-teal-900 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Daftar Program Pendidikan
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'schedule'
                  ? 'bg-white text-teal-900 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Jadwal Harian Santri (24 Jam)
            </button>
            <button
              onClick={() => setActiveTab('target')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'target'
                  ? 'bg-white text-teal-900 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Target Capaian 30 Juz
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {activeTab === 'programs' && (
          <div className="space-y-12">
            {programs.map((program, idx) => (
              <div
                key={program.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden relative bg-slate-100">
                  <img
                    src={program.imageUrl}
                    alt={program.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-teal-600 text-white text-xs font-bold rounded-lg shadow-sm">
                    Program {idx + 1}
                  </span>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">
                        ⏱ Durasi: {program.duration}
                      </span>
                      <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                        📖 Metode: {program.method}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">{program.name}</h2>

                    <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-xl text-xs font-medium text-teal-900">
                      🎯 Target Utama: {program.target}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {program.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Keunggulan Program:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {program.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentRoute('pendaftaran')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Daftar di Program Ini</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Kedisiplinan & Barakah Waktu
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Jadwal Rutin Keseharian Santri
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Pola ritme 24 jam dirancang seimbang antara ibadah, muroja'ah hafalan, pembelajaran kelas, olahraga, dan istirahat yang cukup.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {dailySchedule.map((item, idx) => (
                <div
                  key={idx}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 px-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-700 w-28 shrink-0">
                      {item.time}
                    </span>
                    <span className="text-sm font-medium text-slate-900">
                      {item.activity}
                    </span>
                  </div>
                  <span className={`self-start sm:self-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${
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
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'target' && (
          <div className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Peta Jalan Belajar
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Tahapan Target 30 Juz Bersanad
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Metodologi Sabaq (hafalan baru), Sabqi (muroja'ah dekat), dan Manzil (muroja'ah jauh) untuk menjamin hafalan tetap melekat seumur hidup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {targetTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-teal-50/40 border border-teal-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                      {item.year}
                    </span>
                    <Award className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{item.juz}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.focus}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
