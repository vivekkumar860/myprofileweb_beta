"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LinkedInQR() {
  const [copied, setCopied] = useState(false);

  const linkedInUrl = 'https://www.linkedin.com/in/vivekk860/';

  const copyUrl = () => {
    navigator.clipboard.writeText(linkedInUrl);
    setCopied(true);
    toast.success('LinkedIn URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const openLinkedIn = () => {
    window.open(linkedInUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-w-sm mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3"
        >
          <QrCode className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="text-lg font-bold text-gray-900">Connect on LinkedIn</h3>
        <p className="text-sm text-gray-600">Scan to connect professionally</p>
      </div>

      {/* QR Code Placeholder - In a real app, you'd generate this */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 mb-4">
        <div className="w-40 h-40 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* QR Code Pattern */}
          <div className="absolute inset-2 grid grid-cols-8 gap-1">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-sm ${
                  Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'
                }`}
              />
            ))}
          </div>
          
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          onClick={copyUrl}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy URL
            </>
          )}
        </motion.button>
        
        <motion.button
          onClick={openLinkedIn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          Open
        </motion.button>
      </div>

      {/* URL Display */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500 text-center break-all">
          {linkedInUrl}
        </p>
      </div>
    </motion.div>
  );
}
