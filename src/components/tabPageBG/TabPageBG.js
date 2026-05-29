import React from "react";
import "./tabPageBG.css";

export default function TabPageBG({ id, className = "", children }) {
  return (
    <div className="tab-page container-fluid p-0">
      <div
        id={id}
        className={`tabPageBG__container ${className}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}