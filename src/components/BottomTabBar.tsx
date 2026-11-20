'use client';

import React from 'react';
import { Compass, Flame, Heart, Home, MessageCircle } from 'lucide-react';

export type TabType = 'home' | 'discover' | 'matches';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  matchesCount: number;
  feedCount: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  matchesCount,
  feedCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-xl border-t border-slate-800/80 max-w-md mx-auto">
      <div className="flex items-center justify-around h-16 px-4">
        {/* Home Tab */}
        <button
          onClick={() => onTabChange('home')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
            activeTab === 'home'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Home"
        >
          <Home className="w-6 h-6" />
          <span className="text-[11px] font-medium mt-1">Home</span>
          {activeTab === 'home' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Discover Tab */}
        <button
          onClick={() => onTabChange('discover')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
            activeTab === 'discover'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Discover"
        >
          <div className="relative">
            <Flame className="w-6 h-6" />
            {feedCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-gradient-to-r from-rose-500 to-purple-600 text-[10px] font-bold text-white px-1.5 py-0.2 rounded-full ring-2 ring-slate-950">
                {feedCount > 99 ? '99+' : feedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium mt-1">Discover</span>
          {activeTab === 'discover' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Matches Tab */}
        <button
          onClick={() => onTabChange('matches')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
            activeTab === 'matches'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          aria-label="Matches"
        >
          <div className="relative">
            <Heart className={`w-6 h-6 ${matchesCount > 0 && activeTab === 'matches' ? 'fill-rose-500' : ''}`} />
            {matchesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-600 text-[10px] font-bold text-white px-1.5 py-0.2 rounded-full ring-2 ring-slate-950 animate-pulse">
                {matchesCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium mt-1">Matches</span>
          {activeTab === 'matches' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>
      </div>
    </nav>
  );
};
