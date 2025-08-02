import { useState, useEffect, useCallback } from 'react';
import { API_ENDPOINTS, FILE_PATHS, DEFAULT_CONTENT } from '../lib/constants';

export const useSiteContent = () => {
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try API first
      const response = await fetch(API_ENDPOINTS.saveContent);
      if (response.ok) {
        const data = await response.json();
        setSiteContent(data);
        return;
      }
      
      // Fallback to static file
      const staticResponse = await fetch(FILE_PATHS.siteContent);
      if (staticResponse.ok) {
        const data = await staticResponse.json();
        setSiteContent(data);
        return;
      }
      
      // Use default content if both fail
      setSiteContent(DEFAULT_CONTENT);
    } catch (err) {
      console.error('Failed to load site content:', err);
      setError(err.message);
      setSiteContent(DEFAULT_CONTENT);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveContent = useCallback(async (content) => {
    try {
      const response = await fetch(API_ENDPOINTS.saveContent, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      const result = await response.json();
      setSiteContent(content);
      return { success: true, data: result };
    } catch (err) {
      console.error('Save content error:', err);
      return { success: false, error: err.message };
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    siteContent,
    loading,
    error,
    saveContent,
    refetch: fetchContent
  };
}; 