import React, { useEffect } from "react";
import { useState } from "react";
import { HouseInspect } from "./HouseInspect";
import { DevicePanel } from "./DevicePanel";
import { ControlPanel } from "./ControlPanel";
import { SingleData } from "./SingleData";
import { CircularProgress } from "@material-ui/core";

export const MainPage: React.FC = () => {
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    setInterval(() => {
      fetch("http://localhost:5000/building", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResponse(data);
        });
    }, 1000);
  }, []);

  let temperatureOutside = Math.round(
    response?.building?.sensors?.outside?.temperature
  );

  let waterData = response?.building?.waterStorage;
  console.log(waterData);

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
              <HouseInspect data={response} />
              <div className="parameters">
                <DevicePanel title="Outside parameters">
                  <SingleData
                    label="Outside temperature"
                    value={`${temperatureOutside} °C` || "<brak>"}
                  />
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
                        label={translatedKey}
                        value={waterData[key]}
                      />
                    );
                  })}
                </DevicePanel>
              </div>
            </div>
            <div className="column">
              <div className="devices-wrapper">
                <div className="device-column">
                  <DevicePanel title="Photovoltaic panels">
                    <span>{`Power production: ${response.building.panels.efficiency} kWh`}</span>
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
                <div className="water-column">
                  <DevicePanel title="Water">
                    <p>Water</p>
                  </DevicePanel>
                </div>
              </div>
              <ControlPanel />
            </div>
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};
