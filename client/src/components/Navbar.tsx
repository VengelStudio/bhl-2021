import Divider from "@material-ui/core/Divider";
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

  let dayOfTheWeek = checkDayOfTheWeek(new Date(response.time).getUTCDay());

  function checkDayOfTheWeek(day: any) {
    if (day === 0) {
      return "Sunday";
    } else if (day === 1) {
      return "Monday";
    } else if (day === 2) {
      return "Tuesday";
    } else if (day === 3) {
      return "Wednesday";
    } else if (day === 4) {
      return "Thursday";
    } else if (day === 5) {
      return "Friday";
    } else if (day === 6) {
      return "Saturday";
    }
  }

  const getFormattedDate = (date: Date) => {
    return `${checkDayOfTheWeek(date.getUTCDay())}, ${
      date.getUTCDay() + 1
    } ${date.toLocaleString("default", {
      month: "long",
    })} ${date.getUTCFullYear()} ${hours}:${minutes}`;
  };

  return (
    <div className="navbar">
      <div className="navbar__box">
        {Object.keys(response).length !== 0 ? (
          <span>{getFormattedDate(new Date(response.time))}</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
      <Divider orientation="vertical" />
      <p style={{ marginLeft: "20px" }}>
        Energy consumption:{" "}
        {Object.keys(response).length !== 0 ? (
          <span>{response.building.energyConsumption}</span>
        ) : (
          <span>Loading...</span>
        )}
      </p>
    </div>
  );
};
