import React from "react";

interface props {
  name: string;
}

export const RoomBox: React.FC<props> = ({ name }) => {
  return (
    <div className="room-box">
      <p>{name}</p>
      <p>Temperatura: 15</p>
    </div>
  );
};
