import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // callBack verindert, dass sich hier die funktion jedesmal neu rendert und dadurch wieder
  // andere Sachen auslöst!! durch [] wird sie einmal ausgeführt
  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);

    // Daten in localStorage für Autologin schreiben
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setToken(null);
    setUserId(null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]); // [login] bedeutet läuft 1x und jedesmal, wenn sich am login was ändert, useEffect läuft immer nach dem 1. Rendercycle

  return { token, userId, login, logout };
};
