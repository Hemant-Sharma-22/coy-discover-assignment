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
