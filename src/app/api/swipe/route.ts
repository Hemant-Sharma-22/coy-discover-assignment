import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { SwipeAction } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, action } = body;

    if (!profileId || typeof profileId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid profileId' },
        { status: 400 }
      );
    }

    if (action !== 'like' && action !== 'pass') {
      return NextResponse.json(
        { success: false, error: 'Action must be either "like" or "pass"' },
        { status: 400 }
      );
    }

    const result = db.recordSwipe(profileId, action as SwipeAction);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to record swipe' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      match: result.match,
      matchedProfile: result.matchedProfile,
      message: result.match
        ? "It's a Match! You both liked each other."
        : `Swipe recorded (${action}).`,
    });
  } catch (error) {
    console.error('Error processing swipe:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing swipe' },
      { status: 500 }
    );
  }
}
