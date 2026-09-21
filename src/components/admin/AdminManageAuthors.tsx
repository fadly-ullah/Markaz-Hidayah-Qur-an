import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { AuthorAccount } from '../../types';
import {
  Users,
  UserPlus,
  Trash2,
  Edit,
  Check,
  Shield,
  Key,
  Mail,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const AdminManageAuthors: React.FC = () => {
  const {
    authorAccounts,
    addAuthorAccount,
    updateAuthorAccount,
    deleteAuthorAccount,
    showToast
  } = usePesantren();

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !password.trim()) {
      showToast('Gagal', 'Nama, username, dan password wajib diisi.', 'error');
      return;
    }

    // Check duplicate username
    if (authorAccounts.some(a => a.username.toLowerCase() === username.trim().toLowerCase())) {
      showToast('Gagal', 'Username tersebut sudah digunakan oleh akun lain.', 'error');
      return;
    }

    addAuthorAccount({
      name: name.trim(),
      username: username.trim(),
      password: password.trim(),
      email: email.trim() || `${username.trim().toLowerCase()}@hidayahquran.id`,
      role: 'author',
      isActive: true
    });

    setName('');
    setUsername('');
    setPassword('');
    setEmail('');
    setIsAdding(false);
  };

  const startEdit = (author: AuthorAccount) => {
    setEditingId(author.id);
    setEditName(author.name);
    setEditUsername(author.username);
    setEditPassword(author.password);
    setEditEmail(author.email);
    setEditIsActive(author.isActive);
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim() || !editUsername.trim() || !editPassword.trim()) {
      showToast('Gagal', 'Nama, username, dan password tidak boleh kosong.', 'error');
      return;
    }
    updateAuthorAccount(id, {
      name: editName.trim(),
      username: editUsername.trim(),
      password: editPassword.trim(),
      email: editEmail.trim(),
      isActive: editIsActive
    });
    setEditingId(null);
  };

  const copyCredentials = (author: AuthorAccount) => {
    const text = `Akun Penulis Artikel Pesantren:\nNama: ${author.name}\nUsername: ${author.username}\nPassword: ${author.password}\nLogin di: Menu Admin Pesantren`;
    navigator.clipboard.writeText(text);
    setCopiedId(author.id);
    showToast('Disalin ke Clipboard', `Data login untuk ${author.name} berhasil disalin.`);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Manajemen Akun Penulis & Redaksi</h3>
              <p className="text-xs text-slate-500">
                Buat akun khusus untuk staf atau santri pembuat artikel. Mereka hanya bisa mengunggah artikel & posting ke hosting tanpa mengutak-atik sistem.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Buat Akun Penulis Baru</span>
          </button>
        </div>

        {/* Form Create Author */}
        {isAdding && (
          <form
            onSubmit={handleCreateAuthor}
            className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-4"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-teal-800">
                Formulir Pendaftaran Penulis Artikel Baru
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Penulis *
                </label>
                <input
                  type="text"
                  required
                  placeholder="cth: Ust. Ahmad Fauzi / Santri Jurnalistik"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username untuk Login *
                </label>
                <input
                  type="text"
                  required
                  placeholder="cth: penulis1 / ahmad_redaksi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password Login *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimal 5 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 pr-10 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  placeholder="penulis@pesantren.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs"
              >
                Buat Akun Penulis
              </button>
            </div>
          </form>
        )}

        {/* Existing Authors List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Daftar Akun Penulis Terdaftar ({authorAccounts.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authorAccounts.map((author) => {
              const isEditing = editingId === author.id;
              return (
                <div
                  key={author.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    author.isActive
                      ? 'bg-slate-50 border-slate-200 hover:border-teal-300'
                      : 'bg-rose-50/50 border-rose-200 opacity-75'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Nama Penulis
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Username
                          </label>
                          <input
                            type="text"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Password
                          </label>
                          <input
                            type="text"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-mono text-teal-800 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editIsActive}
                            onChange={(e) => setEditIsActive(e.target.checked)}
                            className="rounded-sm text-teal-600"
                          />
                          <span>Akun Aktif</span>
                        </label>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 rounded-lg text-xs text-slate-600 hover:bg-slate-200"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(author.id)}
                            className="px-3 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Simpan</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900">{author.name}</h4>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                author.isActive
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {author.isActive ? 'Aktif' : 'Dinonaktifkan'}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 font-mono mt-0.5">
                            Username: <strong className="text-slate-800">{author.username}</strong>
                          </div>
                        </div>

                        <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-semibold flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>Penulis Artikel</span>
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1 font-mono">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Password:</span>
                          <span className="font-bold text-teal-800">{author.password}</span>
                        </div>
                        {author.email && (
                          <div className="flex items-center justify-between text-slate-500 text-[11px]">
                            <span>Email:</span>
                            <span>{author.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => copyCredentials(author)}
                          className="inline-flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-800 font-medium"
                        >
                          {copiedId === author.id ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Info Login</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEdit(author)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300 transition-colors"
                            title="Edit Akun Penulis"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus akun penulis "${author.name}" (${author.username})?`)) {
                                deleteAuthorAccount(author.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-colors"
                            title="Hapus Akun Penulis"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
