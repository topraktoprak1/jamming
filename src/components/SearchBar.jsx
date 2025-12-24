import React from 'react';
import { search } from '../util/Spotify';
import '../styles/SearchBar.css';
import { useState } from 'react';

import PropTypes from 'prop-types';
function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const search = () => {
    onSearch(term); // 🔥 THIS triggers Spotify.search
  };

  return (
    <div className="SearchBar">
      <input onChange={(e) => setTerm(e.target.value)} />
      <button onClick={search}>SEARCH</button>
    </div>
  );
}

SearchBar.propTypes = {
    onSearchResults: PropTypes.func.isRequired,
};
export default SearchBar;