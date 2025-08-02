import { NextResponse } from 'next/server';
import { emailService } from '../../../../lib/email';
import { authMiddleware } from '../../../../lib/middleware';

export async function POST(request) {
  try {
    // Check authentication for email testing
    const authResult = authMiddleware(request);
    if (authResult) return authResult;
    
    const body = await request.json();
    const { to } = body;
    
    if (!to) {
      return NextResponse.json({
        error: 'Email address is required'
      }, { status: 400 });
    }
    
    // Send test email
    const result = await emailService.sendTestEmail(to);
    
    return NextResponse.json({
      success: result.success,
      message: result.message || 'Test email sent successfully',
      messageId: result.messageId,
      configured: emailService.isConfigured,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Email test error:', error);
    
    return NextResponse.json({
      error: 'Failed to send test email',
      message: error.message,
      configured: emailService.isConfigured
    }, { status: 500 });
  }
} 