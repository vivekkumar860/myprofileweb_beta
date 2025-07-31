"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Award, TrendingUp, Users } from 'lucide-react';

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

  const skillCategories = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
      color: "blue"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Backend & Database",
      skills: ["Node.js", "Python", "MongoDB", "Express.js", "API Development"],
      color: "green"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Networking & Cloud",
      skills: ["TCP/IP", "Network Security", "Cloud Computing", "Packet Analysis"],
      color: "purple"
    }
  ];

  const statistics = siteContent?.statistics || {
    experience: "2+",
    projects: "10+",
    clients: "5+"
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
          <div className="text-center">
            <motion.div 
              className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {statistics.experience}
            </motion.div>
            <p className="text-gray-600 font-medium">Years Experience</p>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {statistics.projects}
            </motion.div>
            <p className="text-gray-600 font-medium">Projects Completed</p>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {statistics.clients}
            </motion.div>
            <p className="text-gray-600 font-medium">Happy Clients</p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 text-white mb-6`}>
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (skillIndex * 0.1) }}
                    className={`inline-block bg-${category.color}-50 text-${category.color}-700 px-4 py-2 rounded-lg text-sm font-medium mr-2 mb-2 border border-${category.color}-200`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
