import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required basic fields
    if (!data.bio || !data.highlights || !Array.isArray(data.highlights)) {
      return NextResponse.json({ error: 'Missing or invalid bio or highlights' }, { status: 400 });
    }

    // Validate highlights structure
    for (const highlight of data.highlights) {
      if (!highlight.title || !highlight.desc || !highlight.icon) {
        return NextResponse.json({ error: 'Invalid highlight structure: missing required fields' }, { status: 400 });
      }
    }

    // For backward compatibility, we'll save the basic structure to siteContent.json
    // and the full expanded data to a new file
    const basicContent = {
      bio: data.bio,
      highlights: data.highlights
    };

    // Save basic content for existing homepage compatibility
    const basicFilePath = path.join(process.cwd(), 'siteContent.json');
    fs.writeFileSync(basicFilePath, JSON.stringify(basicContent, null, 2));

    // Save full data structure for future use
    const fullFilePath = path.join(process.cwd(), 'fullSiteData.json');
    fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ message: 'Content saved successfully!' });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
