import React, { useState, useEffect } from 'react';
import useAuth from './useAuth.js';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackResults from './TrackResults.js';
// import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  console.log('searchResults', searchResults);

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

  return (
    <section>
      <h3>Dashboard</h3>
      {/* <p>Code passed from App.js = {code}</p> */}
      <div>
        <h3>Container for form</h3>
        <form>
          <input
          type="search"
          placeholder="Search for songs/artists"
          value={search}
          onChange={e => setSearch(e.target.value)}/>
        </form>
      </div>
      <div>
        <h3>Songs will go here</h3>
        {searchResults.map(track => (
          <TrackResults track={track} key={track.uri} />
        ))}
      </div>
      <div>Bottom</div>
    </section>
  )
}

export default Dashboard
