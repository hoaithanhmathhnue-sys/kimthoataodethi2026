import React, { useState } from 'react';
import LoginScreen from './LoginScreen';

const SESSION_KEY = 'examcraft_session';

// Dữ liệu đăng nhập / dùng thử của phiên bản cũ — xóa khỏi trình duyệt
const LEGACY_KEYS = ['examcraft_auth', 'examcraft_user', 'examcraft_trial_used'];

interface AuthGateProps {
  children: (onLogout: () => void) => React.ReactNode;
}

/** Chỉ hiện ứng dụng sau khi đăng nhập thành công; đóng tab là phải đăng nhập lại. */
const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    try {
      LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
      return sessionStorage.getItem(SESSION_KEY) === 'ok';
    } catch {
      return false;
    }
  });

  const handleLogin = () => {
    try { sessionStorage.setItem(SESSION_KEY, 'ok'); } catch {}
    setLoggedIn(true);
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    setLoggedIn(false);
  };

  return loggedIn ? <>{children(handleLogout)}</> : <LoginScreen onLogin={handleLogin} />;
};

export default AuthGate;
