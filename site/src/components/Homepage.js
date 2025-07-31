

"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import siteContent from "../../siteContent.json";

// Admin Login Trigger (hidden, shows modal on secret keypress)

function AdminLoginTrigger() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    let keys = [];
    const handler = (e) => {
      // Add key to sequence
      keys.push(e.key.toLowerCase());
      
      // Keep only last 3 keys
      if (keys.length > 3) {
        keys = keys.slice(-3);
      }
      
      // Check if last 3 keys are 'a', 'd', 'm'
      if (keys.length >= 3 && keys.slice(-3).join("") === "adm") {
        setShow(true);
        keys = []; // Reset after triggering
      }
    };
    
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  
  useEffect(() => {
    if (redirect) {
      window.location.href = "/admin";
    }
  }, [redirect]);
  
  const handleLogin = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (input === adminPassword) {
      setRedirect(true);
    } else {
      alert("Incorrect password");
      setInput(""); // Clear input on wrong password
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShow(false)}>
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-96 flex flex-col gap-4 relative border border-white/20" onClick={e => e.stopPropagation()}>
        <button 
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none" 
          onClick={() => setShow(false)} 
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Admin Access</h2>
        <p className="text-gray-600 text-sm mb-4">Enter the admin password to access the dashboard</p>
        <input
          type="password"
          placeholder="Enter admin password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-6 py-3 font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          onClick={handleLogin}
        >
          Access Dashboard
        </button>
        <p className="text-xs text-gray-400 text-center">💡 Hint: Press A → D → M keys to open this modal</p>
      </div>
    </div>
  );
}

export default function Homepage() {
  // Try to load profile.jpg, fallback to SVG if error
  const [imgError, setImgError] = useState(false);

  // Fallback SVG avatar if profile.jpg is missing
  const AvatarFallback = () => (
    <svg
      width={160}
      height={160}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-full border-4 border-white/20 shadow-2xl animate-fadeIn transform hover:scale-110 transition-all duration-500"
    >
      <defs>
        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="80" fill="url(#avatarGradient)" />
      <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="56" fontWeight="bold" dy=".3em" className="filter drop-shadow-lg">VK</text>
    </svg>
  );

  // Typewriter effect for main title
  const titles = useMemo(() => [
    "Talent Acquisition Coordinator",
    "B.Tech. CSE (AI & ML) Student",
    "Full Stack Enthusiast",
    "Open to Collaborations"
  ], []);
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 80;
  const pauseTime = 1200;

  useEffect(() => {
    let timeout;
    const current = titles[typeIndex % titles.length];
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), typingSpeed / 2);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTypeIndex((prev) => prev + 1);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, typeIndex, titles]);

  // Animate cards on scroll - optimized with throttling
  const cardsRef = useRef([]);
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          cardsRef.current.forEach((card) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
              card.classList.add("card-visible");
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load highlights and bio from siteContent.json
  const highlights = siteContent.highlights || [];
  const bio = siteContent.bio || "";

  return (
    <section className="hero py-16 text-center relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circles absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="floating-circles absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="floating-circles absolute -bottom-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow"></div>
      </div>

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-transparent backdrop-blur-sm"></div>

      <div className="container mx-auto flex flex-col items-center justify-center relative z-10">
        {/* Enhanced Profile Image with glow effect */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          {!imgError ? (
            <Image
              src="/profile.jpg"
              alt="Portrait of Vivek Kumar - Talent Acquisition Coordinator"
              width={160}
              height={160}
              className="relative rounded-full w-40 h-40 object-cover border-4 border-white/20 shadow-2xl animate-fadeIn transform hover:scale-110 transition-all duration-500"
              priority
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="relative" role="img" aria-label="Vivek Kumar initials avatar">
              <AvatarFallback />
            </div>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex flex-col items-center text-white">
          <span>Hi, I&apos;m <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Vivek Kumar</span></span>
          <span className="text-lg sm:text-xl font-mono text-blue-300 h-8 mt-1">
            <span className="typewriter-cursor">{displayed}</span>
            <span className="typewriter-blink">|</span>
          </span>
        </h1>
        <p className="text-lg text-blue-300 font-semibold mb-1 flex items-center justify-center gap-2" aria-label="LinkedIn tagline">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline-block align-middle text-blue-400"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
          Open to LinkedIn connections &amp; collaborations
        </p>
        <p className="text-xl font-medium mb-2 text-gray-200">Talent Acquisition Coordinator (Intern) at Placify.ai | B.Tech. CSE (AI &amp; ML) @ LPU</p>
        <p className="max-w-xl mb-4 text-gray-300">
          {bio}
        </p>
        <p className="max-w-xl mb-6 text-gray-400">
          Skills: Java, JavaScript, Python, C/C++, HTML, Responsive Web Design, Pandas, Seaborn, Computer Networking, Network Security, Cloud Computing, HR &amp; Technical Recruiting, AI for Recruiting.
        </p>
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <a
            href="https://www.linkedin.com/in/vivek-kumar-123456789/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Connect with Vivek Kumar on LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline-block align-middle text-white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            Connect on LinkedIn
          </a>
        </div>

        {/* Enhanced Section Divider */}
        <div className="w-full flex justify-center my-16">
          <div className="relative">
            <div className="h-1 w-96 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Highlights Section */}
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {highlights.map((card, i) => (
              <div
                key={card.title}
                ref={el => (cardsRef.current[i] = el)}
                className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-80 flex flex-col items-center border border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-3xl transition-all duration-500 opacity-0 card-animate hover:border-purple-400/50`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-white text-center group-hover:text-purple-200 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-center text-sm leading-relaxed whitespace-pre-line group-hover:text-gray-200 transition-colors duration-300">
                    {card.desc}
                  </p>
                </div>
                
                {/* Animated border */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${card.border ? card.border.replace('border-', 'bg-').replace('-600', '-400').replace('-500', '-400') : 'bg-blue-400'} opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`}></div>
              </div>
            ))}
          </div>
        </div>
        {/* Hidden Admin Login Button, shown on secret keypress */}
        <AdminLoginTrigger />
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: -2s;
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
          animation-delay: -4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(1deg); }
          66% { transform: translateY(-20px) rotate(-1deg); }
        }
        
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        
        .typewriter-cursor {
          letter-spacing: 1px;
        }
        .typewriter-blink {
          animation: blink 1.1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .card-animate.card-visible {
          opacity: 1 !important;
          transform: translateY(0) scale(1);
        }
        .card-animate {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
        }
        
        .floating-circles {
          animation: floatCircles 20s ease-in-out infinite;
        }
        @keyframes floatCircles {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(100px) translateY(-50px) scale(1.1); }
          50% { transform: translateX(-50px) translateY(-100px) scale(0.9); }
          75% { transform: translateX(-100px) translateY(50px) scale(1.05); }
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}
