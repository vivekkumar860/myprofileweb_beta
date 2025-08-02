import React from 'react';
import { Users, FileText, Star, Calendar, Award, Heart, Target, Settings } from 'lucide-react';

const TabButton = ({ id, label, active, onClick, icon, IconComponent }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {IconComponent ? <IconComponent className="w-5 h-5" /> : <span className="text-lg">{icon}</span>}
    {label}
  </button>
);

export default function AdminTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊", IconComponent: null },
    { id: "profile", label: "Profile", icon: "👤", IconComponent: Users },
    { id: "about", label: "About", icon: "📝", IconComponent: FileText },
    { id: "timeline", label: "Timeline", icon: "📅", IconComponent: Calendar },
    { id: "testimonials", label: "Testimonials", icon: "💬", IconComponent: Star },
    { id: "values", label: "Values", icon: "🎯", IconComponent: Target },
    { id: "highlights", label: "Highlights", icon: "⭐", IconComponent: null },
    { id: "skills", label: "Skills", icon: "💻", IconComponent: null },
    { id: "experience", label: "Experience", icon: "💼", IconComponent: Award },
    { id: "education", label: "Education", icon: "🎓", IconComponent: null },
    { id: "certifications", label: "Certifications", icon: "📜", IconComponent: null },
    { id: "projects", label: "Projects", icon: "🚀", IconComponent: null },
    { id: "settings", label: "Settings", icon: "⚙️", IconComponent: Settings }
  ];

  return (
    <div className="bg-gray-50 p-6 border-b">
      <div className="flex flex-wrap gap-3">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={onTabChange}
            icon={tab.icon}
            IconComponent={tab.IconComponent}
          />
        ))}
      </div>
    </div>
  );
} 