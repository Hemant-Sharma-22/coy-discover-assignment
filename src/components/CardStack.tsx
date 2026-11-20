'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { Profile, SwipeAction } from '@/lib/types';
import { ProfileCard } from './ProfileCard';
import { SwipeActionButtons } from './SwipeActionButtons';

interface CardStackProps {
  profiles: Profile[];
  onSwipe: (profileId: string, action: SwipeAction) => Promise<void>;
  isLoading?: boolean;
}

const SWIPE_THRESHOLD = 90;
const SWIPE_VELOCITY_THRESHOLD = 350;

export const CardStack: React.FC<CardStackProps> = ({
  profiles,
  onSwipe,
  isLoading = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const topProfile = profiles[0];
  const nextProfile = profiles[1];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-25, 25]);

  // Handle programmatically triggered swipe (via buttons or keyboard)
  const triggerSwipeAnimation = async (action: SwipeAction) => {
    if (!topProfile || isAnimating) return;
    setIsAnimating(true);

    const targetX = action === 'like' ? 600 : -600;
    const targetRotate = action === 'like' ? 30 : -30;

    await Promise.all([
      animate(x, targetX, { duration: 0.35, ease: 'easeOut' }),
      animate(rotate, targetRotate, { duration: 0.35, ease: 'easeOut' }),
    ]);

    await onSwipe(topProfile.id, action);
    x.set(0);
    y.set(0);
    setIsAnimating(false);
  };

  // Drag End handler
  const handleDragEnd = async (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!topProfile || isAnimating) return;

    const dragDistanceX = info.offset.x;
    const dragVelocityX = info.velocity.x;

    if (dragDistanceX > SWIPE_THRESHOLD || dragVelocityX > SWIPE_VELOCITY_THRESHOLD) {
      // Swiped right (Like)
      setIsAnimating(true);
      await Promise.all([
        animate(x, 600, { duration: 0.3, ease: 'easeOut' }),
        animate(rotate, 25, { duration: 0.3, ease: 'easeOut' }),
      ]);
      await onSwipe(topProfile.id, 'like');
      x.set(0);
      y.set(0);
      setIsAnimating(false);
    } else if (dragDistanceX < -SWIPE_THRESHOLD || dragVelocityX < -SWIPE_VELOCITY_THRESHOLD) {
      // Swiped left (Pass)
      setIsAnimating(true);
      await Promise.all([
        animate(x, -600, { duration: 0.3, ease: 'easeOut' }),
        animate(rotate, -25, { duration: 0.3, ease: 'easeOut' }),
      ]);
      await onSwipe(topProfile.id, 'pass');
      x.set(0);
      y.set(0);
      setIsAnimating(false);
    } else {
      // Spring back to center
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 25 });
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 25 });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        triggerSwipeAnimation('pass');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        triggerSwipeAnimation('like');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [topProfile, isAnimating]);

  if (!topProfile) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      {/* Cards Deck Container */}
      <div className="relative w-full h-[520px] sm:h-[560px]">
        {/* Next Card in Stack (subtle background card for depth) */}
        {nextProfile && (
          <div
            className="absolute inset-0 z-0 transform scale-[0.94] translate-y-4 opacity-70 pointer-events-none transition-transform duration-300"
          >
            <ProfileCard profile={nextProfile} isFront={false} />
          </div>
        )}

        {/* Top Active Interactive Card */}
        <motion.div
          key={topProfile.id}
          style={{ x, y, rotate }}
          drag={!isAnimating}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing touch-none"
          whileTap={{ scale: 0.99 }}
        >
          <ProfileCard
            profile={topProfile}
            isFront={true}
            dragX={x}
          />
        </motion.div>
      </div>

      {/* Action Buttons underneath card */}
      <SwipeActionButtons
        onSwipe={triggerSwipeAnimation}
        disabled={isAnimating || isLoading}
      />
    </div>
  );
};
