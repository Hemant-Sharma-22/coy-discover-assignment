# Coy SDE Intern Assignment

> Standalone mobile-first web application featuring a swipe-based **"Discover"** tab built for [Coy](https://app.getcoy.com), alongside an in-depth product and privacy analysis proposing two core features for the platform.

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Part A: Product Analysis & Feature Proposals](#part-a-product-analysis--feature-proposals)
   - [Feature 1: Cryptographic Context Hints (Mutual Circles / Micro-Hints)](#feature-1-cryptographic-context-hints-mutual-circles--micro-hints)
   - [Feature 2: Grace-Period Slot Recirculation with Dormancy Decay](#feature-2-grace-period-slot-recirculation-with-dormancy-decay)
3. [Part B: "Discover" Tab Implementation](#part-b-discover-tab-implementation)
   - [Core Architecture & Tech Stack](#core-architecture--tech-stack)
   - [Strict Privacy Guarantee](#strict-privacy-guarantee)
   - [Swipe Experience & Physics](#swipe-experience--physics)
   - [Matching Engine & Celebration](#matching-engine--celebration)
   - [Backend APIs](#backend-apis)
4. [Getting Started & Local Development](#getting-started--local-development)
5. [Running Tests & E2E Verification](#running-tests--e2e-verification)
6. [Demo Script for Reviewers](#demo-script-for-reviewers)

---

## Executive Summary

Coy's core promise is **absolute double-blind privacy**: you add someone you know to a secret list, they receive an anonymous notification without knowing who sent it, and only if *both* parties reciprocate is the connection revealed.

This project delivers:
- **Part A:** A product critique proposing two high-leverage features addressing the cold-start "slot paralysis" problem and long-term user retention, without degrading Coy’s privacy boundaries.
- **Part B:** A full-stack, mobile-first Next.js web app implementing a smooth swipe-based discovery experience (similar to Tinder/Bumble), backed by persistent backend routes, 32 rich seeded profiles, pre-liked candidate matches, celebratory match modals, and an automated test suite.

---

## Part A: Product Analysis & Feature Proposals

### Deep Understanding of the Coy Experience
Exploring Coy's onboarding (`Phone OTP Login` &rarr; `Adding a Crush` &rarr; `Email Verification` &rarr; `Invite Link` &rarr; `Extra Slots Screen`) reveals a unique product tension:
- **The Magic:** Eliminates the vulnerability and rejection fear of confessing a crush.
- **The Friction:** 
  1. *Slot Scarcity:* Users only start with 3 free slots.
  2. *Permanent Commitment:* Adds are permanent to prevent users from brute-forcing contacts.
  3. *The Cold-Start Dead End:* When an invited crush receives *"Someone has a crush on you on Coy"*, they have no context. Is it someone from high school, college, work, a party, or a stranger? With only 3 slots, fear of wasting an irreplaceable slot leads to **"Slot Paralysis"** and high recipient bounce rates.

Below are two core features proposed to solve these fundamental bottlenecks.

---

### Feature 1: Cryptographic Context Hints (Mutual Circles / Micro-Hints)

#### What is it?
When User A adds User B to their secret crush list, User A can optionally select one or two **pre-validated context tags** or a canned hint from a controlled taxonomy (e.g., `We met at: College / University`, `Circle: mutual friend circle`, `Context: High School / Hometown`, `Vibe: Shared a class this year`).
- The notification sent to User B reads:
  > *"Someone has a crush on you! Hint: You crossed paths at [UC Berkeley / Campus]. Join Coy to see if the feeling is mutual."*
- Alternatively, if phonebook access or verified domain emails are present, Coy generates a zero-knowledge badge: *"Sender shares 3+ mutual contacts"* or *"Sender is from your university domain"*.

#### Why is this feature required?
1. **Solves "Slot Paralysis" & Drastically Increases Recipient Conversion:** An anonymous message without context is frequently dismissed as spam, phishing, or a marketing gimmick. Giving a verified social anchor provides emotional safety and validates that the crush is authentic.
2. **Encourages High-Intent Reciprocation:** When recipients know the crush is from their college or social circle, they can reason about who they actually like in that circle and spend their 3 slots with confidence.
3. **Preserves Double-Blind Privacy:** Because the tags are coarse-grained (e.g., university level or shared circle) and chosen from a fixed taxonomy, they cannot be abused to leak full individual identity or facilitate stalking, respecting Coy’s non-negotiable core promise.

---

### Feature 2: Grace-Period Slot Recirculation with Dormancy Decay

#### What is it?
Under Coy's current model, crush slots are permanent to stop users from repeatedly adding and removing numbers to test who likes them. However, this creates a dead-end state: if a crush never downloads the app, has graduated, moved away, or is in a committed relationship, the user's slot is permanently dead.

**Slot Recirculation** introduces a graceful, abuse-proof recovery mechanism:
- If an invited crush has not claimed their profile or opened Coy within **45 days**, the slot enters a **"Dormant"** state.
- The sender can safely **archive/reclaim** that slot once per 30-day billing cycle.
- **Anti-Brute-Force Guardrails:**
  - A strict rate-limit of 1 reclamation per month.
  - A 14-day quarantine cooldown before a newly freed slot can be assigned to a new contact.
  - The dormant crush's previous token is invalidated, ensuring no race conditions.

#### Why is this feature required?
1. **Long-Term User Retention:** When users burn all 3 slots on people who don't join, the app becomes a dead end. Users either uninstall or abandon the app. Slot recirculation re-engages users periodically ("Your slot is ready to be refreshed!").
2. **Fairness & Reduced Purchase Friction:** Users feel cheated when slots are lost to inactive phone numbers. Allowing periodic, rate-limited reclamation respects the user while retaining strong monetization incentives for instant extra slots.
3. **Mitigates Social Stagnation:** Real-world relationship dynamics evolve over semesters and years. An app that permanently locks users into past crushes cannot mirror modern social fluidity.

---

## Part B: "Discover" Tab Implementation

### Core Architecture & Tech Stack

```
coy-discover/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── feed/route.ts       # GET /api/feed (returns unswiped profiles, stripped of secret flags)
│   │   │   ├── swipe/route.ts      # POST /api/swipe (records like/pass, detects mutual matches)
│   │   │   ├── matches/route.ts    # GET /api/matches (returns all mutual matches)
│   │   │   └── reset/route.ts      # POST /api/reset (resets seed data for testing/demo)
│   │   ├── globals.css             # Glassmorphism, card stamps (LIKE/NOPE), mobile-first root styles
│   │   ├── layout.tsx              # Viewport & metadata
│   │   └── page.tsx                # Main controller: tab routing, header, state orchestration
│   ├── components/
│   │   ├── CardStack.tsx           # Framer Motion drag physics, rotation, swipe thresholds, keyboard controls
│   │   ├── ProfileCard.tsx         # Full-bleed image, live dynamic stamps, detail drawer, tags
│   │   ├── SwipeActionButtons.tsx  # Desktop/mobile action buttons (Pass, Info, Like)
│   │   ├── MatchModal.tsx          # Celebratory "It's a Match!" modal + canvas-confetti cannons
│   │   ├── MatchesView.tsx         # Mutual matches gallery with search filter & interactive chat drawer
│   │   ├── HomePlaceholder.tsx     # Authentic Coy Home tab placeholder
│   │   ├── EmptyDeckState.tsx      # "All caught up" state with reset trigger
│   │   └── BottomTabBar.tsx        # Mobile bottom navigation (Home, Discover, Matches)
│   ├── data/
│   │   ├── mockProfiles.json       # 32 high-res mock profiles (bios, colleges, interests)
│   │   └── db.json                 # Persistent file-based SQLite/JSON database
│   ├── lib/
│   │   ├── db.ts                   # Robust database service (thread-safe, atomic file writes)
│   │   └── types.ts                # TypeScript interfaces
│   └── __tests__/
│       └── db-and-api.test.ts      # 8 comprehensive automated unit/integration tests
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

- **Frontend:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti.
- **Backend:** Next.js Route Handlers (`/api/feed`, `/api/swipe`, `/api/matches`, `/api/reset`).
- **Data & Persistence:** Atomic file-backed storage (`src/data/db.json`) persisting all swipes and matches across browser reloads and server restarts.

---

### Strict Privacy Guarantee
> *"Never reveal who has liked the user unless it is mutual; this is the core promise of Coy."*

In accordance with this requirement:
1. `GET /api/feed` **strictly sanitizes all profile objects**. The internal `hasLikedUser` field is **never transmitted** over the network.
2. Inspecting the browser's Network tab or Redux/React DevTools reveals zero indication of who has liked the user.
3. Mutual matches are computed **purely on the backend** during `POST /api/swipe`. Only when both parties have liked each other does the backend issue `{ match: true, matchedProfile }`.

---

### Swipe Experience & Physics
- **Mobile Gesture Engine:** Drag cards with real-time translation and proportional rotational torque (`useTransform(x, [-300, 300], [-25, 25])`).
- **Interactive Stamp Feedback:**
  - Dragging right progressively reveals a glowing green **"LIKE"** stamp.
  - Dragging left progressively reveals a vivid red **"NOPE"** stamp.
  - Releasing beyond `90px` or a velocity of `350px/s` flings the card off-screen and records the swipe. Releasing below threshold springs the card back to center.
- **Desktop Navigation:**
  - Large tactile action buttons (❌ Pass, ℹ️ Info, 💚 Like).
  - Keyboard shortcuts supported: `←` / `A` to Pass, `→` / `D` to Like.
- **Stacked Depth:** The card beneath the top card is rendered in the background with subtle scaling (`scale: 0.94`, `translate-y-4`, `opacity-70`), creating an authentic deck sensation.
- **Persistence & Single-View Guarantee:** A swiped profile is recorded in the database and **never appears again**.

---

### Matching Engine & Celebration
- Seeded with **32 diverse profiles** across prominent colleges (Stanford, Berkeley, UCLA, NYU, Columbia, IIT Delhi, BITS Pilani, etc.) with verified photos, realistic bios, and interest tags.
- Exactly as requested, multiple seeded profiles (e.g. Maya Lin, Aria Chen, Zara Patel, Chloe Dupont, Sophia Rodriguez, Kabir Sharma, etc.) have `hasLikedUser: true` pre-configured.
- When the user swipes right on any of these profiles:
  1. The backend records the swipe and flags a mutual match.
  2. A vibrant **"It's a Match!"** celebration modal triggers immediately with confetti explosions (`canvas-confetti`).
  3. Overlapping avatars with a pulsing heart badge appear alongside profile details.
  4. The user can jump directly into chat or keep swiping.
- The **Matches View** displays all mutual matches, complete with a search filter and an interactive messaging drawer.

---

## Backend APIs

### 1. `GET /api/feed`
Returns unswiped profiles for the active user. Strips all private flags.

**Response `200 OK`:**
```json
{
  "success": true,
  "feed": [
    {
      "id": "prof_01",
      "name": "Maya Lin",
      "age": 22,
      "photo": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?...",
      "bio": "Architecture student obsessed with brutalist buildings and matcha lattes.",
      "cityOrCollege": "UC Berkeley",
      "interests": ["Architecture", "Film Photography", "Matcha", "Indie Rock"],
      "occupation": "Architecture Undergrad",
      "distanceMiles": 3
    }
  ],
  "remaining": 32,
  "stats": {
    "totalProfiles": 32,
    "swipedCount": 0,
    "matchesCount": 0
  }
}
```

### 2. `POST /api/swipe`
Records a swipe action (`like` or `pass`).

**Request Body:**
```json
{
  "profileId": "prof_01",
  "action": "like"
}
```

**Response `200 OK` (Match):**
```json
{
  "success": true,
  "match": true,
  "matchedProfile": {
    "id": "prof_01",
    "name": "Maya Lin",
    "age": 22,
    "photo": "https://images.unsplash.com/...",
    "cityOrCollege": "UC Berkeley"
  },
  "message": "It's a Match! You both liked each other."
}
```

### 3. `GET /api/matches`
Returns all mutual matches.

**Response `200 OK`:**
```json
{
  "success": true,
  "matches": [
    {
      "id": "match_1700000000_prof_01",
      "profileId": "prof_01",
      "matchedAt": "2026-11-20T16:17:00.000Z",
      "profile": { ... }
    }
  ],
  "total": 1
}
```

### 4. `POST /api/reset`
Restores all 32 seed profiles, clears swipes and matches, allowing instant test repetitions.

---

## Getting Started & Local Development

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v22)
- npm or yarn

### Installation
```bash
git clone <your-repo-url>
cd "Coy SDE Intern Assignment"
npm install
```

### Run Locally
```bash
# Start development server
npm run dev

# Or build & start production server
npm run build
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Running Tests & E2E Verification

### Automated Unit & Privacy Tests
Run the comprehensive Vitest test suite:
```bash
npm test
```

**Test Suite Coverage:**
```text
✓ 1. Seeds at least 30 mock profiles (32 total)
✓ 2. Seeded profiles contain pre-liked users for demo matches
✓ 3. CRITICAL PRIVACY: getFeed() NEVER reveals who has liked the user
✓ 4. Swiping PASS does not create a match and removes profile from feed
✓ 5. Swiping LIKE on non-mutual profile does NOT create a match
✓ 6. Swiping LIKE on a profile that already liked user triggers a MUTUAL MATCH
✓ 7. Swiped profiles never appear again across multiple swipes
✓ 8. Reset restores all profiles and clears matches
```

### E2E HTTP API Verification Script
Run the automated end-to-end API verification script:
```bash
node test-e2e.mjs
```

---

## Demo Script for Reviewers

1. **Open the App:** Navigate to `http://localhost:3000`. You are immediately placed on the **Discover** tab with a mobile-first UI.
2. **Explore the Profile Card:** Notice the distance badge, verified check, college, occupation, and interest tags. Tap the down arrow button to expand the full bio.
3. **Test Drag Gestures:**
   - Drag the card slightly to the right &rarr; see the emerald **"LIKE"** stamp fade in.
   - Drag the card slightly to the left &rarr; see the red **"NOPE"** stamp fade in.
4. **Trigger a Mutual Match:**
   - The first profile, **Maya Lin**, has already liked you.
   - Swipe right (or click the green Heart button).
   - Watch the celebratory **"It's a Match!"** modal pop up with confetti!
5. **View Mutual Matches:**
   - Tap "Send a Message" or switch to the **Matches** tab.
   - Maya Lin is listed under Mutual Matches.
   - Click her card to open the conversation drawer and send a chat message.
6. **Pass on a Profile:**
   - Go back to Discover and swipe left on the next profile.
   - Notice they disappear immediately and will never appear again.
7. **Refresh the Page:**
   - Reload your browser &rarr; all swipes and matches persist exactly as left.
8. **Check the Home Tab:**
   - Tap the **Home** tab to view the placeholder explaining Coy's core secret crush architecture.
9. **Reset Demo:**
   - Click the "Reset" button in the header or in the empty-deck view to restore all 32 profiles for another demo run.
