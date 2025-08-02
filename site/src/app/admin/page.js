"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from 'framer-motion';
import { useSiteContent } from "../../hooks/useSiteContent";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { ADMIN_CONFIG, BORDER_OPTIONS, DEFAULT_CONTENT } from "../../lib/constants";
import AdminLogin from "../../components/admin/AdminLogin";
import AdminTabs from "../../components/admin/AdminTabs";
import AdminControls from "../../components/admin/AdminControls";
import AdminDashboard from "../../components/admin/AdminDashboard";
import { InputField, TextAreaField, ArrayField, SelectField } from "../../components/ui/FormFields";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function AdminDashboardPage() {
  const { siteContent, loading, error, saveContent } = useSiteContent();
  const { isAuthenticated, login, logout } = useAdminAuth();
  
  const [siteData, setSiteData] = useState(DEFAULT_CONTENT);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  // Mock analytics data
  const analytics = {
    visitors: { today: 45, week: 320, month: 1240 },
    pageViews: { today: 89, week: 650, month: 2800 },
    engagement: { avgTime: "2m 34s", bounceRate: "32%", conversion: "4.2%" }
  };

  // Update site data when content loads
  useEffect(() => {
    if (siteContent) {
      setSiteData(prev => ({
        ...prev,
        bio: siteContent.bio || "",
        highlights: siteContent.highlights || [],
        profile: {
          ...prev.profile,
          ...siteContent.profile,
        },
        projects: siteContent.projects || prev.projects,
        certifications: siteContent.certificates || prev.certifications,
        achievements: siteContent.achievements || [],
        statistics: siteContent.statistics || { experience: "2+", projects: "10+", clients: "5+" }
      }));
    }
  }, [siteContent]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && siteData && lastSaved !== JSON.stringify(siteData)) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, ADMIN_CONFIG.autoSaveDelay);
      return () => clearTimeout(timer);
    }
  }, [siteData, autoSave, lastSaved, handleAutoSave]);

  const handleAutoSave = useCallback(async () => {
    try {
      const result = await saveContent(siteData);
      if (result.success) {
        setLastSaved(JSON.stringify(siteData));
      }
    } catch (err) {
      console.error('Auto-save error:', err);
    }
  }, [siteData, saveContent]);

  const handleLogin = (password) => {
    return login(password);
  };

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
      highlights: { icon: "🌟", title: "New Highlight", desc: "Description here", border: "border-blue-500" },
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    
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
    
    for (let i = 0; i < siteData.highlights.length; i++) {
      const highlight = siteData.highlights[i];
      if (!highlight.title?.trim() || !highlight.desc?.trim() || !highlight.icon?.trim()) {
        setMessage(`❌ Highlight ${i + 1} is missing required fields`);
        setSaving(false);
        return;
      }
    }
    
    try {
      const result = await saveContent(siteData);
      
      if (result.success) {
        setMessage("✅ Changes saved successfully! Refresh the homepage to see updates.");
        setLastSaved(JSON.stringify(siteData));
      } else {
        setMessage(`❌ Error: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage("❌ Error saving changes. Please try again.");
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-content-backup.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setSiteData(data);
          setMessage("✅ Data imported successfully!");
        } catch (error) {
          setMessage("❌ Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <LoadingSpinner size="lg" text="Loading enhanced admin dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Enhanced Admin Dashboard</h1>
              <p className="text-blue-100 text-lg">Manage your portfolio with advanced features</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={logout}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <AdminControls 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          autoSave={autoSave}
          onAutoSaveChange={setAutoSave}
          lastSaved={lastSaved}
          onExport={exportData}
          onImport={importData}
        />

        <form onSubmit={handleSave} className="p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <AdminDashboard analytics={analytics} onTabChange={setActiveTab} />
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  value={siteData.profile.name}
                  onChange={(e) => updateField('profile', 'name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
                
                <InputField
                  label="Location"
                  value={siteData.profile.location}
                  onChange={(e) => updateField('profile', 'location', e.target.value)}
                  placeholder="City, State/Country"
                  required
                />
                
                <InputField
                  label="Email"
                  type="email"
                  value={siteData.profile.email}
                  onChange={(e) => updateField('profile', 'email', e.target.value)}
                  placeholder="trainedvk1@gmail.com"
                  required
                />
                
                <InputField
                  label="Phone"
                  value={siteData.profile.phone}
                  onChange={(e) => updateField('profile', 'phone', e.target.value)}
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
                
                <InputField
                  label="LinkedIn URL"
                  value={siteData.profile.linkedinUrl}
                  onChange={(e) => updateField('profile', 'linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="md:col-span-2"
                  required
                />
                
                <InputField
                  label="Profile Image Path"
                  value={siteData.profile.profileImage}
                  onChange={(e) => updateField('profile', 'profileImage', e.target.value)}
                  placeholder="/profile.jpg"
                  className="md:col-span-2"
                  required
                />
              </div>

              <ArrayField
                label="Professional Titles"
                items={siteData.profile.titles}
                onAdd={() => updateField('profile', 'titles', [...siteData.profile.titles, "New Title"])}
                onRemove={(index) => updateField('profile', 'titles', siteData.profile.titles.filter((_, i) => i !== index))}
                onUpdate={(index, value) => updateField('profile', 'titles', siteData.profile.titles.map((title, i) => i === index ? value : title))}
                placeholder="Professional title"
                required
              />
            </div>
          )}

          {/* Bio Tab */}
          {activeTab === "bio" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Biography</h2>
              <TextAreaField
                label="About Me"
                value={siteData.bio}
                onChange={(e) => setSiteData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Write your professional bio here..."
                rows={8}
                required
              />
            </div>
          )}

          {/* Highlights Tab */}
          {activeTab === "highlights" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Highlights</h2>
                <button
                  type="button"
                  onClick={() => addToArray('highlights')}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
                >
                  + Add Highlight
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteData.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Highlight {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('highlights', idx)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        ×
                      </button>
                    </div>
                    
                    <InputField
                      label="Icon (Emoji)"
                      value={highlight.icon}
                      onChange={(e) => updateArrayField('highlights', idx, 'icon', e.target.value)}
                      placeholder="🌟"
                      required
                    />
                    
                    <InputField
                      label="Title"
                      value={highlight.title}
                      onChange={(e) => updateArrayField('highlights', idx, 'title', e.target.value)}
                      placeholder="Highlight title"
                      required
                    />
                    
                    <TextAreaField
                      label="Description"
                      value={highlight.desc}
                      onChange={(e) => updateArrayField('highlights', idx, 'desc', e.target.value)}
                      placeholder="Description here..."
                      rows={3}
                      required
                    />
                    
                    <SelectField
                      label="Border Color"
                      value={highlight.border}
                      onChange={(e) => updateArrayField('highlights', idx, 'border', e.target.value)}
                      options={BORDER_OPTIONS.map(option => ({
                        value: option,
                        label: option.replace('border-', '').replace('-', ' ')
                      }))}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Work Experience</h2>
                <button
                  type="button"
                  onClick={() => addToArray('experience')}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
                >
                  + Add Experience
                </button>
              </div>
              
              <div className="space-y-8">
                {siteData.experience.map((exp, idx) => (
                  <div key={exp.id} className="bg-gray-50 border border-gray-200 rounded-xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 text-lg">Experience {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('experience', idx)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        × Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Company"
                        value={exp.company}
                        onChange={(e) => updateArrayField('experience', idx, 'company', e.target.value)}
                        placeholder="Company name"
                        required
                      />
                      
                      <InputField
                        label="Position"
                        value={exp.position}
                        onChange={(e) => updateArrayField('experience', idx, 'position', e.target.value)}
                        placeholder="Job title"
                        required
                      />
                      
                      <InputField
                        label="Duration"
                        value={exp.duration}
                        onChange={(e) => updateArrayField('experience', idx, 'duration', e.target.value)}
                        placeholder="2024 - Present"
                        className="md:col-span-2"
                        required
                      />
                    </div>
                    
                    <TextAreaField
                      label="Description"
                      value={exp.description}
                      onChange={(e) => updateArrayField('experience', idx, 'description', e.target.value)}
                      placeholder="Job description and responsibilities..."
                      rows={4}
                      required
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
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Education</h2>
                <button
                  type="button"
                  onClick={() => addToArray('education')}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
                >
                  + Add Education
                </button>
              </div>
              
              <div className="space-y-8">
                {siteData.education.map((edu, idx) => (
                  <div key={edu.id} className="bg-gray-50 border border-gray-200 rounded-xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 text-lg">Education {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('education', idx)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        × Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Institution"
                        value={edu.institution}
                        onChange={(e) => updateArrayField('education', idx, 'institution', e.target.value)}
                        placeholder="University/College name"
                        required
                      />
                      
                      <InputField
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => updateArrayField('education', idx, 'degree', e.target.value)}
                        placeholder="Degree and field of study"
                        required
                      />
                      
                      <InputField
                        label="Duration"
                        value={edu.duration}
                        onChange={(e) => updateArrayField('education', idx, 'duration', e.target.value)}
                        placeholder="2022 - 2026"
                        required
                      />
                      
                      <InputField
                        label="CGPA/GPA"
                        value={edu.cgpa}
                        onChange={(e) => updateArrayField('education', idx, 'cgpa', e.target.value)}
                        placeholder="8.5/10"
                        required
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
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Certifications</h2>
                <button
                  type="button"
                  onClick={() => addToArray('certifications')}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
                >
                  + Add Certification
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteData.certifications.map((cert, idx) => (
                  <div key={cert.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Certificate {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('certifications', idx)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        ×
                      </button>
                    </div>
                    
                    <InputField
                      label="Certification Name"
                      value={cert.name}
                      onChange={(e) => updateArrayField('certifications', idx, 'name', e.target.value)}
                      placeholder="Certification title"
                      required
                    />
                    
                    <InputField
                      label="Issuing Organization"
                      value={cert.issuer}
                      onChange={(e) => updateArrayField('certifications', idx, 'issuer', e.target.value)}
                      placeholder="Coursera, Udemy, etc."
                      required
                    />
                    
                    <InputField
                      label="Date Issued"
                      value={cert.date}
                      onChange={(e) => updateArrayField('certifications', idx, 'date', e.target.value)}
                      placeholder="Dec 2024"
                      required
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
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
                <button
                  type="button"
                  onClick={() => addToArray('projects')}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all"
                >
                  + Add Project
                </button>
              </div>
              
              <div className="space-y-8">
                {siteData.projects.map((project, idx) => (
                  <div key={project.id} className="bg-gray-50 border border-gray-200 rounded-xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 text-lg">Project {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('projects', idx)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        × Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Project Name"
                        value={project.name}
                        onChange={(e) => updateArrayField('projects', idx, 'name', e.target.value)}
                        placeholder="Project title"
                        required
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
                      rows={4}
                      required
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

          {/* Enhanced Save Button */}
          <div className="flex justify-center pt-8 border-t">
            <button 
              type="submit" 
              disabled={saving}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                saving 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" text="" />
                  Saving Changes...
                </div>
              ) : (
                'Save All Changes'
              )}
            </button>
          </div>

          {/* Enhanced Status Message */}
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl text-center font-medium mt-6 ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message}
            </motion.div>
          )}
        </form>

        {/* Enhanced Footer */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>💡 <strong>Tip:</strong> All changes are saved to siteContent.json. Refresh your homepage to see updates.</p>
            <div className="flex items-center gap-4">
              <span>Auto-save: {autoSave ? 'Enabled' : 'Disabled'}</span>
              <span>Last saved: {lastSaved ? new Date().toLocaleTimeString() : 'Never'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
