import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Header from "./components/Header";
import "./App.scss";

function App() {
  const [response, setResponse] = useState<string>("");

  const onButtonClick = () => {
    fetch("http://localhost:5000/users", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setResponse(JSON.stringify(data));
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header hint="hint of a header" divider={true}>
          Header
        </Header>
        <Button variant="contained" color="primary" onClick={onButtonClick}>
          Click to fetch
        </Button>
        <p style={{ backgroundColor: "rgba(0.5, 0.5, 0.5, 0.2" }}>{response}</p>
      </header>
    </div>
  );
}

export default App;
