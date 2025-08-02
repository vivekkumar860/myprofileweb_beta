"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Linkedin, Download, ArrowRight, Star, Calendar, Globe, Users, Award, BookOpen, Heart, Target, Zap } from 'lucide-react';

export default function About() {
  const sectionRef = useRef(null);
  const [siteContent, setSiteContent] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log('About component: Fetching site content...');
        const response = await fetch('/siteContent.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('About component: Site content loaded:', data);
        setSiteContent(data);
      } catch (error) {
        console.error('About component: Failed to load site content:', error);
        setSiteContent({
          bio: "Bridging the gap between talent and technology with a unique blend of HR expertise and technical proficiency.",
          statistics: {
            experience: "2+",
            projects: "10+",
            clients: "5+"
          }
        });
      }
    };
    fetchContent();
  }, []);

  console.log('About component: Rendering with siteContent:', siteContent);

  const statistics = siteContent?.statistics || {
    experience: "2+",
    projects: "10+",
    clients: "5+"
  };

  const stats = [
    { number: '50+', label: 'Successful Placements', icon: '🎯', color: 'from-green-500 to-emerald-500' },
    { number: statistics.experience, label: 'Years Experience', icon: '📈', color: 'from-blue-500 to-cyan-500' },
    { number: statistics.projects, label: 'Technical Projects', icon: '💻', color: 'from-purple-500 to-pink-500' },
    { number: '8.5', label: 'Current CGPA', icon: '🎓', color: 'from-orange-500 to-red-500' }
  ];

  const bio = siteContent?.bio || "Bridging the gap between talent and technology with a unique blend of HR expertise and technical proficiency.";
  const about = siteContent?.about || {};
  const profile = siteContent?.profile || {};

  const expertise = [
    {
      category: 'Talent Acquisition',
      skills: ['Technical Recruiting', 'Candidate Screening', 'Interview Management', 'Onboarding'],
      icon: '🤝',
      color: 'from-blue-500 to-blue-600'
    },
    {
      category: 'Technical Skills',
      skills: ['Full-Stack Development', 'AI & Machine Learning', 'Data Analysis', 'Cloud Computing'],
      icon: '⚡',
      color: 'from-purple-500 to-purple-600'
    },
    {
      category: 'Tools & Platforms',
      skills: ['React/Next.js', 'Python/Java', 'AWS/Google Cloud', 'Git/DevOps'],
      icon: '🛠️',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {about.mainBio || bio}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Image and Stats */}
            <div className="space-y-8">
              {/* Professional Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative w-80 h-80 mx-auto">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl transform rotate-6"
                  />
                  <div className="relative bg-white p-2 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 group">
                    <Image
                      src={profile.profileImage || "/about.jpg"}
                      alt={`${profile.name || 'Vivek Kumar'} - Professional Photo`}
                      width={300}
                      height={300}
                      className="rounded-xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">👨‍💻</div>
                        <div className="text-xl font-bold">{profile.name || 'Vivek Kumar'}</div>
                        <div className="text-sm opacity-90">Talent Acquisition Coordinator</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Hello, I&apos;m <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{profile.name || 'Vivek Kumar'}</span>
                </h3>
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p className="text-lg leading-relaxed">
                    {about.mainBio || bio}
                  </p>
                  {about.mission && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="text-blue-800 font-medium">
                        <Target className="w-5 h-5 inline mr-2" />
                        <strong>Mission:</strong> {about.mission}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Expertise Areas */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h4 className="text-2xl font-semibold text-gray-900 mb-6">Core Expertise</h4>
                <div className="space-y-4">
                  {expertise.map((area, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{area.icon}</span>
                        <h5 className="font-semibold text-gray-900 text-lg">{area.category}</h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-300 hover:text-blue-600 transition-all duration-300 text-center flex items-center justify-center gap-2 group bg-white"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
