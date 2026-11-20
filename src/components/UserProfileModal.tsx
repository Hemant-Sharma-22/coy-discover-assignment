'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CurrentUser, DEFAULT_USER } from '@/lib/types';
import { X, Check, Camera, User, GraduationCap, Sparkles, ShieldCheck } from 'lucide-react';

interface UserProfileModalProps {
  user: CurrentUser;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: CurrentUser) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [cityOrCollege, setCityOrCollege] = useState(user.cityOrCollege);
  const [bio, setBio] = useState(user.bio);
  const [photo, setPhoto] = useState(user.photo);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...user,
      name: name.trim() || user.name,
      age: Number(age) || user.age,
      cityOrCollege: cityOrCollege.trim() || user.cityOrCollege,
      bio: bio.trim() || user.bio,
      photo: photo.trim() || user.photo,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-rose-500" />
            <h3 className="text-base font-bold text-white">Your Profile</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-rose-500 shadow-xl shadow-rose-950/50 mb-2">
              <Image src={photo} alt={name} fill className="object-cover" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Coy Verified Profile</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">College / City</label>
                <input
                  type="text"
                  value={cityOrCollege}
                  onChange={(e) => setCityOrCollege(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Profile Photo URL</label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3 py-2 text-white outline-none text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-800 shrink-0 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-transform active:scale-95"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{isSaved ? 'Saved!' : 'Save Profile'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
