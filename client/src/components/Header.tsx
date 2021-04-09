import React from "react";
import { Divider } from "@material-ui/core";

interface HeaderProps {
  children: any;
  divider: boolean;
  hint: string;
}

export const Header: React.FC<HeaderProps> = ({ children, divider, hint }) => {
  return (
    <div className="header">
      <h3 className="header__title">{children}</h3>
      {hint ? <p className="header__hint">{hint}</p> : ""}
      {divider ? <Divider style={{ marginTop: "10px" }} /> : ""}
    </div>
  );
};
