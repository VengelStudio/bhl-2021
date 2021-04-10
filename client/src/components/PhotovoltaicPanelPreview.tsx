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
  argument: any;
  value: number;
}

export const PhotovoltaicPanelPreview: React.FC<PhotovoltaicPanelPreviewProps> = ({
  response,
}) => {
  const [calculatedData, setCalculatedData] = useState<ChartData[]>([]);

  useEffect(() => {
    setCalculatedData([
      ...calculatedData,
      {
        argument: new Date(response.time),
        value: response.building.panels.efficiency,
      },
    ]);
    console.log(response.building.panels.efficiency);
  }, [response]);

  const ValueLabel = (props: any) => {
    const { text } = props;
    return <ValueAxis.Label {...props} text={`${text} kWh`} />;
  };

  const format = () => (tick: any) => {
    let hours =
      new Date(tick).getUTCHours() < 10
        ? `0${new Date(tick).getUTCHours()}`
        : new Date(tick).getUTCHours();
    let minutes =
      new Date(tick).getUTCMinutes() < 10
        ? `0${new Date(tick).getUTCMinutes()}`
        : new Date(tick).getUTCMinutes();

    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <span>{`Current power production: ${response.building.panels.efficiency} kWh`}</span>
      <Paper style={{ marginTop: "16px" }}>
        <Chart height={200} data={calculatedData}>
          <ArgumentAxis tickFormat={format} />
          <ValueAxis labelComponent={ValueLabel} />

          <LineSeries
            color="#000000"
            valueField="value"
            argumentField="argument"
          />
        </Chart>
      </Paper>
    </div>
  );
};
