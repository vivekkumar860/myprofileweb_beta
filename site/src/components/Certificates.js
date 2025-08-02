"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Certificates() {
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

  const certificates = siteContent?.certificates || [];

  return (
    <section id="certificates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Certificates & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Training</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional certifications and training programs that validate my expertise in technology and development.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-full h-48 bg-gray-100 rounded-xl mb-6 overflow-hidden">
                <Image
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-gray-600 font-medium mb-4">{cert.issuer}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                {cert.date}
              </div>
              
              <motion.div 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Certificate
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
