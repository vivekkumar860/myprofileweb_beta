import { NextResponse } from 'next/server';
import { contactSchema } from '../../../lib/validation';
import { 
  rateLimit, 
  logRequest, 
  errorHandler, 
  securityMiddleware, 
  corsMiddleware,
  responseTimeMiddleware 
} from '../../../lib/middleware';
import { emailService } from '../../../lib/email';
import { databaseService } from '../../../lib/database';

export async function POST(request) {
  let startTime;
  let requestInfo;
  
  try {
    // Apply middleware
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) return rateLimitResult;
    
    const securityResult = securityMiddleware(request);
    if (securityResult) return securityResult;
    
    const corsResult = corsMiddleware(request);
    if (corsResult) return corsResult;
    
    requestInfo = await logRequest(request);
    startTime = requestInfo.startTime;
    
    // Validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    
    // Log analytics
    await databaseService.logAnalytics('contact_form_submission', {
      ...validatedData,
      userAgent: requestInfo.userAgent,
      ip: requestInfo.ip
    });
    
    // Save to database
    const savedSubmission = await databaseService.saveContactSubmission(validatedData);
    
    // Send email notifications
    const emailResult = await emailService.sendContactNotification(validatedData);
    
    // Log response time
    responseTimeMiddleware(startTime);
    
    return NextResponse.json({ 
      message: 'Message sent successfully!',
      success: true,
      submissionId: savedSubmission.id,
      emailSent: emailResult.success
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Log error analytics
    if (requestInfo) {
      await databaseService.logAnalytics('contact_form_error', {
        error: error.message,
        userAgent: requestInfo.userAgent,
        ip: requestInfo.ip
      });
    }
    
    if (error.name === 'ZodError') {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors 
      }, { status: 400 });
    }
    
    return errorHandler(error, request);
  }
}

export async function OPTIONS(request) {
  return corsMiddleware(request);
} 