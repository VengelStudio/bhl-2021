import React, { useEffect } from "react";
import { useState } from "react";
import { HouseInspect } from "./HouseInspect";
import { DevicePanel } from "./DevicePanel";
import { ControlPanel } from "./ControlPanel";

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
    response?.building?.sensors?.outsideTemperature
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="column">
          <HouseInspect />
          <div className="parameters">
            <DevicePanel title="Outside parameters">
              <p>
                <span>
                  Temperatura na zewnątrz:{" "}
                  {`${temperatureOutside} °C` || "<brak>"}
                </span>
              </p>
            </DevicePanel>
            <DevicePanel title="Water storage">
              <p>chuuuj</p>
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
    </div>
  );
};
