import React from "react";

export default function Skills() {
  return (
    <section className="skills py-16">
      <div className="container mx-auto">
        <h2 className="section-title text-3xl font-bold mb-8 text-center">Skills & Technologies</h2>
        <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="skill-category">
            <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
            <div className="skill-items flex flex-wrap gap-4">
              <span className="skill-item bg-blue-100 text-blue-700 px-3 py-1 rounded">HTML5</span>
              <span className="skill-item bg-blue-100 text-blue-700 px-3 py-1 rounded">CSS3</span>
              <span className="skill-item bg-blue-100 text-blue-700 px-3 py-1 rounded">JavaScript</span>
              <span className="skill-item bg-blue-100 text-blue-700 px-3 py-1 rounded">React</span>
              <span className="skill-item bg-blue-100 text-blue-700 px-3 py-1 rounded">Vue.js</span>
            </div>
          </div>
          <div className="skill-category">
            <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
            <div className="skill-items flex flex-wrap gap-4">
              <span className="skill-item bg-green-100 text-green-700 px-3 py-1 rounded">Node.js</span>
              <span className="skill-item bg-green-100 text-green-700 px-3 py-1 rounded">Python</span>
              <span className="skill-item bg-green-100 text-green-700 px-3 py-1 rounded">MongoDB</span>
              <span className="skill-item bg-green-100 text-green-700 px-3 py-1 rounded">Express.js</span>
            </div>
          </div>
          <div className="skill-category">
            <h3 className="text-xl font-semibold mb-4">Tools & Others</h3>
            <div className="skill-items flex flex-wrap gap-4">
              <span className="skill-item bg-yellow-100 text-yellow-700 px-3 py-1 rounded">Git</span>
              <span className="skill-item bg-yellow-100 text-yellow-700 px-3 py-1 rounded">Docker</span>
              <span className="skill-item bg-yellow-100 text-yellow-700 px-3 py-1 rounded">AWS</span>
              <span className="skill-item bg-yellow-100 text-yellow-700 px-3 py-1 rounded">Cloud Services</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
