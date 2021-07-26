import React, { useState, useEffect } from 'react';
import useAuth from '../useauth/useAuth.js';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackResults from '../trackresults/TrackResults.js';
import Lyrics from '../lyrics/Lyrics.js';
import Player from '../player/Player.js';
import axios from 'axios';
import './dashboard.scss';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

const fetchlink = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION; 

console.log('Dashboard process.env.NODE_ENV =', process.env.NODE_ENV);

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState('');
  const [lyrics, setLyrics] = useState('');

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  }

  // setting the access token
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  
  // setting the search results
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search)
    .then(res => {
      if (cancel) return;
      setSearchResults(res.body.tracks.items.map(track => {
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[1].url,
        }
      }));
    })

    return () => cancel = true;
  }, [search, accessToken]);

  // to get the lyrics
  useEffect(() => {
    if (!playingTrack) return;
    axios.get(`${fetchlink}/lyrics`, {
      params: {
        track: playingTrack.title,
        artist: playingTrack.artist,
      }
    })
    .then(res => {
      setLyrics(res.data.lyrics)
    })
    .catch(err => {
      console.log(err.message);
    })
  }, [playingTrack])

  const clearResults = () => {
    setSearchResults([]);
    setSearch('');
  }

  return (
    <section className="section dashboard">
      <h1 className="dashboard__title">Attack of the Clone</h1>
      <div className="dashboard__form-div">
        <form className="dashboard__form">
          <input
          className="dashboard__input"
          type="search"
          placeholder="Search for songs/artists"
          value={search}
          onChange={e => setSearch(e.target.value)}/>
        </form>
        {searchResults.length !== 0 &&
          <button className="btn dashboard__form-btn" onClick={clearResults}>Clear results</button>
        }
      </div>
      <div className="dashboard__songs-div">
        {searchResults.map(track => (
          <TrackResults track={track} key={track.uri} chooseTrack={chooseTrack}/>
        ))}
        {lyrics !== '' && (
          <div className="dashboard__lyricsandplayer">
            <Lyrics title={playingTrack.title} lyrics={lyrics}/>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard
