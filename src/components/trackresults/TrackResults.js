import React from 'react';
import './trackresults.scss';

const TrackResults = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };

  console.log(track);

  return (
    <div className="track" onClick={handlePlay}>
      <img className="track__img" src={track.albumUrl} alt="" />
      <h4>{track.title}</h4>
      <p>{track.artist}</p>
    </div>
  )
}

export default TrackResults
