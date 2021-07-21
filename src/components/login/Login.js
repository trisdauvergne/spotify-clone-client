import React from 'react';
import './login.scss';

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

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`;

const Login = () => {
  return (
    <section className="section login">
      {/* <h3>Login Section</h3> */}
      <div className="login-container">
        <a className="btn login-btn" href={AUTH_URL}>LOGIN</a>
      </div>
    </section>
  )
}

export default Login
