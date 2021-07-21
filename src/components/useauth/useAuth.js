import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  // Hook to get the tokens from Spotify
  useEffect(() => {
    axios.post('http://localhost:3001/login', {
      code,
    })
    .then(res => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setExpiresIn(res.data.expiresIn);
      window.history.pushState({}, '', '/');
    })
    .catch(err => {
      console.log(err.response.data);
      window.location = '/';
    })
  }, [code]);

  // Hook to refresh the expiresIn token
  useEffect(() => {
    if (!refreshToken | !expiresIn) return;

    const interval = setInterval(() => {
      axios.post('http://localhost:3001/refresh', {
        refreshToken,
      })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch(err => {
        console.log(err.response.data);
        window.location = '/';
      })
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn])

  return accessToken;
}

export default useAuth
