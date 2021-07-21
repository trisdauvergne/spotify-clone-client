import React, { useState, useEffect } from 'react';
import useAuth from '../useauth/useAuth.js';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackResults from '../trackresults/TrackResults.js';
import Player from '../player/Player.js';
import axios from 'axios';
import './dashboard.scss';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

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
        const smallestImage = track.album.images.reduce((smallest, currentImage) => {
          if (currentImage.height < smallest.height) {
            return currentImage;
          } else {
            return smallest;
          }
        }, track.album.images[0])
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestImage.url,
        }
      }));
    })

    return () => cancel = true;
  }, [search, accessToken]);

  // to get the lyrics
  useEffect(() => {
    if (!playingTrack) return;
    axios.get('http://localhost:3001/lyrics', {
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
      <h1 className="dashboard__title">The Spotify Clone</h1>
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
        {/* <h3>Songs will go here</h3> */}
        {searchResults.map(track => (
          <TrackResults track={track} key={track.uri} chooseTrack={chooseTrack}/>
        ))}
        {lyrics !== '' && (
          <>
            <div>
              {lyrics}
            </div>
            <div>
              <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
            </div>
          </>
        )}
      </div>
      {/* <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
      </div> */}
    </section>
  )
}

export default Dashboard
