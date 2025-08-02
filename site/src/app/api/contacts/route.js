import { NextResponse } from 'next/server';
import { databaseService } from '../../../lib/database';
import { authMiddleware } from '../../../lib/middleware';

export async function GET(request) {
  try {
    // Check authentication for contacts access
    const authResult = authMiddleware(request);
    if (authResult) return authResult;
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;
    const status = searchParams.get('status');
    
    // Get contact submissions
    let contacts = await databaseService.getContactSubmissions(limit, offset);
    
    // Filter by status if specified
    if (status) {
      contacts = contacts.filter(contact => contact.status === status);
    }
    
    // Calculate metrics
    const allContacts = await databaseService.getContactSubmissions(1000, 0);
    const metrics = {
      total: allContacts.length,
      byStatus: allContacts.reduce((acc, contact) => {
        acc[contact.status] = (acc[contact.status] || 0) + 1;
        return acc;
      }, {}),
      recent: allContacts.slice(0, 5)
    };
    
    return NextResponse.json({
      success: true,
      data: contacts,
      metrics,
      pagination: {
        limit,
        offset,
        total: allContacts.length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Contacts retrieval error:', error);
    
    return NextResponse.json({
      error: 'Failed to retrieve contacts',
      message: error.message
    }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    // Check authentication
    const authResult = authMiddleware(request);
    if (authResult) return authResult;
    
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({
        error: 'Contact ID and status are required'
      }, { status: 400 });
    }
    
    // Update contact status
    const updatedContact = await databaseService.updateContactStatus(id, status);
    
    return NextResponse.json({
      success: true,
      data: updatedContact,
      message: 'Contact status updated successfully'
    });
    
  } catch (error) {
    console.error('Contact update error:', error);
    
    return NextResponse.json({
      error: 'Failed to update contact',
      message: error.message
    }, { status: 500 });
  }
} 