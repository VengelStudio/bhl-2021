import React from "react";
import { DevicePanel } from "./DevicePanel";
import { ControlPanel } from "./ControlPanel";
import { CircularProgress } from "@material-ui/core";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

interface SimpleDay {
  day: number;
  month: number;
  year: number;
}

export interface SettingsPageProps {
  response: any;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ response }) => {
  const onModeChange = (mode: "a" | "b" | "c" | "d") => {
    fetch("http://localhost:5000/building/power-manager/mode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const onDaysChange = () => {
    fetch("http://localhost:5000/building/power-exchange/days", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pushDays: [{ day: 1, month: 1, year: 1 }] as SimpleDay[],
        pullDays: [{ day: 2, month: 2, year: 2 }] as SimpleDay[],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  // const handleDayClick = (day, { selected }) => {
  //   const selectedDays = this.state.selectedDays.concat();
  //   if (selected) {
  //     const selectedIndex = selectedDays.findIndex(selectedDay =>
  //       DateUtils.isSameDay(selectedDay, day)
  //     );
  //     selectedDays.splice(selectedIndex, 1);
  //   } else {
  //     selectedDays.push(day);
  //   }
  //   this.setState({ selectedDays });
  // }

  return (
    <div>
      <div
        className="page-wrapper"
        style={
          Object.keys(response).length !== 0
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
              }
            : {}
        }
      >
        {Object.keys(response).length !== 0 ? (
          <div
            className="columns"
            style={{ display: "flex", width: "100%", minHeight: "100%" }}
          >
            <div className="column">
              <DevicePanel title="Power management mode">
                <ControlPanel
                  value={response.building.powerManager.mode}
                  onChange={onModeChange}
                />
              </DevicePanel>
            </div>
            <div className="column">
              <DevicePanel title="Power exchange days">
                <div>
                  <button onClick={onDaysChange}>asdasd</button>
                </div>
                {/* <DayPicker
                  selectedDays={this.state.selectedDays}
                  onDayClick={this.handleDayClick}
                /> */}
              </DevicePanel>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};
