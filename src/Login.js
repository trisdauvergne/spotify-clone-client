import React from 'react'

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=d4b0932c3cc64303b958ed5d272cce31&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
  return (
    <section>
      <h1>Test</h1>
      <a href={AUTH_URL}>Login with Spotify</a>
    </section>
  )
}
