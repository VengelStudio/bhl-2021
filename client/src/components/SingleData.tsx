import Typography from "@material-ui/core/Typography";
import React from "react";

interface props {
  label: any;
  value: any;
}

export const SingleData: React.FC<props> = ({ label, value }) => {
  return (
    <Typography className="data-line" variant="body2">
      <span className="data-line__label">{`${label}: ${value}`}</span>
    </Typography>
  );
};
