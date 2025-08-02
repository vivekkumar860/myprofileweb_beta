"use client";
import { useState } from 'react';

export default function DebugPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (title, data) => {
    setResults(prev => [...prev, { title, data, timestamp: new Date().toISOString() }]);
  };

  const testAPI = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      // Test 1: GET request
      addResult('Test 1: GET /api/save-content', 'Starting...');
      const getResponse = await fetch('/api/save-content');
      const getData = await getResponse.json();
      addResult('Test 1: GET /api/save-content', {
        status: getResponse.status,
        ok: getResponse.ok,
        data: getData
      });

      // Test 2: POST request
      addResult('Test 2: POST /api/save-content', 'Starting...');
      const testData = {
        profile: { name: "Debug Test" },
        bio: "Debug bio",
        highlights: [{ icon: "🌟", title: "Debug", desc: "Debug desc", border: "border-blue-500" }],
        projects: [],
        statistics: { experience: "2+", projects: "10+", clients: "5+" },
        certificates: [],
        achievements: []
      };

      const postResponse = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const postData = await postResponse.json();
      addResult('Test 2: POST /api/save-content', {
        status: postResponse.status,
        ok: postResponse.ok,
        data: postData
      });

      // Test 3: Check if data was saved
      addResult('Test 3: GET after POST', 'Starting...');
      const getAfterResponse = await fetch('/api/save-content');
      const getAfterData = await getAfterResponse.json();
      addResult('Test 3: GET after POST', {
        status: getAfterResponse.status,
        ok: getAfterResponse.ok,
        data: getAfterData
      });

    } catch (error) {
      addResult('Error', {
        message: error.message,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Debug Page</h1>
        
        <button
          onClick={testAPI}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-6"
        >
          {loading ? 'Testing...' : 'Run API Tests'}
        </button>

        {results.map((result, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
            <pre className="bg-white p-4 rounded-lg border overflow-auto text-sm">
              {JSON.stringify(result.data, null, 2)}
            </pre>
            <p className="text-xs text-gray-500 mt-1">{result.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 