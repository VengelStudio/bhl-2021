import React from "react";
import WhatshotOutlinedIcon from "@material-ui/icons/WhatshotOutlined";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { Icon } from "@material-ui/core";

interface props {
  name: string;
  temperature: number;
  targetTemperature: number;
  heating: boolean;
}

export const RoomBox: React.FC<props> = ({
  name,
  temperature,
  targetTemperature,
  heating,
}) => {
  return (
    <div className="room-box">
      <h5 className="room-box__name">{name}</h5>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <span style={{ display: "flex", alignItems: "center" }}>
          <span className="room-box__temperature">
            Temperature: {`${temperature}°C`}
          </span>
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
        <span style={{ marginTop: "10px" }}>
          <span className="room-box__temperature">
            Target temperature: {`${targetTemperature}°C`}
          </span>
        </span>
      </div>
    </div>
  );
};
