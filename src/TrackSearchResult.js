import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
  console.log('in track search result', track);

  const handlePlay = () => {
    chooseTrack(track);
    console.log(track.title, 'clicked')
  }

  return (
    <div onClick={handlePlay}>
      <p>Test</p>
      <img src={track.albumUrl} alt="album artwork"/>
      <h4>{track.title}</h4>
      <h5>{track.artist}</h5>
    </div>
  )
}
