import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Check for valid secret token
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    
    const body = await request.json();
    const { path, tag } = body;
    
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Path ${path} revalidated successfully`,
        timestamp: new Date().toISOString()
      });
    }
    
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ 
        revalidated: true, 
        message: `Tag ${tag} revalidated successfully`,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json({ 
      revalidated: false, 
      message: 'No path or tag provided' 
    }, { status: 400 });
    
  } catch (error) {
    return NextResponse.json({ 
      revalidated: false, 
      message: 'Error revalidating', 
      error: error.message 
    }, { status: 500 });
  }
}