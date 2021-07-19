import React, { useState, useEffect } from 'react';
import TrackSearchResult from './TrackSearchResult.js';
import Player from './Player.js';
import useAuth from './useAuth.js';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: 'd4b0932c3cc64303b958ed5d272cce31',
})

export default function Dashboard({ code }) {
  const [search, setSearch] = useState('');
  const accessToken = useAuth(code);
  const [searchResults, setSearchResults] = useState([]);
  console.log('searchresults from dashboard', searchResults)

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  // useEffect for searching
  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])
  
  return (
    <section>
      <h1>Dashboard</h1>
      <form>
        <input type="search" placeholder="search songs and artists" value={search} onChange={e => setSearch(e.target.value)}></input>
      </form>
      {/* <p>{code}</p> */}
      <div>
        <h2>Songs</h2>
        {searchResults.map(track => (
          <TrackSearchResult track={track} key={track.uri} />
        ))}
      </div>
      <div><Player accessToken={accessToken}/></div>
    </section>
  )
};
