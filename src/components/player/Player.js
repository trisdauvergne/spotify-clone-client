import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  console.log(trackUri);

  return (
    <SpotifyPlayer
    token={accessToken}
    showSaveIcon
    // callback={state => {
    //   if (!state.isPlaying) {
    //     setPlay(false);
    //   }
    // }} // removed as it wasn't autoplaying
    play={play}
    styles={{
      sliderColor: '#ff9f1c',
      sliderHandleColor: '#011627',
      color: '#011627'
    }}
    uris={trackUri ? [trackUri] : []}
    />
  )
}

export default Player
