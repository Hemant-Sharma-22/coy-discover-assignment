'use client';

import React from 'react';
import { Heart, Sparkles, ShieldCheck, Flame, ArrowRight, UserCheck } from 'lucide-react';

interface HomePlaceholderProps {
  onGoToDiscover: () => void;
}

export const HomePlaceholder: React.FC<HomePlaceholderProps> = ({ onGoToDiscover }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 py-8 text-center">
      {/* Brand Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-purple-600 to-indigo-600 p-0.5 shadow-2xl shadow-rose-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500/20 animate-pulse" />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-slate-950">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
        Coy Home
      </h1>
      <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
        Placeholder Tab
      </p>

      {/* Card Info Box */}
      <div className="w-full max-w-sm rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 mb-8 text-left shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-semibold text-slate-200">
            Existing Coy Experience
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Per the assignment instructions, this Home tab is kept as a placeholder representing Coy's standard double-blind secret crush slots, phone OTP login, and invite mechanics.
        </p>

        <div className="space-y-2 text-xs text-slate-300">
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

      {/* CTA Button */}
      <button
        onClick={onGoToDiscover}
        className="w-full max-w-sm flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium text-sm shadow-lg shadow-rose-600/25 transition-all transform active:scale-95"
      >
        <Flame className="w-4 h-4" />
        <span>Open Discover Tab</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};
