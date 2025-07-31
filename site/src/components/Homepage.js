
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import siteContent from "../../siteContent.json";

export default function Homepage() {
  // Fallback SVG avatar if profile.jpg is missing
  const AvatarFallback = () => (
    <svg
      width={160}
      height={160}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-full w-40 h-40 mb-6 border-4 border-blue-600 shadow-lg bg-gray-100 animate-fadeIn"
      aria-label="Default profile avatar"
    >
      <circle cx="80" cy="80" r="80" fill="#2563eb" />
      <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="56" fontWeight="bold" dy=".3em">VK</text>
    </svg>
  );

  // Try to load profile.jpg, fallback to SVG if error
  const [imgError, setImgError] = useState(false);

  // Typewriter effect for main title
  const titles = React.useMemo(() => [
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

  // Animate cards on scroll
  const cardsRef = useRef([]);
  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          card.classList.add("card-visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load highlights and bio from siteContent.json
  const highlights = siteContent.highlights || [];
  const bio = siteContent.bio || "";

  return (
    <section className="hero py-16 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-screen relative overflow-x-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center">
        {!imgError ? (
          <Image
            src="/profile.jpg"
            alt="Portrait of Vivek Kumar"
            width={160}
            height={160}
            className="rounded-full w-40 h-40 object-cover mb-6 border-4 border-blue-600 shadow-lg animate-fadeIn"
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <AvatarFallback />
        )}
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex flex-col items-center">
          <span>Hi, I&apos;m <span className="text-blue-600">Vivek Kumar</span></span>
          <span className="text-lg sm:text-xl font-mono text-blue-700 h-8 mt-1">
            <span className="typewriter-cursor">{displayed}</span>
            <span className="typewriter-blink">|</span>
          </span>
        </h1>
        <p className="text-lg text-blue-700 font-semibold mb-1 flex items-center justify-center gap-2" aria-label="LinkedIn tagline">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline-block align-middle text-blue-600"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
          Open to LinkedIn connections &amp; collaborations
        </p>
        <p className="text-xl font-medium mb-2">Talent Acquisition Coordinator (Intern) at Placify.ai | B.Tech. CSE (AI &amp; ML) @ LPU</p>
        <p className="max-w-xl mb-4 text-gray-700">
          {bio}
        </p>
        <p className="max-w-xl mb-6 text-gray-600">
          Skills: Java, JavaScript, Python, C/C++, HTML, Responsive Web Design, Pandas, Seaborn, Computer Networking, Network Security, Cloud Computing, HR &amp; Technical Recruiting, AI for Recruiting.
        </p>
        <a
          href="https://www.linkedin.com/in/vivek-kumar-123456789/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounce-slow"
          aria-label="Connect with Vivek Kumar on LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="inline-block align-middle text-white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
          Connect on LinkedIn
        </a>

        {/* Section Divider */}
        <div className="w-full flex justify-center my-12">
          <div className="h-1 w-2/3 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full opacity-40 animate-divider" />
        </div>

        {/* Highlights Section */}
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">Highlights</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {highlights.map((card, i) => (
              <div
                key={card.title}
                ref={el => (cardsRef.current[i] = el)}
                className={`bg-white rounded-xl shadow-md p-6 w-72 flex flex-col items-center border-t-4 ${card.border} hover:scale-105 hover:shadow-xl transition-all duration-300 opacity-0 card-animate`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-4xl mb-2">{card.icon}</span>
                <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                <p className="text-gray-600 text-center text-sm whitespace-pre-line">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
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
          transform: translateY(0) scale(1.03);
        }
        .card-animate {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
        }
        .animate-divider {
          animation: dividerFade 2.5s ease-in;
        }
        @keyframes dividerFade {
          from { opacity: 0; width: 0; }
          to { opacity: 0.4; width: 66.6667%; }
        }
      `}</style>
    </section>
  );
}
