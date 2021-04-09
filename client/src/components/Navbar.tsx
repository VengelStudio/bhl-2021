import { clear } from "node:console";
import React, { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
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

  let hours =
    new Date(response.time).getUTCHours() < 10
      ? `0${new Date(response.time).getUTCHours()}`
      : new Date(response.time).getUTCHours();
  let minutes =
    new Date(response.time).getUTCMinutes() < 10
      ? `0${new Date(response.time).getUTCMinutes()}`
      : new Date(response.time).getUTCMinutes();

  let clearSkyRatio =
    Object.keys(response).length !== 0
      ? `${Math.round(
          (1 - response.building.sensors.outside.clearSkyRatio) * 100
        )}%`
      : "Loading..";

  return (
    <div className="navbar">
      <div className="navbar__box">
        <p>Time:</p>
        {Object.keys(response).length !== 0 ? (
          <p className="navbar__time">{`${hours}:${minutes}`}</p>
        ) : (
          <p className="navbar__time">Loading simulation time...</p>
        )}
      </div>
      <div className="navbar__box">
        <p>Cloud cover:</p>
        <p className="navbar__cloud">{clearSkyRatio}</p>
      </div>
    </div>
  );
};
