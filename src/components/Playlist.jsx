import React from 'react';
import { savePlaylist } from '../util/Spotify';
import '../styles/Playlist.css';
import PropTypes from 'prop-types';
function Playlist({ tracks, playlistName = "iu playlist" }) {
    // Collect all track URIs for saving
    const trackUris = tracks.map(track => track.uri).filter(Boolean);

    const handleSave = async () => {
        await savePlaylist(playlistName, trackUris);
        alert('Playlist saved to Spotify!');
    };

    return (
        <div className="playlist-container">
            <input
                className="playlist-title-input"
                value={playlistName}
                readOnly
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    width: '100%'
                }}
            />
            <ul className="playlist-list">
                {tracks.map((track) => (
                    <li className="playlist-item" key={track.id}>
                        <span className="playlist-track">{track.name}</span>
                        <span className="playlist-artist">{track.artist}</span>
                        {track.album && (
                            <span className="playlist-album">{track.album}</span>
                        )}
                        <button className="playlist-remove" title="Remove track">-</button>
                    </li>
                ))}
            </ul>
            <button className="save-playlist-button"
                style={{
                    marginTop: '30px',
                    width: '80%',
                    background: '#646cff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 0',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    alignSelf: 'center',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
                onClick={handleSave}
            >SAVE TO SPOTIFY</button>
        </div>
    );
}
Playlist.propTypes = {
    tracks: PropTypes.array.isRequired,
};
export default Playlist;