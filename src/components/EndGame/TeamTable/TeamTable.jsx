import React, { useEffect, useState } from "react";
import s from "./TeamTable.module.css";
import { dataTeam1, dataTeam2 } from "../../../allData";
import death from "../../../assets/death.png";

const TeamTable = () => {
  const [winTeam, setWinTeam] = useState(null);
  const [loseTeam, setLoseTeam] = useState(null);

  useEffect(() => {
    setWinTeam(dataTeam1);
    setLoseTeam(dataTeam2);
  }, []);

  return (
    <div className={s.wrapper}>
      <div style={{ flex: "1" }}>
        <div className={s.teamContentHeader}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div className={s.team}>RU</div>
            <div style={{ marginLeft: "20px" }}>
              {`[50]PLAYERS`}{" "}
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "100px",
                  color: "rgb(44, 254, 231)",
                  letterSpacing: "2px",
                }}
              >
                WIN
              </span>
            </div>
          </div>

          <span>SCORE</span>
        </div>
        <div className={s.teamContent}>
          <div className={s.playersWrapper}>
            {winTeam?.map((el, idx) => (
              <Player pl={{ ...el, place: idx + 1 }} key={el.id} />
            ))}
          </div>
        </div>
      </div>
      {/* center */}
      <div style={{ flex: "1" }}>
        <div className={s.teamContentHeader}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div className={s.team} style={{ color: "rgb(252, 89, 74)" }}>
              EN
            </div>
            <div style={{ marginLeft: "20px" }}>
              {`[50]PLAYERS`}
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "100px",
                  color: "rgb(252, 89, 74)",
                  letterSpacing: "2px",
                }}
              >
                LOSE
              </span>
            </div>
          </div>

          <span>SCORE</span>
        </div>
        <div className={s.teamContent}>
          <div className={s.playersWrapper}>
            {loseTeam?.map((el, idx) => (
              <Player pl={{ ...el, place: idx + 1 }} key={el.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTable;

export const Player = ({ pl }) => {
  let { alive } = pl;
  const [coordination, setCoordination] = useState({ x: "", y: "" });
  const [openInfo, setOpenInfo] = useState(false);
  const [friendAdded, setFriendAdded] = useState(false);

  return (
    <>
      <div
        className={s.player}
        data-alive={alive}
        onMouseEnter={(e) => {
          setCoordination({
            x: `${
              e.currentTarget.getBoundingClientRect().x +
              e.currentTarget.getBoundingClientRect().width
            }`,
            y: e.currentTarget.getBoundingClientRect().y,
          });
          setOpenInfo(true);
        }}
        onMouseLeave={() => setOpenInfo(false)}
      >
        <div className={s.place}>{pl.place}</div>
        <div className={s.playerStats}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={s.playerAlive}>
              {!alive ? <img src={death} /> : null}
            </div>
            <span>{pl.name}</span>
          </div>
          <div className={s.addFriendBtn} onClick={() => setFriendAdded(true)}>
            {!friendAdded ? "Add friend" : "Added"}
          </div>
          <span>{pl.score}</span>
        </div>
      </div>
      {openInfo ? <PlayerInfo data={pl} coordination={coordination} /> : null}
    </>
  );
};

const PlayerInfo = ({ data, coordination }) => {
  return (
    <div
      className={s.info}
      style={{ top: `${coordination.y}px`, left: `${coordination.x}px` }}
    >
      <span>kills: {data.kill}</span>
      <span>death: {data.death}</span>
    </div>
  );
};
