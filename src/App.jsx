import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'
import SearchResult from './components/SearchResult'
import Playlist from './components/Playlist'
import TrackList from './components/TrackList'
import Track from './components/Track'
import Spotify from './util/Spotify';

function App() {
  const searchSpotify = async (term) => {
  const results = await Spotify.search(term);
  setSearchResults(results); // ← REQUIRED
};

  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const handleAddTrack = (track) => {
    if (!playlist.find((t) => t.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const handleRemoveTrack = (track) => {
    setPlaylist(playlist.filter((t) => t.id !== track.id));
  };

  // Debug: log search results when they change
  useEffect(() => {
    console.log('Spotify Search Results:', searchResults);
  }, [searchResults]);

  // Example tracks for demonstration
  const demoTracks = [
    { id: '1', name: 'Track One', artist: 'Artist A', album: 'Album X' },
    { id: '2', name: 'Track Two', artist: 'Artist B', album: 'Album Y' },
    { id: '3', name: 'Track Three', artist: 'Artist C', album: 'Album Z' },
  ];

  return (
    <div className="App">
      <h1>
        Welcome to <span className="highlight">Jammming!</span>
      </h1>
      <div className="search-bar-container">
        <SearchBar onSearchResults={setSearchResults} onSearch={searchSpotify} />
      </div>
      <div className="App-playlist">
        <div style={{ minWidth: 350, maxWidth: 400, flex: 1, background: 'rgba(60,0,100,0.90)', borderRadius: 16, padding: '24px', marginRight: '20px', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)' }}>
          <SearchResult results={searchResults} onAdd={handleAddTrack} onRemove={handleRemoveTrack} />
        </div>
        <div style={{ minWidth: 350, maxWidth: 400, flex: 1, background: 'rgba(60,0,100,0.90)', borderRadius: 16, padding: '24px', marginLeft: '20px', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)' }}>
          <Playlist tracks={playlist} />
        </div>
      </div>
    </div>
  );
}


export default App
