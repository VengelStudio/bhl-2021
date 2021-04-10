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
import { EnergyPreview } from "./EnergyPreview";

export interface MainPageProps {
  response: any;
}

export const MainPage: React.FC<MainPageProps> = ({ response }) => {
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

              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", marginRight: "20px" }}>
                  <DevicePanel title="Water heater">
                    <SingleData
                      label="Hot water level"
                      value={`${Math.floor((waterData.size / 150) * 100)} %`}
                    />
                    <SingleData
                      label="Power usage"
                      value={`${waterData.heating_power} kW`}
                    />
                  </DevicePanel>
                </div>
                <div style={{ width: "50%" }}>
                  <DevicePanel title="Energy statistics">
                    <Typography variant="body2">
                      {`Battery charge level: ${response.building.battery.batteryLevel}%`}
                    </Typography>
                    <Typography variant="body2">
                      {`Battery capacity: ${response.building.battery.capacity} kWh`}
                    </Typography>
                  </DevicePanel>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="devices-wrapper">
                <div className="device-column">
                  <DevicePanel title="Photovoltaic panels">
                    <PhotovoltaicPanelPreview response={response} />
                  </DevicePanel>
                  <DevicePanel title="Power consumption">
                    <EnergyPreview response={response} />
                  </DevicePanel>
                </div>
              </div>
              <DevicePanel title="Current weather">
                <SingleData label="Cloud coverage" value={clearSkyRatio} />

                <SingleData
                  label="Temperature"
                  value={`${temperatureOutside} °C`}
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
