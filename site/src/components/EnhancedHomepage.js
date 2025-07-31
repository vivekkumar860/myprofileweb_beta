"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EnhancedHomepage() {
  const [siteContent, setSiteContent] = useState(null);
  const [currentTypewriterText, setCurrentTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [imgError, setImgError] = useState(false);
  const [keySequence, setKeySequence] = useState([]);
  const typewriterRef = useRef(null);

  const phrases = useMemo(() => [
    "Full Stack Engineer 🚀",
    "Talent Acquisition Expert 🎯", 
    "MERN Stack Developer 💻",
    "Problem Solver 🧩"
  ], []);

  // Waving hand animation state
  const [isWaving, setIsWaving] = useState(false);

  useEffect(() => {
    // Start waving animation on mount
    setIsWaving(true);
    const waveTimer = setTimeout(() => setIsWaving(false), 2000);
    
    return () => clearTimeout(waveTimer);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/siteContent.json');
        const data = await response.json();
        setSiteContent(data);
      } catch (error) {
        console.error('Failed to load site content:', error);
      }
    };
    fetchContent();
  }, []);

  // Enhanced typewriter effect
  useEffect(() => {
    const typeSpeed = 120; // Slower, more deliberate typing
    const deleteSpeed = 60;
    const pauseDuration = 2000;
    
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting && typewriterIndex < currentPhrase.length) {
        setCurrentTypewriterText(currentPhrase.slice(0, typewriterIndex + 1));
        setTypewriterIndex(typewriterIndex + 1);
      } else if (isDeleting && typewriterIndex > 0) {
        setCurrentTypewriterText(currentPhrase.slice(0, typewriterIndex - 1));
        setTypewriterIndex(typewriterIndex - 1);
      } else if (!isDeleting && typewriterIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && typewriterIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [typewriterIndex, phraseIndex, isDeleting, phrases]);

  // Enhanced keypress detection for admin
  useEffect(() => {
    const handleKeyPress = (event) => {
      const targetSequence = ['KeyA', 'KeyD', 'KeyM'];
      const newSequence = [...keySequence, event.code].slice(-3);
      setKeySequence(newSequence);
      
      if (newSequence.length === 3 && 
          newSequence.every((key, index) => key === targetSequence[index])) {
        setShowAdminModal(true);
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    if (adminPassword === envPassword) {
      window.location.href = '/admin';
    } else {
      setPasswordError('Incorrect password');
      setTimeout(() => setPasswordError(''), 3000);
    }
  };

  const handleModalKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdminLogin(e);
    }
    if (e.key === 'Escape') {
      setShowAdminModal(false);
      setAdminPassword('');
      setPasswordError('');
    }
  };

  if (!siteContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-60 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-40 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Enhanced Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Enhanced Avatar with Professional Styling */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="mb-8 relative inline-block"
          >
            <div className="relative">
              {!imgError ? (
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-40 h-40 mx-auto relative"
                >
                  <Image
                    src="/profile.jpg"
                    alt="Vivek Kumar - Professional Profile"
                    width={160}
                    height={160}
                    className="rounded-full border-4 border-white/20 shadow-2xl"
                    onError={() => setImgError(true)}
                    priority
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl border-4 border-white/20"
                >
                  VK
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse"></div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Enhanced Greeting with Animated Wave */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="text-2xl md:text-3xl text-white/90 font-light mb-2 flex items-center justify-center gap-3">
              <motion.span
                animate={isWaving ? { 
                  rotate: [0, 14, -8, 14, -4, 10, 0] 
                } : {}}
                transition={{ 
                  duration: 0.6, 
                  repeat: isWaving ? 3 : 0,
                  repeatDelay: 0.3
                }}
                className="inline-block origin-bottom-right text-3xl"
              >
                👋
              </motion.span>
              Hi, I&apos;m 
              <motion.span 
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                {siteContent.profile?.name || 'Vivek Kumar'}
              </motion.span>
            </h1>
          </motion.div>

          {/* Enhanced Typewriter Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
              I&apos;m a{' '}
              <span 
                ref={typewriterRef}
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent relative"
              >
                {currentTypewriterText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute text-white"
                >
                  |
                </motion.span>
              </span>
            </h2>
          </motion.div>

          {/* Enhanced Bio */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {siteContent.bio || 'Passionate about creating innovative solutions and building exceptional teams.'}
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href={siteContent.profile?.linkedin || '#'}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 group"
            >
              <span>Connect on LinkedIn</span>
              <motion.svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </motion.a>
            
            <motion.button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-white/60 cursor-pointer group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm mb-2 group-hover:text-white/80 transition-colors">Scroll to explore</span>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Section Divider */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"
        />
      </motion.div>

      {/* Enhanced Admin Modal */}
      {showAdminModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowAdminModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h3>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyDown={handleModalKeyPress}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                  autoFocus
                />
              </div>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {passwordError}
                </motion.p>
              )}
              <div className="flex gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Login
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
            <p className="text-white/50 text-xs text-center mt-4">
              Press Escape to close • Enter to submit
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
