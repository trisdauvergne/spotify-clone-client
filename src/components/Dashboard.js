import React from 'react';
import useAuth from './useAuth.js';

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  
  return (
    <div>
      <h3>Dashboard</h3>
      <p>Code passed from App.js = {code}</p>
    </div>
  )
}

export default Dashboard
