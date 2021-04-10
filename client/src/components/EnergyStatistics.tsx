import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import {
  ArgumentAxis,
  Legend,
  Chart,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { SingleData } from "./SingleData";

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
        argument: "Power from network",
        value: response.building.preview_power_from_network,
      },
      {
        argument: "Power to network",
        value: response.building.preview_power_to_network,
      },
      {
        argument: "Battery discharge",
        value: response.building.preview_battery_discharge,
      },
    ]);
  }, [response]);

  return (
    <>
      <Paper>
        <Chart height={200} data={calculatedData}>
          <PieSeries valueField="value" argumentField="argument" />

          <Legend />
        </Chart>
      </Paper>

      <SingleData
        label="Hot water level"
        value={`${Math.floor((waterData.size / 150) * 100)} %`}
      />
      <SingleData label="Power usage" value={`${waterData.heating_power} kW`} />

      <Typography variant="body2">
        {`Battery charge level: ${response.building.battery.batteryLevel}%`}
      </Typography>
      <Typography variant="body2">
        {`Battery capacity: ${response.building.battery.capacity} kWh`}
      </Typography>
    </>
  );
};
