import fs from 'fs';
import path from 'path';
import { Profile, SwipeRecord, MatchRecord, SwipeAction } from './types';
import seedProfiles from '../data/mockProfiles.json';

interface DatabaseSchema {
  profiles: Profile[];
  swipes: Record<string, SwipeRecord>; // keyed by profileId
  matches: MatchRecord[];
}

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class DatabaseService {
  private inMemoryCache: DatabaseSchema | null = null;

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized(): DatabaseSchema {
    if (this.inMemoryCache) {
      return this.inMemoryCache;
    }

    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw) as DatabaseSchema;
        if (parsed.profiles && parsed.swipes && parsed.matches) {
          this.inMemoryCache = parsed;
          return this.inMemoryCache;
        }
      }
    } catch (err) {
      console.warn('Failed to read db.json, re-initializing with seed data:', err);
    }

    // Initialize with fresh seed data
    const initialData: DatabaseSchema = {
      profiles: JSON.parse(JSON.stringify(seedProfiles)) as Profile[],
      swipes: {},
      matches: [],
    };

    this.save(initialData);
    this.inMemoryCache = initialData;
    return initialData;
  }

  private save(data: DatabaseSchema): void {
    this.inMemoryCache = data;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tempPath = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('Error persisting database to disk:', err);
    }
  }

  /**
   * Returns profiles that the user has not yet swiped on.
   * CRITICAL PRIVACY GUARANTEE:
   * Strips out internal flags (like `hasLikedUser`).
   * The client never receives any indication of who liked the user.
   */
  public getFeed(): Omit<Profile, 'hasLikedUser'>[] {
    const data = this.ensureInitialized();
    const swipedIds = new Set(Object.keys(data.swipes));

    return data.profiles
      .filter((p) => !swipedIds.has(p.id))
      .map((p) => {
        // Strip sensitive field
        const { hasLikedUser, ...publicProfile } = p;
        return publicProfile;
      });
  }

  /**
   * Records a like or pass action for a profile.
   * A match happens ONLY when the logged-in user likes a profile
   * AND that profile has already liked the user (`hasLikedUser === true`).
   */
  public recordSwipe(
    profileId: string,
    action: SwipeAction
  ): { success: boolean; match: boolean; matchedProfile?: Profile; error?: string } {
    const data = this.ensureInitialized();

    const profile = data.profiles.find((p) => p.id === profileId);
    if (!profile) {
      return { success: false, match: false, error: 'Profile not found' };
    }

    // Check if already swiped
    if (data.swipes[profileId]) {
      const existingMatch = data.matches.find((m) => m.profileId === profileId);
      return {
        success: true,
        match: Boolean(existingMatch),
        matchedProfile: existingMatch ? existingMatch.profile : undefined,
      };
    }

    // Record swipe
    const record: SwipeRecord = {
      profileId,
      action,
      timestamp: new Date().toISOString(),
    };
    data.swipes[profileId] = record;

    let isMatch = false;
    let matchedProfile: Profile | undefined = undefined;

    // Check for mutual match
    if (action === 'like' && profile.hasLikedUser === true) {
      isMatch = true;
      const { hasLikedUser, ...safeProfile } = profile;
      matchedProfile = safeProfile as Profile;

      const matchRecord: MatchRecord = {
        id: `match_${Date.now()}_${profileId}`,
        profileId,
        matchedAt: new Date().toISOString(),
        profile: safeProfile as Profile,
      };

      data.matches.unshift(matchRecord);
    }

    this.save(data);

    return {
      success: true,
      match: isMatch,
      matchedProfile,
    };
  }

  /**
   * Returns all mutual matches for the user.
   */
  public getMatches(): MatchRecord[] {
    const data = this.ensureInitialized();
    return data.matches;
  }

  /**
   * Resets database back to initial state with all seed profiles
   * and empty swipes/matches (useful for demo & testing).
   */
  public reset(): void {
    const freshData: DatabaseSchema = {
      profiles: JSON.parse(JSON.stringify(seedProfiles)) as Profile[],
      swipes: {},
      matches: [],
    };
    this.save(freshData);
  }

  /**
   * Helper to inspect swipe counts for stats.
   */
  public getStats(): { totalProfiles: number; swipedCount: number; matchesCount: number } {
    const data = this.ensureInitialized();
    return {
      totalProfiles: data.profiles.length,
      swipedCount: Object.keys(data.swipes).length,
      matchesCount: data.matches.length,
    };
  }
}

// Singleton instance
export const db = new DatabaseService();
