import React from "react";
import { SingleControl } from "./SingleControl";

export const ControlPanel: React.FC = () => {
  return (
    <div className="control-panel">
      <h2>Control panel</h2>
      <div className="control-panel__switches">
        <SingleControl label={"bzykankdddddddddddddddddddddddddo"} />
        <SingleControl label={"pompowanko"} />
        <SingleControl label={"ruchanko"} />
      </div>
    </div>
  );
};
