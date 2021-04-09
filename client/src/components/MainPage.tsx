import React from "react";
import { useState } from "react";
import { HouseInspect } from "./HouseInspect";
import { DevicePanel } from "./DevicePanel";

export const MainPage: React.FC = () => {
  const [response, setResponse] = useState<string>("");

  return (
    <div>
      <div className="page-wrapper">
        <div className="column">
          <HouseInspect />
        </div>
        <div className="column">
          <div className="devices-wrapper">
            <div className="device-column">
              <DevicePanel title="Photovoltaic panels">
                <p>chuuuj</p>
                <p>chuuuj</p>
                <p>chuuuj</p>
                <p>chuuuj</p>
                <p>chuuuj</p>
                <p>chuuuj</p>
              </DevicePanel>
              <DevicePanel title="Battery">
                <p>chuuuj</p>
              </DevicePanel>
            </div>
            <div className="water-column">
              <DevicePanel title="Battery">
                <p>Water</p>
              </DevicePanel>
            </div>
          </div>
          <div className="buttons">
            <p>test</p>
          </div>
        </div>
      </div>
    </div>
  );
};
