import React from "react";

export const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__box">
        <p>Time:</p>
        <p className="navbar__time">21:37</p>
      </div>
      <div className="navbar__box">
        <p>Cloud cover:</p>
        <p className="navbar__cloud">60%</p>
      </div>
    </div>
  );
};
