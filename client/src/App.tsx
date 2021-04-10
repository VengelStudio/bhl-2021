import "./main.scss";
import { MainPage } from "./components/MainPage";
import { SettingsPage } from "./components/SettingsPage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function App() {
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:5000/building", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
        });
    }, 1000);
  }, []);

  return (
    <div>
      <Router>
        <Navbar />

        <Switch>
          <Route path="/settings">
            <SettingsPage response={response} />
          </Route>
          <Route path="/">
            <MainPage response={response} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
