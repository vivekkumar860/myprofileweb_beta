import { useState, useEffect } from 'react';
import { ADMIN_CONFIG } from '../lib/constants';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keySequence, setKeySequence] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const login = (password) => {
    const isCorrect = password === ADMIN_CONFIG.password;
    setIsAuthenticated(isCorrect);
    return isCorrect;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setShowModal(false);
  };

  // Key sequence detection for admin access
  useEffect(() => {
    const handleKeyPress = (event) => {
      const newSequence = [...keySequence, event.code].slice(-3);
      setKeySequence(newSequence);
      
      if (newSequence.length === 3 && 
          newSequence.every((key, index) => key === ADMIN_CONFIG.keySequence[index])) {
        setShowModal(true);
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  return {
    isAuthenticated,
    showModal,
    setShowModal,
    login,
    logout
  };
}; 