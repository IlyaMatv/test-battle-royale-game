import React from "react";
import "./EndGame.css";
import TeamTable from "./TeamTable/TeamTable";

const EndGame = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <TeamTable />
      </div>
    </div>
  );
};

export default EndGame;
