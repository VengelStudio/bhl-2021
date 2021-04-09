import React from "react";

interface props {
  name: string;
}

export const RoomBox: React.FC<props> = ({ name }) => {
  return (
    <div className="room-box">
      <p className="room-box__name">{name}</p>
      <p className="room-box__temperature">Temperatura: 15</p>
    </div>
  );
};
