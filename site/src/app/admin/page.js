"use client";
import React, { useState, useEffect } from "react";
import siteContent from "../../../siteContent.json";

// Note: For production, this should be handled server-side with proper authentication
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

// Default highlight template
const DEFAULT_HIGHLIGHT = {
  icon: "🌟",
  title: "New Highlight",
  desc: "Description here",
  border: "border-blue-500"
};

// Available border color options
const BORDER_OPTIONS = [
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

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Site content state
  const [siteData, setSiteData] = useState({
    bio: "",
    highlights: [],
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
    skills: {
      technical: ["Java", "JavaScript", "Python", "C/C++", "HTML", "CSS"],
      tools: ["React", "Node.js", "Git", "VS Code", "Figma"],
      databases: ["MySQL", "MongoDB", "PostgreSQL"],
      cloud: ["AWS", "Google Cloud", "Azure"]
    },
    experience: [
      {
        id: 1,
        company: "Placify.ai",
        position: "Talent Acquisition Coordinator",
        duration: "2024 - Present",
        description: "Supporting end-to-end hiring processes including job posting, candidate screening, and onboarding.",
        achievements: ["Streamlined hiring process", "Improved candidate experience"]
      }
    ],
    education: [
      {
        id: 1,
        institution: "Lovely Professional University",
        degree: "B.Tech. Computer Science & Engineering (AI & ML)",
        duration: "2022 - 2026",
        cgpa: "8.5/10",
        activities: ["Coding Club", "Anime Club"]
      }
    ],
    certifications: [
      {
        id: 1,
        name: "TCP/IP & Advanced Topics",
        issuer: "Coursera",
        date: "Dec 2024",
        credentialId: "ABC123"
      }
    ],
    projects: [
      {
        id: 1,
        name: "Portfolio Website",
        description: "Personal portfolio built with Next.js and Tailwind CSS",
        technologies: ["Next.js", "React", "Tailwind CSS"],
        githubUrl: "https://github.com/username/portfolio",
        liveUrl: "https://portfolio.com",
        features: ["Responsive design", "Admin dashboard", "Dynamic content"]
      }
    ]
  });

  useEffect(() => {
    // Initialize with existing content
    setSiteData(prev => ({
      ...prev,
      bio: siteContent.bio || "",
      highlights: siteContent.highlights || []
    }));
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setMessage("");
    } else {
      setMessage("Incorrect password");
    }
  }

  // Generic handlers for different data types
  const updateField = (section, field, value) => {
    setSiteData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setSiteData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addToArray = (section, newItem = null) => {
    const defaultItems = {
      highlights: DEFAULT_HIGHLIGHT,
      experience: {
        id: Date.now(),
        company: "New Company",
        position: "New Position", 
        duration: "2024 - Present",
        description: "Job description here",
        achievements: ["Achievement 1"]
      },
      education: {
        id: Date.now(),
        institution: "New Institution",
        degree: "New Degree",
        duration: "2022 - 2026",
        cgpa: "0.0/10",
        activities: ["Activity 1"]
      },
      certifications: {
        id: Date.now(),
        name: "New Certification",
        issuer: "Issuer",
        date: "2024",
        credentialId: "ID123"
      },
      projects: {
        id: Date.now(),
        name: "New Project",
        description: "Project description",
        technologies: ["Technology 1"],
        githubUrl: "",
        liveUrl: "",
        features: ["Feature 1"]
      }
    };

    const item = newItem || defaultItems[section];
    setSiteData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const removeFromArray = (section, index) => {
    setSiteData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateSkillCategory = (category, skills) => {
    setSiteData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills
      }
    }));
  };

  const updateNestedArray = (section, index, field, newArray) => {
    setSiteData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: newArray } : item
      )
    }));
  };

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    
    // Note: API routes are not available in static export (GitHub Pages)
    // This functionality is disabled for static deployments
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      setMessage("⚠️ Save functionality is not available in GitHub Pages deployment. Edit siteContent.json directly and redeploy.");
      setSaving(false);
      return;
    }
    
    // Validate inputs
    if (!siteData.bio.trim()) {
      setMessage("❌ Bio cannot be empty");
      setSaving(false);
      return;
    }
    
    if (siteData.highlights.length === 0) {
      setMessage("❌ At least one highlight is required");
      setSaving(false);
      return;
    }
    
    // Validate each highlight
    for (let i = 0; i < siteData.highlights.length; i++) {
      const highlight = siteData.highlights[i];
      if (!highlight.title?.trim() || !highlight.desc?.trim() || !highlight.icon?.trim()) {
        setMessage(`❌ Highlight ${i + 1} is missing required fields`);
        setSaving(false);
        return;
      }
    }
    
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(siteData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage("✅ Changes saved successfully! Refresh the homepage to see updates.");
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Error saving changes. Please try again.");
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-80">
          <h2 className="text-xl font-bold mb-2 text-blue-700">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded px-3 py-2 bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700">Login</button>
          {message && <p className="text-red-500 text-sm">{message}</p>}
        </form>
      </div>
    );
  }

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const InputField = ({ label, value, onChange, type = "text", placeholder = "", className = "" }) => (
    <div className={className}>
      <label className="block font-semibold mb-1 text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 border-gray-300"
      />
    </div>
  );

  const TextAreaField = ({ label, value, onChange, placeholder = "", rows = 3, className = "" }) => (
    <div className={className}>
      <label className="block font-semibold mb-1 text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 border-gray-300"
      />
    </div>
  );

  const ArrayField = ({ label, items, onAdd, onRemove, onUpdate, placeholder = "New item" }) => (
    <div>
      <label className="block font-semibold mb-2 text-gray-700">{label}</label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 border-gray-300"
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          + Add {label.slice(0, -1)}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Complete Admin Dashboard</h1>
          <p className="text-blue-100 mt-2">Manage every aspect of your portfolio website</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-50 p-4 border-b">
          <div className="flex flex-wrap gap-2">
            <TabButton id="profile" label="👤 Profile" active={activeTab === "profile"} onClick={setActiveTab} />
            <TabButton id="bio" label="📝 Bio" active={activeTab === "bio"} onClick={setActiveTab} />
            <TabButton id="highlights" label="⭐ Highlights" active={activeTab === "highlights"} onClick={setActiveTab} />
            <TabButton id="skills" label="💻 Skills" active={activeTab === "skills"} onClick={setActiveTab} />
            <TabButton id="experience" label="💼 Experience" active={activeTab === "experience"} onClick={setActiveTab} />
            <TabButton id="education" label="🎓 Education" active={activeTab === "education"} onClick={setActiveTab} />
            <TabButton id="certifications" label="📜 Certifications" active={activeTab === "certifications"} onClick={setActiveTab} />
            <TabButton id="projects" label="🚀 Projects" active={activeTab === "projects"} onClick={setActiveTab} />
          </div>
        </div>

        <form onSubmit={handleSave} className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  value={siteData.profile.name}
                  onChange={(e) => updateField('profile', 'name', e.target.value)}
                  placeholder="Your full name"
                />
                
                <InputField
                  label="Location"
                  value={siteData.profile.location}
                  onChange={(e) => updateField('profile', 'location', e.target.value)}
                  placeholder="City, State/Country"
                />
                
                <InputField
                  label="Email"
                  type="email"
                  value={siteData.profile.email}
                  onChange={(e) => updateField('profile', 'email', e.target.value)}
                  placeholder="trainedvk1@gmail.com"
                />
                
                <InputField
                  label="Phone"
                  value={siteData.profile.phone}
                  onChange={(e) => updateField('profile', 'phone', e.target.value)}
                  placeholder="+91-XXXXXXXXXX"
                />
                
                <InputField
                  label="LinkedIn URL"
                  value={siteData.profile.linkedinUrl}
                  onChange={(e) => updateField('profile', 'linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="md:col-span-2"
                />
                
                <InputField
                  label="Profile Image Path"
                  value={siteData.profile.profileImage}
                  onChange={(e) => updateField('profile', 'profileImage', e.target.value)}
                  placeholder="/profile.jpg"
                  className="md:col-span-2"
                />
              </div>

              <ArrayField
                label="Professional Titles"
                items={siteData.profile.titles}
                onAdd={() => updateField('profile', 'titles', [...siteData.profile.titles, "New Title"])}
                onRemove={(index) => updateField('profile', 'titles', siteData.profile.titles.filter((_, i) => i !== index))}
                onUpdate={(index, value) => updateField('profile', 'titles', siteData.profile.titles.map((title, i) => i === index ? value : title))}
                placeholder="Professional title"
              />
            </div>
          )}

          {/* Bio Tab */}
          {activeTab === "bio" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Biography</h2>
              <TextAreaField
                label="About Me"
                value={siteData.bio}
                onChange={(e) => setSiteData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Write your professional bio here..."
                rows={8}
              />
            </div>
          )}

          {/* Highlights Tab */}
          {activeTab === "highlights" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Highlights</h2>
                <button
                  type="button"
                  onClick={() => addToArray('highlights')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  + Add Highlight
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteData.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gray-50 border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Highlight {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('highlights', idx)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <InputField
                      label="Icon (Emoji)"
                      value={highlight.icon}
                      onChange={(e) => updateArrayField('highlights', idx, 'icon', e.target.value)}
                      placeholder="🌟"
                    />
                    
                    <InputField
                      label="Title"
                      value={highlight.title}
                      onChange={(e) => updateArrayField('highlights', idx, 'title', e.target.value)}
                      placeholder="Highlight title"
                    />
                    
                    <TextAreaField
                      label="Description"
                      value={highlight.desc}
                      onChange={(e) => updateArrayField('highlights', idx, 'desc', e.target.value)}
                      placeholder="Description here..."
                      rows={3}
                    />
                    
                    <div>
                      <label className="block font-semibold mb-1 text-gray-700">Border Color</label>
                      <select
                        value={highlight.border}
                        onChange={(e) => updateArrayField('highlights', idx, 'border', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {BORDER_OPTIONS.map(option => (
                          <option key={option} value={option}>
                            {option.replace('border-', '').replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills & Technologies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ArrayField
                  label="Technical Skills"
                  items={siteData.skills.technical}
                  onAdd={() => updateSkillCategory('technical', [...siteData.skills.technical, "New Skill"])}
                  onRemove={(index) => updateSkillCategory('technical', siteData.skills.technical.filter((_, i) => i !== index))}
                  onUpdate={(index, value) => updateSkillCategory('technical', siteData.skills.technical.map((skill, i) => i === index ? value : skill))}
                  placeholder="Programming language or technology"
                />
                
                <ArrayField
                  label="Tools & Frameworks"
                  items={siteData.skills.tools}
                  onAdd={() => updateSkillCategory('tools', [...siteData.skills.tools, "New Tool"])}
                  onRemove={(index) => updateSkillCategory('tools', siteData.skills.tools.filter((_, i) => i !== index))}
                  onUpdate={(index, value) => updateSkillCategory('tools', siteData.skills.tools.map((tool, i) => i === index ? value : tool))}
                  placeholder="Tool or framework"
                />
                
                <ArrayField
                  label="Databases"
                  items={siteData.skills.databases}
                  onAdd={() => updateSkillCategory('databases', [...siteData.skills.databases, "New Database"])}
                  onRemove={(index) => updateSkillCategory('databases', siteData.skills.databases.filter((_, i) => i !== index))}
                  onUpdate={(index, value) => updateSkillCategory('databases', siteData.skills.databases.map((db, i) => i === index ? value : db))}
                  placeholder="Database technology"
                />
                
                <ArrayField
                  label="Cloud Platforms"
                  items={siteData.skills.cloud}
                  onAdd={() => updateSkillCategory('cloud', [...siteData.skills.cloud, "New Platform"])}
                  onRemove={(index) => updateSkillCategory('cloud', siteData.skills.cloud.filter((_, i) => i !== index))}
                  onUpdate={(index, value) => updateSkillCategory('cloud', siteData.skills.cloud.map((platform, i) => i === index ? value : platform))}
                  placeholder="Cloud platform"
                />
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
                <button
                  type="button"
                  onClick={() => addToArray('experience')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  + Add Experience
                </button>
              </div>
              
              <div className="space-y-6">
                {siteData.experience.map((exp, idx) => (
                  <div key={exp.id} className="bg-gray-50 border rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Experience {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('experience', idx)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        × Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Company"
                        value={exp.company}
                        onChange={(e) => updateArrayField('experience', idx, 'company', e.target.value)}
                        placeholder="Company name"
                      />
                      
                      <InputField
                        label="Position"
                        value={exp.position}
                        onChange={(e) => updateArrayField('experience', idx, 'position', e.target.value)}
                        placeholder="Job title"
                      />
                      
                      <InputField
                        label="Duration"
                        value={exp.duration}
                        onChange={(e) => updateArrayField('experience', idx, 'duration', e.target.value)}
                        placeholder="2024 - Present"
                        className="md:col-span-2"
                      />
                    </div>
                    
                    <TextAreaField
                      label="Description"
                      value={exp.description}
                      onChange={(e) => updateArrayField('experience', idx, 'description', e.target.value)}
                      placeholder="Job description and responsibilities..."
                      rows={3}
                    />
                    
                    <ArrayField
                      label="Key Achievements"
                      items={exp.achievements || []}
                      onAdd={() => updateArrayField('experience', idx, 'achievements', [...(exp.achievements || []), "New achievement"])}
                      onRemove={(achievementIdx) => updateArrayField('experience', idx, 'achievements', exp.achievements.filter((_, i) => i !== achievementIdx))}
                      onUpdate={(achievementIdx, value) => updateArrayField('experience', idx, 'achievements', exp.achievements.map((achievement, i) => i === achievementIdx ? value : achievement))}
                      placeholder="Achievement or accomplishment"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                <button
                  type="button"
                  onClick={() => addToArray('education')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  + Add Education
                </button>
              </div>
              
              <div className="space-y-6">
                {siteData.education.map((edu, idx) => (
                  <div key={edu.id} className="bg-gray-50 border rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Education {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('education', idx)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        × Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Institution"
                        value={edu.institution}
                        onChange={(e) => updateArrayField('education', idx, 'institution', e.target.value)}
                        placeholder="University/College name"
                      />
                      
                      <InputField
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => updateArrayField('education', idx, 'degree', e.target.value)}
                        placeholder="Degree and field of study"
                      />
                      
                      <InputField
                        label="Duration"
                        value={edu.duration}
                        onChange={(e) => updateArrayField('education', idx, 'duration', e.target.value)}
                        placeholder="2022 - 2026"
                      />
                      
                      <InputField
                        label="CGPA/GPA"
                        value={edu.cgpa}
                        onChange={(e) => updateArrayField('education', idx, 'cgpa', e.target.value)}
                        placeholder="8.5/10"
                      />
                    </div>
                    
                    <ArrayField
                      label="Activities & Clubs"
                      items={edu.activities || []}
                      onAdd={() => updateArrayField('education', idx, 'activities', [...(edu.activities || []), "New activity"])}
                      onRemove={(activityIdx) => updateArrayField('education', idx, 'activities', edu.activities.filter((_, i) => i !== activityIdx))}
                      onUpdate={(activityIdx, value) => updateArrayField('education', idx, 'activities', edu.activities.map((activity, i) => i === activityIdx ? value : activity))}
                      placeholder="Club or activity"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
                <button
                  type="button"
                  onClick={() => addToArray('certifications')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  + Add Certification
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteData.certifications.map((cert, idx) => (
                  <div key={cert.id} className="bg-gray-50 border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Certificate {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('certifications', idx)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <InputField
                      label="Certification Name"
                      value={cert.name}
                      onChange={(e) => updateArrayField('certifications', idx, 'name', e.target.value)}
                      placeholder="Certification title"
                    />
                    
                    <InputField
                      label="Issuing Organization"
                      value={cert.issuer}
                      onChange={(e) => updateArrayField('certifications', idx, 'issuer', e.target.value)}
                      placeholder="Coursera, Udemy, etc."
                    />
                    
                    <InputField
                      label="Date Issued"
                      value={cert.date}
                      onChange={(e) => updateArrayField('certifications', idx, 'date', e.target.value)}
                      placeholder="Dec 2024"
                    />
                    
                    <InputField
                      label="Credential ID (Optional)"
                      value={cert.credentialId}
                      onChange={(e) => updateArrayField('certifications', idx, 'credentialId', e.target.value)}
                      placeholder="ABC123XYZ"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                <button
                  type="button"
                  onClick={() => addToArray('projects')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  + Add Project
                </button>
              </div>
              
              <div className="space-y-6">
                {siteData.projects.map((project, idx) => (
                  <div key={project.id} className="bg-gray-50 border rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Project {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('projects', idx)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        × Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Project Name"
                        value={project.name}
                        onChange={(e) => updateArrayField('projects', idx, 'name', e.target.value)}
                        placeholder="Project title"
                      />
                      
                      <InputField
                        label="GitHub URL (Optional)"
                        value={project.githubUrl}
                        onChange={(e) => updateArrayField('projects', idx, 'githubUrl', e.target.value)}
                        placeholder="https://github.com/username/repo"
                      />
                      
                      <InputField
                        label="Live Demo URL (Optional)"
                        value={project.liveUrl}
                        onChange={(e) => updateArrayField('projects', idx, 'liveUrl', e.target.value)}
                        placeholder="https://project-demo.com"
                        className="md:col-span-2"
                      />
                    </div>
                    
                    <TextAreaField
                      label="Description"
                      value={project.description}
                      onChange={(e) => updateArrayField('projects', idx, 'description', e.target.value)}
                      placeholder="Project description and what it does..."
                      rows={3}
                    />
                    
                    <ArrayField
                      label="Technologies Used"
                      items={project.technologies || []}
                      onAdd={() => updateArrayField('projects', idx, 'technologies', [...(project.technologies || []), "New technology"])}
                      onRemove={(techIdx) => updateArrayField('projects', idx, 'technologies', project.technologies.filter((_, i) => i !== techIdx))}
                      onUpdate={(techIdx, value) => updateArrayField('projects', idx, 'technologies', project.technologies.map((tech, i) => i === techIdx ? value : tech))}
                      placeholder="React, Node.js, etc."
                    />
                    
                    <ArrayField
                      label="Key Features"
                      items={project.features || []}
                      onAdd={() => updateArrayField('projects', idx, 'features', [...(project.features || []), "New feature"])}
                      onRemove={(featureIdx) => updateArrayField('projects', idx, 'features', project.features.filter((_, i) => i !== featureIdx))}
                      onUpdate={(featureIdx, value) => updateArrayField('projects', idx, 'features', project.features.map((feature, i) => i === featureIdx ? value : feature))}
                      placeholder="Feature description"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-center pt-6 border-t">
            <button 
              type="submit" 
              disabled={saving}
              className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                saving 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {saving ? 'Saving Changes...' : 'Save All Changes'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-lg text-center font-medium ${
              message.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t text-center">
          <p className="text-gray-500 text-sm">
            💡 <strong>Tip:</strong> All changes are saved to siteContent.json. Refresh your homepage to see updates.
          </p>
        </div>
      </div>
    </div>
  );
}
