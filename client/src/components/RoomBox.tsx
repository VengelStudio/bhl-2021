import React from "react";
import WhatshotOutlinedIcon from "@material-ui/icons/WhatshotOutlined";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import { Icon } from "@material-ui/core";

interface props {
  name: string;
  temperature: number;
  heating: boolean;
}

export const RoomBox: React.FC<props> = ({ name, temperature, heating }) => {
  return (
    <div className="room-box">
      <p className="room-box__name">{name}</p>
      <span style={{ display: "flex", alignItems: "center" }}>
        <Icon color="primary">
          <WhatshotOutlinedIcon />
        </Icon>
        <span className="room-box__temperature">
          Temperatura: {`${temperature}°C`}
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
    </div>
  );
};
