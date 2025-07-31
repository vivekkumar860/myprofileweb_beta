"use client";
import React, { useState } from "react";

// Simple password for demo (replace with env var or real auth in production)
const ADMIN_PASSWORD = "admin123";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("Based in Phagwara, Punjab, I'm passionate about connecting talent with opportunity and building my skills at the intersection of technology and HR. Currently supporting end-to-end hiring at Placify.ai, I bring experience in job posting, candidate screening, and onboarding. I'm pursuing a B.Tech. in Computer Science & Engineering (AI & ML) at Lovely Professional University, and I'm active in the Coding and Anime Clubs. Certified in computer networking, web design, and more.");
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setMessage("");
    } else {
      setMessage("Incorrect password");
    }
  }

  function handleSave(e) {
    e.preventDefault();
    setMessage("Changes saved (demo only, not persisted)");
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
            className="border rounded px-3 py-2"
          />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700">Login</button>
          {message && <p className="text-red-500 text-sm">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div>
            <label className="block font-semibold mb-1">Homepage Bio</label>
            <textarea
              className="w-full border rounded px-3 py-2 min-h-[100px]"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700">Save Changes</button>
          {message && <p className="text-green-600 text-sm">{message}</p>}
        </form>
        <p className="mt-8 text-gray-500 text-xs">Note: This is a demo dashboard. Changes are not persisted. For production, connect to a database or CMS.</p>
      </div>
    </div>
  );
}
