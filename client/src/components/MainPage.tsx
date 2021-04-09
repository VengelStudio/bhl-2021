import React from "react";
import { useState } from "react";
import { HouseInspect } from "./HouseInspect";
import { DevicePanel } from "./DevicePanel";
import { ControlPanel } from "./ControlPanel";

export const MainPage: React.FC = () => {
  const [response, setResponse] = useState<string>("");

  return (
    <div>
      <div className="page-wrapper">
        <div className="column">
          <HouseInspect />
          <div className="parameters">
            <DevicePanel title="Outside parameters">
              <p>chuuuj</p>
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
