import React from "react";
import WhatshotOutlinedIcon from "@material-ui/icons/WhatshotOutlined";
import { Icon } from "@material-ui/core";

interface props {
  name: string;
  temperature: number;
}

export const RoomBox: React.FC<props> = ({ name, temperature }) => {
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
      </span>
    </div>
  );
};
