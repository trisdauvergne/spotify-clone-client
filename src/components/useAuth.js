import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    console.log('code in useEffect in useAuth.js =', code);
    axios.post('http://localhost:3001/login', {
      code,
    })
    .then(res => {
      console.log('data in useAuth.js', res.data);
      window.history.pushState({}, '', '/');
    })
    .catch(err => {
      console.log(err.response.data);
      window.location = '/';
    })
  }, [code]);

  // return (
  //   <div>
      
  //   </div>
  // )
}

export default useAuth
