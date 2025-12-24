import React from 'react';
import PropTypes from 'prop-types';

function Track({ track, onAdd, onRemove, isRemoval }) {
    const addTrack = () => onAdd(track);
    const removeTrack = () => onRemove(track);

    return (
        <li className="track-item">
            <span className="track-name">{track.name}</span>
            <span className="track-artist">{track.artist}</span>
            {track.album && (
                <span className="track-album">{track.album}</span>
            )}
            {isRemoval ? (
                <button className="track-remove" onClick={removeTrack}>-</button>
            ) : (
                <button className="track-add" onClick={addTrack}>+</button>
            )}
        </li>
    );
}

Track.propTypes = {
    track: PropTypes.object.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isRemoval: PropTypes.bool.isRequired,
};

export default Track;