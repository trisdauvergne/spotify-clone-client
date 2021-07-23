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
      <h4 className="track__title">{track.title}</h4>
      <p className="track__artist">{track.artist}</p>
    </div>
  )
}

export default TrackResults
