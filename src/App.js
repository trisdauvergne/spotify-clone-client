import Login from './components/login/Login.js';
import Dashboard from './components/dashboard/Dashboard.js';
// import './App.scss';

const code = new URLSearchParams(window.location.search).get('code');
console.log('CODE in App.js =', code);

function App() {
  return (
    <div className="App">
      <h1>Spotify Clone</h1>
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;
