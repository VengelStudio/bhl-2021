import React from "react";

interface props {
  label: any;
  value: any;
}

export const SingleData: React.FC<props> = ({ label, value }) => {
  return (
    <span className="data-line">
      <span className="data-line__label">{label}:</span>
      <span className="data-line__value">{value}</span>
    </span>
  );
};
