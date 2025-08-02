import { NextResponse } from 'next/server';

// In-memory storage for analytics (in production, use a proper database)
let analyticsData = {
  visitors: {
    today: 0,
    week: 0,
    month: 0,
    total: 0
  },
  pageViews: {
    today: 0,
    week: 0,
    month: 0,
    total: 0
  },
  engagement: {
    avgTime: "2m 34s",
    conversion: "3.2%",
    bounceRate: "45%"
  },
  aboutSection: {
    views: 0,
    timeSpent: 0,
    interactions: 0,
    testimonialsViewed: 0,
    timelineClicks: 0,
    valuesClicks: 0
  },
  profileViews: 0,
  aboutViews: 0,
  avgTimeOnAbout: "2m 34s",
  testimonialClicks: 0,
  lastUpdated: new Date().toISOString()
};

export async function GET(request) {
  try {
    // Simulate some analytics data
    const now = new Date();
    const hoursSinceMidnight = now.getHours() + now.getMinutes() / 60;
    
    // Generate realistic analytics data
    const todayVisitors = Math.floor(50 + Math.random() * 100);
    const todayPageViews = Math.floor(todayVisitors * (1.5 + Math.random() * 1));
    
    analyticsData.visitors.today = todayVisitors;
    analyticsData.visitors.week = Math.floor(todayVisitors * 7 * (0.8 + Math.random() * 0.4));
    analyticsData.visitors.month = Math.floor(todayVisitors * 30 * (0.7 + Math.random() * 0.6));
    analyticsData.visitors.total = Math.floor(analyticsData.visitors.month * (1.2 + Math.random() * 0.8));
    
    analyticsData.pageViews.today = todayPageViews;
    analyticsData.pageViews.week = Math.floor(todayPageViews * 7 * (0.8 + Math.random() * 0.4));
    analyticsData.pageViews.month = Math.floor(todayPageViews * 30 * (0.7 + Math.random() * 0.6));
    analyticsData.pageViews.total = Math.floor(analyticsData.pageViews.month * (1.2 + Math.random() * 0.8));
    
    analyticsData.aboutSection.views = Math.floor(todayVisitors * 0.7);
    analyticsData.aboutSection.timeSpent = Math.floor(analyticsData.aboutSection.views * 2.5);
    analyticsData.aboutSection.interactions = Math.floor(analyticsData.aboutSection.views * 0.3);
    analyticsData.aboutSection.testimonialsViewed = Math.floor(analyticsData.aboutSection.views * 0.4);
    analyticsData.aboutSection.timelineClicks = Math.floor(analyticsData.aboutSection.views * 0.2);
    analyticsData.aboutSection.valuesClicks = Math.floor(analyticsData.aboutSection.views * 0.15);
    
    analyticsData.profileViews = Math.floor(todayVisitors * 0.8);
    analyticsData.aboutViews = analyticsData.aboutSection.views;
    analyticsData.testimonialClicks = analyticsData.aboutSection.testimonialsViewed;
    
    analyticsData.lastUpdated = now.toISOString();
    
    return NextResponse.json({
      success: true,
      data: analyticsData,
      timestamp: now.toISOString()
    });
    
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ 
      error: 'Failed to get analytics',
      message: error.message 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { event, section, data } = body;
    
    // Track different events
    switch (event) {
      case 'page_view':
        analyticsData.pageViews.today++;
        analyticsData.pageViews.total++;
        break;
        
      case 'about_section_view':
        analyticsData.aboutSection.views++;
        analyticsData.aboutViews++;
        break;
        
      case 'testimonial_click':
        analyticsData.aboutSection.testimonialsViewed++;
        analyticsData.testimonialClicks++;
        break;
        
      case 'timeline_click':
        analyticsData.aboutSection.timelineClicks++;
        break;
        
      case 'values_click':
        analyticsData.aboutSection.valuesClicks++;
        break;
        
      case 'profile_view':
        analyticsData.profileViews++;
        break;
        
      case 'time_spent':
        if (data && data.seconds) {
          analyticsData.aboutSection.timeSpent += data.seconds;
          // Calculate average time
          const avgSeconds = analyticsData.aboutSection.timeSpent / analyticsData.aboutSection.views;
          const minutes = Math.floor(avgSeconds / 60);
          const seconds = Math.floor(avgSeconds % 60);
          analyticsData.avgTimeOnAbout = `${minutes}m ${seconds}s`;
        }
        break;
        
      default:
        // Track general interactions
        analyticsData.aboutSection.interactions++;
    }
    
    analyticsData.lastUpdated = new Date().toISOString();
    
    return NextResponse.json({ 
      success: true,
      message: 'Analytics event tracked successfully',
      timestamp: analyticsData.lastUpdated
    });
    
  } catch (error) {
    console.error('Analytics POST error:', error);
    return NextResponse.json({ 
      error: 'Failed to track analytics event',
      message: error.message 
    }, { status: 500 });
  }
}

export async function OPTIONS(request) {
  return NextResponse.json({ message: 'OK' });
} 