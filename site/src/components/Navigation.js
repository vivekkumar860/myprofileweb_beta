"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollThreshold] = useState(5); // Minimum scroll distance to trigger direction change

  const navItems = [
    { id: 'home', label: 'Home', href: '#home', icon: '🏠' },
    { id: 'about', label: 'About', href: '#about', icon: '👤' },
    { id: 'skills', label: 'Skills', href: '#skills', icon: '🎯' },
    { id: 'work', label: 'Portfolio', href: '#work', icon: '💼' },
    { id: 'certificates', label: 'Certificates', href: '#certificates', icon: '🏆' },
    { id: 'achievements', label: 'Achievements', href: '#achievements', icon: '⭐' },
    { id: 'contact', label: 'Contact', href: '#contact', icon: '📧' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const currentScrollY = scrollPosition;
      
      // Determine scroll direction with threshold to prevent flickering
      const scrollDifference = currentScrollY - lastScrollY;
      if (Math.abs(scrollDifference) > scrollThreshold) {
        if (scrollDifference > 0 && currentScrollY > 100) {
          setScrollDirection('down');
        } else if (scrollDifference < 0) {
          setScrollDirection('up');
        }
        setLastScrollY(currentScrollY);
      }

      // Set scrolled state
      setIsScrolled(scrollPosition > 50);

      // Improved active section detection with proper order and offset
      const sections = ['home', 'about', 'skills', 'work', 'certificates', 'achievements', 'contact'];
      let currentSection = 'home'; // Default to home

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          const sectionHeight = rect.height;
          
          // Check if we're in the middle third of the section for better accuracy
          if (scrollPosition >= offsetTop - 200 && scrollPosition < offsetTop + sectionHeight - 200) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);

      // Smart navigation visibility logic
      // Show when: scrolling up, at top of page, or mobile menu is open
      // Hide when: scrolling down and past 100px
      if (currentScrollY <= 100) {
        // Always show at top of page
        setIsVisible(true);
      } else if (isMobileMenuOpen) {
        // Always show when mobile menu is open
        setIsVisible(true);
      } else if (scrollDirection === 'down' && currentScrollY > lastScrollY) {
        // Hide when scrolling down
        setIsVisible(false);
      } else if (scrollDirection === 'up') {
        // Show when scrolling up
        setIsVisible(true);
      }
    };

    handleScroll(); // Call once to set initial state
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollDirection, isMobileMenuOpen, scrollThreshold]);

  // Show navigation when mobile menu is opened
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsVisible(true);
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop;
      const navHeight = 80; // Account for fixed navbar height
      
      window.scrollTo({
        top: offsetTop - navHeight,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Element with href ${href} not found`);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.4, 0.0, 0.2, 1],
        type: "tween"
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Enhanced Logo with Sophisticated Hover */}
          <motion.div 
            className="font-bold text-xl relative group cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="relative z-10 text-gray-900 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text">
              Vivek Kumar
              
              {/* Logo Underline Effect */}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
            
            {/* Logo Glow Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            />
          </motion.div>

          {/* Enhanced Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group overflow-hidden ${
                  activeSection === item.id
                    ? 'text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text'
                    : 'text-gray-700'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-2 relative z-10">
                  <motion.span 
                    className="text-xs"
                    whileHover={{ 
                      scale: 1.2,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className={`relative transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold' 
                      : 'group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text'
                  }`}>
                    {item.label}
                    
                    {/* Underline Slide-In Effect */}
                    <span className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out ${
                      activeSection === item.id 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    }`} />
                  </span>
                </span>
                
                {/* Enhanced Active Indicator with Glow */}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg -z-10 shadow-lg shadow-blue-500/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Enhanced Hover Background Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                />
                
                {/* Subtle Glow Effect on Hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-lg -z-20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.button>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="px-4 pt-4 pb-6 space-y-2 max-h-96 overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => {
                      scrollToSection(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl group relative overflow-hidden ${
                      activeSection === item.id
                        ? 'text-gray-700 font-semibold'
                        : 'text-gray-700'
                    }`}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 5,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span 
                      className="text-lg relative z-10"
                      whileHover={{ 
                        scale: 1.2,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className={`relative z-10 transition-all duration-300 ${
                      activeSection === item.id 
                        ? 'text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold' 
                        : 'group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text'
                    }`}>
                      {item.label}
                      
                      {/* Mobile Underline Effect */}
                      <span className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out ${
                        activeSection === item.id 
                          ? 'w-full' 
                          : 'w-0 group-hover:w-full'
                      }`} />
                    </span>
                    
                    {/* Mobile Active Background */}
                    {activeSection === item.id && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl -z-10"
                        layoutId="mobileActiveTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Mobile Hover Background */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Mobile Glow Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl -z-20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
