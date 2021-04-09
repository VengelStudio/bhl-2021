import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Header from "./components/Header";
import "./App.scss";

function App() {
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:5000/building", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setResponse(JSON.stringify(data));
        });
    }, 1000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header hint="hint of a header" divider={true}>
          Header
        </Header>
        <p style={{ backgroundColor: "rgba(0.5, 0.5, 0.5, 0.2" }}>{response}</p>
      </header>
    </div>
  );
}

export default App;
