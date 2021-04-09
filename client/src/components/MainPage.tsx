import React from "react";
import { useState } from "react";
import { HouseInspect } from "./HouseInspect";

export const MainPage: React.FC = () => {
  const [response, setResponse] = useState<string>("");

  return (
    <div className="page-wrapper">
      <div className="column">
        <HouseInspect />
      </div>
      <div className="column">
        <p>bonzo</p>
      </div>
    </div>
  );
};
