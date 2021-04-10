import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";

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

  useEffect(() => {
    setCalculatedData([
      ...calculatedData,
      {
        argument: new Date(response.time),
        value: response.building.energyConsumption,
      },
    ]);
  }, [response]);

  return (
    <>
      <Typography variant="body2">
        {`Battery charge level: ${response.building.battery.batteryLevel}%`}
      </Typography>
      <Typography variant="body2">
        {`Battery capacity: ${response.building.battery.capacity} kWh`}
      </Typography>
      <Paper>
        <Chart height={200} data={calculatedData}>
          <PieSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    </>
  );
};
