'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MatchRecord } from '@/lib/types';
import { Heart, MessageCircle, ShieldCheck, Search, Sparkles, X, Send, Calendar, MapPin, GraduationCap } from 'lucide-react';

interface MatchesViewProps {
  matches: MatchRecord[];
  onGoToDiscover: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({ matches, onGoToDiscover }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<MatchRecord | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, string[]>>({});
  const [inputMessage, setInputMessage] = useState('');

  const filteredMatches = matches.filter((m) => {
    const query = searchQuery.toLowerCase();
    return (
      m.profile.name.toLowerCase().includes(query) ||
      m.profile.cityOrCollege.toLowerCase().includes(query) ||
      m.profile.interests.some((i) => i.toLowerCase().includes(query))
    );
  });

  const handleSendMessage = (matchId: string) => {
    if (!inputMessage.trim()) return;
    setChatMessages((prev) => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), inputMessage.trim()],
    }));
    setInputMessage('');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] px-4 py-4 max-w-md mx-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>Mutual Matches</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
              {matches.length}
            </span>
          </h2>
          <p className="text-[11px] text-slate-400">
            People who mutually liked you back
          </p>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 mb-4 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-300 leading-tight">
          <strong className="text-emerald-400 font-semibold">Coy Privacy Guarantee:</strong>{' '}
          You only see someone here if <span className="underline decoration-emerald-500/50">both of you</span> liked each other. Unreciprocated likes remain 100% anonymous forever.
        </p>
      </div>

      {/* Search Input */}
      {matches.length > 3 && (
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, college, interest..."
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      )}

      {/* Content: Matches List or Empty State */}
      {matches.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 shadow-inner">
            <Heart className="w-8 h-8 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            No Mutual Matches Yet
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mb-6 leading-relaxed">
            When you swipe right on someone in the Discover tab who also liked you, they will appear here instantly!
          </p>
          <button
            onClick={onGoToDiscover}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs font-semibold shadow-lg shadow-rose-600/20 transition-all transform active:scale-95"
          >
            Start Swiping in Discover
          </button>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400">
          No matches found for &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-8">
          {filteredMatches.map((record) => {
            const messages = chatMessages[record.id] || [];
            return (
              <div
                key={record.id}
                onClick={() => setSelectedMatch(record)}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-rose-500/40 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
              >
                {/* Photo */}
                <div className="relative w-full h-44">
                  <Image
                    src={record.profile.photo}
                    alt={record.profile.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 220px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Mutual badge */}
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-rose-500/30 text-rose-400">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  </div>

                  {/* Message pill indicator */}
                  {messages.length > 0 && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-purple-600 text-[10px] font-bold text-white shadow">
                      {messages.length} msg
                    </div>
                  )}

                  {/* Bottom info over image */}
                  <div className="absolute bottom-2 inset-x-2.5">
                    <div className="text-sm font-bold text-white drop-shadow flex items-center gap-1">
                      <span>{record.profile.name}</span>
                      <span className="font-light text-slate-300 text-xs">
                        {record.profile.age}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-300 truncate font-medium">
                      {record.profile.cityOrCollege}
                    </div>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-2.5 bg-slate-950/90 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {new Date(record.matchedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-[10px] font-semibold text-rose-400 flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>Chat</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Match Conversation / Profile Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-rose-500">
                  <Image
                    src={selectedMatch.profile.photo}
                    alt={selectedMatch.profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {selectedMatch.profile.name}, {selectedMatch.profile.age}
                  </h4>
                  <p className="text-[10px] text-rose-400 font-medium">
                    Mutual Match • {selectedMatch.profile.cityOrCollege}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMatch(null)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Bio & Interests */}
            <div className="py-3 text-xs text-slate-300 border-b border-slate-800/80">
              <p className="mb-2 italic">&quot;{selectedMatch.profile.bio}&quot;</p>
              <div className="flex flex-wrap gap-1">
                {selectedMatch.profile.interests.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Chat conversation area */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 min-h-[160px] max-h-[220px]">
              <div className="text-center py-2">
                <span className="text-[10px] text-slate-300 bg-slate-800/60 px-3 py-1 rounded-full">
                  You matched with {selectedMatch.profile.name}! Say hi 👋
                </span>
              </div>

              {(chatMessages[selectedMatch.id] || []).map((msg, i) => (
                <div key={i} className="flex justify-end">
                  <div className="bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs px-3 py-1.5 rounded-2xl rounded-tr-sm max-w-[80%] shadow">
                    {msg}
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(selectedMatch.id);
                }}
                placeholder={`Message ${selectedMatch.profile.name}...`}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={() => handleSendMessage(selectedMatch.id)}
                className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
