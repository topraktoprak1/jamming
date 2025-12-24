import React from 'react';
import '../SearchResults.css';
import PropTypes from 'prop-types';
import TrackList from './TrackList';

function SearchResult({ results, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <ul>
        {(results || []).map(track => (
        <li key={track.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{track.name} – {track.artist}</span>
          <button onClick={() => onAdd(track)} style={{ padding: '4px 10px', borderRadius: '6px', background: '#6c63ff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Add</button>
        </li>
        ))}
      </ul>
    </div>
  );
}

SearchResult.propTypes = {
    results: PropTypes.array.isRequired,
    onAdd: PropTypes.func,
};
export default SearchResult;