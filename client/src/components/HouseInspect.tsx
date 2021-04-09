import React from "react";
import { RoomBox } from "./RoomBox";

interface props {
  data: any;
}

export const HouseInspect: React.FC<props> = ({ data }) => {
  return (
    <div className="house-inspect">
      <h2 className="house-inspect__title">Room inspect</h2>
      <div className="house-inspect__rooms">
        {Object.values(data.building.rooms).map((room: any) => {
          return (
            <RoomBox
              key={room.id}
              name={`Room ${room.id}`}
              temperature={Math.round(room.current_temperature)}
            />
          );
        })}
      </div>
    </div>
  );
};
