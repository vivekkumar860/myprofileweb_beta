import React from "react";

export default function About() {
  return (
    <section className="about py-16 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="mb-4 text-gray-700">
            I am a passionate and dedicated professional with expertise in web development, design, and problem-solving. With a strong foundation in both frontend and backend technologies, I create seamless user experiences and robust applications.
          </p>
          <p className="mb-4 text-gray-700">
            My journey in technology started X years ago, and since then, I&apos;ve worked on various projects ranging from small business websites to complex enterprise applications. I believe in writing clean, maintainable code and staying updated with the latest industry trends.
          </p>
          <div className="flex gap-8 mt-6">
            <div>
              <h3 className="text-2xl font-bold text-blue-600">3+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600">20+</h3>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600">15+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about.jpg"
            alt="About Me"
            className="rounded-lg w-80 h-96 object-cover shadow-lg border-4 border-blue-100"
          />
        </div>
      </div>
    </section>
  );
}
