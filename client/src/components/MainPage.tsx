import React, { useEffect } from "react";
import { useState } from "react";
import { HouseInspect } from "./HouseInspect";
import { DevicePanel } from "./DevicePanel";
import { ControlPanel } from "./ControlPanel";
import { SingleData } from "./SingleData";
import { CircularProgress, Paper, Typography } from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { PhotovoltaicPanelPreview } from "./PhotovoltaicPanelPreview";

interface SimpleDay {
  day: number;
  month: number;
  year: number;
}

export const MainPage: React.FC = () => {
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:5000/building", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
          console.log(data);
        });
    }, 1000);
  }, []);

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

  let temperatureOutside = Math.round(
    response?.building?.sensors?.outside?.temperature
  );

  let waterData = response?.building?.waterStorage;

  let clearSkyRatio =
    Object.keys(response).length !== 0
      ? `${Math.round(
          (1 - response.building.sensors.outside.clearSkyRatio) * 100
        )}%`
      : "Loading..";

  return (
    <div>
      <button onClick={onDaysChange}>asdasd</button>
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
              <DevicePanel title="Room inspect">
                <HouseInspect data={response} />
              </DevicePanel>

              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", marginRight: "20px" }}>
                  <DevicePanel title="Water heater">
                    {Object.keys(waterData).map(function (key) {
                      let translatedKey;

                      function translate() {
                        if (key === "size") {
                          translatedKey = "Size";
                        } else if (key === "heating_power") {
                          translatedKey = "Heating power";
                        } else if (key === "heating_rate_per_minute") {
                          translatedKey = "Heating rate per minute";
                        }
                      }
                      translate();
                      return (
                        <SingleData
                          key={key}
                          label={translatedKey}
                          value={waterData[key]}
                        />
                      );
                    })}
                  </DevicePanel>
                </div>
                <div style={{ width: "50%" }}>
                  <DevicePanel title="Battery">
                    <Typography variant="body2">
                      {`Capacity: ${response.building.battery.capacity} kWh`}
                    </Typography>
                    <Typography variant="body2">
                      {`Charge level: ${response.building.battery.batteryLevel}%`}
                    </Typography>
                  </DevicePanel>
                </div>
              </div>
              <DevicePanel title="Current weather">
                <SingleData
                  label="Temperature"
                  value={`${temperatureOutside} °C`}
                />
                <SingleData label="Cloud coverage" value={clearSkyRatio} />
              </DevicePanel>
            </div>
            <div className="column">
              <div className="devices-wrapper">
                <div className="device-column">
                  <DevicePanel title="Photovoltaic panels">
                    <PhotovoltaicPanelPreview response={response} />
                  </DevicePanel>
                </div>
              </div>
              <DevicePanel title="Select mode">
                <ControlPanel
                  value={response.building.powerManager.mode}
                  onChange={onModeChange}
                />
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
