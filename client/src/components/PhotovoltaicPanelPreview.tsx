import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

export interface PhotovoltaicPanelPreviewProps {
  response: any;
}

interface ChartData {
  argument: number;
  value: number;
}

export const PhotovoltaicPanelPreview: React.FC<PhotovoltaicPanelPreviewProps> = ({
  response,
}) => {
  const [calculatedData, setCalculatedData] = useState<ChartData[]>([
    { argument: 1, value: 10 },
    { argument: 2, value: 20 },
    { argument: 3, value: 50 },
  ]);

  useEffect(() => {
    const lastId =
      calculatedData.length > 0
        ? calculatedData[calculatedData.length - 1].argument
        : 0;
    setCalculatedData([
      ...calculatedData,
      {
        argument: lastId + 1,
        value: response.building.panels.efficiency,
      },
    ]);
    console.log(response.building.panels.efficiency);
  }, [response]);

  return (
    <div>
      <span>{`Power production: ${response.building.panels.efficiency} kWh`}</span>
      <Chart data={calculatedData}>
        <ArgumentAxis />
        <ValueAxis />

        <LineSeries
          color="#000000"
          valueField="value"
          argumentField="argument"
        />
      </Chart>
    </div>
  );
};
