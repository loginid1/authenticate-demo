import React, { useState, useEffect } from "react";
import style from "./style.module.css";

import { SmallButton } from "../Button/";
import { ReactComponent as Warning } from "../../imgs/warning_colored.svg";

const Toast = function ({ message }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 3000);
  }, []);

  return (
    <div className={!animate ? style.toast : style.close}>
      <div className={style.inner}>
        <Warning />
        <span>{message}</span>
      </div>
    </div>
  );
};

export const ToastOption = function ({ message, option, onClick }) {
  return (
    <div className={style.option}>
      <div className={style.innerOption}>
        <span className={style.message}>{message}</span>
        <SmallButton text={option} onClick={onClick} />
      </div>
    </div>
  );
};

export default Toast;
