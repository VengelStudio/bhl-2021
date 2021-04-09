import React from "react";
import { Switch } from "@material-ui/core";

interface props {
  label: string;
}

export const SingleControl: React.FC<props> = ({ label }) => {
  return (
    <div className="single-control">
      <p className="single-control__label">{label}</p>
      <Switch />
    </div>
  );
};
