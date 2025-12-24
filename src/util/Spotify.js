// src/util/Spotify.js

let accessToken = '';

const CLIENT_ID = '875602f221254a7fa201f38ad2a476f3';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = "code";
// You need these scopes to create/modify playlists!
const SCOPE = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

function getRedirectUri() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return window.location.origin.endsWith('/') ? window.location.origin : window.location.origin + '/';
    }
  } catch (e) {
    console.log(e);
  }
  return 'https://tuan-perspectived-uncontagiously.ngrok-free.dev';
}

function clearUrlTokenParams() {
  try {
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    window.history.pushState({}, document.title, newUrl);
  } catch (e) {
    console.log(e);
  }
}

function getAccessTokenFromUrl() {
  if (!window || !window.location) return null;
  const href = window.location.href;
  const accessTokenMatch = href.match(/access_token=([^&]*)/);
  const expiresInMatch = href.match(/expires_in=([^&]*)/);
  
  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    clearUrlTokenParams();
    return accessToken;
  }
  return null;
}

function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => possible[x % possible.length])
    .join('');
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


export async function getAccessToken() {
  if (accessToken) return accessToken;

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  // STEP 1: If we already have a code → exchange it
  if (code) {
    const codeVerifier = localStorage.getItem('code_verifier');

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: getRedirectUri(),
      code_verifier: codeVerifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const data = await response.json();
    accessToken = data.access_token;

    window.history.replaceState({}, document.title, '/');
    return accessToken;
  }

  // STEP 2: No code → redirect to Spotify
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem('code_verifier', codeVerifier);

  const authUrl = `${AUTH_ENDPOINT}?` +
    `client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(getRedirectUri())}` +
    `&scope=${encodeURIComponent(SCOPE)}` +
    `&code_challenge_method=S256` +
    `&code_challenge=${codeChallenge}`;

  window.location.href = authUrl;
}

export async function search(term) {
  if (!term) return [];

  const token = await getAccessToken(); // ✅ WAIT
  if (!token) return [];

  const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();
  if (!json.tracks) return [];

  return json.tracks.items.map(t => ({
    id: t.id,
    name: t.name,
    artist: t.artists[0].name,
    album: t.album.name,
    uri: t.uri,
  }));
}

// FIXED: Integrated savePlaylist with correct URLs and syntax
export async function savePlaylist(playlistName, trackUris) {
  if (!playlistName || !trackUris || trackUris.length === 0) {
    return;
  }
  
  const token = await getAccessToken();
  if (!token) return;

  const headers = { Authorization: `Bearer ${token}` };
  let userId;

  try {
    // 1. Get user ID from real Spotify API
    const userRes = await fetch('https://api.spotify.com/v1/me', { headers });
    if (!userRes.ok) return;
    const userData = await userRes.json();
    userId = userData.id;

    // 2. Create a new playlist (Fixed missing '$')
    const createRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: playlistName, description: 'Created with Jammming', public: false })
    });
    
    if (!createRes.ok) return;
    const playlistData = await createRes.json();
    const playlistId = playlistData.id;

    // 3. Add tracks to the playlist (Fixed missing '$')
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ uris: trackUris })
    });

  } catch (err) {
    console.log(err);
  }
}



// Export all functions so App.jsx can use them
export default { getAccessToken, search, savePlaylist };