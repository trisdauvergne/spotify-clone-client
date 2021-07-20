import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';

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
