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

    // Save the complete data structure to both files for consistency
    const filePaths = [
      path.join(process.cwd(), 'siteContent.json'),
      path.join(process.cwd(), 'public', 'siteContent.json')
    ];

    // Save to both locations to maintain consistency
    for (const filePath of filePaths) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    // Also save full data structure for future use
    const fullFilePath = path.join(process.cwd(), 'fullSiteData.json');
    fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ message: 'Content saved successfully!' });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
