import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [response, setResponse] = useState<string>("");

  const onButtonClick = () => {
    fetch("http://localhost:5000/users", {method: "GET"}).then(response => response.json()).then(data => {
      setResponse(JSON.stringify(data))
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={onButtonClick}>Click to fetch</button>
          <p style={{backgroundColor: "rgba(0.5, 0.5, 0.5, 0.2"}}>
            {response}
          </p>
        </p>
      </header>
    </div>
  );
}

export default App;
