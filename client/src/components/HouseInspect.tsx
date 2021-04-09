import React from "react";
import { RoomBox } from "./RoomBox";

export const HouseInspect: React.FC = () => {
  return (
    <div className="house-inspect">
      <h2 className="house-inspect__title">Room inspect</h2>
      <div className="house-inspect__rooms">
        <RoomBox name="Pokój 1" />
        <RoomBox name="Pokój 1" />
        <RoomBox name="Pokój 1" />
        <RoomBox name="Pokój 1" />
        <RoomBox name="Pokój 1" />
        <RoomBox name="Pokój 1" />
        <RoomBox name="Pokój 1" />
      </div>
    </div>
  );
};
