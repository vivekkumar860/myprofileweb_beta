"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '50+', label: 'Successful Placements', icon: '🎯' },
    { number: '3+', label: 'Years Experience', icon: '📈' },
    { number: '15+', label: 'Technical Projects', icon: '💻' },
    { number: '8.5', label: 'Current CGPA', icon: '🎓' }
  ];

  const expertise = [
    {
      category: 'Talent Acquisition',
      skills: ['Technical Recruiting', 'Candidate Screening', 'Interview Management', 'Onboarding'],
      icon: '🤝'
    },
    {
      category: 'Technical Skills',
      skills: ['Full-Stack Development', 'AI & Machine Learning', 'Data Analysis', 'Cloud Computing'],
      icon: '⚡'
    },
    {
      category: 'Tools & Platforms',
      skills: ['React/Next.js', 'Python/Java', 'AWS/Google Cloud', 'Git/DevOps'],
      icon: '🛠️'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="opacity-0">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between talent and technology with a unique blend of 
              HR expertise and technical proficiency.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image and Stats */}
            <div className="space-y-8">
              {/* Professional Image */}
              <div className="relative">
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl transform rotate-6"></div>
                  <div className="relative bg-white p-2 rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/about.jpg"
                      alt="Vivek Kumar - Professional Photo"
                      width={300}
                      height={300}
                      className="rounded-xl object-cover w-full h-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">👨‍💻</div>
                        <div className="text-xl font-bold">Vivek Kumar</div>
                        <div className="text-sm opacity-90">Talent Acquisition Coordinator</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              {/* Bio */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hello, I&apos;m Vivek Kumar
                </h3>
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p>
                    Based in Phagwara, Punjab, I&apos;m passionate about connecting talent with 
                    opportunity and building my skills at the intersection of technology and HR.
                  </p>
                  <p>
                    Currently supporting end-to-end hiring at <strong>Placify.ai</strong>, I bring 
                    experience in job posting, candidate screening, and onboarding while pursuing 
                    my B.Tech. in Computer Science & Engineering (AI & ML) at Lovely Professional University.
                  </p>
                  <p>
                    I&apos;m active in the Coding and Anime Clubs, certified in computer networking 
                    and web design, and always excited about lifelong learning and collaboration opportunities.
                  </p>
                </div>
              </div>

              {/* Expertise Areas */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Core Expertise</h4>
                <div className="space-y-4">
                  {expertise.map((area, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-300">
                      <div className="flex items-center mb-2">
                        <span className="text-xl mr-2">{area.icon}</span>
                        <h5 className="font-semibold text-gray-900">{area.category}</h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Let&apos;s Connect
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-200 text-center"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
