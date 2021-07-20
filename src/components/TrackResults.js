import React from 'react'

const TrackResults = ({ track, chooseTrack }) => {
  console.log(track);

  const handlePlay = () => {
    chooseTrack(track);
  };

  return (
    <div onClick={handlePlay}>
      <img src={track.albumUrl} alt="" />
      <h4>{track.title}</h4>
      <p>{track.artist}</p>
    </div>
  )
}

export default TrackResults
