import React from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT;
const scope = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state',
].join('%20');
console.log(scope);

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`;

console.log(AUTH_URL);

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}

export default Login
