// import logo from './logo.svg';
// import './App.css';
import Login from './Login.js';
import Dashboard from './Dashboard.js';

function App() {
  const code = new URLSearchParams(window.location.search).get('code');

  return (
    code ? <Dashboard code={code}/> : <Login />
  );
}

export default App;
