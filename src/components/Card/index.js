import React from "react";
import style from "./style.module.css";

const Card = function ({ onClick, children }) {
  const [Image, text] = children;
  return (
    <div onClick={onClick} className={style.card}>
      <div className={style.left}>{Image}</div>
      <div className={style.right}>{text}</div>
    </div>
  );
};

export const CustomCard = function ({ children, ...rest }) {
  return (
    <div className={style.customCard} {...rest}>
      {children}
    </div>
  );
};

export default Card;
