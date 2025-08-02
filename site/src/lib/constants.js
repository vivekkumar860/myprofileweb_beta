// Application constants and configurations
export const APP_CONFIG = {
  name: "Vivek Kumar Portfolio",
  version: "1.0.0",
  description: "Portfolio website of Vivek Kumar - Talent Acquisition Coordinator and B.Tech. CSE (AI & ML) Student",
  author: "Vivek Kumar",
  contact: {
    email: "trainedvk1@gmail.com",
    phone: "+91-XXXXXXXXXX",
    linkedin: "https://www.linkedin.com/in/vivekkumar860/"
  }
};

// Admin configuration
export const ADMIN_CONFIG = {
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123",
  keySequence: ['KeyA', 'KeyD', 'KeyM'],
  autoSaveDelay: 3000,
  cacheTTL: 5 * 60 * 1000 // 5 minutes
};

// Default content templates
export const DEFAULT_CONTENT = {
  profile: {
    name: "Vivek Kumar",
    titles: [
      "Talent Acquisition Coordinator",
      "B.Tech. CSE (AI & ML) Student", 
      "Full Stack Enthusiast",
      "Open to Collaborations"
    ],
    location: "Phagwara, Punjab",
    linkedinUrl: "https://www.linkedin.com/in/vivekkumar860/",
    email: "trainedvk1@gmail.com",
    phone: "+91-XXXXXXXXXX",
    profileImage: "/profile.jpg"
  },
  bio: "Passionate about creating innovative solutions and building exceptional teams.",
  highlights: [],
  skills: {
    technical: ["Java", "JavaScript", "Python", "C/C++", "HTML", "CSS"],
    tools: ["React", "Node.js", "Git", "VS Code", "Figma"],
    databases: ["MySQL", "MongoDB", "PostgreSQL"],
    cloud: ["AWS", "Google Cloud", "Azure"]
  },
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  statistics: {
    experience: "2+",
    projects: "10+",
    clients: "5+"
  }
};

// Typewriter phrases
export const TYPEWRITER_PHRASES = [
  "Full Stack Engineer 🚀",
  "Talent Acquisition Expert 🎯", 
  "MERN Stack Developer 💻",
  "Problem Solver 🧩"
];

// Border color options for highlights
export const BORDER_OPTIONS = [
  "border-blue-500",
  "border-green-500", 
  "border-yellow-500",
  "border-purple-500",
  "border-pink-500",
  "border-indigo-500",
  "border-red-500",
  "border-orange-500",
  "border-teal-500",
  "border-cyan-500"
];

// Contact form subjects
export const CONTACT_SUBJECTS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'hiring', label: 'Hiring Opportunity' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'project', label: 'Project Discussion' },
  { value: 'other', label: 'Other' }
];

// Animation configurations
export const ANIMATION_CONFIG = {
  typewriter: {
    typeSpeed: 120,
    deleteSpeed: 60,
    pauseDuration: 2000
  },
  fadeIn: {
    duration: 0.6,
    delay: 0.2
  },
  stagger: {
    delay: 0.1
  }
};

// API endpoints
export const API_ENDPOINTS = {
  saveContent: '/api/save-content',
  contact: '/api/contact',
  analytics: '/api/analytics',
  health: '/api/health'
};

// File paths
export const FILE_PATHS = {
  siteContent: '/siteContent.json',
  dataDir: 'data',
  publicDir: 'public'
};

// Validation messages
export const VALIDATION_MESSAGES = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be less than ${max} characters`,
  url: "Please enter a valid URL"
}; 