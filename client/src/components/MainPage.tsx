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
          setResponse(data);
        });
    }, 1000);
  }, []);

  let temperatureOutside = Math.round(
    response?.building?.sensors?.outside?.temperature
  );

  let waterData = response?.building?.waterStorage;

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
                    label="Temperatura na zewnątrz"
                    value={`${temperatureOutside} °C` || "<brak>"}
                  />
                </DevicePanel>
                <DevicePanel title="Water storage">
                  {Object.keys(waterData).map(function (keyName, keyIndex) {
                    function translate() {
                      keyName = keyName === "size" ? "Rozmiar" : keyName;
                      keyName =
                        keyName === "heating_power" ? "Moc grzewcza" : keyName;
                      keyName =
                        keyName === "heating_rate_per_minute"
                          ? "Zużycie energii na minutę"
                          : keyName;
                    }
                    translate();
                    return (
                      <span className="data-line" key={keyName}>
                        <span>{keyName}</span>: {keyIndex}
                      </span>
                    );
                  })}
                </DevicePanel>
              </div>
            </div>
            <div className="column">
              <div className="devices-wrapper">
                <div className="device-column">
                  <DevicePanel title="Photovoltaic panels">
                    <p>chuuuj</p>
                  </DevicePanel>
                  <DevicePanel title="Battery">
                    <p>chuuuj</p>
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
