"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Zap, Award, TrendingUp } from 'lucide-react';

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
      <Zap key="zap" className="w-8 h-8" />,
      <Award key="award" className="w-8 h-8" />,
      <TrendingUp key="trending" className="w-8 h-8" />
    ];
    return iconComponents[index % iconComponents.length];
  };

  const colors = [
    { bg: 'from-blue-500 to-blue-600', text: 'text-blue-700', light: 'bg-blue-100' },
    { bg: 'from-green-500 to-green-600', text: 'text-green-700', light: 'bg-green-100' },
    { bg: 'from-purple-500 to-purple-600', text: 'text-purple-700', light: 'bg-purple-100' },
    { bg: 'from-orange-500 to-orange-600', text: 'text-orange-700', light: 'bg-orange-100' },
    { bg: 'from-pink-500 to-pink-600', text: 'text-pink-700', light: 'bg-pink-100' },
    { bg: 'from-indigo-500 to-indigo-600', text: 'text-indigo-700', light: 'bg-indigo-100' }
  ];

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
          {achievements.map((achievement, index) => {
            const colorScheme = colors[index % colors.length];
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${colorScheme.bg} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {getIcon(index)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {achievement.title}
                      </h3>
                      <span className={`px-3 py-1 ${colorScheme.light} ${colorScheme.text} rounded-full text-sm font-medium`}>
                        {achievement.year}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {achievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Achievements Yet</h3>
            <p className="text-gray-400">Achievements will appear here once added to the portfolio.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
