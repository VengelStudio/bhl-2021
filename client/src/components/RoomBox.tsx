import React from "react";
import WhatshotOutlinedIcon from "@material-ui/icons/WhatshotOutlined";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { Icon, Typography } from "@material-ui/core";

interface props {
  name: string;
  temperature: number;
  targetTemperature: number;
  heating: boolean;
  tint: string;
}

export const RoomBox: React.FC<props> = ({
  name,
  temperature,
  targetTemperature,
  heating,
  tint,
}) => {
  return (
    <div className="room-box" style={{ borderColor: tint }}>
      <h5 className="room-box__name">{name}</h5>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          marginTop: "4px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" className="room-box__temperature">
            Temperature: {`${temperature}°C`}
          </Typography>
          {heating ? (
            <Icon style={{ transform: "rotate(-90deg)" }} color="secondary">
              <ArrowRightAltOutlinedIcon />
            </Icon>
          ) : (
            <Icon style={{ transform: "rotate(90deg)" }} color="primary">
              <ArrowRightAltOutlinedIcon />
            </Icon>
          )}
        </span>
        <Typography variant="body2" className="room-box__temperature">
          Target temperature: {`${targetTemperature}°C`}
        </Typography>
      </div>
    </div>
  );
};
