"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, Toaster } from 'react-hot-toast';
import { MapPin, Phone, Mail, ExternalLink, Copy, Clock, CheckCircle } from 'lucide-react';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function EnhancedContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const sectionRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: 'general'
    }
  });

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', {
        duration: 5000,
        position: 'top-center',
      });
      
      reset();
    } catch (error) {
      toast.error('Sorry, there was an error sending your message. Please try again or contact me directly.', {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLinkedInUrl = () => {
    navigator.clipboard.writeText('https://www.linkedin.com/in/vivekkumar860/');
    toast.success('LinkedIn URL copied to clipboard!');
  };

  const revealPhone = () => {
    setPhoneRevealed(true);
    toast.success('Phone number revealed!');
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'trainedvk1@gmail.com',
      link: 'mailto:trainedvk1@gmail.com',
      description: 'Send me an email anytime',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <ExternalLink className="w-6 h-6" />,
      title: 'LinkedIn',
      value: '/in/vivekkumar860',
      link: 'https://www.linkedin.com/in/vivekkumar860/',
      description: 'Connect professionally',
      color: 'from-blue-600 to-blue-700',
      copyAction: copyLinkedInUrl
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: phoneRevealed ? '+91-9876543210' : '+91-XXXXXXXXXX',
      link: phoneRevealed ? 'tel:+919876543210' : '#',
      description: 'Call for urgent matters',
      color: 'from-green-500 to-green-600',
      revealAction: !phoneRevealed ? revealPhone : null
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Phagwara, Punjab',
      link: 'https://maps.google.com/?q=Phagwara,Punjab,India',
      description: 'Available for local meetings',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const messageLength = watch('message')?.length || 0;

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="opacity-0">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Let&apos;s Work{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Together
              </span>
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to discuss your next project or explore collaboration opportunities? 
              I&apos;d love to hear from you and help bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Send me a message
                </h3>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="trainedvk1@gmail.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Company and Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      {...register('subject')}
                      id="subject"
                      className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 ${
                        errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="hiring">Hiring/Recruitment</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="project">Project Discussion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message *
                    </label>
                    <span className={`text-sm ${messageLength < 10 ? 'text-red-500' : 'text-green-500'}`}>
                      {messageLength}/500
                    </span>
                  </div>
                  <textarea
                    {...register('message')}
                    id="message"
                    maxLength={500}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white text-gray-900 ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Tell me about your project or how I can help you..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Enhanced Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in touch
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you&apos;re looking for talent acquisition expertise, technical consultation, 
                  or collaboration opportunities, I&apos;m here to help. Choose the best way to reach out:
                </p>
              </div>

              {/* Enhanced Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                          {method.title}
                        </h4>
                        <p className="text-blue-600 font-medium mb-1">{method.value}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {method.copyAction && (
                          <motion.button
                            onClick={method.copyAction}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Copy URL"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                        )}
                        {method.revealAction && (
                          <motion.button
                            onClick={method.revealAction}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Reveal phone number"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.button>
                        )}
                        {!method.revealAction && !method.copyAction && (
                          <motion.a
                            href={method.link}
                            target={method.link.startsWith('http') ? '_blank' : undefined}
                            rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Response Time Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-blue-900">Quick Response</h4>
                </div>
                <p className="text-blue-700 text-sm leading-relaxed">
                  I typically respond to emails within <strong>24 hours</strong>. For urgent matters, 
                  please mention &quot;URGENT&quot; in your subject line or contact me via phone.
                </p>
                <div className="flex items-center gap-2 mt-3 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Usually responds within a few hours</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
