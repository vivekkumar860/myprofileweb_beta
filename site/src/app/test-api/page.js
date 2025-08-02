"use client";
import { useState } from 'react';

export default function TestAPI() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const testData = {
        profile: { name: "Test User" },
        bio: "Test bio",
        highlights: [{ icon: "🌟", title: "Test", desc: "Test desc", border: "border-blue-500" }],
        projects: [],
        statistics: { experience: "2+", projects: "10+", clients: "5+" },
        certificates: [],
        achievements: []
      };

      console.log('Testing API with data:', testData);

      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('Response data:', data);

      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Test error:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
        
        <button
          onClick={testAPI}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>

        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <pre className="bg-white p-4 rounded-lg border overflow-auto">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 