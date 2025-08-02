"use client";
import React, { useState, useEffect } from 'react';
import { Save, Eye, Download, Upload, Trash2, Plus, Edit, X } from 'lucide-react';

export default function AdminControls({ activeTab, siteContent, onSave, onTabChange }) {
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (siteContent) {
      setFormData(siteContent);
    }
  }, [siteContent]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value.split(',').map(item => item.trim())
      }
    }));
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.profile?.name || ''}
            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.profile?.location || ''}
            onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.profile?.email || ''}
            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            value={formData.profile?.phone || ''}
            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={formData.profile?.linkedinUrl || ''}
            onChange={(e) => handleInputChange('profile', 'linkedinUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          <input
            type="text"
            value={formData.profile?.profileImage || ''}
            onChange={(e) => handleInputChange('profile', 'profileImage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="/profile.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Titles (comma-separated)</label>
        <input
          type="text"
          value={formData.profile?.titles?.join(', ') || ''}
          onChange={(e) => handleInputChange('profile', 'titles', e.target.value.split(',').map(t => t.trim()))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Talent Acquisition Coordinator, B.Tech. CSE Student"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Languages (comma-separated)</label>
        <input
          type="text"
          value={formData.profile?.personalInfo?.languages?.join(', ') || ''}
          onChange={(e) => handleArrayChange('profile', 'personalInfo.languages', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="English, Hindi, Punjabi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Interests (comma-separated)</label>
        <input
          type="text"
          value={formData.profile?.personalInfo?.interests?.join(', ') || ''}
          onChange={(e) => handleArrayChange('profile', 'personalInfo.interests', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Coding, Anime, Technology"
        />
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">About Content</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Main Bio</label>
        <textarea
          value={formData.about?.mainBio || ''}
          onChange={(e) => handleInputChange('about', 'mainBio', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Write your main bio here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Short Bio</label>
        <input
          type="text"
          value={formData.about?.shortBio || ''}
          onChange={(e) => handleInputChange('about', 'shortBio', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief one-line description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
        <textarea
          value={formData.about?.mission || ''}
          onChange={(e) => handleInputChange('about', 'mission', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your professional mission..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Values (comma-separated)</label>
        <input
          type="text"
          value={formData.about?.values?.join(', ') || ''}
          onChange={(e) => handleArrayChange('about', 'values', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Continuous Learning, Innovation, Collaboration"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fun Facts (comma-separated)</label>
        <input
          type="text"
          value={formData.about?.funFacts?.join(', ') || ''}
          onChange={(e) => handleArrayChange('about', 'funFacts', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Active member of Coding Club, Certified in networking"
        />
      </div>
    </div>
  );

  const renderTimelineSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Timeline Management</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3">Experience</h4>
          {formData.timeline?.experience?.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.experience[index].title = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Job Title"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={item.company || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.experience[index].company = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Company"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={item.year || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.experience[index].year = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Year"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  value={item.description || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.experience[index].description = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Description"
                  rows={2}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3">Education</h4>
          {formData.timeline?.education?.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.education[index].title = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Degree"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={item.institution || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.education[index].institution = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Institution"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={item.year || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.education[index].year = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Year"
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  value={item.description || ''}
                  onChange={(e) => {
                    const newTimeline = { ...formData.timeline };
                    newTimeline.education[index].description = e.target.value;
                    setFormData({ ...formData, timeline: newTimeline });
                  }}
                  placeholder="Description"
                  rows={2}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTestimonialsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Testimonials</h3>
      
      {formData.about?.testimonials?.map((testimonial, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={testimonial.name || ''}
              onChange={(e) => {
                const newAbout = { ...formData.about };
                newAbout.testimonials[index].name = e.target.value;
                setFormData({ ...formData, about: newAbout });
              }}
              placeholder="Name"
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={testimonial.company || ''}
              onChange={(e) => {
                const newAbout = { ...formData.about };
                newAbout.testimonials[index].company = e.target.value;
                setFormData({ ...formData, about: newAbout });
              }}
              placeholder="Company"
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              value={testimonial.text || ''}
              onChange={(e) => {
                const newAbout = { ...formData.about };
                newAbout.testimonials[index].text = e.target.value;
                setFormData({ ...formData, about: newAbout });
              }}
              placeholder="Testimonial text"
              rows={3}
              className="px-3 py-2 border border-gray-300 rounded-lg md:col-span-2"
            />
            <input
              type="number"
              min="1"
              max="5"
              value={testimonial.rating || 5}
              onChange={(e) => {
                const newAbout = { ...formData.about };
                newAbout.testimonials[index].rating = parseInt(e.target.value);
                setFormData({ ...formData, about: newAbout });
              }}
              placeholder="Rating (1-5)"
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderValuesSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Values & Fun Facts</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Core Values (comma-separated)</label>
        <input
          type="text"
          value={formData.about?.values?.join(', ') || ''}
          onChange={(e) => handleArrayChange('about', 'values', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Continuous Learning, Innovation, Collaboration, Excellence, Integrity"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fun Facts (comma-separated)</label>
        <input
          type="text"
          value={formData.about?.funFacts?.join(', ') || ''}
          onChange={(e) => handleArrayChange('about', 'funFacts', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Active member of Coding Club, Certified in networking, Passionate about HR Tech"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSection();
      case 'about':
        return renderAboutSection();
      case 'timeline':
        return renderTimelineSection();
      case 'testimonials':
        return renderTestimonialsSection();
      case 'values':
        return renderValuesSection();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Select a tab to manage content</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'profile' && 'Profile Management'}
            {activeTab === 'about' && 'About Content'}
            {activeTab === 'timeline' && 'Timeline Management'}
            {activeTab === 'testimonials' && 'Testimonials'}
            {activeTab === 'values' && 'Values & Fun Facts'}
            {!['profile', 'about', 'timeline', 'testimonials', 'values'].includes(activeTab) && 'Content Management'}
          </h2>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            
            {isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            )}
            
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Content
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {previewMode ? (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="prose max-w-none">
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
} 