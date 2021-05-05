import React from "react";
import style from "./style.module.css";

const Card = function ({ children }) {
  const [Image, text] = children;
  return (
    <div className={style.card}>
      <div className={style.left}>{Image}</div>
      <div className={style.right}>{text}</div>
    </div>
  );
};

export default Card;
