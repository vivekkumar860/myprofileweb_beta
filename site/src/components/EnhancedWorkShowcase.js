"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Lock, Calendar, User, ExternalLink, Github, ChevronDown } from 'lucide-react';

export default function EnhancedWorkShowcase() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [expandedTech, setExpandedTech] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    // Load projects from siteContent
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/siteContent.json');
        const data = await response.json();
        const projectData = data.projects || [
          {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-stack MERN application with payment integration and admin dashboard",
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
            status: "live",
            image: "/project1.jpg",
            demoUrl: "https://demo.example.com",
            githubUrl: "https://github.com/example/project",
            year: "2024",
            client: "Personal Project"
          },
          {
            id: 2,
            title: "Task Management App",
            description: "Collaborative project management tool with real-time updates",
            technologies: ["Next.js", "TypeScript", "Socket.io", "PostgreSQL"],
            status: "protected",
            password: "demo123",
            image: "/project2.jpg",
            year: "2024",
            client: "Tech Startup"
          },
          {
            id: 3,
            title: "AI-Powered Analytics",
            description: "Machine learning dashboard for business intelligence",
            technologies: ["Python", "TensorFlow", "React", "FastAPI", "Docker"],
            status: "coming-soon",
            image: "/project3.jpg",
            year: "2025",
            client: "Enterprise Client"
          }
        ];
        // Debug log removed for production
        setProjects(projectData);
      } catch (error) {
        console.error('Failed to load projects:', error);
        // Set fallback projects on error
        setProjects([
          {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-stack MERN application with payment integration and admin dashboard",
            technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
            status: "live",
            image: "/project1.jpg",
            demoUrl: "https://demo.example.com",
            githubUrl: "https://github.com/example/project",
            year: "2024",
            client: "Personal Project"
          },
          {
            id: 2,
            title: "Task Management App",
            description: "Collaborative project management tool with real-time updates",
            technologies: ["Next.js", "TypeScript", "Socket.io", "PostgreSQL"],
            status: "protected",
            password: "demo123",
            image: "/project2.jpg",
            year: "2024",
            client: "Tech Startup"
          },
          {
            id: 3,
            title: "AI-Powered Analytics",
            description: "Machine learning dashboard for business intelligence",
            technologies: ["Python", "TensorFlow", "React", "FastAPI", "Docker"],
            status: "coming-soon",
            image: "/project3.jpg",
            year: "2025",
            client: "Enterprise Client"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

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

  const getStatusBadge = (status) => {
    const badges = {
      live: { text: 'Live', color: 'bg-green-500', icon: <Eye size={16} /> },
      protected: { text: 'Protected', color: 'bg-yellow-500', icon: <Lock size={16} /> },
      'coming-soon': { text: 'Coming Soon', color: 'bg-blue-500', icon: <Calendar size={16} /> }
    };
    
    const badge = badges[status] || badges.live;
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg`}
      >
        {badge.icon}
        {badge.text}
      </motion.div>
    );
  };

  const handleProjectClick = (project) => {
    if (project.status === 'protected') {
      setSelectedProject(project);
      setShowPasswordModal(true);
    } else if (project.status === 'live' && project.demoUrl) {
      window.open(project.demoUrl, '_blank');
    }
  };

  const handlePasswordSubmit = () => {
    if (selectedProject && passwordInput === selectedProject.password) {
      // Store access in localStorage
      localStorage.setItem(`project_${selectedProject.id}_access`, 'granted');
      setShowPasswordModal(false);
      setPasswordInput('');
      
      // Redirect to project or show content
      if (selectedProject.demoUrl) {
        window.open(selectedProject.demoUrl, '_blank');
      }
    } else {
      alert('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  const toggleTechExpansion = (projectId) => {
    setExpandedTech(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="work" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore my latest work showcasing full-stack development, innovative solutions, 
              and cutting-edge technologies across various domains.
            </p>
          </motion.div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : projects.length === 0 ? (
              // No projects state
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg">No projects found</div>
                <p className="text-gray-400 mt-2">Projects are being loaded...</p>
              </div>
            ) : (
              // Projects loaded
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={index}
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Enhanced Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/api/placeholder/400/250"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(project.status)}
                  </div>

                  {/* Year & Client Badge */}
                  {(project.year || project.client) && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                    >
                      {project.year && (
                        <>
                          <Calendar size={14} />
                          <span>{project.year}</span>
                        </>
                      )}
                      {project.client && (
                        <>
                          {project.year && <span>•</span>}
                          <User size={14} />
                          <span>{project.client}</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Project Content */}
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Enhanced Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, expandedTech[project.id] ? undefined : 3).map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * techIndex }}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      
                      {project.technologies?.length > 3 && (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTechExpansion(project.id);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gray-200 transition-colors"
                        >
                          {expandedTech[project.id] ? 'Show Less' : `+${project.technologies.length - 3} more`}
                          <ChevronDown 
                            size={14} 
                            className={`transform transition-transform ${expandedTech[project.id] ? 'rotate-180' : ''}`} 
                          />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3">
                    {project.status === 'live' && project.demoUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, '_blank');
                        }}
                      >
                        <ExternalLink size={16} />
                        View Live
                      </motion.button>
                    )}
                    
                    {project.status === 'protected' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project);
                        }}
                      >
                        <Lock size={16} />
                        Enter Password
                      </motion.button>
                    )}
                    
                    {project.status === 'coming-soon' && (
                      <motion.button
                        className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                        disabled
                      >
                        <Calendar size={16} />
                        Coming Soon
                      </motion.button>
                    )}
                    
                    {project.githubUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-800 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.githubUrl, '_blank');
                        }}
                      >
                        <Github size={16} />
                        Code
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Lock size={32} className="text-yellow-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Protected Project</h3>
                <p className="text-gray-600">
                  Enter the password to view <strong>{selectedProject?.title}</strong>
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  placeholder="Enter project password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <motion.button
                    onClick={handlePasswordSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Access Project
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordInput('');
                      setSelectedProject(null);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm text-center mt-4">
                💡 Hint: Contact me for demo access
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
