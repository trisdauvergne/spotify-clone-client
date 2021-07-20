import React from 'react'

const TrackResults = ({ track }) => {
  console.log(track);
  return (
    <div>
      <img src={track.albumUrl} alt="" />
      <h4>{track.title}</h4>
      <p>{track.artist}</p>
    </div>
  )
}

export default TrackResults
