import Divider from "@material-ui/core/Divider";
import { clear } from "node:console";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DayPicker, { DateUtils, DayModifiers } from "react-day-picker";

export const Navbar: React.FC = () => {
  const [response, setResponse] = useState<any>({});
  const [open, setOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const handleSimulationDateChange = (event: Date) => {
    // setAge(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
  };

  const handleSave = () => {
    fetch("http://localhost:5000/building/simulation/day", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ day: selectedDay }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleClose();
      });
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
      <div className="navbar__box" style={{ marginLeft: "40px" }}>
        <HomeIcon></HomeIcon>
        <Link to="/">Dashboard</Link>
      </div>
      <div className="navbar__box">
        <SettingsIcon></SettingsIcon>
        <Link to="/settings">Settings</Link>
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

      <Button style={{ marginLeft: "auto" }} onClick={handleClickOpen}>
        <VisibilityIcon></VisibilityIcon>
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Set simulation day</DialogTitle>
        <DialogContent>
          <div style={{ height: "320px" }}>
            <DayPicker
              selectedDays={selectedDay ? [selectedDay] : []}
              onDayClick={handleDayClick}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
