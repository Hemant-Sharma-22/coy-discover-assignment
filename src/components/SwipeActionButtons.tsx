'use client';

import React from 'react';
import { X, Heart, Info, RotateCcw } from 'lucide-react';

interface SwipeActionButtonsProps {
  onSwipe: (action: 'like' | 'pass') => void;
  onInfoToggle?: () => void;
  disabled?: boolean;
}

export const SwipeActionButtons: React.FC<SwipeActionButtonsProps> = ({
  onSwipe,
  onInfoToggle,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 mt-4 select-none">
      <div className="flex items-center justify-center gap-6 sm:gap-8">
        {/* Dislike / Pass Button */}
        <button
          onClick={() => onSwipe('pass')}
          disabled={disabled}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900/90 border-2 border-rose-500/30 hover:border-rose-500 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-950/40 hover:shadow-rose-500/30 transition-all duration-200 transform hover:scale-110 active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Pass / Swipe Left"
          title="Pass (Left Arrow or Swipe Left)"
        >
          <X className="w-7 h-7 stroke-[2.5] transition-transform duration-200 group-hover:rotate-12" />
        </button>

        {/* Info Toggle Button */}
        <button
          onClick={onInfoToggle}
          disabled={disabled}
          className="group w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-purple-400 flex items-center justify-center text-slate-300 hover:text-purple-400 shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-90 disabled:opacity-40"
          aria-label="Profile Info"
          title="View Profile Details"
        >
          <Info className="w-4 h-4" />
        </button>

        {/* Like Button */}
        <button
          onClick={() => onSwipe('like')}
          disabled={disabled}
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-200 transform hover:scale-110 active:scale-90 disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Like / Swipe Right"
          title="Like (Right Arrow or Swipe Right)"
        >
          <Heart className="w-7 h-7 fill-white stroke-[2] transition-transform duration-200 group-hover:scale-110" />
        </button>
      </div>

      {/* Desktop hint */}
      <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 font-medium">
        <span>← or [A] to Pass</span>
        <span>•</span>
        <span>Drag or flick cards</span>
        <span>•</span>
        <span>[D] or → to Like</span>
      </div>
    </div>
  );
};
