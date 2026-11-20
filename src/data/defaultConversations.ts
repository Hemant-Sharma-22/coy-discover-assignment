export interface ChatMessage {
  id: string;
  sender: 'them' | 'me';
  text: string;
  time: string;
}

export const defaultConversations: Record<string, ChatMessage[]> = {
  prof_01: [
    {
      id: 'm1_01',
      sender: 'them',
      text: "Hey! Honestly didn't expect to see you here haha 😊",
      time: '10:14 PM',
    },
    {
      id: 'm1_02',
      sender: 'me',
      text: "Haha hey Maya! I love your taste in architecture.",
      time: '10:16 PM',
    },
    {
      id: 'm1_03',
      sender: 'them',
      text: "Thanks! It's rare to find someone who actually appreciates brutalist buildings 🏛️",
      time: '10:18 PM',
    },
    {
      id: 'm1_04',
      sender: 'them',
      text: "Have you been to the new design library on campus yet?",
      time: '10:19 PM',
    },
  ],
  prof_03: [
    {
      id: 'm3_01',
      sender: 'them',
      text: "If you're challenging me to Mario Kart, you better bring your A-game 🏎️💨",
      time: '9:30 PM',
    },
    {
      id: 'm3_02',
      sender: 'me',
      text: "Rainbow Road, no items. Loser buys boba?",
      time: '9:32 PM',
    },
    {
      id: 'm3_03',
      sender: 'them',
      text: "Deal! Prepare to lose though 🧋",
      time: '9:33 PM',
    },
  ],
  prof_05: [
    {
      id: 'm5_01',
      sender: 'them',
      text: "Hey there! Tell me your big three and I'll tell you our compatibility ☕✨",
      time: '8:45 PM',
    },
    {
      id: 'm5_02',
      sender: 'me',
      text: "Haha I'm a Leo sun, Gemini moon. Am I in trouble?",
      time: '8:48 PM',
    },
    {
      id: 'm5_03',
      sender: 'them',
      text: "Omg high chaos energy but I kinda love it haha",
      time: '8:50 PM',
    },
  ],
  prof_07: [
    {
      id: 'm7_01',
      sender: 'them',
      text: "Bonjour! Always happy to connect with another vinyl lover 🎶",
      time: '7:12 PM',
    },
    {
      id: 'm7_02',
      sender: 'me',
      text: "Hey Chloe! What's currently spinning on your turntable?",
      time: '7:15 PM',
    },
    {
      id: 'm7_03',
      sender: 'them',
      text: "Some classic Serge Gainsbourg and 70s funk! What about you?",
      time: '7:17 PM',
    },
  ],
  prof_09: [
    {
      id: 'm9_01',
      sender: 'them',
      text: "Hey! Running on 3 hours of sleep and an iced americano right now ☕ how's your day?",
      time: '6:20 PM',
    },
    {
      id: 'm9_02',
      sender: 'me',
      text: "Pre-med life treating you well I see 😂",
      time: '6:22 PM',
    },
    {
      id: 'm9_03',
      sender: 'them',
      text: "Haha surviving! Live jazz is the only thing keeping me sane this week 🎷",
      time: '6:24 PM',
    },
  ],
  prof_12: [
    {
      id: 'm12_01',
      sender: 'them',
      text: "Hey! Nice to match. Ferrari or Red Bull this season? 🏎️",
      time: '5:40 PM',
    },
    {
      id: 'm12_02',
      sender: 'me',
      text: "Red Bull for the engineering, but Ferrari for the drama haha.",
      time: '5:42 PM',
    },
    {
      id: 'm12_03',
      sender: 'them',
      text: "Spot on! That strategy wall is pure entertainment 😂",
      time: '5:43 PM',
    },
  ],
  prof_15: [
    {
      id: 'm15_01',
      sender: 'them',
      text: "Hey! Coffee debate: flat white or cold brew?",
      time: '4:15 PM',
    },
    {
      id: 'm15_02',
      sender: 'me',
      text: "Cold brew on sunny days, flat white when studying!",
      time: '4:18 PM',
    },
    {
      id: 'm15_03',
      sender: 'them',
      text: "Approved. You pass the first test ☕",
      time: '4:20 PM',
    },
  ],
  prof_17: [
    {
      id: 'm17_01',
      sender: 'them',
      text: "Hey! Finding another coder who also loves classical arts is so rare 💃💻",
      time: '3:05 PM',
    },
    {
      id: 'm17_02',
      sender: 'me',
      text: "Haha full stack dev by day, arts fan by night!",
      time: '3:08 PM',
    },
    {
      id: 'm17_03',
      sender: 'them',
      text: "Exactly! Balance is everything ✨",
      time: '3:10 PM',
    },
  ],
  prof_20: [
    {
      id: 'm20_01',
      sender: 'them',
      text: "Hey! What's your current go-to ramen spot in town?",
      time: '2:15 PM',
    },
    {
      id: 'm20_02',
      sender: 'me',
      text: "Ramen Nagi! Black King is unbeatable.",
      time: '2:18 PM',
    },
    {
      id: 'm20_03',
      sender: 'them',
      text: "Elite choice! That garlic broth is incredible 🍜",
      time: '2:20 PM',
    },
  ],
  prof_23: [
    {
      id: 'm23_01',
      sender: 'them',
      text: "Hey! Always scouting the best bakery in town 🥐 any recommendations?",
      time: '1:10 PM',
    },
    {
      id: 'm23_02',
      sender: 'me',
      text: "You have to try the almond croissant at the local French bakery!",
      time: '1:12 PM',
    },
    {
      id: 'm23_03',
      sender: 'them',
      text: "Adding it to my map right now! Thanks! 😊",
      time: '1:15 PM',
    },
  ],
  prof_26: [
    {
      id: 'm26_01',
      sender: 'them',
      text: "Hey! Quick question: spicy ramen or sci-fi marathon on a Friday night?",
      time: '12:30 PM',
    },
    {
      id: 'm26_02',
      sender: 'me',
      text: "Why not both at the same time? 😄",
      time: '12:33 PM',
    },
    {
      id: 'm26_03',
      sender: 'them',
      text: "The correct answer! We're already on the same page 🧠✨",
      time: '12:35 PM',
    },
  ],
};

export function getDefaultConversation(profileId: string, profileName: string): ChatMessage[] {
  if (defaultConversations[profileId]) {
    return defaultConversations[profileId];
  }

  // Fallback default conversation for any other profile
  return [
    {
      id: `default_${profileId}_1`,
      sender: 'them',
      text: `Hey! So glad we mutually matched on Coy ✨`,
      time: '10:00 AM',
    },
    {
      id: `default_${profileId}_2`,
      sender: 'me',
      text: `Hey ${profileName}! Loved your profile.`,
      time: '10:05 AM',
    },
    {
      id: `default_${profileId}_3`,
      sender: 'them',
      text: `Thanks! How has your week been going so far? 😊`,
      time: '10:08 AM',
    },
  ];
}

export const simulatedReplies = [
  "Haha totally agree with you! What are you up to this weekend?",
  "That sounds awesome! We should definitely check that out sometime 😊",
  "No way, really? You have great taste haha!",
  "Haha love that energy! Tell me more ✨",
  "100%! I was just thinking the exact same thing earlier today.",
  "Haha you're fun to talk to! We definitely need to grab coffee sometime ☕",
];
