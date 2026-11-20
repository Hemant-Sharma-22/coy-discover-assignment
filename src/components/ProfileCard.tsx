'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Briefcase, GraduationCap, Info, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import { Profile } from '@/lib/types';
import { MotionValue, motion, useTransform } from 'framer-motion';

interface ProfileCardProps {
  profile: Profile;
  isFront?: boolean;
  dragX?: MotionValue<number>;
  onInfoToggle?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isFront = false,
  dragX,
  onInfoToggle,
}) => {
  const [showFullBio, setShowFullBio] = useState(false);

  // Dynamic stamp opacities driven by Framer Motion drag distance if this is the front card
  const likeOpacity = dragX ? useTransform(dragX, [20, 100], [0, 1]) : 0;
  const nopeOpacity = dragX ? useTransform(dragX, [-20, -100], [0, 1]) : 0;

  return (
    <div className="relative w-full h-[520px] sm:h-[560px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800/80 select-none">
      {/* Profile Photo */}
      <div className="relative w-full h-full">
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          priority={isFront}
          sizes="(max-width: 640px) 100vw, 440px"
          className="object-cover object-center pointer-events-none"
        />

        {/* Ambient Dark Gradient Overlays for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        {/* Dynamic Stamp Overlays for Swipe Feedback */}
        {isFront && dragX && (
          <>
            {/* LIKE Stamp */}
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-8 left-6 z-30 pointer-events-none"
            >
              <div className="stamp-like px-4 py-1.5 rounded-xl text-2xl font-black tracking-wider uppercase bg-emerald-950/60 backdrop-blur-md">
                LIKE
              </div>
            </motion.div>

            {/* NOPE Stamp */}
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-8 right-6 z-30 pointer-events-none"
            >
              <div className="stamp-nope px-4 py-1.5 rounded-xl text-2xl font-black tracking-wider uppercase bg-rose-950/60 backdrop-blur-md">
                NOPE
              </div>
            </motion.div>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium">Active now</span>
          </div>

          {profile.distanceMiles && (
            <div className="px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-xs text-slate-300 font-medium">
              {profile.distanceMiles} miles away
            </div>
          )}
        </div>

        {/* Bottom Profile Details */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-20 pointer-events-auto">
          {/* Name & Age */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {profile.name}
              </h2>
              <span className="text-2xl sm:text-3xl font-light text-slate-300 drop-shadow-md">
                {profile.age}
              </span>
              <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-500/20 inline-block drop-shadow" />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullBio(!showFullBio);
                onInfoToggle?.();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all transform active:scale-90"
              aria-label="Toggle profile details"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showFullBio ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* College or City & Occupation */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 mb-2.5 font-medium">
            <div className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>{profile.cityOrCollege}</span>
            </div>
            {profile.occupation && (
              <div className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-rose-400" />
                <span>{profile.occupation}</span>
              </div>
            )}
          </div>

          {/* Bio (Collapsed / Expanded) */}
          <p
            className={`text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow mb-3 transition-all ${
              showFullBio ? 'line-clamp-none' : 'line-clamp-2'
            }`}
          >
            {profile.bio}
          </p>

          {/* Interests Tags */}
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((interest, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 text-slate-100 transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
