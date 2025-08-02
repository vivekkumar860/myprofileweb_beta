import { useEffect, useRef } from 'react';

export const useAboutAnalytics = () => {
  const startTime = useRef(null);
  const sectionRef = useRef(null);

  const trackEvent = async (event, data = {}) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          section: 'about',
          data
        }),
      });
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  };

  const trackPageView = () => {
    trackEvent('page_view');
  };

  const trackAboutSectionView = () => {
    trackEvent('about_section_view');
  };

  const trackTestimonialClick = (testimonialId) => {
    trackEvent('testimonial_click', { testimonialId });
  };

  const trackTimelineClick = (timelineType, itemId) => {
    trackEvent('timeline_click', { timelineType, itemId });
  };

  const trackValuesClick = (valueIndex) => {
    trackEvent('values_click', { valueIndex });
  };

  const trackProfileView = () => {
    trackEvent('profile_view');
  };

  const trackTimeSpent = (seconds) => {
    trackEvent('time_spent', { seconds });
  };

  const trackTabSwitch = (tabName) => {
    trackEvent('tab_switch', { tabName });
  };

  const trackInteraction = (interactionType, data = {}) => {
    trackEvent('interaction', { interactionType, ...data });
  };

  // Track when user enters the About section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackAboutSectionView();
            startTime.current = Date.now();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Track time spent when user leaves the section
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (startTime.current) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        if (timeSpent > 0) {
          trackTimeSpent(timeSpent);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && startTime.current) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        if (timeSpent > 0) {
          trackTimeSpent(timeSpent);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    sectionRef,
    trackEvent,
    trackPageView,
    trackAboutSectionView,
    trackTestimonialClick,
    trackTimelineClick,
    trackValuesClick,
    trackProfileView,
    trackTimeSpent,
    trackTabSwitch,
    trackInteraction
  };
}; 