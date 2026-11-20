'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Sparkles, ShieldCheck, Flame, ArrowRight, UserCheck, Edit3 } from 'lucide-react';
import { CurrentUser, DEFAULT_USER } from '@/lib/types';

interface HomePlaceholderProps {
  onGoToDiscover: () => void;
  currentUser?: CurrentUser;
  onEditProfile?: () => void;
}

export const HomePlaceholder: React.FC<HomePlaceholderProps> = ({
  onGoToDiscover,
  currentUser = DEFAULT_USER,
  onEditProfile,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-6 text-center max-w-sm mx-auto">
      {/* Logged in User Profile Card */}
      <div className="w-full rounded-3xl bg-slate-900/90 border border-slate-800/80 p-5 mb-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/10 to-transparent pointer-events-none rounded-bl-full" />

        <div className="flex items-center gap-4 text-left">
          {/* User Photo */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-rose-500 shadow-md shrink-0">
            <Image
              src={currentUser.photo}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>

          {/* User Name & Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white truncate flex items-center gap-1.5">
                <span>{currentUser.name}</span>
                <span className="text-sm font-light text-slate-300">{currentUser.age}</span>
              </h3>
              {onEditProfile && (
                <button
                  onClick={onEditProfile}
                  className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Edit Profile"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs text-purple-300 font-medium truncate mb-1">
              {currentUser.cityOrCollege}
            </p>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Coy Member</span>
            </div>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-slate-300 text-left mt-3 pt-3 border-t border-slate-800/80 italic">
          &quot;{currentUser.bio}&quot;
        </p>
      </div>

      {/* Brand Icon & Heading */}
      <div className="relative mb-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 p-0.5 shadow-xl shadow-rose-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500/20 animate-pulse" />
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold tracking-tight text-white mb-1">
        Coy Secret Crush
      </h1>
      <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-4">
        Home Placeholder
      </p>

      {/* Card Info Box */}
      <div className="w-full rounded-2xl bg-slate-900/60 border border-slate-800/80 p-4 mb-5 text-left shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-semibold text-slate-200">
            Double-Blind Crush Architecture
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Per the assignment brief, this Home tab represents Coy's standard double-blind secret crush slots and invite system.
        </p>

        <div className="space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Private 3-Slot Secret Crush list</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Zero-exposure anonymous heads-up</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Mutual match only when both add each other</span>
          </div>
        </div>
      </div>

      {/* CTA Button to Discover */}
      <button
        onClick={onGoToDiscover}
        className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium text-xs shadow-lg shadow-rose-600/25 transition-all transform active:scale-95"
      >
        <Flame className="w-4 h-4" />
        <span>Open Discover Tab</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};
