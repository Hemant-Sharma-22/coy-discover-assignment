'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Profile, MatchRecord, SwipeAction } from '@/lib/types';
import { CardStack } from '@/components/CardStack';
import { BottomTabBar, TabType } from '@/components/BottomTabBar';
import { EmptyDeckState } from '@/components/EmptyDeckState';
import { MatchesView } from '@/components/MatchesView';
import { HomePlaceholder } from '@/components/HomePlaceholder';
import { MatchModal } from '@/components/MatchModal';
import { Heart, RotateCcw, ShieldCheck, Sparkles, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [feed, setFeed] = useState<Profile[]>([]);
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  // Fetch feed from backend
  const fetchFeed = useCallback(async () => {
    try {
      setIsLoadingFeed(true);
      const res = await fetch('/api/feed');
      const data = await res.json();
      if (data.success) {
        setFeed(data.feed);
      }
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setIsLoadingFeed(false);
    }
  }, []);

  // Fetch matches from backend
  const fetchMatches = useCallback(async () => {
    try {
      const res = await fetch('/api/matches');
      const data = await res.json();
      if (data.success) {
        setMatches(data.matches);
      }
    } catch (err) {
      console.error('Failed to load matches:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFeed();
    fetchMatches();
  }, [fetchFeed, fetchMatches]);

  // Handle Swipe (Like or Pass)
  const handleSwipe = async (profileId: string, action: SwipeAction) => {
    // Optimistically advance card stack
    setFeed((prev) => prev.filter((p) => p.id !== profileId));

    try {
      const res = await fetch('/api/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, action }),
      });
      const data = await res.json();

      if (data.success && data.match && data.matchedProfile) {
        // Trigger Match Modal celebration!
        setMatchedProfile(data.matchedProfile);
        setIsMatchModalOpen(true);
        fetchMatches();
      }
    } catch (err) {
      console.error('Failed to submit swipe:', err);
    }
  };

  // Reset Demo Deck
  const handleReset = async () => {
    try {
      setIsResetting(true);
      const res = await fetch('/api/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        await Promise.all([fetchFeed(), fetchMatches()]);
      }
    } catch (err) {
      console.error('Failed to reset deck:', err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-md shadow-rose-500/20">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-pink-500">
                coy
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                Discover
              </span>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-white hover:border-slate-700 transition-colors disabled:opacity-50"
              title="Reset demo data"
            >
              <RotateCcw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Privacy indicator pill */}
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-400 font-medium"
              title="Double-blind privacy guaranteed"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Screen Body */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full pb-20 pt-2 px-3">
        {activeTab === 'home' && (
          <HomePlaceholder onGoToDiscover={() => setActiveTab('discover')} />
        )}

        {activeTab === 'discover' && (
          <div className="flex-1 flex flex-col justify-center">
            {isLoadingFeed ? (
              <div className="flex flex-col items-center justify-center min-h-[520px] gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-rose-500 border-t-transparent animate-spin" />
                <p className="text-xs text-slate-400">Loading Discover deck...</p>
              </div>
            ) : feed.length > 0 ? (
              <CardStack
                profiles={feed}
                onSwipe={handleSwipe}
                isLoading={isResetting}
              />
            ) : (
              <EmptyDeckState
                onReset={handleReset}
                onGoToMatches={() => setActiveTab('matches')}
                matchesCount={matches.length}
                isResetting={isResetting}
              />
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <MatchesView
            matches={matches}
            onGoToDiscover={() => setActiveTab('discover')}
          />
        )}
      </div>

      {/* Celebratory Match Modal */}
      <MatchModal
        isOpen={isMatchModalOpen}
        matchedProfile={matchedProfile}
        onClose={() => setIsMatchModalOpen(false)}
        onSendMessage={() => {
          setIsMatchModalOpen(false);
          setActiveTab('matches');
        }}
      />

      {/* Mobile-first Bottom Navigation Bar */}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        matchesCount={matches.length}
        feedCount={feed.length}
      />
    </main>
  );
}
