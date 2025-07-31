"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap } from 'lucide-react';

export default function Achievements() {
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

  const achievements = siteContent?.achievements || [];

  const getIcon = (index) => {
    const iconComponents = [
      <Trophy key="trophy" className="w-8 h-8" />,
      <Star key="star" className="w-8 h-8" />,
      <Target key="target" className="w-8 h-8" />,
      <Zap key="zap" className="w-8 h-8" />
    ];
    return iconComponents[index % iconComponents.length];
  };

  const colors = ['blue', 'green', 'purple', 'orange'];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Achievements & <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Recognition</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Milestones and recognitions that showcase my commitment to excellence and continuous growth in technology.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r from-${colors[index % colors.length]}-500 to-${colors[index % colors.length]}-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {getIcon(index)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {achievement.title}
                    </h3>
                    <span className={`px-3 py-1 bg-${colors[index % colors.length]}-100 text-${colors[index % colors.length]}-700 rounded-full text-sm font-medium`}>
                      {achievement.year}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
