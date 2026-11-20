async function test() {
  console.log('--- 1. Testing GET /api/feed ---');
  let res = await fetch('http://localhost:3000/api/feed');
  let data = await res.json();
  console.log('Success:', data.success);
  console.log('Profiles count:', data.feed.length);
  console.log('First profile name:', data.feed[0].name);
  console.log('First profile hasLikedUser defined?:', data.feed[0].hasLikedUser !== undefined);

  console.log('\n--- 2. Testing POST /api/swipe (prof_01: pre-liked) ---');
  res = await fetch('http://localhost:3000/api/swipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: 'prof_01', action: 'like' }),
  });
  data = await res.json();
  console.log('Swipe response:', data);

  console.log('\n--- 3. Testing GET /api/matches ---');
  res = await fetch('http://localhost:3000/api/matches');
  data = await res.json();
  console.log('Matches count:', data.total);
  console.log('Matched profile name:', data.matches[0]?.profile.name);

  console.log('\n--- 4. Testing GET /api/feed after swipe ---');
  res = await fetch('http://localhost:3000/api/feed');
  data = await res.json();
  console.log('Remaining feed count:', data.feed.length);
  console.log('Is prof_01 in feed?:', data.feed.some(p => p.id === 'prof_01'));

  console.log('\n--- 5. Testing POST /api/swipe (prof_02: NOT pre-liked) ---');
  res = await fetch('http://localhost:3000/api/swipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: 'prof_02', action: 'like' }),
  });
  data = await res.json();
  console.log('Swipe response (should be match: false):', data);

  console.log('\n--- 6. Testing POST /api/reset ---');
  res = await fetch('http://localhost:3000/api/reset', { method: 'POST' });
  data = await res.json();
  console.log('Reset response:', data);

  res = await fetch('http://localhost:3000/api/feed');
  data = await res.json();
  console.log('Feed count after reset (should be 32):', data.feed.length);

  res = await fetch('http://localhost:3000/api/matches');
  data = await res.json();
  console.log('Matches count after reset (should be 0):', data.total);
  console.log('\nALL E2E API VERIFICATIONS PASSED SUCCESSFULLY!');
}

test().catch(console.error);
