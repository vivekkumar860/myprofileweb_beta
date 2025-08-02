import { NextResponse } from 'next/server';
import { databaseService } from '../../../lib/database';
import { emailService } from '../../../lib/email';

export async function GET(request) {
  const startTime = Date.now();
  
  try {
    // Check database health
    const dbHealth = await databaseService.healthCheck();
    
    // Check email service health
    const emailHealth = {
      configured: emailService.isConfigured,
      status: emailService.isConfigured ? 'ready' : 'not_configured'
    };
    
    // Check system resources
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    // Check cache status
    const cacheStats = databaseService.getCacheStats();
    
    const healthStatus = {
      status: dbHealth.status === 'healthy' && emailHealth.status === 'ready' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      services: {
        database: dbHealth,
        email: emailHealth,
        cache: cacheStats
      },
      system: systemInfo
    };
    
    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json(healthStatus, { status: statusCode });
    
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime
    }, { status: 503 });
  }
} 