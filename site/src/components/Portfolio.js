import React from "react";
import Image from "next/image";

export default function Portfolio() {
  return (
    <section className="projects py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="project-card bg-white rounded-lg shadow p-6 flex flex-col">
            <Image src="/project1.jpg" alt="Project 1" width={400} height={192} className="rounded mb-4 h-48 object-cover" />
            <h3 className="text-xl font-semibold mb-2">E-Commerce Platform</h3>
            <p className="mb-2 text-gray-600">A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.</p>
            <div className="project-tech flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">React</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Node.js</span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">MongoDB</span>
            </div>
            <div className="project-links flex gap-2 mt-auto">
              <a href="#" className="btn btn-small bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Live Demo</a>
              <a href="#" className="btn btn-small btn-outline border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">GitHub</a>
            </div>
          </div>
          {/* Project 2 */}
          <div className="project-card bg-white rounded-lg shadow p-6 flex flex-col">
            <Image src="/project2.jpg" alt="Project 2" width={400} height={192} className="rounded mb-4 h-48 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Task Management App</h3>
            <p className="mb-2 text-gray-600">A collaborative task management application with real-time updates and team features.</p>
            <div className="project-tech flex flex-wrap gap-2 mb-4">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Vue.js</span>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">Firebase</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Vuetify</span>
            </div>
            <div className="project-links flex gap-2 mt-auto">
              <a href="#" className="btn btn-small bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Live Demo</a>
              <a href="#" className="btn btn-small btn-outline border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">GitHub</a>
            </div>
          </div>
          {/* Project 3 */}
          <div className="project-card bg-white rounded-lg shadow p-6 flex flex-col">
            <Image src="/project3.jpg" alt="Project 3" width={400} height={192} className="rounded mb-4 h-48 object-cover" />
            <h3 className="text-xl font-semibold mb-2">Weather Dashboard</h3>
            <p className="mb-2 text-gray-600">A weather application with location-based forecasts and interactive maps.</p>
            <div className="project-tech flex flex-wrap gap-2 mb-4">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">JavaScript</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Weather API</span>
              <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">Chart.js</span>
            </div>
            <div className="project-links flex gap-2 mt-auto">
              <a href="#" className="btn btn-small bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Live Demo</a>
              <a href="#" className="btn btn-small btn-outline border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
