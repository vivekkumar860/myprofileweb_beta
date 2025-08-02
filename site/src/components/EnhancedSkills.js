"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Award, TrendingUp, Users, Zap, Globe, Cpu } from 'lucide-react';

export default function EnhancedSkills() {
  const [siteContent, setSiteContent] = useState(null);

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

  // Get skill categories from highlights data, with fallback
  const skillCategories = siteContent?.highlights ? 
    siteContent.highlights.slice(0, 3).map((highlight, index) => {
      const colors = [
        { bg: 'from-blue-500 to-blue-600', text: 'text-blue-700', light: 'bg-blue-100' },
        { bg: 'from-green-500 to-green-600', text: 'text-green-700', light: 'bg-green-100' },
        { bg: 'from-purple-500 to-purple-600', text: 'text-purple-700', light: 'bg-purple-100' }
      ];
      const icons = [
        <Code className="w-8 h-8" key="code" />, 
        <Database className="w-8 h-8" key="db" />, 
        <Cloud className="w-8 h-8" key="cloud" />
      ];
      
      return {
        icon: icons[index] || <Award className="w-8 h-8" key="award" />,
        title: highlight.title,
        skills: highlight.desc.split('\n'),
        color: colors[index] || colors[0]
      };
    }) : [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Programming Skills",
      skills: ["Java", "JavaScript", "Python", "C/C++", "HTML", "Responsive Web Design"],
      color: { bg: 'from-blue-500 to-blue-600', text: 'text-blue-700', light: 'bg-blue-100' }
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Networking & Cloud",
      skills: ["Computer Networking", "Network Security", "Cloud Computing", "TCP/IP"],
      color: { bg: 'from-green-500 to-green-600', text: 'text-green-700', light: 'bg-green-100' }
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Data & Visualization",
      skills: ["Pandas", "Seaborn", "Data Analysis", "Data Visualization"],
      color: { bg: 'from-purple-500 to-purple-600', text: 'text-purple-700', light: 'bg-purple-100' }
    }
  ];

  const statistics = siteContent?.statistics || {
    experience: "2+",
    projects: "10+",
    clients: "5+"
  };

  const statCards = [
    {
      number: statistics.experience,
      label: "Years Experience",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      number: statistics.projects,
      label: "Projects Completed",
      icon: <Code className="w-6 h-6" />,
      gradient: "from-green-600 to-blue-600"
    },
    {
      number: statistics.clients,
      label: "Happy Clients",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expertise across modern web technologies, networking, and software development with a focus on creating innovative solutions.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-center">
                <motion.div 
                  className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color.bg} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) }}
                    className={`inline-block ${category.color.light} ${category.color.text} px-4 py-2 rounded-full text-sm font-medium mr-2 mb-2 border border-current/20 hover:scale-105 transition-transform duration-200`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Additional <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Expertise</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "HR & Recruiting", icon: <Users className="w-6 h-6" />, color: "from-pink-500 to-pink-600" },
              { name: "Certifications", icon: <Award className="w-6 h-6" />, color: "from-indigo-500 to-indigo-600" },
              { name: "Talents & Interests", icon: <Zap className="w-6 h-6" />, color: "from-orange-500 to-orange-600" },
              { name: "Lifelong Learning", icon: <Globe className="w-6 h-6" />, color: "from-teal-500 to-teal-600" }
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {skill.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
