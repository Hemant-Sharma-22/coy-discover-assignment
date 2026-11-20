'use client';

import React from 'react';
import { Compass, RotateCcw, Heart, CheckCircle, Sparkles } from 'lucide-react';

interface EmptyDeckStateProps {
  onReset: () => Promise<void>;
  onGoToMatches: () => void;
  matchesCount: number;
  isResetting?: boolean;
}

export const EmptyDeckState: React.FC<EmptyDeckStateProps> = ({
  onReset,
  onGoToMatches,
  matchesCount,
  isResetting = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[520px] px-6 py-10 text-center max-w-sm mx-auto">
      {/* Icon with radar pulse animation */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xl">
          <Compass className="w-12 h-12 text-rose-500 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-rose-500/20 animate-ping" />
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-white mb-2">
        You&apos;re All Caught Up!
      </h3>
      <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
        You have swiped through all available profiles in your area. As Coy members join or update their preferences, new profiles will appear here.
      </p>

      {/* Matches stats box */}
      <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 mb-6 shadow-md">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Feed status</span>
          </div>
          <span className="font-semibold text-emerald-400">Completed (32/32)</span>
        </div>

        <div className="my-3 border-t border-slate-800/60" />

        <div className="flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Mutual Matches</span>
          </div>
          <span className="font-bold text-rose-400">{matchesCount} found</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full space-y-2.5">
        {matchesCount > 0 && (
          <button
            onClick={onGoToMatches}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>View {matchesCount} Mutual Matches</span>
          </button>
        )}

        <button
          onClick={onReset}
          disabled={isResetting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all transform active:scale-95 disabled:opacity-50"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
          <span>{isResetting ? 'Resetting Deck...' : 'Reset Demo Deck (Restore All 32 Profiles)'}</span>
        </button>
      </div>
    </div>
  );
};
