import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import {
  ArgumentAxis,
  Legend,
  Chart,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { SingleData } from "./SingleData";
import { Animation } from "@devexpress/dx-react-chart";

export interface EnergyStatisticsProps {
  response: any;
}

interface ChartData {
  argument: any;
  value: number;
}

export const EnergyStatistics: React.FC<EnergyStatisticsProps> = ({
  response,
}) => {
  const [calculatedData, setCalculatedData] = useState<ChartData[]>([]);

  let waterData = response?.building?.waterStorage;

  useEffect(() => {
    setCalculatedData([
      {
        argument: "Solar power",
        value: response.building.preview_power_solar,
      },
      {
        argument: "Power from grid",
        value: response.building.preview_power_from_network,
      },
      {
        argument: "Power to grid",
        value: response.building.preview_power_to_network,
      },
      {
        argument: "Battery discharge",
        value: response.building.preview_battery_discharge,
      },
    ]);
  }, [response]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "66%" }}>
        <Paper elevation={0}>
          <Chart height={200} data={calculatedData}>
            <PieSeries valueField="value" argumentField="argument" />

            <Legend position="left" />

            <Animation />
          </Chart>
        </Paper>
      </div>

      <div
        style={{
          marginLeft: "8px",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <SingleData
          label="Hot water level"
          value={`${Math.floor((waterData.size / 150) * 100)} %`}
        />
        <SingleData
          label="Water heating power"
          value={`${waterData.heating_power} kW`}
        />

        <Typography variant="body2">
          {`Battery charge level: ${response.building.battery.batteryLevel}%`}
        </Typography>
        <Typography variant="body2">
          {`Battery capacity: ${response.building.battery.capacity} kWh`}
        </Typography>
      </div>
    </div>
  );
};
