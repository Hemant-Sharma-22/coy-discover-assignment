import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feed = db.getFeed();
    const stats = db.getStats();

    return NextResponse.json({
      success: true,
      feed,
      remaining: feed.length,
      stats,
    });
  } catch (error) {
    console.error('Error fetching feed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feed' },
      { status: 500 }
    );
  }
}
