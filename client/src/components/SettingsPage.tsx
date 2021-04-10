import React, { useEffect, useState } from "react";
import { DevicePanel } from "./DevicePanel";
import { ControlPanel } from "./ControlPanel";
import { Button, CircularProgress } from "@material-ui/core";
import DayPicker, { DateUtils, DayModifiers } from "react-day-picker";
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
  const [pushDays, setPushDays] = useState<Date[]>([]);
  const [pullDays, setPullDays] = useState<Date[]>([]);

  useEffect(() => {
    if (response?.building?.powerExchange) {
      setPushDays(
        response.building?.powerExchange.pushDays.map(
          (d: SimpleDay) => new Date(Date.UTC(d.year, d.month, d.day))
        )
      );
      setPullDays(
        response.building?.powerExchange.pullDays.map(
          (d: SimpleDay) => new Date(Date.UTC(d.year, d.month, d.day))
        )
      );
    }
  }, [response]);

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

  const onDaysChange = (push: Date[], pull: Date[]) => {
    fetch("http://localhost:5000/building/power-exchange/days", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pushDays: push.map((day) => ({
          day: day.getUTCDate(),
          month: day.getUTCMonth(),
          year: day.getUTCFullYear(),
        })) as SimpleDay[],
        pullDays: pull.map((day) => ({
          day: day.getUTCDate(),
          month: day.getUTCMonth(),
          year: day.getUTCFullYear(),
        })) as SimpleDay[],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleDayClick = (day: Date, modifiers: DayModifiers) => {
    let newPushDays = [...pushDays];
    let newPullDays = [...pullDays];

    if (modifiers.selected) {
      // if in pushDays
      // move to pull days

      if (pushDays.some((pushDay) => DateUtils.isSameDay(pushDay, day))) {
        newPushDays = [...pushDays].filter(
          (selectedDay) => !DateUtils.isSameDay(selectedDay, day)
        );

        newPullDays = [...pullDays, day];
        // if in pull days
        // remove
      } else {
        newPullDays = [...pullDays].filter(
          (pullDay) => !DateUtils.isSameDay(pullDay, day)
        );
      }
    } else {
      newPushDays = [...pushDays, day];
    }

    setPushDays(newPushDays);
    setPullDays(newPullDays);
    onDaysChange(newPushDays, newPullDays);
  };

  const pushModifier = (day: Date) => {
    return pushDays.some((pushDay) => DateUtils.isSameDay(pushDay, day));
  };

  const pullModifier = (day: Date) => {
    return pullDays.some((pullDay) => DateUtils.isSameDay(pullDay, day));
  };

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
                <div style={{ display: "flex", flex: 1 }}>
                  <DayPicker
                    selectedDays={[...pushDays, ...pullDays]}
                    onDayClick={handleDayClick}
                    modifiers={{ pushModifier, pullModifier }}
                  />
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: "1",
                    }}
                  >
                    <p style={{ fontSize: "24px" }}>Total cost</p>
                    <p style={{ fontSize: "24px", margin: "10px 0 0 0" }}>45</p>
                  </div>
                </div>
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
