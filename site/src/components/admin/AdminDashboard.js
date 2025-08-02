import React from 'react';
import { Users, TrendingUp, Eye, Clock, Star, Award, Calendar, BookOpen, Heart, Target, Zap } from 'lucide-react';

const StatCard = ({ title, value, change, icon, color, IconComponent }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        {IconComponent ? <IconComponent className="w-6 h-6 text-white" /> : <span className="text-xl">{icon}</span>}
      </div>
    </div>
  </div>
);

const QuickActionCard = ({ title, description, buttonText, onClick, gradient, IconComponent }) => (
  <div className={`${gradient} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}>
    <div className="flex items-center mb-4">
      {IconComponent && <IconComponent className="w-8 h-8 mr-3" />}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-white/90 mb-4">{description}</p>
    <button
      type="button"
      onClick={onClick}
      className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-all"
    >
      {buttonText}
    </button>
  </div>
);

export default function AdminDashboard({ analytics, onTabChange }) {
  const aboutStats = [
    {
      title: "Profile Views",
      value: analytics?.profileViews || "1.2k",
      change: "+15%",
      icon: "👁️",
      color: "bg-blue-100 text-blue-600",
      IconComponent: Eye
    },
    {
      title: "About Section Views",
      value: analytics?.aboutViews || "856",
      change: "+8%",
      icon: "📊",
      color: "bg-green-100 text-green-600",
      IconComponent: Users
    },
    {
      title: "Avg. Time on About",
      value: analytics?.avgTimeOnAbout || "2m 34s",
      icon: "⏱️",
      color: "bg-yellow-100 text-yellow-600",
      IconComponent: Clock
    },
    {
      title: "Testimonial Clicks",
      value: analytics?.testimonialClicks || "124",
      change: "+12%",
      icon: "⭐",
      color: "bg-purple-100 text-purple-600",
      IconComponent: Star
    }
  ];

  const quickActions = [
    {
      title: "Edit Profile Info",
      description: "Update personal information, contact details, and social links",
      buttonText: "Edit Profile",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      IconComponent: Users,
      onClick: () => onTabChange("profile")
    },
    {
      title: "Manage About Content",
      description: "Edit bio, mission, values, and personal information",
      buttonText: "Edit About",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      IconComponent: Target,
      onClick: () => onTabChange("about")
    },
    {
      title: "Timeline Management",
      description: "Update experience, education, and certification timeline",
      buttonText: "Manage Timeline",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      IconComponent: Calendar,
      onClick: () => onTabChange("timeline")
    },
    {
      title: "Testimonials",
      description: "Add and manage testimonials and reviews",
      buttonText: "Manage Reviews",
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600",
      IconComponent: Star,
      onClick: () => onTabChange("testimonials")
    }
  ];

  const recentActivity = [
    {
      type: "Profile Updated",
      description: "Updated contact information and social links",
      time: "2 hours ago",
      icon: Users,
      color: "text-blue-600"
    },
    {
      type: "About Section Modified",
      description: "Updated bio and mission statement",
      time: "1 day ago",
      icon: Target,
      color: "text-green-600"
    },
    {
      type: "Timeline Added",
      description: "Added new certification to timeline",
      time: "3 days ago",
      icon: Award,
      color: "text-purple-600"
    },
    {
      type: "Testimonial Added",
      description: "New testimonial from HR Manager",
      time: "1 week ago",
      icon: Star,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Section Dashboard</h2>
        
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aboutStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              IconComponent={stat.IconComponent}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              buttonText={action.buttonText}
              gradient={action.gradient}
              IconComponent={action.IconComponent}
              onClick={action.onClick}
            />
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About Section Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Content Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Profile Information</span>
                <span className="text-green-600 font-semibold">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Bio & Mission</span>
                <span className="text-green-600 font-semibold">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Timeline</span>
                <span className="text-yellow-600 font-semibold">⚠ Partial</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Testimonials</span>
                <span className="text-green-600 font-semibold">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Values & Fun Facts</span>
                <span className="text-green-600 font-semibold">✓ Complete</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Keep your bio updated</p>
                  <p className="text-xs text-gray-600">Regular updates help maintain engagement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Add new testimonials</p>
                  <p className="text-xs text-gray-600">Social proof builds credibility</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Update timeline regularly</p>
                  <p className="text-xs text-gray-600">Keep your journey current</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Review analytics</p>
                  <p className="text-xs text-gray-600">Track what visitors engage with most</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 