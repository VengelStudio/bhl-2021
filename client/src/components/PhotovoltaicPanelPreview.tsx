import React from "react";
import { Paper } from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

export interface PhotovoltaicPanelPreviewProps {
  data: any;
}

export const PhotovoltaicPanelPreview: React.FC<PhotovoltaicPanelPreviewProps> = ({
  data,
}) => {
  const calculatedData = [
    { argument: 1, value: 10 },
    { argument: 2, value: 20 },
    { argument: 3, value: 30 },
  ];

  return (
    <div>
      <span>{`Power production: ${data.efficiency} kWh`}</span>
      <Paper>
        <Chart data={calculatedData}>
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    </div>
  );
};
