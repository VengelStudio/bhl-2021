import React from "react";

interface props {
  children: any;
  title: string;
  fullwidth?: boolean;
}

export const DevicePanel: React.FC<props> = ({
  children,
  title,
  fullwidth,
}) => {
  return (
    <div className="device-panel">
      <h4 className="device-panel__name">{title}</h4>
      <div className="device-panel__content">{children}</div>
    </div>
  );
};
