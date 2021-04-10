import React from "react";
import { RoomBox } from "./RoomBox";

interface props {
  data: any;
}

export const HouseInspect: React.FC<props> = ({ data }) => {
  return (
    <div className="house-inspect__rooms">
      {Object.values(data.building.rooms).map((room: any) => {
        return (
          <RoomBox
            key={room.id}
            name={`${room.name}`}
            temperature={Math.round(room.current_temperature)}
            targetTemperature={Math.round(room.target_temperature)}
            heating={room.is_heated}
          />
        );
      })}
    </div>
  );
};
