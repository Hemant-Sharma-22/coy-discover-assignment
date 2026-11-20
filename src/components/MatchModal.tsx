'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Profile, CurrentUser, DEFAULT_USER } from '@/lib/types';

interface MatchModalProps {
  matchedProfile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: () => void;
  currentUser?: CurrentUser;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedProfile,
  isOpen,
  onClose,
  onSendMessage,
  currentUser = DEFAULT_USER,
}) => {
  useEffect(() => {
    if (isOpen && matchedProfile) {
      // Fire celebratory confetti cannons
      const end = Date.now() + 1.5 * 1000;
      const colors = ['#E11D48', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen, matchedProfile]);

  if (!isOpen || !matchedProfile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-rose-500/30 p-6 text-center shadow-2xl shadow-rose-950/60 overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-52 h-52 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Match Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mutual Match</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 mb-1">
            It&apos;s a Match!
          </h2>
          <p className="text-xs text-slate-300 mb-6">
            <span className="text-white font-semibold">{currentUser.name}</span> and{' '}
            <span className="text-rose-400 font-semibold">{matchedProfile.name}</span> have both liked each other on Coy.
          </p>

          {/* Overlapping Avatars with Names */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative flex items-center justify-center h-28">
              {/* Logged in User Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl -mr-6 z-10">
                <Image
                  src={currentUser.photo}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Pulsing Central Heart Badge */}
              <div className="z-30 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-600/40 animate-bounce">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>

              {/* Matched Profile Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-900 shadow-xl -ml-6 z-10">
                <Image
                  src={matchedProfile.photo}
                  alt={matchedProfile.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Names Under Avatars */}
            <div className="flex items-center justify-between w-48 text-center text-xs font-semibold text-slate-300 mt-2">
              <span className="truncate flex-1 pr-1 text-slate-200">{currentUser.name.split(' ')[0]} (You)</span>
              <span className="text-rose-500 font-bold">&amp;</span>
              <span className="truncate flex-1 pl-1 text-rose-400">{matchedProfile.name.split(' ')[0]}</span>
            </div>
          </div>

          {/* Profile Quick Summary */}
          <div className="bg-slate-950/60 rounded-2xl p-3 border border-slate-800/80 mb-6 text-left">
            <div className="text-sm font-bold text-white mb-0.5">
              {matchedProfile.name}, {matchedProfile.age}
            </div>
            <div className="text-xs text-purple-300 mb-2">
              {matchedProfile.cityOrCollege}
            </div>
            <p className="text-xs text-slate-400 italic line-clamp-2">
              &quot;{matchedProfile.bio}&quot;
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={onSendMessage}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-rose-600/25 transition-all transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send a Message</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-medium text-xs transition-colors"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
