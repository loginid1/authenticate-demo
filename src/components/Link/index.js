import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export const WordLink = function ({ info, link, to }) {
  return (
    <p className={style.member}>
      {`${info} `}
      <Link to={to} className={style.link}>
        {link}
      </Link>
    </p>
  );
};
