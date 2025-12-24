
import React from "react";
import '../styles/TrackList.css';
import PropTypes from 'prop-types';
import Track from './Track';



function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
    return (
        <div className="track-list-container">
            <ul className="track-list">
                {tracks.map((track) => (
                    <Track
                        key={track.id}
                        track={track}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        isRemoval={isRemoval}
                    />
                ))}
            </ul>
        </div>
    );
}
TrackList.propTypes = {
    tracks: PropTypes.array.isRequired,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    isRemoval: PropTypes.bool,
};
export default TrackList;
