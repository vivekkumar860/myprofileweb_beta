import { NextResponse } from 'next/server';

// In-memory rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // Max requests per window

// Security headers
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
};

// Rate limiting middleware
export const rateLimit = async (request) => {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const endpoint = request.nextUrl?.pathname || 'unknown';
  const key = `${ip}:${endpoint}`;
  
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Get existing requests for this IP and endpoint
  const requests = rateLimitStore.get(key) || [];
  
  // Filter out old requests outside the window
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);
  
  // Check if rate limit exceeded
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitStore.set(key, recentRequests);
  
  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to clean up
    for (const [storeKey, timestamps] of rateLimitStore.entries()) {
      const filtered = timestamps.filter(timestamp => timestamp > windowStart);
      if (filtered.length === 0) {
        rateLimitStore.delete(storeKey);
      } else {
        rateLimitStore.set(storeKey, filtered);
      }
    }
  }
  
  return null; // Continue to next middleware
};

// Logging middleware
export const logRequest = async (request) => {
  const startTime = Date.now();
  const method = request.method;
  const url = request.url;
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Logging disabled for production
  // console.log(`[${new Date().toISOString()}] ${method} ${url} - ${ip} - ${userAgent}`);
  
  return { startTime, method, url, userAgent, ip };
};

// Error handling middleware
export const errorHandler = (error, request) => {
  const errorId = Math.random().toString(36).substr(2, 9);
  
  console.error(`[ERROR ${errorId}] ${error.message}`, {
    stack: error.stack,
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
  });
  
  return NextResponse.json(
    { 
      error: 'Internal server error',
      errorId,
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    },
    { status: 500 }
  );
};

// Security middleware
export const securityMiddleware = (request) => {
  const response = NextResponse.next();
  
  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Block suspicious requests
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
  ];
  
  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }
  
  return response;
};

// CORS middleware
export const corsMiddleware = (request) => {
  const response = NextResponse.next();
  
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'http://localhost:3000',
    'https://vivekkumar860.github.io',
    'https://myprofileweb_beta.vercel.app',
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
};

// Request validation middleware
export const validateRequestMiddleware = (schema) => {
  return async (request) => {
    try {
      const body = await request.json();
      schema.parse(body);
      return null; // Continue
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors 
        },
        { status: 400 }
      );
    }
  };
};

// Authentication middleware
export const authMiddleware = (request) => {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  const token = authHeader.substring(7);
  const expectedToken = process.env.API_TOKEN;
  
  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json(
      { error: 'Invalid authentication token' },
      { status: 401 }
    );
  }
  
  return null; // Continue
};

// Response time middleware
export const responseTimeMiddleware = (startTime) => {
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Response time logging disabled for production
  // console.log(`[RESPONSE] ${duration}ms`);
  
  return duration;
}; 