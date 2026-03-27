
import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, User, Lock, MapPin, School, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const VALID_USER = 'Trần Thị Kim Thoa';
const VALID_PASS = '12345';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthorInfo, setShowAuthorInfo] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief loading
    await new Promise(resolve => setTimeout(resolve, 800));

    if (username.trim() === VALID_USER && password === VALID_PASS) {
      onLogin();
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-app-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-teal-200/30 to-emerald-200/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-300/20 to-cyan-200/20 blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-200/10 to-teal-200/10 blur-2xl animate-pulse" style={{ animationDuration: '5s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 overflow-hidden shadow-lg shadow-teal-200/50 border-2 border-white/80">
            <img src="/GV/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
            TẠO ĐỀ THI THEO CV 7991
          </h1>
          <p className="text-teal-600/70 mt-2 text-sm font-medium">Đăng nhập để sử dụng hệ thống</p>
        </div>

        {/* Login Card */}
        <div className="card-elevated p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">
                <User className="w-4 h-4 inline mr-1.5 mb-0.5" />
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="Nhập tên đăng nhập..."
                className="w-full p-3.5 input-elevated focus:ring-2 focus:ring-primary outline-none text-sm"
                autoFocus
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-teal-700 mb-2">
                <Lock className="w-4 h-4 inline mr-1.5 mb-0.5" />
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Nhập mật khẩu..."
                  className="w-full p-3.5 pr-12 input-elevated focus:ring-2 focus:ring-primary outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 hover:text-teal-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in-up">
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !username.trim() || !password}
              className="w-full py-3.5 btn-gradient-primary text-white font-semibold rounded-xl flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Đăng nhập
                </>
              )}
            </button>
          </form>
        </div>

        {/* Author Info Toggle */}
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => setShowAuthorInfo(!showAuthorInfo)}
            className="w-full text-center text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            {showAuthorInfo ? 'Ẩn thông tin tác giả' : 'Xem thông tin tác giả'}
          </button>

          {/* Author Info Card */}
          {showAuthorInfo && (
            <div className="mt-4 card-elevated p-6 animate-fade-in-up">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-100 shadow-lg shadow-teal-100/50 mb-4">
                  <img
                    src="/GV/avatar.jpg"
                    alt="Trần Thị Kim Thoa"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-teal-800 mb-1">Trần Thị Kim Thoa</h3>
                <div className="space-y-1.5 text-sm text-teal-600">
                  <p className="flex items-center justify-center gap-1.5">
                    <School className="w-4 h-4 text-teal-500" />
                    Trường THPT Hoàng Diệu
                  </p>
                  <p className="flex items-center justify-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-500" />
                    Số 1 Mạc Đĩnh Chi, phường Phú Lợi, TP. Cần Thơ
                  </p>
                </div>

                {/* Decorative Badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100">
                  <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                  <span className="text-xs font-semibold text-teal-700">Tác giả ứng dụng</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-teal-400 mt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          © 2026 TẠO ĐỀ THI THEO CV 7991 — Phiên bản AI
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
