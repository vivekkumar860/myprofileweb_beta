"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, FileText } from 'lucide-react';
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
    <section id="certificates" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center ${cert.image ? 'hidden' : ''}`}>
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-medium">Certificate</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {cert.title}
              </h3>
              
              <p className="text-gray-600 font-medium mb-4 text-sm">{cert.issuer}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                {cert.date}
              </div>
              
              {cert.credentialId && (
                <div className="text-xs text-gray-400 mb-4">
                  ID: {cert.credentialId}
                </div>
              )}
              
              <motion.div 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <button 
                  onClick={() => cert.url && window.open(cert.url, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Certificate
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Certificates Yet</h3>
            <p className="text-gray-400">Certificates will appear here once added to the portfolio.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
