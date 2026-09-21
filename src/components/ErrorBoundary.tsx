import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, LogIn } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    // Bersihkan sesi yang berpotensi korup jika ada
    try {
      localStorage.removeItem('mhq_user_role_v1');
      localStorage.removeItem('mhq_logged_author_v1');
    } catch {
      // ignore
    }
    window.location.hash = '';
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.hash = '#home';
    window.location.reload();
  };

  private handleGoLogin = () => {
    try {
      localStorage.removeItem('mhq_user_role_v1');
      localStorage.removeItem('mhq_logged_author_v1');
      localStorage.removeItem('mhq_admin_auth_v1');
    } catch {
      // ignore
    }
    window.location.hash = '#admin';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                Halaman Mengalami Pembaruan Tampilan
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sistem mendeteksi pembaruan data atau cache browser pada panel. Klik tombol di bawah ini untuk memuat ulang sistem secara normal.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
                <div className="text-[10px] font-mono text-rose-400 font-semibold mb-1">
                  Info Teknis:
                </div>
                <div className="text-[11px] font-mono text-slate-400 break-words line-clamp-3">
                  {this.state.error.toString()}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Muat Ulang Halaman</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoLogin}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Ulang Panel</span>
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda Utama</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
