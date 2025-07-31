"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const ProjectCard = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getStatusBadge = (status) => {
    const badges = {
      live: { text: 'View Project', color: 'bg-green-500', icon: '🚀' },
      protected: { text: 'Password Protected', color: 'bg-yellow-500', icon: '🔒' },
      coming: { text: 'Coming Soon', color: 'bg-blue-500', icon: '⏳' },
      github: { text: 'View Code', color: 'bg-gray-700', icon: '💻' }
    };
    return badges[status] || badges.live;
  };

  const handleCardClick = () => {
    if (project.status === 'protected') {
      // Handle password protection
      const password = prompt('Enter project password:');
      if (password === project.password) {
        window.open(project.url, '_blank');
      } else if (password !== null) {
        alert('Incorrect password');
      }
    } else if (project.url && project.status !== 'coming') {
      window.open(project.url, '_blank');
    }
  };

  const badge = getStatusBadge(project.status);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer opacity-0"
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={handleCardClick}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">{project.icon || '📁'}</div>
              <div className="text-gray-500 font-medium">{project.title}</div>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
            <span>{badge.icon}</span>
            {badge.text}
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Project Stats */}
        {project.stats && (
          <div className="flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            {project.stats.client && <span>Client: {project.stats.client}</span>}
            {project.stats.year && <span>{project.stats.year}</span>}
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300" />
    </div>
  );
};

export default function WorkShowcase() {
  // Sample projects data - this should come from your CMS/admin panel
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio built with Next.js featuring dynamic admin dashboard and modern UI/UX design.",
      image: "/project-portfolio.jpg",
      url: "https://github.com/vivekkumar860/portfolio",
      status: "live",
      technologies: ["Next.js", "React", "Tailwind CSS", "Node.js"],
      icon: "🌟",
      stats: { client: "Personal", year: "2025" }
    },
    {
      id: 2,
      title: "Placify.ai Integration",
      description: "Advanced talent acquisition platform with AI-powered candidate matching and screening automation.",
      image: "/project-placify.jpg",
      url: "https://placify.ai",
      status: "protected",
      password: "demo123",
      technologies: ["Python", "AI/ML", "React", "PostgreSQL"],
      icon: "🤖",
      stats: { client: "Placify.ai", year: "2024" }
    },
    {
      id: 3,
      title: "Smart Recruitment Dashboard",
      description: "Comprehensive recruiting analytics dashboard with real-time candidate tracking and performance metrics.",
      image: "/project-dashboard.jpg",
      url: "#",
      status: "coming",
      technologies: ["Vue.js", "D3.js", "Express", "MongoDB"],
      icon: "📊",
      stats: { client: "Upcoming", year: "2025" }
    },
    {
      id: 4,
      title: "Network Security Toolkit",
      description: "Educational toolkit for learning network security concepts with interactive simulations.",
      image: "/project-security.jpg",
      url: "https://github.com/vivekkumar860/security-toolkit",
      status: "github",
      technologies: ["Python", "Networking", "Cybersecurity", "Flask"],
      icon: "🔐",
      stats: { client: "Open Source", year: "2024" }
    }
  ];

  return (
    <section id="work" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Selected Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects showcasing my expertise in talent acquisition, 
            full-stack development, and AI-powered solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Interested in working together? Let&apos;s discuss your next project.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
