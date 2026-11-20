import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../lib/db';
import seedProfiles from '../data/mockProfiles.json';

describe('Coy Discover Backend & Privacy Core', () => {
  beforeEach(() => {
    // Reset DB before each test
    db.reset();
  });

  it('1. Seeds at least 30 mock profiles', () => {
    expect(seedProfiles.length).toBeGreaterThanOrEqual(30);
  });

  it('2. Some seeded profiles should have already liked the logged-in user', () => {
    const preLiked = seedProfiles.filter((p) => p.hasLikedUser === true);
    expect(preLiked.length).toBeGreaterThan(0);
    expect(preLiked.length).toBeLessThan(seedProfiles.length);
  });

  it('3. CRITICAL PRIVACY: getFeed() NEVER reveals who has liked the user', () => {
    const feed = db.getFeed();
    expect(feed.length).toBeGreaterThan(0);

    for (const profile of feed) {
      // TypeScript check & runtime check
      expect((profile as any).hasLikedUser).toBeUndefined();
    }
  });

  it('4. Swiping PASS does not create a match and removes profile from feed', () => {
    const feedBefore = db.getFeed();
    const firstProfile = feedBefore[0];

    const result = db.recordSwipe(firstProfile.id, 'pass');
    expect(result.success).toBe(true);
    expect(result.match).toBe(false);

    // Profile should never appear again in feed
    const feedAfter = db.getFeed();
    const found = feedAfter.find((p) => p.id === firstProfile.id);
    expect(found).toBeUndefined();
    expect(feedAfter.length).toBe(feedBefore.length - 1);
  });

  it('5. Swiping LIKE on non-mutual profile does NOT create a match', () => {
    const unreciprocatedProfile = seedProfiles.find((p) => p.hasLikedUser === false);
    expect(unreciprocatedProfile).toBeDefined();

    const result = db.recordSwipe(unreciprocatedProfile!.id, 'like');
    expect(result.success).toBe(true);
    expect(result.match).toBe(false);
    expect(result.matchedProfile).toBeUndefined();

    // Verify it is not in matches list
    const matches = db.getMatches();
    const matchFound = matches.find((m) => m.profileId === unreciprocatedProfile!.id);
    expect(matchFound).toBeUndefined();
  });

  it('6. Swiping LIKE on a profile that already liked user triggers a MUTUAL MATCH', () => {
    const preLikedProfile = seedProfiles.find((p) => p.hasLikedUser === true);
    expect(preLikedProfile).toBeDefined();

    const result = db.recordSwipe(preLikedProfile!.id, 'like');
    expect(result.success).toBe(true);
    expect(result.match).toBe(true);
    expect(result.matchedProfile).toBeDefined();
    expect(result.matchedProfile?.id).toBe(preLikedProfile!.id);
    expect(result.matchedProfile?.name).toBe(preLikedProfile!.name);

    // Check matches list
    const matches = db.getMatches();
    expect(matches.length).toBe(1);
    expect(matches[0].profileId).toBe(preLikedProfile!.id);
    expect(matches[0].profile.name).toBe(preLikedProfile!.name);
  });

  it('7. Swiped profiles never appear again across multiple swipes', () => {
    const feed = db.getFeed();
    const toSwipe = feed.slice(0, 5);

    for (const p of toSwipe) {
      db.recordSwipe(p.id, 'pass');
    }

    const updatedFeed = db.getFeed();
    for (const p of toSwipe) {
      expect(updatedFeed.find((x) => x.id === p.id)).toBeUndefined();
    }
    expect(updatedFeed.length).toBe(feed.length - 5);
  });

  it('8. Reset restores all profiles and clears matches', () => {
    const feed = db.getFeed();
    db.recordSwipe(feed[0].id, 'like');
    db.recordSwipe(feed[1].id, 'pass');

    db.reset();
    const refreshedFeed = db.getFeed();
    const matches = db.getMatches();

    expect(refreshedFeed.length).toBe(seedProfiles.length);
    expect(matches.length).toBe(0);
  });
});
