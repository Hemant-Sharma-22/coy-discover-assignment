export interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  photos?: string[];
  bio: string;
  cityOrCollege: string;
  interests: string[];
  distanceMiles?: number;
  occupation?: string;
  // Internal flag: whether this seeded profile has already liked the logged-in user
  // CRITICAL PRIVACY RULE: NEVER sent in the public feed API response!
  hasLikedUser?: boolean;
}

export interface CurrentUser {
  id: string;
  name: string;
  age: number;
  photo: string;
  cityOrCollege: string;
  bio: string;
  phone?: string;
}

export const DEFAULT_USER: CurrentUser = {
  id: "user_me",
  name: "Alex Rivera",
  age: 23,
  photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  cityOrCollege: "UC Berkeley",
  bio: "Design & tech enthusiast. Coffee lover, indie music, and casual runner.",
  phone: "+1 (555) 019-2834",
};

export type SwipeAction = "like" | "pass";

export interface SwipeRecord {
  profileId: string;
  action: SwipeAction;
  timestamp: string;
}

export interface MatchRecord {
  id: string;
  profileId: string;
  matchedAt: string;
  profile: Profile;
}

export interface SwipeRequest {
  profileId: string;
  action: SwipeAction;
}

export interface SwipeResponse {
  success: boolean;
  match: boolean;
  matchedProfile?: Profile;
  message?: string;
}

export interface MatchesResponse {
  matches: MatchRecord[];
  total: number;
}
