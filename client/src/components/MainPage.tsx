import React, { useEffect } from "react";
import { useState } from "react";
import { HouseInspect } from "./HouseInspect";
import { DevicePanel } from "./DevicePanel";
import { ControlPanel } from "./ControlPanel";
import { SingleData } from "./SingleData";
import { CircularProgress, Paper } from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { PhotovoltaicPanelPreview } from "./PhotovoltaicPanelPreview";

export const MainPage: React.FC = () => {
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
              <DevicePanel title="Outside parameters">
                <SingleData
                  label="Outside temperature"
                  value={`${temperatureOutside} °C`}
                />
                <SingleData label="Cloud coverage:" value={clearSkyRatio} />
              </DevicePanel>
              <DevicePanel title="Water storage">
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
            <div className="column">
              <div className="devices-wrapper">
                <div className="device-column">
                  <DevicePanel title="Photovoltaic panels">
                    <PhotovoltaicPanelPreview response={response} />
                  </DevicePanel>
                  <DevicePanel title="Battery">
                    <SingleData
                      label={"Capacity"}
                      value={response.building.battery.capacity}
                    />
                    <br></br>
                    <SingleData
                      label={"Current charge level"}
                      value={`${Math.round(
                        (response.building.battery.currentCharge /
                          response.building.battery.capacity) *
                          100
                      )}%`}
                    />
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
